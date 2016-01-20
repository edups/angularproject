var app = angular.module('AGMap', ['google-maps']);
//var app = angular.module('AngularGoogleMap', ['uiGmapgoogle-maps']);

app.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 0,
                labelAnchor: "28 -5",
                labelClass: 'markerlabel'    
            },
            latitude: latitude,
            longitude: longitude,
            id: ++markerId          
        };
        return marker;        
    }

    function invokeSuccessCallback(successCallback, marker) {
        if (typeof successCallback === 'function') {
            successCallback(marker);
        }
    }

    function createByCoords(latitude, longitude, successCallback) {
        var marker = create(latitude, longitude);
        invokeSuccessCallback(successCallback, marker);
    }

    function createByAddress(address, successCallback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address' : address}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstAddress = results[0];
                var latitude = firstAddress.geometry.location.lat();
                var longitude = firstAddress.geometry.location.lng();
                var marker = create(latitude, longitude);
                invokeSuccessCallback(successCallback, marker);
            } else {
                alert("Dirección desconocida: " + address);
            }
        });
    }

    function createByCurrentLocation(successCallback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var marker = create(position.coords.latitude, position.coords.longitude);
                invokeSuccessCallback(successCallback, marker);
            });
        } else {
            alert('No se encuentra la posición actual');
        }
    }

    return {
        createByCoords: createByCoords,
        createByAddress: createByAddress,
        createByCurrentLocation: createByCurrentLocation
    };

});

app.controller('MapCtrl', ['MarkerCreatorService', '$scope','$http', function (MarkerCreatorService, $scope, $http) {
       
        var vm = this;
        vm.nombre="aquistoy";
        
        vm.prueba = function (latitude,longitude) {
            MarkerCreatorService.createByCoords(latitude,longitude,function (marker) {
                marker.options.labelContent = 'Añadido';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        
        };
        
        
        MarkerCreatorService.createByCoords(39.2329533,  -0.5241572 , function (marker) {
            marker.options.labelContent = 'Vengo de aquí';
            $scope.carletMarker = marker;
        });
        
        $scope.address = '';

        $scope.map = {
            center: {
                latitude: $scope.carletMarker.latitude,
                longitude: $scope.carletMarker.longitude
            },
            zoom: 12,
            markers: [],
            control: {},
            options: {
                scrollwheel: false
            }
        };

        $scope.map.markers.push($scope.carletMarker);
        
       $scope.addMarker = function (latitude,longitude) {
         
            MarkerCreatorService.createByCoords(latitude,longitude,function (marker) {
                marker.options.labelContent = 'Añadido';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
        
        
        $scope.addCurrentLocation = function () {
            MarkerCreatorService.createByCurrentLocation(function (marker) {
                marker.options.labelContent = 'Te encuentras aqui';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
        
        $scope.addAddress = function() {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function(marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }
        
        //JSON
//         var url="http://apigobiernoabiertortod.valencia.es/apirtod/rest/datasets/intensidad_trafico.json";
         var url="http://mapas.valencia.es/lanzadera/opendata/aparcabicis/JSON";

                            $http.get(url, 'GET', '').then(function(data) {
                                $scope.data = data.data.resources;
                            
                                
                                $scope.addMarkerb = function () {
         var latitude = $scope.data[0]['geo:lat'];
         var longitude = $scope.data[0]['geo:long'];
            MarkerCreatorService.createByCoords(latitude,longitude,function (marker) {
                marker.options.labelContent = 'Añadido';
                $scope.map.markers.push(marker);
                refresh(marker);
            });
        };
                            });
        
    }]);


// var app2 = angular.module('MiAplicacion', []);
           
       
//                    .controller('MiAplicacion01Controller', controladorPrincipal);
// app.controller('MiAplicacion01Controller', ['$scope', '$http', function($scope, $http) {
//                              var url="http://apigobiernoabiertortod.valencia.es/apirtod/rest/datasets/intensidad_trafico.json";
//
//                            $http.get(url, 'GET', '').then(function(data) {
//                                $scope.data = data.data.resources;
//                                
//                            });
//                        }]);
                    
//  var appconjunta =  angular.module('MiAplicationconjunta',['AngularGoogleMap','MiAplicacion']);   

//app.factory("MyService",function(){
//      function controladorPrincipal($scope, $http) {
//           var url="http://apigobiernoabiertortod.valencia.es/apirtod/rest/datasets/intensidad_trafico.json";
//                $http.jsonp(url).success(function (data) {
//                            $scope.data = data;
//                        }).
//                        error(function (data) {
//                            $scope.data = "Request failed";
//                        });
//            }
//    
//});