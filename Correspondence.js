function Community(url) {
    this.load = function (memento) {
        return {
            projects: function (projectAdapter) {
                projectAdapter.added({
                    name: function (nameAdapter) {
                        nameAdapter.set("My Project");
                    },

                    columns: function (columnAdapter) {
                        columnAdapter.added({
                            cards: function (cardAdapter) {
                                cardAdapter.added({
                                    text: function (textAdapter) {
                                        textAdapter.set("Move the thing");
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };
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