// let fetchRes = fetch("../database/data.json");
//   // fetchRes is the promise to resolve
//   // it by using.then() method
//   fetchRes.then(res =>res.json()).then(d => {SH = d;})
// //   .catch(function(error) {
// //     console.log(error);
// // });

// var X = false/////////////////////////////////////////////////////////////
// var currentMarkers=[];
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  true // Lazy load the plugin
  );
var mapMarkers = [];
// map
mapboxgl.accessToken = 'pk.eyJ1IjoibWF6ZW54ZWxnYXlhciIsImEiOiJjbDV3eDEwejAwZmU3M2NwaXU4YzY5dTE0In0.ywGQXbcUzmKG1zk8e8ZYyg';
const map = new mapboxgl.Map({
 container: 'map', // container ID
//  style: 'mapbox://styles/mapbox/streets-v12', // style URL
 center: [32.276847, 30.606981], // starting position [lng, lat][32.276847, 30.606981]
 zoom: 13, // starting zoom
 attributionControl: false
});


var locate = new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  map.addControl(locate, 'bottom-right');
  map.addControl(new mapboxgl.NavigationControl(),'top-left');

  class HomeButton {
    onAdd(map) {
        this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    // this._container.addEventListener('contextmenu', (e) => e.preventDefault());
    this._container.onclick = function() {
        if (document.getElementById("23d").checked) {
            document.getElementById("23d").checked = false;
            document.getElementById("togle23d").innerHTML = "<b>3d</b>";
        } else {
            document.getElementById("23d").checked = true;
            document.getElementById("togle23d").innerHTML = "<b>2d</b>";
        }
        
        if(document.getElementById("23d").checked){
            map.easeTo({bearing:-17.6,pitch: 60, duration: 500});
            
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;
  
        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',
  
                    // Use an 'interpolate' expression to
                    // add a smooth transition effect to
                    // the buildings as the user zooms in.
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
        }else{
            map.easeTo({bearing:0,pitch: 0, duration: 500});
  
            map.removeLayer('add-3d-buildings')
        }
    // });
    }
  
    this._container.innerHTML =
      '<div class="tools-box">' +
        '<input type="checkbox" id="23d" style="display: none;">'+
      '<button>' +
      '<span id="togle23d" class="mapboxgl-ctrl-icon my-image-button" aria-hidden="true" title="Description"  style="display: flex;align-items: center;justify-content: center;"><b>3d</b></span>' +
      '</button>' +
      '</div>';
  
    return this._container;
    }
  }
  map.addControl(new HomeButton(), "bottom-right");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: false, // Do not use the default marker style
    // placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
    // bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
    // proximity: {
    //   longitude: -122.25948,
    //   latitude: 37.87221
    // } // Coordinates of UC Berkeley
  });

  map.addControl(geocoder);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var d = document.getElementById("div");

// const Dark = document.cookie
//   .split('; ')
//   .find((row) => row.startsWith('Dark='))
//   ?.split('=')[1];
var r = document.querySelector(':root');

const Dark = localStorage.getItem("Dark");


const L = localStorage.getItem("lang");

var SH = {
  type: "FeatureCollection",
  features: [],
};

window.onload = function(){
var X = false;
  // const request = new XMLHttpRequest();

  // const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://ali-1-ibrahim.github.io/test252/database/data.json');
// xhr.responseType = 'json';
// xhr.onload = function(e) {
//   if (this.status == 200) {
//     console.log('response', this.response); // JSON response  
//     SH = this.response;
//   }
// };
// xhr.send();

fetch('https://ali-1-ibrahim.github.io/test1231/database/csvjson.json')
.then(function(response) {
  
console.log(response)

return response.json();

})
.then(function(d) {
  
  json = d;
  // console.log(SH)
  for (i = 0; i < json.length; i++) {
    // if (window.CP.shouldStopExecution(1)) {
    //   break;
    // }
    SH.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [json[i].longitude, json[i].latitude]
      },
      "properties": {
        "id": json[i].id,
        "name": json[i].name,
        "host_id": json[i].host_id,
        "host_name": json[i].host_name,
        "neighbourhood_group": json[i].neighbourhood_group,
        "neighbourhood": json[i].neighbourhood,
        "latitude": json[i].latitude,
        "longitude": json[i].longitude,
        "room_type": json[i].room_type,
        "price": json[i].price,
        "minimum_nights": json[i].minimum_nights,
        "number_of_reviews": json[i].number_of_reviews,
        "last_review": json[i].last_review,
        "reviews_per_month": json[i].reviews_per_month,
        "calculated_host_listings_count": json[i].calculated_host_listings_count,
        "availability_365": json[i].availability_365,
        "imgs": json[i].imgs,
        'title': json[i].price,
      }
    });
  }
  
  // window.CP.exitedLoop(1);
  
});



  //document.getElementById("menu_addressssAndClose").src==""
  // document.getElementsByClassName("menu-btn")[0].addEventListener("click" , function(){
  //     if (document.getElementById("menu_addressssAndClose").src=="../imgs/menue.png") {
  //       setTimeout(() => {
        
  //         // 👇️ hides element (still takes up space on the page)
  //         document.getElementsByClassName("menu-btn")[0].innerHTML="X";
  //       }, 100);
  //     } else {
  //       setTimeout(() => {
        
  //         // 👇️ hides element (still takes up space on the page)
  //         document.getElementById("menu_addressssAndClose").src=="../imgs/menue.png";
  //       }, 100);
        
  //     }
  //   })
  //document.cookie = "Dark=true; expires=Thu, 18 Dec 2024 12:00:00 UTC;path=../home page/main.html";

  if(L=='ar'){
    translate(L,'lng-tag');  
    document.body.dir="rtl" 
    // document.getElementsByClassName("mapboxgl-user-location-accuracy-circle")[0].style.dir="ltr" 
    // document.getElementsByClassName('wrapper')[0].style.clipPath = 'circle(0px at calc(100% + 30px) 30px)'
    r.style.setProperty('--cp', 'circle(0px at calc(100% + 30px) 30px)');
    r.style.setProperty('--cp2', 'circle(75%)');
    document.getElementsByClassName("XBTN")[0].style.right = '94%'
    // r.style.setProperty('--trensbefore', 'translate(-0.5px,-28px) skewY(20deg);');
    // r.style.setProperty('--transafter', 'translate(-7.5px,-28px) skewY(-20deg);');
    // document.getElementsByClassName("mapboxgl-user-location mapboxgl-marker mapboxgl-marker-anchor-center mapboxgl-user-location-show-heading")[0].dir = "ltr" 
    X = true; 
  }else{
    translate('en','lng-tag'); 
    document.body.dir="ltr" 
    // document.getElementsByClassName("mapboxgl-user-location-accuracy-circle")[0].style.dir="ltr" 

    // document.getElementsByClassName('wrapper')[0].style.clipPath = 'circle(0px at calc(0% + 30px) 30px)'
    r.style.setProperty('--cp', 'circle(0px at calc(0% + 30px) 30px)');
    r.style.setProperty('--cp2', 'circle(75%)');
    document.getElementsByClassName("XBTN")[0].style.right = '2%'
    X = true; 

  }

  if (Dark=="true") {
    r.style.setProperty('--TitleParbackground-color', 'black');
    r.style.setProperty('--ATitleParbackground-color', 'black');
    r.style.setProperty('--ButttonGradiantColor', 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)');
    r.style.setProperty('--Apartment', '#151515');
    r.style.setProperty('--FontColor', 'white');
    r.style.setProperty('--ScrollThump','rgba(255,255,255,0.5)');
    r.style.setProperty('--ScrollTrack','rgba(255,255,255,0.3)');
    // r.style.setProperty('--IconColor','blue');
    r.style.setProperty('--menu','black');
    r.style.setProperty('--BodyBackground','gray');
    r.style.setProperty('--PreloaderBackground','black');

    map.setStyle('mapbox://styles/mapbox/dark-v11');
  } else {
    r.style.setProperty('--TitleParbackground-color', '#526DA1');
    r.style.setProperty('--ATitleParbackground-color', '#526DA1');
    r.style.setProperty('--ButttonGradiantColor', 'linear-gradient(144deg,#d79eff, #bbb0ff 50%,#b7faff)');
    r.style.setProperty('--Apartment', '#eee');
    r.style.setProperty('--FontColor', '#526DA1');
    r.style.setProperty('--ScrollThump','rgba(0,0,0,0.5);');
    r.style.setProperty('--ScrollTrack','rgba(0,0,0,0.3);');
    // r.style.setProperty('--IconColor','white');
    r.style.setProperty('--menu','#526DA1');
    r.style.setProperty('--BodyBackground','white');
    r.style.setProperty('--PreloaderBackground','white');
    map.setStyle('mapbox://styles/mapbox/streets-v12');
  }
  var cDiv = d.children;
      for (var i = 0; i < cDiv.length; i++) {
          //cDiv[i].style.transition = "visibility 0s";
          // cDiv[i].style.visibility= "hidden";  //do styling here
          cDiv[i].setAttribute("class","m-fadeOut");
      }

      // document.body.style.flexDirection = "column";
      // document.body.style.alignItems = "center";
      // document.body.style.justifyContent= "center";
      // document.getElementById("PreLoader").style.display="none";//////////////////////////////////////////////////////////////////////////////////////////////
  // document.getElementsByClassName("circles")[0].style.display="none";
  
  var pic = localStorage.getItem("pic")
   
  if (pic == null) {
        document.getElementById("profilepic").src = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    }
    else {
      
      document.getElementById("profilepic").src = pic;
    }
    if (X) {
      document.getElementById("PreLoader").style.display="none";//////////////////////////////////////////////////////////////////////////////////////////////
    }
   
}



//marker icon
//var im = document.createElement("img")
// window.onload = function() {
    
//     im.setAttribute('id','fa');
//     im.setAttribute('src','../imgs/icon.png');
//     im.setAttribute('width','32px');
//     im.setAttribute('height','32px');
//     im.style.cursor = "pointer";
    
//     document.body.appendChild(im);
// };

//marker to map
var zoom = map.getZoom(); //zoom level

//var d = document.getElementById("div");

var addresss = document.getElementById("addresss");
var pricee = document.getElementById("pricee");
var roomss = document.getElementById("roomss");
var ApartmentImagess = document.getElementById("ApartmentImages");
var x = document.getElementById("XBTN");

map.on('load', function () {
 
  map.loadImage(
    '../imgs/icon.png',
    (error, image) => {
    if (error) throw error;
    map.addImage('custom-marker', image);
    // Add a GeoJSON source with 2 points
        map.addSource('places', {
      // This GeoJSON contains features that include an "icon"
      // property. The value of the "icon" property corresponds
      // to an image in the Mapbox Streets style's sprite.
      'type': 'geojson',
      'data': SH
    });

    // Add a layer showing the places.
    map.addLayer({
    'id': 'places',
    'type': 'symbol',
    'source': 'places',
    'layout': {
      'icon-image': 'custom-marker',
      'icon-size': 0.15,
    // get the title name from the source's "title" property
    'text-field': ['get', 'title'],
    'text-font': [
    'Open Sans Semibold',
    'Arial Unicode MS Bold'
    ]
    // 'text-halo-color':'white'
    ,
    'text-offset': [0, 1.25],
    // 'text-anchor': 'top',
    'icon-allow-overlap': true,
    'text-allow-overlap': true,
    // 'icon-ignore-placement': true,
    // 'text-ignore-placement': true,
    },
    paint: {
      "text-color": Dark=="true"?"white":"#526DA1"
    }
    });
    }
    );

// try{
// SH.forEach(({address,price,rooms,location,neighbourhood,imgs,latitude,longitude,number_of_reviews})=>{
 
    
  // var im = document.createElement("img")
  //   im.setAttribute('id','fa');
  //   im.setAttribute('src','../imgs/icon.png');
  //   im.setAttribute('width','32px');
  //   im.setAttribute('height','32px');
  //   // im.setAttribute('z-index','500');
  //   im.style.cursor = "pointer";
    
  //   // var m = new mapboxgl.Marker(im).setLngLat(location).addTo(map)._element.id = location;
  //   var m = new mapboxgl.Marker(im).setLngLat([longitude,latitude]).addTo(map)._element.id = [longitude,latitude];
  //   mapMarkers.push([longitude,latitude]);
  //   // currentMarkers.push(m);


  //   if (map.getZoom() >= 12) {
          
  //     im.style.display = "block";
  // } else {
  //   im.style.display = "none";
  // }
    //m._element.id = location;
    // map.on('zoom', () => {
    
    //     // document.getElementById("fa").width = Math.round(map.getZoom()*2);
    //     // document.getElementById("fa").height = Math.round(map.getZoom()*2);
    //     if (map.getZoom() >= 12) {
          
    //       im.style.display = "block";
    //   } else {
    //     im.style.display = "none";
    //   }
    //     console.log(map.getZoom());
    // });
    
    map.on('click', 'places', (e) => {
      // map.on('click', function(e) {
      //   var coordinates = e.lngLat;
      // for (let i = 0; i < SH.length; i++) {
      //   addresss.innerHTML = address;
      //   pricee.innerHTML = price;
      //   roomss.innerHTML = rooms;
      //   var cDivimgs = ApartmentImagess.children;
 
      // }
      // addresss.innerHTML = address;
      // pricee.innerHTML = price;
      // roomss.innerHTML = rooms;

      addresss.innerHTML = e.features[0].properties.neighbourhood;
      pricee.innerHTML = e.features[0].properties.price;
      roomss.innerHTML = e.features[0].properties.number_of_reviews;
      // var cDivimgs = ApartmentImagess.children;
      // for (var g = 0; g < cDivimgs.length; g++) {
      //   //cDiv[g].style.transition = "visibility 0s";
      //   // cDiv[g].style.visibility= "hidden";  //do styling here
      //   cDivimgs[g].remove();
      // }
            ApartmentImagess.innerHTML="";
            // console.log(e.features[0].properties.imgs)
           var images = e.features[0].properties.imgs.replace(/[\[\]']+/g,'').replaceAll('"', '').split(",");
           console.log(images)
      for (let j = 0; j < images.length; j++) {
        // console.log(imgs.length);
        // console.log(j);
        var img = document.createElement("img");
        // var dvi = document.createElement("div")
        img.setAttribute('src',images[j])
        img.setAttribute('width','100%');//500px
        img.setAttribute('height','100%');//200px
        img.style.padding="10px"
        // dvi.innerHTML = "lk;k"
        // dvi.style.backgroundColor = "blue";
        // dvi.style.padding = "10px";
        
        // dvi.setAttribute("width","200px");
        // dvi.setAttribute("height","10px")
        
        ApartmentImagess.appendChild(img);
        // ApartmentImagess.appendChild(dvi);
        //ApartmentImagess.innerHTML = "<img srs = \'"++"\>'";
        
      }
      // });
      
      // if (d.style.display === "none") {
      //   d.style.display = "block";
      // } else {
      //   d.style.display = "none";
      // }

      // if (d.style.width="0") {
      //   d.style.width="570px";
      // } else {
      //   d.style.width="0px";
      // }
      //x.style.display = "block";
      document.getElementById("div").style.transition = "width 0.5s,height 0.5s";
      addresss.style.transition = "width 0.5s";
      pricee.style.transition = "width 0.5s";
      roomss.style.transition = "width 0.5s";
      
      function responsive(x) {
        if (x.matches) { // If media query matches
          document.getElementById("div").style.width="570px";//570
          document.getElementById("div").style.height="570px";//500//570
          addresss.style.width="482px";
          pricee.style.width="176px";
          roomss.style.width="176px";
          ApartmentImagess.style.height='50%';
          
          } else {
          document.getElementById("div").style.width="270px";//570
          document.getElementById("div").style.height="420px";//500//570
          addresss.style.width="182px";
          pricee.style.width="56px";
          roomss.style.width="56px";
          ApartmentImagess.style.height='35%';
          if (L=='ar') {
            document.getElementsByClassName("XBTN")[0].style.right = '86%'
          }
        }
      }

      var x = window.matchMedia("(min-width: 600px)")
      responsive(x) 
      // x.addListener(responsive)
      //document.getElementById("div").style.top = screen.height + "px";
      //addresss.display="block";
      var cDiv = d.children;
      for (var i = 0; i < cDiv.length; i++) {
          //cDiv[i].style.transition = "visibility 10s";
          //cDiv[i].style.visibility= "visible";  //do styling here
          cDiv[i].setAttribute("class","m-fadeIn");
      }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cord = [e.features[0].properties.longitude,e.features[0].properties.latitude];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    // })

// });


  })

// }catch(err) {
  
  
// // window.location.reload();
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


map.addSource('single-point', {
  'type': 'geojson',
  'data': {
    'type': 'FeatureCollection',
    'features': []
  }
});

map.addLayer({
  'id': 'point',
  'source': 'single-point',
  'type': 'circle',
  'paint': {
    'circle-radius': 10,
    'circle-color': '#448ee4'
  }
});

// Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
//  Add a marker at the result's coordinates
geocoder.on('result', (event) => {
  map.getSource('single-point').setData(event.result.geometry);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
map.on('mouseenter', 'places', () => {
  map.getCanvas().style.cursor = 'pointer';
  });
   
  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'places', () => {
  map.getCanvas().style.cursor = '';
  });
  map.on('zoom', () => {
    
        // document.getElementById("fa").width = Math.round(map.getZoom()*2);
        // document.getElementById("fa").height = Math.round(map.getZoom()*2);
        if (map.getZoom() >= 12) {
          
          map.setLayoutProperty('places', 'visibility', 'visible');
      } else {
        map.setLayoutProperty('places', 'visibility', 'none');
      }
        console.log(map.getZoom());
    });
    
});
//new mapboxgl.Marker().setLngLat([32.276847, 30.606981]).addTo(map);
// new mapboxgl.Marker().setLngLat([32.274186,30.607398]).addTo(map);
// new mapboxgl.Marker().setLngLat([32.277946,30.609672]).addTo(map);
// new mapboxgl.Marker(im).setLngLat(SH[0].location).addTo(map);
// new mapboxgl.Marker(im).setLngLat(SH[1].location).addTo(map);

// new mapboxgl.Marker(im).setLngLat(SH[2].location).addTo(map);

// Set an event listener
// map.on('click', (e) => {
//     new mapboxgl.Marker(im)
// .setLngLat([32.276847, 30.606981])
// .addTo(map);
// });

// hide and show the icon with zooming
// var zoom = map.getZoom(); //zoom level
// map.on('zoom', () => {
//     // document.getElementById("fa").width = Math.round(map.getZoom()*2);
//     // document.getElementById("fa").height = Math.round(map.getZoom()*2);
//     if (map.getZoom() >= 12) {
      
//       document.getElementById("fa").style.display = "block";
//   } else {
//     document.getElementById("fa").style.display = "none";
//   }
//     console.log(map.getZoom());
// });

//marker click
// document.getElementsByClassName("fa").addEventListener("click" , function(){
//     var x = document.getElementsByClassName("div");
//     if (d.style.display === "none") {
//       d.style.display = "block";
//     } else {
//       d.style.display = "none";
//     }
//   })

  //hide and show marker in menu clicking
  //document.getElementsByClassName("menu-btn")[0].addEventListener("click" , function(){
  //   if (im.style.display === "none") {
  //     setTimeout(() => {
      
  //       // 👇️ hides element (still takes up space on the page)
  //       im.style.display = "block";
  //     }, 100);
  //   } else {
  //     setTimeout(() => {
      
  //       // 👇️ hides element (still takes up space on the page)
  //       im.style.display = "none";
  //     }, 100);
      
  //   }
  // })
  
// map.on('boxzoomstart', (e) => {
// console.log('event type:', e.type);
// // event type: boxzoomstart
// });
// document.getElementById('bu').addEventListener('click' , myFunction)

// function myFunction() {
//     console.log(map.getZoom());

// }



// CLOSE FUNCTION
function Xbtn(elm) {
 //document.getElementById(elm.addresssentNode.id).style.display="none"
 //x.style.display = "none";
 d.style.height="0px";
 d.style.width="0px";
 addresss.style.width="0px";
pricee.style.width="0px";
roomss.style.width="0px";
  // console.log("ali");
  var cDiv = d.children;
      for (var i = 0; i < cDiv.length; i++) {
          //cDiv[i].style.transition = "visibility 0s";
          // cDiv[i].style.visibility= "hidden";  //do styling here
          cDiv[i].setAttribute("class","m-fadeOut");
      }
  var cDivimgs = ApartmentImagess.children; //ملهاش لازمة
  for (var g = 0; g < cDivimgs.length; g++) {
    //cDiv[g].style.transition = "visibility 0s";
    // cDiv[g].style.visibility= "hidden";  //do styling here
    cDivimgs[g].remove();
}
// document.getElementById("32.274186,30.607398").remove();
}
















   

// // create a function to make a directions request
// async function getRoute(end) {
//   // make a directions request using cycling profile
//   // an arbitrary start will always be the same
//   // only the end or destination will change
//   const query = await fetch(
//     `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//     { method: 'GET' }
//   );
//   const json = await query.json();
//   const data = json.routes[0];
//   const route = data.geometry.coordinates;
//   const geojson = {
//     type: 'Feature',
//     properties: {},
//     geometry: {
//       type: 'LineString',
//       coordinates: route
//     }
//   };
//   // if the route already exists on the map, we'll reset it using setData
//   if (map.getSource('route')) {
//     map.getSource('route').setData(geojson);
//   }
//   // otherwise, we'll make a new request
//   else {
//     map.addLayer({
//       id: 'route',
//       type: 'line',
//       source: {
//         type: 'geojson',
//         data: geojson
//       },
//       layout: {
//         'line-join': 'round',
//         'line-cap': 'round'
//       },
//       paint: {
//         'line-color': '#3887be',
//         'line-width': 5,
//         'line-opacity': 0.75
//       }
//     });
//   }
//   // add turn instructions here at the end
// }














 
//   function GetToMe() {
    
//   Xbtn();
//   // locate.trigger();
//   setInterval(() => {
//     id = navigator.geolocation.getCurrentPosition(showPosition);
// // console.log(id)
    
// function showPosition(position) {
//     pos = position.coords;
//     start = [pos.longitude,pos.latitude]
//     getRoute(start);
//     map.addLayer({
//       id: 'point',
//       type: 'circle',
//       source: {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: [
//             {
//               type: 'Feature',
//               properties: {},
//               geometry: {
//                 type: 'Point',
//                 coordinates: start
//               }
//             }
//           ]
//         }
//       },
//       paint: {
//         'circle-radius': 10,
//         'circle-color': '#3887be'
//       }
//     });
// }
// }, 2000);
// // getRoute(start);

//   // Add starting point to the map
  
//   // this is where the code from the next step will go
//   map.on('click', (event) => {
//     const end = {
//       type: 'FeatureCollection',
//       features: [
//         {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'Point',
//             coordinates: cord
//           }
//         }
//       ]
//     };
//     if (map.getLayer('end')) {
//       map.getSource('end').setData(end);
//     } else {
//       map.addLayer({
//         id: 'end',
//         type: 'circle',
//         source: {
//           type: 'geojson',
//           data: {
//             type: 'FeatureCollection',
//             features: [
//               {
//                 type: 'Feature',
//                 properties: {},
//                 geometry: {
//                   type: 'Point',
//                   coordinates: cord
//                 }
//               }
//             ]
//           }
//         },
//         paint: {
//           'circle-radius': 10,
//           'circle-color': '#f30'
//         }
//       });
//     }
//     getRoute(cord);
//   });
  
// // });



// }


// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "text/plain");
// myHeaders.append("Retry-After", "3600");

// var start = [32.282272,30.610130];

// create a function to make a directions request


var loc = new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  map.addControl(loc, 'bottom-left');

async function getRoute(end) {

  // X=true
try{
  myInterval = setInterval(() => {
    // id = navigator.geolocation.getCurrentPosition(showPosition);
// console.log(id)
    
// async function showPosition(position) {
//     pos = position.coords;
//     start = [pos.longitude,pos.latitude]


loc.on('geolocate', async function(e) {
  var lon = e.coords.longitude;
  var lat = e.coords.latitude
   
  start = [lon, lat];
  // console.log(start);

  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET'}
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  // add turn instructions here at the end
  const instructions = document.getElementById('instructions');
const steps = data.legs[0].steps;

let tripInstructions = '';
for (const step of steps) {
  tripInstructions += `<li>${step.maneuver.instruction}</li>`;
}
instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(data.duration / 60)} min 🚶🏾 </strong></p><ol>${tripInstructions}</ol>`;
// }

console.log("fljhfjhjlh");

});
}, 2000)
map.setLayoutProperty('route', 'visibility', 'visible');
loc._geolocateButton.click();

document.getElementsByClassName('XBTN')[0].style.display='block';
}


catch(err){
  console.log("llllllllllllllj")
  getRoute(cord);
}
} //getrout


// map.on('load', () => {

  // this is where the code from the next step will go
  function GetToMe(){
  // map.on('click', (event) => {
    // const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
    // 
    Xbtn()
    getRoute(cord);

    document.getElementById('instructions').style.display='block';
  // });
  }
// });


function StopGps() {
  clearInterval(myInterval);
  loc.trigger();
  // map.removeLayer('route');
  map.setLayoutProperty('route', 'visibility', 'none');
  // map.removeSource('geojson');
  document.getElementsByClassName('XBTN')[0].style.display='none';
  document.getElementById('instructions').innerHTML='LOODING...';
  document.getElementById('instructions').style.display='none';
  
}

function relode(){
  Xbtn()

  map.removeLayer('places');
  map.removeSource('places');
  map.removeImage('custom-marker')
  var SH = {
    type: "FeatureCollection",
    features: [],
  };
  fetch('../database/csvjson.json')
.then(function(response) {
  
console.log(response)

return response.json();

})
.then(function(d) {
  
  json = d;
  // console.log(SH)
  for (i = 0; i < json.length; i++) {
    // if (window.CP.shouldStopExecution(1)) {
    //   break;
    // }
    SH.features.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [json[i].longitude, json[i].latitude]
      },
      "properties": {
        "id": json[i].id,
        "name": json[i].name,
        "host_id": json[i].host_id,
        "host_name": json[i].host_name,
        "neighbourhood_group": json[i].neighbourhood_group,
        "neighbourhood": json[i].neighbourhood,
        "latitude": json[i].latitude,
        "longitude": json[i].longitude,
        "room_type": json[i].room_type,
        "price": json[i].price,
        "minimum_nights": json[i].minimum_nights,
        "number_of_reviews": json[i].number_of_reviews,
        "last_review": json[i].last_review,
        "reviews_per_month": json[i].reviews_per_month,
        "calculated_host_listings_count": json[i].calculated_host_listings_count,
        "availability_365": json[i].availability_365,
        "imgs": json[i].imgs,
        'title': json[i].price,
      }
    });
  }
  
  // window.CP.exitedLoop(1);
  
});
 
map.loadImage(
  'https://raw.githubusercontent.com/ALI-1-Ibrahim/test252/main/imgs/icon.png',
  (error, image) => {
  if (error) throw error;
  map.addImage('custom-marker', image);
  // Add a GeoJSON source with 2 points
      map.addSource('places', {
    // This GeoJSON contains features that include an "icon"
    // property. The value of the "icon" property corresponds
    // to an image in the Mapbox Streets style's sprite.
    'type': 'geojson',
    'data': SH
  });

  // Add a layer showing the places.
  map.addLayer({
  'id': 'places',
  'type': 'symbol',
  'source': 'places',
  'layout': {
    'icon-image': 'custom-marker',
    'icon-size': 0.15,
  // get the title name from the source's "title" property
  'text-field': ['get', 'title'],
  'text-font': [
  'Open Sans Semibold',
  'Arial Unicode MS Bold'
  ]
  // 'text-halo-color':'white'
  ,
  'text-offset': [0, 1.25],
  'text-anchor': 'top',
  'icon-allow-overlap': true,
  'text-allow-overlap': true,
  // 'icon-ignore-placement': true,
  // 'text-ignore-placement': true,
  },
  paint: {
    "text-color": Dark=="true"?"white":"#526DA1"
  }
  });
  }
  );

// try{
// SH.forEach(({address,price,rooms,location,neighbourhood,imgs,latitude,longitude,number_of_reviews})=>{

  
// var im = document.createElement("img")
//   im.setAttribute('id','fa');
//   im.setAttribute('src','../imgs/icon.png');
//   im.setAttribute('width','32px');
//   im.setAttribute('height','32px');
//   // im.setAttribute('z-index','500');
//   im.style.cursor = "pointer";
  
//   // var m = new mapboxgl.Marker(im).setLngLat(location).addTo(map)._element.id = location;
//   var m = new mapboxgl.Marker(im).setLngLat([longitude,latitude]).addTo(map)._element.id = [longitude,latitude];
//   mapMarkers.push([longitude,latitude]);
//   // currentMarkers.push(m);


//   if (map.getZoom() >= 12) {
        
//     im.style.display = "block";
// } else {
//   im.style.display = "none";
// }
  //m._element.id = location;
  // map.on('zoom', () => {
  
  //     // document.getElementById("fa").width = Math.round(map.getZoom()*2);
  //     // document.getElementById("fa").height = Math.round(map.getZoom()*2);
  //     if (map.getZoom() >= 12) {
        
  //       im.style.display = "block";
  //   } else {
  //     im.style.display = "none";
  //   }
  //     console.log(map.getZoom());
  // });
  
  map.on('click', 'places', (e) => {
    // map.on('click', function(e) {
    //   var coordinates = e.lngLat;
    // for (let i = 0; i < SH.length; i++) {
    //   addresss.innerHTML = address;
    //   pricee.innerHTML = price;
    //   roomss.innerHTML = rooms;
    //   var cDivimgs = ApartmentImagess.children;

    // }
    // addresss.innerHTML = address;
    // pricee.innerHTML = price;
    // roomss.innerHTML = rooms;

    addresss.innerHTML = e.features[0].properties.neighbourhood;
    pricee.innerHTML = e.features[0].properties.price;
    roomss.innerHTML = e.features[0].properties.number_of_reviews;
    // var cDivimgs = ApartmentImagess.children;
    // for (var g = 0; g < cDivimgs.length; g++) {
    //   //cDiv[g].style.transition = "visibility 0s";
    //   // cDiv[g].style.visibility= "hidden";  //do styling here
    //   cDivimgs[g].remove();
    // }
          ApartmentImagess.innerHTML="";
          // console.log(e.features[0].properties.imgs)
         var images = e.features[0].properties.imgs.replace(/[\[\]']+/g,'').replaceAll('"', '').split(",");
         console.log(images)
    for (let j = 0; j < images.length; j++) {
      // console.log(imgs.length);
      // console.log(j);
      var img = document.createElement("img");
      // var dvi = document.createElement("div")
      img.setAttribute('src',images[j])
      img.setAttribute('width','100%');//500px
      img.setAttribute('height','100%');//200px
      img.style.padding="10px"
      // dvi.innerHTML = "lk;k"
      // dvi.style.backgroundColor = "blue";
      // dvi.style.padding = "10px";
      
      // dvi.setAttribute("width","200px");
      // dvi.setAttribute("height","10px")
      
      ApartmentImagess.appendChild(img);
      // ApartmentImagess.appendChild(dvi);
      //ApartmentImagess.innerHTML = "<img srs = \'"++"\>'";
      
    }
    // });
    
    // if (d.style.display === "none") {
    //   d.style.display = "block";
    // } else {
    //   d.style.display = "none";
    // }

    // if (d.style.width="0") {
    //   d.style.width="570px";
    // } else {
    //   d.style.width="0px";
    // }
    //x.style.display = "block";
    document.getElementById("div").style.transition = "width 0.5s,height 0.5s";
    addresss.style.transition = "width 0.5s";
    pricee.style.transition = "width 0.5s";
    roomss.style.transition = "width 0.5s";
    
    function responsive(x) {
      if (x.matches) { // If media query matches
        document.getElementById("div").style.width="570px";//570
        document.getElementById("div").style.height="570px";//500//570
        addresss.style.width="482px";
        pricee.style.width="176px";
        roomss.style.width="176px";
        ApartmentImagess.style.height='50%';
        
        } else {
        document.getElementById("div").style.width="270px";//570
        document.getElementById("div").style.height="420px";//500//570
        addresss.style.width="182px";
        pricee.style.width="56px";
        roomss.style.width="56px";
        ApartmentImagess.style.height='35%';
        if (L=='ar') {
          document.getElementsByClassName("XBTN")[0].style.right = '86%'
        }
      }
    }

    var x = window.matchMedia("(min-width: 600px)")
    responsive(x) 
    // x.addListener(responsive)
    //document.getElementById("div").style.top = screen.height + "px";
    //addresss.display="block";
    var cDiv = d.children;
    for (var i = 0; i < cDiv.length; i++) {
        //cDiv[i].style.transition = "visibility 10s";
        //cDiv[i].style.visibility= "visible";  //do styling here
        cDiv[i].setAttribute("class","m-fadeIn");
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
cord = [e.features[0].properties.longitude,e.features[0].properties.latitude];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  // })

// });
})



console.log("relooode")
}

// locate.addEventListener(click,function () {
//       document.getElementsByClassName("mapboxgl-user-location mapboxgl-marker mapboxgl-marker-anchor-center mapboxgl-user-location-show-heading")[0].dir = "ltr" 

// })

// locate.on('click', (e) => {
//   document.getElementsByClassName("mapboxgl-user-location mapboxgl-marker mapboxgl-marker-anchor-center mapboxgl-user-location-show-heading")[0].dir = "ltr" 
//   // event type: boxzoomstart
//   console.log("fjkafjhfjhdsjlfhsdjlkfhsdfjhsdjkfh")
//   });