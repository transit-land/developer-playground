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
		":entity/:name/:operator": "operatorSelected",
		// /operators/map/-122.49112129211424,37.732032162727855,-122.39481925964355,37.76596533600783
		":entity/:map/:bbox": "bboxSet",
		// TODO: add default route
		"*path": "default"

	},

	entitySelected: function(entity){
		if (entity == "routes" || entity == "operators" || entity == "stops") {
			console.log("if: " + entity);
		} else {
		// add else function for no entity selected
			console.log("else: " + entity);
		}
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

	bboxSet: function(entity, map, bbox){
		console.log(entity, map, bbox);
	},

	default: function(path){
		console.log("default");
	}


});
