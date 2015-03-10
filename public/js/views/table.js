var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.TableView = Backbone.View.extend({
    el: 'table#table-view',

    initialize:function(options){
        this.collection = options.collection;
        // $("tbody", this.$el).empty(this.$el);
        this.listenTo(this.collection, 'add', this.renderRow);
        // this.listenTo(this.collection, 'change', this.close);
        // new:
        // this.listenTo(this.collection, 'remove', this.clearRows);
        // 
        // this.render();
    },

    renderRow: function(model) {
        var rowView = new DeveloperPlayground.RowView({
            model: model
        });
        $("tbody", this.$el).append(rowView.render().$el);
    },

    // if (this.tableview) {
        //     this.tableview.close();
        //     this.tableview = new DeveloperPlayground.TableView({collection: collection});
        //     this.tableview.initialize({collection: collection});
        // } else {
        //     // console.log("initialize tableview");
        //     // console.log(this.tableview.collection);
        //     this.tableview = new DeveloperPlayground.TableView({collection: collection});
        //     this.tableview.initialize({collection: collection});
        // }


    // onClose: function(){
    //     this.collection.unbind("change", this.render);
    // }

    // clearRows: function() {
    //     console.log("clear rows here");
    //     $this.$el.empty();

    // },

    close: function() {
      $('thead, tbody', this.$el).empty(); //.off();  off to unbind the events 
      this.stopListening();
      return this;
    }

});

