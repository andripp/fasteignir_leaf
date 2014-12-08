var map;
var markers = [];
var u20 = [];
var s20t30 = [];
var ajaxRequest;
var plotlist;
var plotlayers = [];

function initmap() {
    // set up the map
    map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data � <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 8, maxZoom: 12, attribution: osmAttrib });

    // start the map in South-East England
    map.setView(new L.LatLng(51.3, 0.7), 9);
    map.addLayer(osm);
}
/*
function initialize() {
  map = new google.maps.Map(document.getElementById('map-canvas'),{
    zoom: 12,
    center: new google.maps.LatLng(64.11845, -21.88613),
    mapTypeId: google.maps.MapTypeId.ROADMAP 
  });
  


  var styles = [{
  stylers: [{ 
      hue: "#222222" }, { 
      saturation: -100 }]
  }, {
  featureType: "water",
  elementType: "all",
  stylers: [{ 
      color: "#666666" }]
  }, {
  featureType: "poi.business",
  elementType: "labels",
  stylers: [{ 
      visibility: "off" }]
  }];
  map.setOptions({styles: styles});

  for (var i in location101) {
    var house = location101[i];
    var latLng = new google.maps.LatLng(house.latitude,house.longitude); 
    addTheDot(map, numberWithDots(house.price), latLng, house);
  }
  for (var i in location103) {
      var house = location103[i];
      var latLng = new google.maps.LatLng(house.latitude, house.longitude);
      addTheDot(map, numberWithDots(house.price), latLng, house);
  }
  for (var i in location104) {
      var house = location104[i];
      var latLng = new google.maps.LatLng(house.latitude, house.longitude);
      addTheDot(map, numberWithDots(house.price), latLng, house);
  }
  for (var i in location105) {
      var house = location105[i];
      var latLng = new google.maps.LatLng(house.latitude, house.longitude);
      addTheDot(map, numberWithDots(house.price), latLng, house);
  }
  for (var i in location107) {
      var house = location107[i];
      var latLng = new google.maps.LatLng(house.latitude, house.longitude);
      addTheDot(map, numberWithDots(house.price), latLng, house);
  }
  for (var i in location108) {
      var house = location108[i];
      var latLng = new google.maps.LatLng(house.latitude, house.longitude);
      addTheDot(map, numberWithDots(house.price), latLng, house);
  }
}

function numberWithDots(x) {
  if(x == 0) return "Tilbo\u00F0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function addTheDot(map, price, latLng, house) {
    if (house.price < 1000000) {
        //do nothing since there is no price
        return;
    }
    else {
        var pricePerSqm = parseInt(house.price)/parseFloat(house.size);
        if (pricePerSqm < 300000) {
            var marker = new google.maps.Marker({
                position: latLng,
                title: price,
                map: map,
                icon: 'images/scale1.png'
            });
        }
        else if (pricePerSqm >= 300000 && pricePerSqm < 400000) {
            var marker = new google.maps.Marker({
                position: latLng,
                title: price,
                map: map,
                icon: 'images/scale2.png'
            });
        }
        else if (pricePerSqm >= 400000 && pricePerSqm < 500000) {
            var marker = new google.maps.Marker({
                position: latLng,
                title: price,
                map: map,
                icon: 'images/scale3.png'
            });
        }
        else if (pricePerSqm >= 500000 && pricePerSqm < 600000) {
            var marker = new google.maps.Marker({
                position: latLng,
                title: price,
                map: map,
                icon: 'images/scale4.png'
            });
        }
        else {
            var marker = new google.maps.Marker({
                position: latLng,
                title: price,
                map: map,
                icon: 'images/scale5.png'
            });
        }
    }
  
      markers.push(marker);
      if(house.price > 1000000 && house.price < 20000000) {
              u20.push(marker);
      }
      if(house.price >= 20000000 && house.price <= 30000000) {
              s20t30.push(marker);
      }
  
  
      google.maps.event.addListener(marker, 'click', function() {
          if (typeof infowindow != 'undefined') infowindow.close();
          if (house.bedrooms == null) {var room = "-";}
          else {var room = house.bedrooms;}
          var infoContent = '<div id="content" style="overflow:hidden;line-height:1.35;min-width:150px;">'+
          '<div id="siteNotice">'+
          '</div>'+ 
          '<h1 id="firstHeading" class="firstHeading"> ' +  house.street_name  +'</h1>'+
          '<img src="' + house.image + '" alt="Mynd." style="width:150px;">' +
          '<div id="bodyContent">'+
          'Ver\u00F0: ' + '<b>' + price + '</b><br>' +
          'St\u00E6r\u00F0: ' + '<b>' + house.size + '</b><br>' +
          'Herbergi: ' + '<b>' + room + '</b></p>' +
          '<p>' + '<a href="http://fasteignir.visir.is/property/' + house.id  + '">' + 'Sko\u00F0a n\u00E1nar' +'</a> ' +
          '</p>'+
          '</div>'+
          '</div>';
          infowindow = new google.maps.InfoWindow({
              content: infoContent
          });
    
          infowindow.open(map,marker);
  });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
function showMarkers() {
    setAllMap(map);
}
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}
// Shows any markers currently in the array.
function showU20(map) {
  clearMarkers();
  for (var i = 0; i < u20.length; i++) {
    u20[i].setMap(map);
  }
}
function showUnder20() {
  showU20(map);
}

function s20to30(map) {
  clearMarkers();
  for (var i = 0; i < s20t30.length; i++) {
    s20t30[i].setMap(map);
  }
}
function show20to30() {
  s20to30(map);
}
  

google.maps.event.addDomListener(window, 'load', initialize);
    */