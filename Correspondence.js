function CardText(value) {
    this.value = value;
};

function Card() {
    this.text = function (textAdapter) {
        textAdapter.added(new CardText("Move the thing"));
    };
};

function Column() {
    this._columnAdapters = [];

    this.cards = function (cardAdapter) {
        this._columnAdapters.push(cardAdapter);
        cardAdapter.added(new Card());
    };
};

function CardColumn(card, column, prior) {
    
};

function ProjectName(value) {
    this.value = value;
};

function Project() {
    this.name = function (nameAdapter) {
        nameAdapter.added(new ProjectName("My Project"));
    };

    this.columns = function (columnAdapter) {
        columnAdapter.added(new Column());
    };
};

function Individual() {
    this.projects = function (projectAdapter) {
        projectAdapter.added(new Project());
    };
};

function Community(url) {
    this.load = function (memento) {
        return new Individual();
    };

    this.newCard = function (project, created) {
        return new Card();
    };

    this.newCardColumn = function (card, column, prior) {
        for (index in column._columnAdapters) {
            var columnAdapter = column._columnAdapters[index];
            columnAdapter.added(card);
        }
        return new CardColumn(card, column, prior);
    };
}