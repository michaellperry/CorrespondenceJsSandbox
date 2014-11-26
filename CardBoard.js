function load(individualMemento) {
    var community = new Community("api/community");
    var individual = community.load(individualMemento);

    var project = community.newProject(new Date());
    var member = community.newMember(individual, project);
    var projectName = community.newProjectName(project, "Start a war with Gilder", []);
    var column = community.newColumn(project);
    var columnName = community.newColumnName(column, "To Do", []);
    var columnOrdinal = community.newColumnOrdinal(column, 1, []);
    var card = community.newCard(project, new Date());
    var cardColumn = community.newCardColumn(card, column, []);
    var cardText = community.newCardText(card, "Move the thing", []);

    function cardAdapter(column) {
        this.added = function (card) {
            var cardList = column.cardListView.children("ul");
            card.view = $("<li>");
            cardList.append(card.view);

            card.text({
                added: function (candidate) {
                    card.view.text(candidate.value);
                }
            });
        };

        this.removed = function (card) {
            removeCardDiv(card.view, column.cardListView);
        };
    };

    function columnAdapter(project) {
        this.added = function (column) {
            column.cardListView = $("<div>");
            $("#board").append(column.cardListView);
            column.cardListView.append("<h3>");
            column.cardListView.append("<ul>");
            var newCardButton = $("<input type='button' value='New Card'>");
            column.cardListView.append(newCardButton);
            newCardButton.click(function () {
                var card = community.newCard(project, new Date());
                community.newCardColumn(card, column, []);
                community.newCardText(card, "The other thing", []);
            });

            column.cards(new cardAdapter(column));
            column.name({
                added: function (candidate) {
                    column.cardListView.children("h3").text(candidate.value);
                }
            });
        };

        this.removed = function (column) {
            removeCardList(column.cardListView);
            // Callbacks are automatically detatched.
        };
    };

    individual.projects({
        added: function (project) {
            project.projectListView = $("<li>");
            $("#projects").append(project.projectListView);

            project.name({
                added: function (candidate) {
                    project.projectListView.text(candidate.value);
                }
            });

            project.columns(new columnAdapter(project));
        },
        removed: function (project) {
            // Remove <li> from the #projects <ul>
            removeProjectLi(project.projectListView);
        }
    });
}
