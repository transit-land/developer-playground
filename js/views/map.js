var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.MapView = Backbone.View.extend({
    el: '#map-view',

    events: {
        'click #map-view' : 'getBounds'
    },

    setCollection: function(options){
        this.collection = options.collection;
        this.listenTo(this.collection, 'add', this.addFeature);
        this.listenTo(this.collection, 'sync', this.addFeatureGroup);
        this.emptydata = true;
        this.collection.each(this.addFeature, this);
        if (this.collection.length > 0) {
            this.addFeatureGroup();
        }
    },

    clearCollection: function() {
        this.stopListening();
    },
    
    render: function() {
        this.markerclustergroup = new L.MarkerClusterGroup({showCoverageOnHover: false});
        
        this.map = L.map('map-view',{
            scrollWheelZoom: false
        }).setView([37.749, -122.443], 15);
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/randyme.li1lhlf0/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        })
        .addTo(this.map);
        return this;
    },

    getBounds: function() {
        this.bounds=this.map.getBounds();
        this.bBoxString=this.bounds.toBBoxString();
        return this.bBoxString;
        
    },

    changeLocation: function() {
        // move map to NY or SF
        console.log("change location");
    },

    addFeature: function(feature) {
        this.collection = feature.collection;
        if (feature.get('display') !== false) {
            var s = {};

            if (feature.attributes.name == feature.attributes.tags.route_long_name || feature.attributes.tags.route_long_name === undefined){
                s = {
                'type': 'Feature',
                'name': feature.attributes.name,
                'longName': "",
                'geometry':feature.attributes.geometry,
                };
            } else {
                s = {
                    'type': 'Feature',
                    'name': feature.attributes.name,
                    'longName': feature.attributes.tags.route_long_name,
                    'geometry':feature.attributes.geometry,
                };
            }
            L.geoJson(s, {
                onEachFeature: this.onEachFeature,
                style: this.styleEachFeature
            })
            .addTo(this.markerclustergroup);
        }
        this.emptydata = false;
        return this;
    },

    styleEachFeature: function(feature) {
        var color;
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        color= "rgb("+r+" ,"+g+","+ b+")";

        var operatorStyle = {
            color: color,
            fillColor: color,
            weight: 3,
            opacity: .6,
            fillOpacity: .3
            // className: 'blah'
        };

        var routeStyle = {
            color: color,
            // color: "#"+feature.attributes.tags.route_color,
            weight: 4,
            opacity: .3
            // className: 'blah'
        };

        var geom_type = feature.geometry.type.toLowerCase();
       
        if ( geom_type === 'polygon') {
            return operatorStyle;
        } else if (geom_type == 'point') {
            return {};
        } else if (geom_type.indexOf('line') !== -1) {
            return routeStyle;
        }
        return {};
    },

    onEachFeature: function(feature, layer) {
        
        function highlightFeature(e) {
            var layer = e.target;
            layer.setStyle({
                opacity: 1,
            });
            layer.bringToFront();
        }
        function resetFeatureStyle(e) {
            var layer = e.target;
            layer.setStyle({
                opacity: .3
            });
        }

        var stopIcon = L.icon({
            iconUrl: "/images/dot2a.png",
            iconSize:     [15, 15], // size of the icon
            iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
            popupAnchor:  [5, 5] // point from which the popup should open relative to the iconAnchor
        });

        var geom_type = feature.geometry.type.toLowerCase();
        if (geom_type == 'point') {
            layer.setIcon(stopIcon);
        }

        layer.on({
            popupopen: highlightFeature,
            popupclose: resetFeatureStyle
        });
        layer.bindPopup(feature.name + " " + feature.longName);
    },

    addFeatureGroup: function(feature) {
        var $entitySelect = $('select.form-control#entity');
        var $parameterSelect = $('select.form-control#parameter');
        if (!this.map.hasLayer(this.markerclustergroup)) {
            this.markerclustergroup.addTo(this.map);
        }
        if(!this.emptydata){
            if ($entitySelect.val() == "routes") {
                if ($parameterSelect.val() !== "map view"){
                    this.map.fitBounds(this.markerclustergroup.getBounds());
                }
            }else{
                   this.map.fitBounds(this.markerclustergroup.getBounds());
            }
        }else{
            if($(".no-result").hasClass("hide")){
                $(".no-result").removeClass("hide");
            }
        }
    }
    
});



