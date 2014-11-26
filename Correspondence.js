function Results() {
    this._facts = [];
    this._adapters = [];
}

Results.prototype.addAdapter = function (adapter) {
    this._adapters.push(adapter);
    for (index = 0; index < this._facts.length; index++) {
        var fact = this._facts[index];
        adapter.added(fact);
    }
};

Results.prototype.addFact = function (fact) {
    this._facts.push(fact);
    for (index = 0; index < this._adapters.length; index++) {
        var adapter = this._adapters[index];
        adapter.added(fact);
    }
};

function Community(url) {
};
