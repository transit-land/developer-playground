var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.ParameterListView = Backbone.View.extend({
	el: '.form-control#parameter',

    template: _.template( $('#parameter-list-template').html() ),

    events: {
        'click #parameter' : 'confirmView'
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
        console.log("ParameterListView rendered");
    }

    

});