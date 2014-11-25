Correspondence JS Sandbox
=========================

An experiment to discover a good JavaScript API for a [Correspondence](http://correspondencecloud.com) application.

Correspondence is an occasionally-connected client framework that offers local storage and real-time updates. Pair this with a browser-based experience, and you would have a powerful collaborative application.

A Correspondence model is written in a language called [Factual](http://historicalmodeling.com/book/factual). It defines facts and queries. A query returns a set of related facts.

## Models

Define the model in Factual. The Correspondence compiler will generate a Model.js file representing that model as
JavaScript code. Use this generated model to write adapters and handlers.

## Adapters

In the Correspondence JS API, you define an adapter for a query. It has two functions: added and removed. The added function is called whenever a query result is added to the set, and removed function is called when it is removed. Implement these functions to update the page using whatever JavaScript framework you prefer: jQuery, Knockout, Angular, or Vanilla JS:

```javascript
function cardAdapter(column) {
    this.added = function (card) {
        var cardList = column.cardListView.children("ul");
        card.view = $("<li>");
        cardList.append(card.view);
    };

    this.removed = function (card) {
        removeCardDiv(card.view, column.cardListView);
    };
};
```

Pass this adapter to the query function for the fact, typically in the added function in which that fact was added:

```javascript
function columnAdapter(project) {
    this.added = function (column) {
        // Add the column to the view.

        column.cards(new cardAdapter(column));
    };
};
```

## Handlers

When the user takes an action, record the action as a new fact. Call the factory methods on the Community to create the
fact, queue it to be shared with the server, and persist it to local storage.

```javascript
newCardButton.click(function () {
    var card = community.newCard(project, new Date());
    community.newCardColumn(card, column, []);
    community.newCardText(card, "The other thing", []);
});
```

The related queries will fire as new facts are added, and as new facts cause results to be removed.

## Mementos

Kick the process off by loading a fact memento from your back end. This is typically done by your server-side code. Pass the
memento to the Community's load method to get the fact. The following example shows the memento of a fact embedded into a
Razor jQuery ready call.

```javascript
$(function () {
    var community = new Community("api/community");
    var individual = community.load(@Model.individualMemento);
});
```
