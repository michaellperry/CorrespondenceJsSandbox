function CardText(value) {
    this.value = value;
};

function Card() {
    this.text = function (textAdapter) {
        textAdapter.added(new CardText("Move the thing"));
    };
};

function Column() {
    this.cards = function (cardAdapter) {
        cardAdapter.added(new Card());
    };
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
        return {

        };
    };

    this.newCardColumn = function (card, column, prior) {
        return {

        };
    };
}