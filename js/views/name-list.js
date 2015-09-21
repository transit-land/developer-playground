var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.NameListView = Backbone.View.extend({
	el: '#nameMenu',
    nameListTemplate: _.template( $('#name-list-template').html() ),
    nameOptionTemplate: _.template( $('#name-option-template').html() ),

	initialize:function(options){
        this.render();

        this.collection = options.collection;
        this.listenTo(this.collection, 'add', this.renderName);
        this.collection.each(this.renderName, this);
    },

    render: function() {
        this.$el.html(this.nameListTemplate());
    },

    renderName: function(model) {
        this.$('select').append(this.nameOptionTemplate(model.toJSON()));
        console.log("renderName executed");
    },

    getName: function(model) {
		return this.$('select').val();
    },

    close: function() {
        this.$el.empty();
        this.stopListening();
        console.log("name-list close executed");
        return this;
    }

});