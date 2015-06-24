var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.Router = Backbone.Router.extend({
	

	routes: {

		// /stops, /operators, /routes
		":entity": "entitySelected",
		// /stops/map, /operators/map, /routes/map
		":entity/:parameter": "parameterSelected",
		// ":entity/map": "entityMap",
		// /stops/name, /operators/name, /routes/name
		":entity/name": "nameSelected",
		// /routes/name/o-9q9-bart
		":entity/name/:operator": "operatorSelected",
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

	parameterSelected: function(entity, parameter){
		console.log(entity, parameter);
	},

	nameSelected: function(entity, name){
		console.log("name selected");
	},

	operatorSelected: function(entity, name, operator){
		console.log(entity, name, operator);
	},

	default: function(path){
	console.log("default");
	}


});
