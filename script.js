mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhMTExIiwiYSI6ImNrcnVhZ2c3aDNydG0zMXBlNHE1ZWp6ZHcifQ.LbNl6biz73c5SbRBegrwiA";

navigator.geolocation.getCurrentPosition(success, error, {
  enableHighAccuracy: true,
});

function success(postition) {
  console.log(postition);
  setupMap([postition.coords.longitude, postition.coords.latitude]);
}

function error() {
  setupMap([139.691706, 35.689487]);
}

function setupMap(center) {
  var map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: center, // starting position [lng, lat]
    zoom: 4, // starting zoom
  });
  map.addControl(new mapboxgl.NavigationControl());
  document
    .getElementById("buttons")
    .addEventListener("click", function (event) {
      var language = event.target.id.substr("button-".length);
      // Use setLayoutProperty to set the value of a layout property in a style layer.
      // The three arguments are the id of the layer, the name of the layout property,
      // and the new property value.
      map.setLayoutProperty("country-label", "text-field", [
        "get",
        "name_" + language,
      ]);
    });
  var geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          message: "梅花（Prunus mume）",
          iconSize: [100, 100],
        },
        geometry: {
          type: "Point",
          coordinates: [121, 25],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "菊花(chrysanthemum)",
          iconSize: [100, 100],
        },
        geometry: {
          type: "Point",
          coordinates: [139, 35],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "木槿花(hibiscus)",
          iconSize: [100, 100],
        },
        geometry: {
          type: "Point",
          coordinates: [126, 37],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "茉莉花(jasmine)",
          iconSize: [120, 120],
        },
        geometry: {
          type: "Point",
          coordinates: [120, 15],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "金鍊花(golden shower tree)",
          iconSize: [120, 120],
        },
        geometry: {
          type: "Point",
          coordinates: [100, 13],
        },
      },
    ],
  };
  const imageArray = [
    "plum_blossom",
    "chrysanthemum",
    "hibiscus",
    "jasmine",
    "golden shower tree",
  ];

  var i = 0;
  geojson.features.forEach(function (marker) {
    // Create a DOM element for each marker.

    var el = document.createElement("div");
    el.className = "marker";
    // el.style.backgroundImage =
    //   "url(https://placekitten.com/g/" +
    //   marker.properties.iconSize.join("/") +
    //   "/)";
    el.style.backgroundImage = "url('./image/" + imageArray[i] + ".png')";

    el.style.width = marker.properties.iconSize[0] + "px";
    el.style.height = marker.properties.iconSize[1] + "px";
    el.style.backgroundSize = "100%";

    el.addEventListener("click", function () {
      window.alert(marker.properties.message);
    });
    console.log(i);
    i += 1;

    // Add markers to the map.
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  });
}
