function CardText(card, value, prior) {
    this.value = value;
};

function CardColumn(card, column, prior) {
    
};

function Card(project, created) {
    this._textAdapters = [];

    this.text = function (textAdapter) {
        this._textAdapters.push(textAdapter);
    };
};

function ColumnName(column, value, prior) {
    this.value = value;
};

function ColumnOrdinal(column, value, prior) {
    this.value = value;
};

function Column(project) {
    this._cardAdapters = [];

    this.cards = function (cardAdapter) {
        this._cardAdapters.push(cardAdapter);
    };
};

function Member(individual, project) {
    
};

function ProjectName(project, value, prior) {
    this.value = value;
};

function Project(created) {
    this._nameAdapters = [];
    this._columnAdapters = [];

    this.name = function (nameAdapter) {
        this._nameAdapters.push(nameAdapter);
    };

    this.columns = function (columnAdapter) {
        this._columnAdapters.push(columnAdapter);
    };
};

function Individual() {
    this._projectAdapters = [];

    this.projects = function (projectAdapter) {
        this._projectAdapters.push(projectAdapter);
    };
};

function Community(url) {
    this.load = function (memento) {
        var individual = this.newIndividual();
        return individual;
    };

    this.newIndividual = function () {
        return new Individual();
    };

    this.newProject = function (created) {
        return new Project(created);
    };

    this.newProjectName = function (project, value, prior) {
        var projectName = new ProjectName(project, value, prior);
        for (index in project._nameAdapters) {
            var nameAdapter = project._nameAdapters[index];
            nameAdapter.added(projectName);
        }
        return projectName;
    };

    this.newMember = function (individual, project) {
        for (index in individual._projectAdapters) {
            var projectAdapter = individual._projectAdapters[index];
            projectAdapter.added(project);
        }
        return new Member(individual, project);
    };

    this.newColumn = function (project) {
        var column = new Column(project);
        for (index in project._columnAdapters) {
            var columnAdapter = project._columnAdapters[index];
            columnAdapter.added(column);
        }
        return column;
    };

    this.newColumnName = function (column, value, prior) {
        return new ColumnName(column, value, prior);
    };

    this.newColumnOrdinal = function (column, value, prior) {
        return new ColumnOrdinal(column, value, prior);
    };

    this.newCard = function (project, created) {
        return new Card();
    };

    this.newCardColumn = function (card, column, prior) {
        for (index in column._cardAdapters) {
            var cardAdapter = column._cardAdapters[index];
            cardAdapter.added(card);
        }
        return new CardColumn(card, column, prior);
    };

    this.newCardText = function (card, value, prior) {
        var cardText = new CardText(card, value, prior);
        for (index in card._textAdapters) {
            var textAdapter = card._textAdapters[index];
            textAdapter.added(cardText);
        }
        return cardText;
    };
}