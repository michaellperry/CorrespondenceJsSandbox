function CardText(card, value, prior) {
    this.value = value;
};

function CardColumn(card, column, prior) {
    
};

function Card(project, created) {
    this._textAdapters = [];
};

Card.prototype.text = function (textAdapter) {
    this._textAdapters.push(textAdapter);
};

function ColumnName(column, value, prior) {
    this.value = value;
};

function ColumnOrdinal(column, value, prior) {
    this.value = value;
};

function Column(project) {
    this._cardAdapters = [];
};

Column.prototype.cards = function (cardAdapter) {
    this._cardAdapters.push(cardAdapter);
};

function Member(individual, project) {
    
};

function ProjectName(project, value, prior) {
    this.value = value;
};

function Project(created) {
    this._nameAdapters = [];
    this._columnAdapters = [];
};

Project.prototype.name = function (nameAdapter) {
    this._nameAdapters.push(nameAdapter);
};

Project.prototype.columns = function (columnAdapter) {
    this._columnAdapters.push(columnAdapter);
};

function Individual() {
    this._projectAdapters = [];
};

Individual.prototype.projects = function (projectAdapter) {
    this._projectAdapters.push(projectAdapter);
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
    for (index in project._nameAdapters) {
        var nameAdapter = project._nameAdapters[index];
        nameAdapter.added(projectName);
    }
    return projectName;
};

Community.prototype.newMember = function (individual, project) {
    for (index in individual._projectAdapters) {
        var projectAdapter = individual._projectAdapters[index];
        projectAdapter.added(project);
    }
    return new Member(individual, project);
};

Community.prototype.newColumn = function (project) {
    var column = new Column(project);
    for (index in project._columnAdapters) {
        var columnAdapter = project._columnAdapters[index];
        columnAdapter.added(column);
    }
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
    for (index in column._cardAdapters) {
        var cardAdapter = column._cardAdapters[index];
        cardAdapter.added(card);
    }
    return new CardColumn(card, column, prior);
};

Community.prototype.newCardText = function (card, value, prior) {
    var cardText = new CardText(card, value, prior);
    for (index in card._textAdapters) {
        var textAdapter = card._textAdapters[index];
        textAdapter.added(cardText);
    }
    return cardText;
};
