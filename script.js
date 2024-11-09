const PLACES = [
  {
    name: "Dolomites",
    location: "Italy",
    long: 11.85,
    lat: 46.433334,
    img: "assets/images/popular-destinations/dolomites.jpg",
    type: "mountains",
  },
  {
    name: "Algarve",
    location: "Portugal",
    long: -7.93044,
    lat: 37.019356,
    img: "assets/images/popular-destinations/algarve.jpg",
    type: "beach",
  },
  {
    name: "Atlanta",
    location: "Georgia",
    long: -84.38633,
    lat: 33.753746,
    img: "assets/images/popular-destinations/atlanta.jpg",
    type: "city",
  },
  {
    name: "Bali",
    location: "Indonesia",
    long: 115.188919,
    lat: -8.409518,
    img: "assets/images/popular-destinations/bali.jpg",
    type: "beach",
  },
  {
    name: "Istanbul",
    location: "Turkey",
    long: 28.97953,
    lat: 41.015137,
    img: "assets/images/popular-destinations/istanbul.jpg",
    type: "city",
  },
  {
    name: "Bass Lake",
    location: "California",
    long: -119.5664,
    lat: 37.3247,
    img: "assets/images/popular-destinations/bass-lake.jpg",
    type: "mountains",
  },
  {
    name: "Rio de Janeiro",
    location: "Brazil",
    long: -43.196388,
    lat: -22.908333,
    img: "assets/images/popular-destinations/rio.jpg",
    type: "city",
  },
  {
    name: "Big Sky",
    location: "Montana",
    long: -111.25312,
    lat: 45.26599,
    img: "assets/images/popular-destinations/big-sky.jpg",
    type: "mountains",
  },
  {
    name: "Delray Beach",
    location: "Florida",
    long: -80.105545,
    lat: 26.459763,
    img: "assets/images/popular-destinations/delray-beach.jpg",
    type: "beach",
  },
  {
    name: "Patagonia",
    location: "Argentina",
    long: -68.9063,
    lat: -41.8102,
    img: "assets/images/popular-destinations/patagonia.jpg",
    type: "mountains",
  },
  {
    name: "Marco Island",
    location: "Florida",
    long: -81.714722,
    lat: 25.940556,
    img: "assets/images/popular-destinations/marco-island.jpg",
    type: "beach",
  },
  {
    name: "Nashville",
    location: "Tennessee",
    long: -86.76796,
    lat: 36.174465,
    img: "assets/images/popular-destinations/nashville.jpg",
    type: "city",
  },
  {
    name: "Pagosa Springs",
    location: "Colorado",
    long: -107.025749,
    lat: 37.267185,
    img: "assets/images/popular-destinations/pagosa-springs.jpg",
    type: "mountains",
  },
  {
    name: "Lefkada",
    location: "Greece",
    long: 20.65,
    lat: 38.7167,
    img: "assets/images/popular-destinations/lefkada-greece.jpg",
    type: "beach",
  },
  {
    name: "Seoul",
    location: "South Korea",
    long: 127.024612,
    lat: 37.5326,
    img: "assets/images/popular-destinations/seoul.jpg",
    type: "city",
  },
  {
    name: "Swiss Alps",
    location: "Switzerland",
    long: 8.55682,
    lat: 46.5555,
    img: "assets/images/popular-destinations/swiss-alps.jpg",
    type: "mountains",
  },
  {
    name: "Wrangell Mountains",
    location: "Alaska",
    long: -142.985687,
    lat: 61.710445,
    img: "assets/images/popular-destinations/wrangell.jpg",
    type: "mountains",
  },
  {
    name: "Mount Fuji",
    location: "Japan",
    long: 138.726379,
    lat: 35.363602,
    img: "assets/images/popular-destinations/mt-fuji.jpg",
    type: "mountains",
  },
  {
    name: "Amsterdam",
    location: "Holland",
    long: 4.89707,
    lat: 52.377956,
    img: "assets/images/popular-destinations/amsterdam.jpg",
    type: "city",
  },
  {
    name: "Venice",
    location: "Italy",
    long: 12.327145,
    lat: 45.438759,
    img: "assets/images/popular-destinations/venice.jpg",
    type: "city",
  },
  {
    name: "London",
    location: "England",
    long: -0.118092,
    lat: 51.509865,
    img: "assets/images/popular-destinations/london.jpg",
    type: "city",
  },
  {
    name: "Maldives",
    location: "South Asia",
    long: 73.3996584,
    lat: 1.924992,
    img: "assets/images/popular-destinations/maldives.jpg",
    type: "beach",
  },
  {
    name: "Venice Beach",
    location: "California",
    long: -118.472023,
    lat: 33.98827,
    img: "assets/images/popular-destinations/venice-beach.jpg",
    type: "beach",
  },
  {
    name: "Maui",
    location: "Hawaii",
    long: -156.331924,
    lat: 20.798363,
    img: "assets/images/popular-destinations/maui.jpg",
    type: "beach",
  },
];
const img = document.createElement("img");
img.src = "assets/images/destination-types.png";
img.alt = "3 Destination types: city, mountains, beach";

swal({
  title: "Where do you want to go?",
  icon: img,
  padding: '3rem',
  buttons: {
    city: {
      text: "City",

      value: "city",
    },
    beach: {
      text: "Beach",
      value: "beach",
    },
    mountains: {
      text: "Mountains",
      value: "mountains",
    },
  },
  closeOnClickOutside: false,
}).then((value) => {
  let typePreference = value;
  findRecommendations(typePreference);
});

const vectorSource = new ol.source.Vector();
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  updateWhileAnimating: true,
});

const iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 36],
    anchorXUnits: "fraction",
    anchorYUnits: "pixels",
    trigger: "click",
    // img: pinImage,
    src: './assets/images/map-pin.png'
  }),
});

const view = new ol.View({
  center: ol.proj.fromLonLat([-117.038834, 34.033298]),
  zoom: 4,
});

// OL CONFIG
const map = new ol.Map({
  target: document.getElementById("map"),
  layers: [
    new ol.layer.Tile({
      preload: 4,
      source: new ol.source.OSM(),
    }),
    vectorLayer,
  ],
  view: view,
});

// Cursor pointer when pin hovered
map.on("pointermove", function(e) {
  const pixel = map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  document.getElementById("map").style.cursor = hit ? "pointer" : "";
});

// find recommendations based on type
function findRecommendations(type) {
  let filteredPlaces = filterPlacesByType(type);
  if (filteredPlaces) {
    populateRecommendationCards(filteredPlaces);
    filteredPlaces.forEach((place) => {
      addPlaceToMegaMenu(place);
      addMarkerToMap(place);
    });
  } else {
    console.log("filterPlacesByType function error");
  }
}

const popup = new ol.Overlay({
  element: document.getElementById("popup"),
});
map.addOverlay(popup);

// Close the popup when the map is moved
map.on("movestart", bootstrap.Popover.getInstance(popup.getElement()));

map.on("click", (e) => {
  const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
  let popover = bootstrap.Popover.getInstance(popup.getElement());
  if (!feature && popover) {
    popover.dispose();
  }
  if (!feature) {
    return;
  }
  if (popover) {
    popover.dispose();
  }
  popup.setPosition(e.coordinate);
  popover = new bootstrap.Popover(document.querySelector("#popup"), {
    animation: false,
    container: document.querySelector("#popup"),
    content: `<img src=${feature.values_.attributes.img} alt=${feature.values_.name} class="img-fluid" style="min-width:300px;" />`,
    html: true,
    placement: "bottom",
    title: `<h3 class="h5 text-center m-0">${feature.values_.name}</h3>`,
  });
  popover.show();
});

let flying = false;

// fly map to the marker clicked on
function flyTo(location, done) {
  const duration = 1500;
  const zoom = view.getZoom();
  let parts = 2;
  let called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  if (!flying) {
    flying = true;
    view.animate(
      {
        center: location,
        duration: duration,
      },
      callback
    );

    view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom,
        duration: duration / 2,
      },
      callback
    );
  }
}

// fly to a specific place on the map by name
function centerPlaceOnMap(placeName) {
  // find place object by name in PLACES array using findPlaceByName function
  let placeObj = findPlaceByName(placeName);
  if (placeObj) {
    // scroll to map
    document.getElementById("map").scrollIntoView();
    // fly map to the marker clicked on
    flyTo(ol.proj.fromLonLat([placeObj.long, placeObj.lat]), function() {
      flying = false;
    });
  } else {
    console.log("findPlaceByName function error");
  }
}

// DOM nodes for megamenu columns
const _megaMenuCol1 = document.getElementById("mega-menu-col-1");
const _megaMenuCol2 = document.getElementById("mega-menu-col-2");

function addPlaceToMegaMenu(place) {
  // nav button populating place name and scroll to map
  let menuItemContent = `
    <li onclick="centerPlaceOnMap('${place.name}')">
      <a class="dropdown-item">
        ${place.name}
      </a>
    </li>
    `;
  // add a dropdown item to the nav menu with centerPlaceOnMap function
  if (_megaMenuCol1.childElementCount < 4) {
    _megaMenuCol1.insertAdjacentHTML("beforeend", menuItemContent);
  } else {
    _megaMenuCol2.insertAdjacentHTML("beforeend", menuItemContent);
  }
}

// add marker to the map based on a place
function addMarkerToMap(place) {
  let newPoint = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([place.long, place.lat])),
    name: place.name,
    attributes: { img: place.img },
  });
  vectorSource.addFeature(newPoint);
  newPoint.setStyle(iconStyle);
}
// Task 1
// Filter PLACES by type. If the type property of an object in PLACES matches the typePreference parameter.
function filterPlacesByType(typePreference) {
  // Step 1: Create a new filteredPlaces array and store it in a variable
  let filteredPlaces = [];
  // Step 2: Loop through PLACES
  for (i = 0; i < PLACES.length; i++) {
    let place = PLACES[i];
    // Step 3: If a place object's type property matches the typePreference parameter, add it to filteredPlaces
    if (place.type === typePreference) {
      filteredPlaces.push(place);
    }
  }
  // Step 4: After the loop, return filteredPlaces
  return filteredPlaces;
}

// Task 2
function createCard(place) {
  // Step 1: Create a new div element and store it in a variable
  let newDiv = document.createElement("div");
  // Step 2: Add the col class to the new div element
  newDiv.classList.add("col");
  // Step 3: Set the innerHTML of the div with a template string. It should resemble the structure shown in the readme. Interpolate the values for place.name, place.img, and place.location where needed. More info - https://wesbos.com/template-strings-html
  newDiv.innerHTML = `
    <div class="card h-100" onclick="centerPlaceOnMap('${place.name}')">
      <img src="${place.img}" class="card-img-top h-100" alt="${place.name}">
      <div class="card-body">
        <h5 class="card-title">${place.name}</h5>
        <p class="card-text">${place.location}</p>
      </div>
    </div>
  `;
  // Step 4: Return the element
return newDiv;
}
  
// Task 3
function populateRecommendationCards(filteredPlaces) {
  // Step 1: Store the DOM element with the id of "recommendations" in a variable
  let recommendations = document.getElementById("recommendations");
  // Step 2: Clear the "recommendations" innerHTML
  recommendations.innerHTML = "";
  // Step 3: Loop through the filteredPlaces array
  for (i = 0; i < filteredPlaces.length; i++) {
    let place = filteredPlaces[i];
  // Step 4: Create a card for each place using the createCard function
    let card = createCard(place);
  // Step 5: Add/append each card to the recommendations DOM element
  recommendations.appendChild(card);
  }
}

// Task 4
function findPlaceByName(placeName) {
   // Step 1: Loop through the PLACES array
    for (let i = 0; i < PLACES.length; i++) {
      let place = PLACES[i];
  // Step 2: If a place object's name property matches the placeName parameter, return that place object
      if (place.name === placeName) {
        return place;
      }
    }
  }
