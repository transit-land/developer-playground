var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.DownloadView = Backbone.View.extend({
	el: '#download-bar',
	
	template: _.template( $('#download-bar-template').html() ),

	events: {
        'click .btn' : 'submit',
    },

	render: function() {
		renderedHtml = this.template();
		this.$el.html(renderedHtml); 
		return this;
		},

	setCollection: function(options){
        this.collection = options.collection;
    },

	submit: function(event) {
		url = this.collection.url;
        
		if (event.target.id == "csv") {
			url = url.replace(".json", ".csv");
		} else if (event.target.id == "json") {
			var blob = new Blob([JSON.stringify(this.collection.toJSON())], {type: "application/json;charset=utf-8"});
			saveAs(blob, "download.json");
		}

		window.open(url, '_blank');

	}


 });
