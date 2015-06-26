var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.Router = Backbone.Router.extend({
	

	routes: {

		// /stops, /operators, /routes
		":entity": "entitySelected",
		// /stops/map, /operators/map, /routes/map
		":entity/map": "entityMap",
		// /stops/name, /operators/name, /routes/name
		":entity/name": "TODO",
		// /routes/name/o-9q9-bart
		":entity/name/:operator": "TODO",
		// TODO: check leaflet bbox output format
		// /routes/map/(bbox number)
		":entity/map/:bbox": "TODO",
		// TODO: add default route
		"*path": "default"

	},

	entitySelected: function(entity){
		// if entity == "routes"
		// add else function for no entity selected
		console.log(entity);
	},

	entityMap: function(entity){
		console.log(entity);
	},

	default: function(path){
	console.log("default");

	}


});
