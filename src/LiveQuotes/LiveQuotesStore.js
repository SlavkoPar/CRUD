
import { Pusher } from "./Pusher"
import { Subscription } from "./Subscription"

function Symbol(data)
{
    this.symbolId = data.symbolId;
    this.name = data.name;
    this.group = data.group;

    this.digits = (data.decimals || 4) + (data.fractional || 1);
    this.fract2 = data.fractional + 2;

    this.bid = data.bid;
    this.ask = data.ask;
    this.UpdateInfo(data);

    this.consumers = [];
    this.symbolConsumers = [];
    this.chartSymbolConsumers = [];
}

Symbol.prototype.getParts = function(data, askBid) {
    var sPrice = askBid.toFixed(this.digits);
    var d = sPrice.length - this.fract2;
    return {
        base: sPrice.substr(0, d),
        last2: sPrice.substr(d, 2),
        fract: data.fractional === 0 ? "" : sPrice.charAt(sPrice.length - 1)
    }
}


Symbol.prototype.UpdateInfo = function (obj) {

    this.bidUp = this.bid === obj.bid ? null : this.bid < obj.bid ? 'bottom' : 'top';
    this.bid = obj.bid;
    this.bidParts = this.getParts(obj, obj.bid);

    this.askUp = this.ask === obj.ask ? null : this.ask < obj.ask ? 'bottom' : 'top';
    this.ask = obj.ask;
    this.askParts = this.getParts(obj, obj.ask);

    this.epoch = obj.epoch;
    this.strEpoch = (new Date(this.epoch)).toLocaleTimeString();
}

Symbol.prototype.Update = function (obj) {
    this.UpdateInfo(obj);
}




class LiveQuotesStore {

    constructor() {
        this.mayors = ["EURUSD", "GBPUSD", "USDJPY", "USDCHF", "GBPCHF", "NZDUSD", "USDCAD", "GBPJPY", "EURNZD", "EURJPY", "EURCHF", "AUDCAD", "AUDJPY", "CADJPY"]

        this.symbolNames = [];
        this.symbols = [];
        this.symbolDict = {};

        this.pusher = new Pusher();

        this.subscription = null;
        this.consumers = [];
    }

    get Mayors() {
        return this.mayors;
    }

    get Symbols() {
        return this.symbols;
    }

  
    getSnapshot(onItemUpdate) {
        var that = this;
        return new Promise((resolve, reject) => {

            if (onItemUpdate != null)
                this.consumers.push({ onItemUpdate: onItemUpdate })

            if (this.subscription == null) {
                this.subscription = new Subscription(this.symbolNames);

                this.subscription.addListener({
                    onItemUpdate: function (row) {
                        that.OnItemUpdate(row); // prepare row for state
                        //onItemUpdate(that.symbolDict[row.symbolId]);
                        // TODO do not call before onEndOfSnapshot, for LiveQuotesGrid only
                        const symbol = that.symbolDict[row.symbolId];
                        that.consumers.forEach(consumer => consumer.onItemUpdate(symbol));
                        symbol.symbolConsumers.forEach(consumer => consumer.onItemUpdate({
                            bidParts: { ...symbol.bidParts },
                            bidUp: symbol.bidUp,
                            askParts: { ...symbol.askParts },
                            askUp: symbol.askUp,
                            epoch: symbol.epoch,
                            strEpoch: symbol.strEpoch
                        }));
                        symbol.chartSymbolConsumers.forEach(consumer => consumer.onItemUpdate({
                            epoch: symbol.epoch,
                            bid: symbol.bid,
                            ask: symbol.ask
                        }));
                    },
                    onEndOfSnapshot: function () {
                        console.log("first LiveQuotesStore.OnEndOfSnapshot()" + that.symbols.length)
                        console.log(Object.entries(that.symbolDict))

                        resolve(that.symbols.map(symbol => {
                            return {
                                symbolId: symbol.symbolId,
                                name: symbol.name,
                                group: symbol.group,
                                bidParts: { ...symbol.bidParts },
                                bidUp: symbol.bidUp,
                                askParts: { ...symbol.askParts },
                                askUp: symbol.askUp,
                                epoch: symbol.epoch,
                                strEpoch: symbol.strEpoch
                            }
                        }));
                    }
                });

                this.pusher.subscribe(this.subscription);
            }
            else {
                console.log("non first LiveQuotesStore.OnEndOfSnapshot() called for other subscribers " + that.symbols.length)
                resolve(that.symbols);
            }
        })
    }


    subscribeToSymbol(symbolId, onItemUpdate) {
        var symbol = this.symbolDict[symbolId];
        if (symbol === undefined)
            console.log("this.symbolDict[" + symbolId + "] not found. ")
        else
            symbol.symbolConsumers.push({ onItemUpdate: onItemUpdate })
    }

    subscribeToChartSymbol(symbolId, onItemUpdate) {
        var symbol = this.symbolDict[symbolId];
        if (symbol === undefined)
            console.log("this.symbolDict[" + symbolId + "] not found. ")
        else
            symbol.chartSymbolConsumers.push({ onItemUpdate: onItemUpdate })
    }


    OnAdd(data) {
        const symbol = new Symbol(data); 
        this.symbols.push(symbol);
        this.symbolDict[symbol.symbolId] = symbol;
    }

    getSymbol(symbolId) {
        var symbol = this.symbols.find(function (element) {
            return element.symbolId === symbolId;
        });

        if (!symbol)
            alert("Not found symbol(" + symbolId + ") in:" + this.symbols.map(sym => sym.symbolId));
        return symbol;
    }


    OnItemUpdate(obj) {
        var command = obj.command;
        //logIt("STOCK_QUOTES command/key/symbol:" + command + "/" + key + "/" + symbol);
        if (command === "UPDATE") {
            //logIt("UPDATE " + pSymbolGroup.GroupName + " / " +  symbol)

            //var symbolId = obj.symbol;
            var symbol = this.symbolDict[obj.symbolId];
            if (!symbol)   // TODO novi simbol moze samo kroz Add
                symbol = this.symbolDict[obj.symbolId] = this.getSymbol(obj.symbolId);

            //if (!symbol)   // allow updating of the InitialView while rendering rest of rows
            //    return;
            symbol.Update(obj);

            //if (obj.symbol === 'EURUSD')
            //    UpdateTick(obj.epoch, obj.bid, obj.ask);
        }
        else if (command === "ADD") {
            this.OnAdd(obj)
        }
        else if (command === "DELETE") {
            //OnDelete(symbolId)
        }
    };

}

/*
function createStore(reducer) {
    var state;
    var listeners = []

    function getState() {
        return state
    }
    
    function subscribe(listener) {
        listeners.push(listener)
        return function unsubscribe() {
            var index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }
    
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }

    dispatch({})

    return { dispatch, subscribe, getState }
}
*/


export let liveQuotesStore = new LiveQuotesStore();