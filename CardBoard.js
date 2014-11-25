function load(individualMemento) {
    var community = new Community("api/community");
    var individual = community.load(individualMemento);

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
            column.cardListView.append("<ul>");
            var newCardButton = $("<input type='button' value='New Card'>");
            column.cardListView.append(newCardButton);
            newCardButton.click(function () {
                var card = community.newCard(project, new Date());
                community.newCardColumn(card, column, []);
            });

            column.cards(new cardAdapter(column));
        };

        this.removed = function (column) {
            removeCardList(column.cardListView);
            // Callbacks are automatically detatched.
        };
    };

    individual.projects({
        added: function (project) {
            project.projectListView = $("#projects").append("<li>");

            project.name({
                set: function (name) {
                    project.projectListView.text(name);
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
