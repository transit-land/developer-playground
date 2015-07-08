var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.LocationListView = Backbone.View.extend({
    el: '.center-text#toggle-location',
    template: _.template( $('#location-template').html() ),



	initialize:function(options){
        console.log("location initialized");
            this.render();
    },

    render: function(options){
        renderedHtml = this.template();
        this.$el.html(renderedHtml);
        console.log("location render executed");
    },

    close: function() {
        $(this.$el).empty();
        this.stopListening();
        console.log("location close executed");
        return this;
    }

});