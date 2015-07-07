var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.EntityListView = Backbone.View.extend({
	el: '.form-control#entity',

    template: _.template( $('#entity-list-template').html() ),

    events: {
        'click #entityMenu' : 'confirmView'
    },

    routes: {

        // specify route for this view?
        // ":entity": "entitySelected",
    },

	initialize:function(){
        // this.collection = options.collection;
        // this.listenTo(this.collection, 'add', this.renderName);
        // this.collection.each(this.renderName, this);
    },

    render: function() {

        this.$el.html(this.template());

    },

    confirmView: function(){
        console.log("EntityListView rendered");
    }

    

});