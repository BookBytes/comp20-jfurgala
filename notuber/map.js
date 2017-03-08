/* Largely based on/adapted from/taken from where applicable Ming's geoloc. map example */
var mylat = 0;
var mylong = 0;
var req = new XMLHttpRequest();
var myLoc;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var myOptions = { zoom: 15, center: myLoc, mapTypeId: google.maps.MapTypeId.ROADMAP };
var data;

function getMyLocation() {
    req.open("POST", "https://defense-in-derpth.herokuapp.com/submit", true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            mylat = position.coords.latitude;
            mylong = position.coords.latitude;

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
	title: "FACZaAp2"
    });
    
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);
    });
}

function renderVehicles(data) {
    for (var i = 0; i < data.length; i++) {
        var carLoc = new google.maps.LatLng(data[i].lat, data[i].lng);
	
	marker = new google.maps.Marker({
	    position: carLoc,
	    title: data[i].username
	});
    
	marker.setMap(map);

	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.setContent(marker.title);
	    infowindow.open(map, marker);
	});
    }
}
	
function init() {
    map = new google.maps.Map(document.getElementById("mymap"), myOptions);
    getMyLocation();
}
