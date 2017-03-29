/* Largely based on/adapted from/taken from where applicable Ming's geoloc. map example */
var mylat = 0;
var mylong = 0;
var req = new XMLHttpRequest();
var myLoc;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var myOptions = { zoom: 16, center: myLoc, mapTypeId: google.maps.MapTypeId.ROADMAP };
var data;

/* from https://developers.google.com/maps/documentation/javascript/custom-markers */
var icons = {
    vehicles: {
        icon: 'black_car.png'
    },
    passengers: {
	/* Src: https://commons.wikimedia.org/wiki/File:Collect_Apps_logo.png */
	icon: 'squirrel.png'
    },
    me: {
	/* Src: http://maxpixel.freegreatpicture.com/Africa-Pachyderm-Asia-Elephant-Animal-Silhouette-1837462 */
        icon: 'africa_pachyderm.png'
    }
};


function addMarkers(data, type) {
    /* var mapmarker; */
    for (var i = 0; i < data[type].length; i++) {
        var Loc = new google.maps.LatLng(data[type][i].lat, data[type][i].lng);

        var mapmarker = new google.maps.Marker({
	    position: Loc,
	    icon: icons[type].icon,
	    title: data[type][i].username
	});

	mapmarker.title += '<p>' + (google.maps.geometry.spherical.computeDistanceBetween(myLoc, Loc) * 0.000621371) + ' miles away</p>'
	
	mapmarker.setMap(map);

	google.maps.event.addListener(mapmarker, 'click', function() {
	    infowindow.setContent(this.title);
	    infowindow.open(map, this);
        });
    }
}

function renderVehicles(data) {
    if (data.vehicles) {
	addMarkers(data, 'vehicles');
    }
    else {
	addMarkers(data, 'passengers');
    }
}

function getMyLocation() {
    req.open("POST", "http://localhost:5000/submit", true); // "https://obscure-tundra-82992.herokuapp.com/submit", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            mylat = position.coords.latitude;
            mylong = position.coords.longitude;

	    renderMap();

            var content = "username=FACZaAp2&lat=" + mylat + "&lng=" + mylong;
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    data = JSON.parse(req.responseText);
		    renderVehicles(data);
                }
            }
	          
            req.send(content);
	});
    }
    else {
        alert("Your browser is not compatible with the geolocation feature.");
    }
}

function renderMap()
{
    myLoc = new google.maps.LatLng(mylat, mylong);

    map.panTo(myLoc);
	
    marker = new google.maps.Marker({
	position: myLoc,
	icon: icons['me'].icon,
	title: "FACZaAp2"
    });
    
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);
    });
}
	
function init() {
    map = new google.maps.Map(document.getElementById("mymap"), myOptions);
    getMyLocation();
}
