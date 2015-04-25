var DeveloperPlayground = DeveloperPlayground || {};

DeveloperPlayground.StartQueryBuilderView = Backbone.View.extend({
    el: "#developer-playground",

    template: _.template($('#playground-template').html()),


    events: {
        'change .form-control#entity': 'changeParam',
        'change .form-control#parameter': 'changeFilter',
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
        $(".form-control#name").hide();
        if($("#nameMenu").hasClass("dropdown")) $("#nameMenu").removeClass("dropdown");
        this.mapview = new DeveloperPlayground.MapView();
        this.mapview.render();
        this.downloadview = new DeveloperPlayground.DownloadView();
        this.downloadview.render();
        return this;
    },

    changeParam: function() {

        $(".form-control#name").hide();
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
            $("#locationMenu").hide();
            $(".form-control#name").show();

            if(!$("#nameMenu").hasClass("dropdown")) $("#nameMenu").addClass("dropdown");
            if ('undefined' !== typeof this.nameListView) {
                this.nameListView.close();
                this.nameListView = new DeveloperPlayground.NameListView({collection: collection});
            } else {
                this.nameListView = new DeveloperPlayground.NameListView({collection: collection});
            }
            this.operators.setQueryParameters({
                    url: API_HOST+'/api/v1/operators.json'
                });
            collection.fetch();
            return this;
        } else if($parameterSelect.val() == "map view") {
            $("#locationMenu").show();
            
            console.log("select map view");
            this.mapview.changeLocation();



        } else {
            $(".form-control#name").hide();
            $("#locationMenu").hide();
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
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?bbox='+bounds
                });
            // for search by operator name
            } else if($parameterSelect.val() == "operator") {
                collection = this.stops;
                this.stops.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?servedBy='+identifier,
                });
            }
        
        // FOR OPERATOR QUERIES
        
        } else if ($entitySelect.val() == "operators") {
            
            if($parameterSelect.val() == "map view") {
                collection = this.operators;
                this.operators.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?bbox='+bounds
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
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?bbox='+bounds
                });
            } else if($parameterSelect.val() == "operator") {
                collection = this.routes;
                this.routes.setQueryParameters({
                    url: API_HOST+'/api/v1/'+$entitySelect.val()+'.json?operatedBy='+identifier,
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

        this.mapview.markerclustergroup.clearLayers();
        this.mapview.clearCollection();
        this.mapview.setCollection({collection: collection});

        this.downloadview.setCollection({collection: collection});
        // this.downloadview.showTemplate();


        if ('undefined' !== typeof this.gridview) this.gridview.close();

        this.gridview = new DeveloperPlayground.GridView({collection: collection});

        if (shouldFetchAndResetCollection) {
            collection.fetch();
        }

    },
});