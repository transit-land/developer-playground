var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.LocationListView = Backbone.View.extend({
	el: '.btn-group#locationMenu',

	initialize:function(options){
       
    },

    renderName: function(model) {
        var locationView = new DeveloperPlayground.LocationView({
            model: model
        });
        $(".form-control#location", this.$el).append(locationView.render().$el);
    },

    selectName: function(model) {
		this.$el.val();
		return this;
    },

    close: function() {
        $('.form-control#location', this.$el).empty();
        this.stopListening();
        return this;
    }

});