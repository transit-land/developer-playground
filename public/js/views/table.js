var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.TableView = Backbone.View.extend({
    el: 'table#table-view',

    // template: _.template($('#table-template').html(), {stops: stops.models}),
     
    initialize:function(options){
        this.collection = options.collection;
        // this.render();
        console.log("tableview initialized");
        this.listenTo(this.collection, 'add', this.renderRow);
    },

    render: function () {
        // var template = _.template($('#stop-list-template').html(), {stops: stops.models});
        // this.$el.html(template);
        this.collection.each(this.renderRow);
        return this;
    },

     renderRow: function(model) {
    	var rowView = new DeveloperPlayground.RowView({model: model});
    	$("tbody", this.$el).append(rowView.render().$el);
     },

    // add_stop: function(stop) {
    //     // add a stop to the table
    //     var s = {
    //         'type': 'Feature',
    //         'longitude':stop.attributes.geometry.coordinates[0],
    //         'latitude':stop.attributes.geometry.coordinates[1]
    //     };
    //     console.log("add_stop: "+s);

        // append row to table here, not in row.js

        // s.addTo(this.table);
    // }

});

// var tableview = new TableView();