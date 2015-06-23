var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.StartQueryBuilderView = Backbone.View.extend({
    el: "#developer-playground",

    template: _.template($('#playground-template').html()),


    events: {
        'change .form-control#entity': 'selectEntity',
        'change .form-control#parameter': 'changeFilter',
        'click .btn#san-francisco': 'changeMapSF',
        'click .btn#new-york': 'changeMapNY',
        'click .btn#run-query-btn' : 'submit'

    },

    initialize: function () {
        this.operators = new DeveloperPlayground.Operators();
        this.stops = new DeveloperPlayground.Stops();
        this.routes = new DeveloperPlayground.Routes();
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        $("#nameMenu").hide();
        $(".btn#new-york").hide();
        $(".btn#san-francisco").hide();


        if($("#nameMenu").hasClass("dropdown")) $("#nameMenu").removeClass("dropdown");
        this.mapview = new DeveloperPlayground.MapView();
        this.mapview.render();
        this.downloadview = new DeveloperPlayground.DownloadView();
        this.downloadview.render();
        return this;
    },

    setMapSF: function(){
        if($(".btn#new-york").hasClass("selected")) $(".btn#new-york").removeClass("selected");
        $(".btn#san-francisco").addClass("selected");
        this.mapview.setMapviewSF();
    },

    changeMapSF: function(){
        if($(".btn#new-york").hasClass("selected")) $(".btn#new-york").removeClass("selected");
        $(".btn#san-francisco").addClass("selected");
        this.mapview.setMapviewSF();
        // analytics event tracking:
        ga('send', 'event', 'location toggle', 'click', 'SF');
    },

    changeMapNY: function(){
        if($(".btn#san-francisco").hasClass("selected")) $(".btn#san-francisco").removeClass("selected");
        $(".btn#new-york").addClass("selected");
        this.mapview.setMapviewNY();
        // analytics event tracking:
        ga('send', 'event', 'location toggle', 'click', 'NY');
    },

    getSelectedEntity: function() {
        return $('select.form-control#entity').val();
    },

    selectEntity: function() {
        // set route
        DeveloperPlayground.router.navigate(this.getSelectedEntity(), {trigger: true});
        // remove this and have it go through a router
        this.changeParam();

    },


    changeParam: function() {

        $("#nameMenu").hide();
        $(".btn#new-york").hide();
        $(".btn#san-francisco").hide();

        if($("#nameMenu").hasClass("dropdown")) $("#nameMenu").removeClass("dropdown");

        var $entitySelect = $('select.form-control#entity');
        var $parameterSelect = $('select.form-control#parameter');
        var selectValues = {
            "base": {
                " ": "",
            },
            "stops": {
                " ": "",
                "map view": "",
                "operator": "",
            },
            "operators": {
                " ": "",
                "map view": "",
                "name": "",
                // "mode": "",
            },
            "routes": {
                " ": "",
                "map view": "",
                "operator": "",
                // "route number": "",
            }
        };

        $parameterSelect.empty().append(function() {
            var output = '';
            $.each(selectValues[$entitySelect.val()], function(key, value) {
                output += '<option>' + key + '</option>';
            });
            return output;
        });

        return this;
    },
    
    changeFilter: function() {
        var $parameterSelect = $('select.form-control#parameter');

        if($parameterSelect.val() == "name" || $parameterSelect.val() == "operator") {
            collection = this.operators;
            $("#nameMenu").show();
            $(".btn#new-york").hide();
            $(".btn#san-francisco").hide();

            if(!$("#nameMenu").hasClass("dropdown")) $("#nameMenu").addClass("dropdown");
            if ('undefined' !== typeof this.nameListView) {
                this.nameListView.close();
                this.nameListView = new DeveloperPlayground.NameListView({collection: collection});
            } else {
                this.nameListView = new DeveloperPlayground.NameListView({collection: collection});
            }
            this.operators.setQueryParameters({
                    url: API_HOST+'/api/v1/operators.json?per_page=5000'
                });
            collection.fetch();
            return this;

        } else {
            $("#nameMenu").hide();
            this.setMapSF();
            $(".btn#new-york").show();
            $(".btn#san-francisco").show();

            if($("#nameMenu").hasClass("dropdown")) $("#nameMenu").removeClass("dropdown");

        }
    },

    submit: function() {
        var $entitySelect = $('select.form-control#entity');
        var $parameterSelect = $('select.form-control#parameter');
        var $nameSelect = $('select.form-control#name');
        var bounds = this.mapview.getBounds();
        var identifier = $nameSelect.val();

        var shouldFetchAndResetCollection = true;

        // FOR STOP QUERIES

        if ($entitySelect.val() == "stops") {
            // for search by map view
            if($parameterSelect.val() == "map view") {
                collection = this.stops;
                this.stops.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?bbox='+bounds+'&per_page=5000'
                });
            // for search by operator name
            } else if($parameterSelect.val() == "operator") {
                collection = this.stops;
                this.stops.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?servedBy='+identifier+'&per_page=5000',
                });
            }
        
        // FOR OPERATOR QUERIES
        
        } else if ($entitySelect.val() == "operators") {
            
            if($parameterSelect.val() == "map view") {
                collection = this.operators;
                this.operators.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?bbox='+bounds+'&per_page=5000'
                });
            } else if($parameterSelect.val() == "name") {
                this.operators.hideAll();
                this.operators.get(identifier).set({ display: true });
                shouldFetchAndResetCollection = false;
            } else {
                alert("Please select either map view or name.");
            }
            
        //  FOR ROUTE QUERIES
        
        } else if ($entitySelect.val() == "routes") {
            if($parameterSelect.val() == "map view") {
                collection = this.routes;
                this.routes.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?bbox='+bounds+'&per_page=5000'
                });
            } else if($parameterSelect.val() == "operator") {
                collection = this.routes;
                this.routes.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?operatedBy='+identifier+'&per_page=5000',
                });
            } else if($parameterSelect.val() == "route number") {
                collection = this.routes;
                alert("routes by route number not yet functional");
            }
        } else {
            alert("Please select a parameter.");
        }

        if (shouldFetchAndResetCollection) {
            collection.reset();
        }

        // things like this (that touch on multiple views) should go in the router
        $("#download-bar").show();
        this.mapview.markerclustergroup.clearLayers();
        this.mapview.clearCollection();
        this.mapview.setCollection({collection: collection});
        this.mapview.initialize({collection: collection});
        this.downloadview.setCollection({collection: collection});


        if ('undefined' !== typeof this.gridview) this.gridview.close();
        this.gridview = new DeveloperPlayground.GridView({collection: collection});

        if (shouldFetchAndResetCollection) {
            collection.fetch();
        }

        // analytics event tracker:
        if ($parameterSelect.val() == "name" || $parameterSelect.val() == "operator"){
            ga('send', 'event', 'run query', 'click', $entitySelect.val()+' by '+$parameterSelect.val()+', '+$nameSelect.val());
        } else {
            ga('send', 'event', 'run query', 'click', $entitySelect.val()+' by '+$parameterSelect.val());
        }
    },
});