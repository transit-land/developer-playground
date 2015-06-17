var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.GridView = Backbone.View.extend({
    el: '.backgrid-container',

    initialize:function(options){
        this.collection = options.collection;
        this.listenTo(this.collection, 'sync', this.render);
        if (this.collection.length > 0) {
            this.render();
        }
    },

    render: function(model){
        var columns;
        var row;
        var grid;
        var $entitySelect = $('select.form-control#entity');


        if ($entitySelect.val() == "operators"){

            columns = [{
                name: "id",
                label: "ID",
                renderable: false,
                editable: false,
                cell: Backgrid.IntegerCell.extend({
                  orderSeparator: ''
                })
              }, {
                name: "name",
                label: "Operator name",
                editable: false,
                cell: "string"
              }, {
                name: "tags.agency_url",
                label: "Operator website",
                editable: false,
                cell: "uri"
              }, {
                name: "onestop_id",
                label: "Onestop ID",
                editable: false,
                cell: "string"
            }];

            row = Backgrid.Row.extend({
                className: function() {
                    console.log("className called");
                    if (this.model.get('display') === false) {
                        console.log("display = false");
                        return "hide";
                    }
                }

            });

            grid = new Backgrid.Grid({
            columns: columns,
            row: row,
            collection: this.collection
            });
            $("#results").append(grid.render().$el);
        } else if ($entitySelect.val() == "stops"){
            columns = [{
                name: "id",
                label: "ID",
                renderable: false,
                editable: false,
                cell: Backgrid.IntegerCell.extend({
                  orderSeparator: ''
                })
              }, {
                name: "name",
                label: "Stop name",
                editable: false,
                cell: "string"
              }, {
                name: "operatorNames",
                label: "Operators serving stop",
                editable: false,
                cell: "string"
              }, {
                name: "onestop_id",
                label: "Onestop ID",
                editable: false,
                cell: "string"
            }];

            grid = new Backgrid.Grid({
            columns: columns,
            collection: this.collection
            });
            $("#results").append(grid.render().$el);
        } else if ($entitySelect.val() == "routes"){
            columns = [{
                name: "id",
                label: "ID",
                renderable: false,
                editable: false,
                cell: Backgrid.IntegerCell.extend({
                  orderSeparator: ''
                })
              }, {
                name: "tags.route_short_name",
                label: "Route short name",
                editable: false,
                cell: "string"
              }, {
                name: "tags.route_long_name",
                label: "Route long name",
                editable: false,
                cell: "string"
              }, {
                name: "operated_by_name",
                label: "Operator",
                editable: false,
                cell: "string"
              }, {
                name: "onestop_id",
                label: "Onestop ID",
                editable: false,
                cell: "string"
            }];
            grid = new Backgrid.Grid({
            columns: columns,
            collection: this.collection
            });
            $("#results").append(grid.render().$el);
        }
    },

    close: function() {
        $(this.$el).empty();
        this.stopListening();
        return this;
    }

});

