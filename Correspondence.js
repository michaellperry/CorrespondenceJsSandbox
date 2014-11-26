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

function CardText(card, value, prior) {
    this.value = value;
};

function CardColumn(card, column, prior) {
    
};

function Card(project, created) {
    this._text = new Results();
};

Card.prototype.text = function (textAdapter) {
    this._text.addAdapter(textAdapter);
};

function ColumnName(column, value, prior) {
    this.value = value;
};

function ColumnOrdinal(column, value, prior) {
    this.value = value;
};

function Column(project) {
    this._cards = new Results();
};

Column.prototype.cards = function (cardAdapter) {
    this._cards.addAdapter(cardAdapter);
};

function Member(individual, project) {
    
};

function ProjectName(project, value, prior) {
    this.value = value;
};

function Project(created) {
    this._name = new Results();
    this._columns = new Results();
};

Project.prototype.name = function (nameAdapter) {
    this._name.addAdapter(nameAdapter);
};

Project.prototype.columns = function (columnAdapter) {
    this._columns.addAdapter(columnAdapter);
};

function Individual() {
    this._projects = new Results();
};

Individual.prototype.projects = function (projectAdapter) {
    this._projects.addAdapter(projectAdapter);
};

function Community(url) {
};

Community.prototype.load = function (memento) {
    var individual = this.newIndividual();
    return individual;
};

Community.prototype.newIndividual = function () {
    return new Individual();
};

Community.prototype.newProject = function (created) {
    return new Project(created);
};

Community.prototype.newProjectName = function (project, value, prior) {
    var projectName = new ProjectName(project, value, prior);
    project._name.addFact(projectName);
    return projectName;
};

Community.prototype.newMember = function (individual, project) {
    individual._projects.addFact(project);
    return new Member(individual, project);
};

Community.prototype.newColumn = function (project) {
    var column = new Column(project);
    project._columns.addFact(column);
    return column;
};

Community.prototype.newColumnName = function (column, value, prior) {
    return new ColumnName(column, value, prior);
};

Community.prototype.newColumnOrdinal = function (column, value, prior) {
    return new ColumnOrdinal(column, value, prior);
};

Community.prototype.newCard = function (project, created) {
    return new Card();
};

Community.prototype.newCardColumn = function (card, column, prior) {
    column._cards.addFact(card);
    return new CardColumn(card, column, prior);
};

Community.prototype.newCardText = function (card, value, prior) {
    var cardText = new CardText(card, value, prior);
    card._text.addFact(cardText);
    return cardText;
};
