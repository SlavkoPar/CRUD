
export class Subscription {

    constructor(items = []) {
        this.items = [];
    }

    onSubscription() { }
    onEndOfSnapshot() { }
    onItemUpdate() { }


    init = function (itemList) {
        this.items = itemList;
    }

    addListener(config) {
        this.onSubscription = config.onSubscription;
        this.onEndOfSnapshot = config.onEndOfSnapshot;
        this.onItemUpdate = config.onItemUpdate;
    }
};