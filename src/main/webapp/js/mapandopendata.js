var app = angular.module('AGMapB', ['google-maps']);
//var app = angular.module('AngularGoogleMap', ['uiGmapgoogle-maps']);

app.factory('MarkerCreatorService', function () {

    var markerId = 0;

    function create(latitude, longitude) {
        var marker = {
            options: {
                animation: 0,
                labelAnchor: "22 -5",
                labelClass: 'markerlabel'
//                icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
//                icon: "https://cdn3.iconfinder.com/data/icons/musthave/256/Stock%20Index%20Down.png"
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
        geocoder.geocode({'address': address}, function (results, status) {
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

app.controller('MapCtrlB', ['MarkerCreatorService', '$scope', '$http', function (MarkerCreatorService, $scope, $http) {

        MarkerCreatorService.createByCoords(39.2329533, -0.5241572, function (marker) {
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

        $scope.addMarker = function (latitude, longitude) {

            MarkerCreatorService.createByCoords(latitude, longitude, function (marker) {
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

        $scope.addAddress = function () {
            var address = $scope.address;
            if (address !== '') {
                MarkerCreatorService.createByAddress(address, function (marker) {
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
            }
        };

        function refresh(marker) {
            $scope.map.control.refresh({latitude: marker.latitude,
                longitude: marker.longitude});
        }
        
        $scope.removeMarkers = function() {
                $scope.map.markers = [];
            }

        //JSON Bicis
        var url = "http://datosabiertos.malaga.eu/recursos/transporte/trafico/poi_apbicis.geojson";

        $http.get(url, 'GET', '').then(function (data) {
            $scope.data = data.data.features;


            $scope.addMarkerb = function () {
                
                for (var i = 0,l = data.data.features.length; i < l; i++) {
                     var latitude = $scope.data[i].geometry.coordinates[1];
                var longitude = $scope.data[i].geometry.coordinates[0];
                MarkerCreatorService.createByCoords(latitude, longitude, function (marker) {
                    marker.options.labelContent = 'AparcaBicis'+i;
                    marker.options.icon='https://maps.google.com/mapfiles/ms/icons/cycling.png';
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
                }
               
            };
        
        
        });
        
        
            //JSON Motos
        var urlb = "http://datosabiertos.malaga.eu/recursos/transporte/trafico/poi_apmotos.geojson";

        $http.get(urlb, 'GET', '').then(function (data) {
            $scope.moto = data.data.features;


            $scope.addMarkerc = function () {
                
                for (var i = 0,l = data.data.features.length; i < l; i++) {
                     var latitude = $scope.moto[i].geometry.coordinates[1];
                var longitude = $scope.moto[i].geometry.coordinates[0];
                MarkerCreatorService.createByCoords(latitude, longitude, function (marker) {
                    marker.options.labelContent = 'AparcaMotos'+i;
                    marker.options.icon='https://maps.google.com/mapfiles/ms/icons/motorcycling.png';
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
                }
               
            };
        
        
        });
            //JSON Movilidad Reducida
        var urlb = "http://datosabiertos.malaga.eu/recursos/transporte/trafico/poi_pmr.geojson";

        $http.get(urlb, 'GET', '').then(function (data) {
            $scope.reducida = data.data.features;


            $scope.addMarkerd = function () {
                
                for (var i = 0,l = data.data.features.length; i < l; i++) {
                     var latitude = $scope.reducida[i].geometry.coordinates[1];
                var longitude = $scope.reducida[i].geometry.coordinates[0];
                MarkerCreatorService.createByCoords(latitude, longitude, function (marker) {
//                    marker.options.labelContent = 'Aparcamiento Minusválidos '+i;
                    marker.options.icon='https://maps.google.com/mapfiles/ms/icons/wheel_chair_accessible.png';
                    $scope.map.markers.push(marker);
                    refresh(marker);
                });
                }
               
            };
        
        
        });

    }]);