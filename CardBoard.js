function load(individualMemento) {
    var community = new Community("api/community");
    var individual = community.load(individualMemento);

    function cardAdapter(column) {
        this.added = function (card) {
            // Add a <div> to the column <div>
            card.view = addCardDiv(card, column.cardListView);

            card.text({
                set: function (text) {
                    setCardText(card.view, text);
                }
            });
        };

        this.removed = function (card) {
            removeCardDiv(card.view, column.cardListView);
        };
    };

    function columnAdapter(project) {
        this.added = function (column) {
            // Add a <div> to the #board <div>
            column.cardListView = addCardList(column);

            // Respond to button click to add a new card.
            column.newCard = function () {
                var card = community.newCard(project, new Date());
                community.newCardColumn(card, column, []);
            };

            column.cards(new cardAdapter(column));
        };

        this.removed = function (column) {
            removeCardList(column.cardListView);
            // Callbacks are automatically detatched.
        };
    };

    individual.projects({
        added: function (project) {
            // Add a <li> to the #projects <ul>
            project.projectListView = addProjectLi(project);

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
