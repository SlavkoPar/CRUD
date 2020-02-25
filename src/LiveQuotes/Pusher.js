
export class Pusher {

    constructor(height, width) {
        this.height = height;
        this.width = width;

        this.snapshotSymbols = [
            { name: "EURUSD", group: "mayor", decimals: 4, fractional: 1, bid: 1.17829, ask: 1.156, epoch: (new Date()).getTime() },
            { name: "GBPUSD", group: "", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "USDJPY", group: "mayor", decimals: 2, fractional: 0, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "USDCHF", group: "mayor", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "GBPCHF", group: "", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "NZDUSD", group: "", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "USDCAD", group: "", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "GBPJPY", group: "", decimals: 2, fractional: 0, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "EURNZD", group: "", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "EURJPY", group: "mayor", decimals: 2, fractional: 0, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "EURCHF", group: "mayor", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "AUDCAD", group: "", decimals: 4, fractional: 1, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "AUDJPY", group: "", decimals: 2, fractional: 0, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() },
            { name: "CADJPY", group: "", decimals: 2, fractional: 0, bid: 1.0, ask: 1.1, epoch: (new Date()).getTime() }
        ]

    }


    subscribe(s) {
        var subscription = s;
        // subscribe to server
        var n = 300;
        this.snapshotSymbols.forEach( sym => {
            //subscription.onItemUpdate($.extend(sym, { command: "ADD" }));
            //console.log({ ...sym, command: "ADD" });
            subscription.onItemUpdate({ ...sym, symbolId:sym.name, command: "ADD" });

            // set up the updating of the each second
            setInterval(function () {

                /*var mathRandom = */ Math.random();
                if (Math.random() > 0.5) {
                    sym.ask += 0.0132;
                    sym.bid += 0.0131;
                }
                else {
                    sym.ask -= 0.0161;
                    sym.bid -= 0.0173;
                }
                //var obj = $.extend({}, sym, { command: "UPDATE" })
                var obj = { ...sym, symbolId: sym.name, command: "UPDATE" };
                obj.epoch = (new Date()).getTime();

                subscription.onItemUpdate(obj);
            }, sym.name === 'EURUSD' ? 1500 : n);
            n += 50;
        });
        subscription.onEndOfSnapshot()
    }
};

