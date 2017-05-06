//Create object for firebase
var userObject = {};

//Create object for map toggleing
var mapObject = {};

//Moving through pages
var current_fs, next_fs, previous_fs, userKey, comment;

var map;

var markers = [];
//Function to send object to firebase
function post() {
  var postRef = firebase.database().ref('/incidents/public').push(userObject);
  userKey = postRef.key;
  userObject = {};
  comment = $("#endComment").val();
  document.getElementById("resetForm").reset();
}

//Function to send object to firebase after final submit (with comment)
function submitPost() {
  var path = '/incidents/private/' + userKey;
  var postRef = firebase.database().ref(path).update({submitComment: comment});
  userKey = null;
  comment = null;
}

//Function to geocode location
function geocodeThis() {
  var geocoder = new google.maps.Geocoder;
  var latLng = userObject.userLocation;
  geocoder.geocode({ 'location': latLng }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      userObject["Assault Approximate Address"] = results[0].formatted_address;
    } else {
      console.log('No results found');
    }
  });
}; //geocodeThis()

//Function to fade in elements
function fadeThisIn(element) {
  element.fadeIn(600);
};

//Function to fade out elements
function fadeThisOut(element) {
  element.fadeOut(600);
};


/* SEARCH BOX + MAP*/
function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('googleMap'),
  {
    center: { lat: 38.732805, lng: -98.228487 },
    zoom: 5,
    styles: [
      {
         "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#4b4b4b" }]
      },
      {
        "featureType": "administrative.province",
          "elementType": "geometry",
          "stylers": [{ "saturation": "7" }]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.fill",
          "stylers": [
            { "visibility": "on" },
            { "saturation": "17" },
            { "lightness": "20" }
          ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f2f2f2" }]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#f2f2f2" }]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            { "saturation": -100 },
            { "lightness": 45 }
          ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{ "visibility": "simplified" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#9fce48" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#32879c" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{ "invert_lightness": true }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "color": "#ffffff" },
            { "visibility": "off" },
            { "weight": "0.57" }
          ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            { "color": "#46bcec" },
            { "visibility": "on" }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#6bccdd" }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{ "visibility": "off" }]
      }
    ],
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    streetViewControl: false,
    scrollwheel:  false
  }); //map
  //console.log('map here is', map)
  var pinIcon = "styles/images/";

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  var questionWindow = new google.maps.InfoWindow;
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    console.log('places ', places)
    places.forEach(function (place) {
      //Creating the if statement for the 'view only' map
      if (mapObject.seeMap === false) {

        // Create a marker for each place.
        var marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          icon: pinIcon + "redStar.png"
        });
      } //closing the if statement

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      //Creating the if statement for the 'view only' map
      if (mapObject.seeMap === false) {
        //question-window open
        questionWindow.setContent("<div id='pinDrop-window'>" +
          "<h3>Report a sexual assault at this location?</h3>" +
          "<button type='button' class='btn btn-default btn-clicked' id='fireBase-no'>No</button>" +
          "<button type='button' class='btn btn-default btn-clicked' id='fireBase-yes'>Yes</button>" +
          "</div>"); // #pinDrop-window
        questionWindow.open(map, marker);
        if (infoWindow.open()) {
          infoWindow.close();

        }
        $(".gm-style-iw").next("div").hide();

        // SEND TO FIREBASE
        $("#pinDrop-window > #fireBase-yes").on("click", function (e) {
          userObject.userLocation = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          geocodeThis();
          fadeThisOut($("#pinDrop-window"));
          fadeThisIn($("#form-start-overlay"));
          questionWindow.close();
          $("#pac-input").hide();
          $(".mapPrompts").hide();
          $(".home-elements").hide();
          $("#exitMap").hide();
          mapObject.seeMap = true;
          showMarkers();
        });

        $("#pinDrop-window > #fireBase-no").on("click", function () {
          questionWindow.close();
          //REMOVE MARKER WHEN USER SELECTS NO
          marker.setVisible(false);
        });
      } //Closing the if statement
    }); //place.forEach

    map.fitBounds(bounds);
    // console.log(bounds);

  }); //searchBox.addListener

  //Creating the if statement for the 'view only' map

  // Add marker on user click
  map.addListener('click', addPin);

  function addPin(e) {

    if (mapObject.seeMap === false) {
      var marker = new google.maps.Marker({
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        map: map,
        icon: pinIcon + "redStar.png"
      }); // var marker
      //info box when you click map
      questionWindow.setContent(
        "<div id='pinDrop-window'>" +
        "<h3>Report a sexual assault at this location?  </h3>" +
        "<button type='button' class='btn btn-default btn-clicked' id='fireBase-no'>No</button>" +
        "<button type='button' class='btn btn-default btn-clicked' id='fireBase-yes'>Yes</button>" +
        "</div>"); // #pinDrop-window

      //Call by:: questionWindow.open(map, marker);
      questionWindow.open(map, marker);
      if (infoWindow.open()) {
        infoWindow.close();
      }
      $(".gm-style-iw").next("div").hide();
      //ADD PINDROP OVERLAY
      $("#pinDrop-window > #fireBase-yes").on("click", function () {
        userObject.userLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        geocodeThis();

        fadeThisOut($("#pinDrop-window"));
        fadeThisIn($("#form-start-overlay"));
        questionWindow.close();
        $("#pac-input").hide();
        $(".mapPrompts").hide();
        $(".home-elements").hide();
        $("#exitMap").hide();
        mapObject.seeMap = true;
        showMarkers()
      });
      $("#pinDrop-window > #fireBase-no").on("click", function () {
        questionWindow.close();
        marker.setVisible(false);

      });
    } //if statement
  }
  //); //map.addListener


  var infoWindow = new google.maps.InfoWindow();

  firebase.database().ref('/incidents/public').on("child_added", function (snapshot, prevChildKey) {

    // Get latitude and longitude from the cloud.
    var eventObject = snapshot.val();
    //console.log('eventObject', eventObject);

    // Create a google.maps.LatLng object for the position of the marker.
    var latLng = new google.maps.LatLng(eventObject.userLocation.lat, eventObject.userLocation.lng);
    // Place a marker at that location.
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: pinIcon + "redStar.png"
    });

    markers.push(marker);

    //info box when you click a pin
    google.maps.event.addListener(marker, 'click', function () {
      //Items not to be in InfoWindow
      var uL = eventObject.hasOwnProperty("userLocation");
      var cI = eventObject.hasOwnProperty("campusInfo");
      var sC = eventObject.hasOwnProperty("submitComment");
      var p = eventObject.hasOwnProperty("prosecuted");
      var rT = eventObject.hasOwnProperty("reportedTo");
      //Creating info window content
      var outer = document.createElement('div');
      var inner = document.createElement('div');
      $(inner).attr("id", "infoContent");
      var content = "";
      for (var key in eventObject) {
        content = content + "<strong> " + key + ": </strong>" + eventObject[key] + "<br>";

        if (uL === true) {
          delete eventObject.userLocation;
        }
        if (cI === true) {
          delete eventObject.campusInfo;
        }
        if (sC === true) {
          delete eventObject.submitComment;
        }
        if (p === true) {
          delete eventObject.prosecuted;
        }
        if (rT === true) {
          delete eventObject.reportedTo;
        }

      };
      //Setting info window content
      $(inner).html(content);
      $(outer).append(inner);
      infoWindow.setContent($(outer).html());

      infoWindow.open(map, marker);
      if (questionWindow.open()) {
        questionWindow.close();
        marker.setVisible(false);
      }

    }); // addListender(marker)
  }); //firebase.on function
} //initAutocomplete()

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//Add the number of assaults to the map in realtime

firebase.database().ref('/incidents/public').once('value', function(snapshot) {
    $("#circleNumberReported").append(snapshot.numChildren());
  });

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}
