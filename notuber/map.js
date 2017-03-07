var myLoc;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var mapOptions = { zoom: 15, center: myLoc, mapTypeId: google.maps.MapTypeId.ROADMAP };

function init() {
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    getMyLocation();
}

function getMyLocation() {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://defense-in-derpth.herokuapp.com/submit", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            mylat = position.coords.latitude;
            mylong = position.coords.latitude;

            var content = "username=FACZaAp2&lat=" + mylat + "&lng=" + mylong;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert(xhr.responseText);
                }
            }
	          
            xhr.send(content);
	    
	});
    }
    else {
        alert("Your browser is not compatible with the geolocation feature.");
    }
}

function renderMap()
{
    var mylat, mylong;
    myLoc = new google.maps.LatLng(myLat, myLng);
				
    map.panTo(myLoc);
	
    marker = new google.maps.Marker({
	position: myLoc,
	title: "You are here!"
    });
    
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
	infowindow.setContent(marker.title);
	infowindow.open(map, marker);
    });
}

function getLocation() {
    var mylat = 0;
    var mylong = 0;
    var map;

    init();
}
