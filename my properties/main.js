var r = document.querySelector(':root');

const Dark = localStorage.getItem("Dark");

const L = localStorage.getItem("lang");

var x = document.getElementById("XBTN");

var d = document.getElementById("div");

var validate_location = false;

var validate_image = false;

mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  null,
  true // Lazy load the plugin
  );
mapboxgl.accessToken = 'pk.eyJ1IjoibWF6ZW54ZWxnYXlhciIsImEiOiJjbDV3eDEwejAwZmU3M2NwaXU4YzY5dTE0In0.ywGQXbcUzmKG1zk8e8ZYyg';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
    container: 'map',
    // style: 'mapbox://styles/mapbox/streets-v11',
    center: [32.276847, 30.606981],
    zoom: 13,
    
});




var locae = new mapboxgl.GeolocateControl({positionOptions: {enableHighAccuracy: true},
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true
  })
  map.addControl(locae, 'bottom-right');
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

  const geocoer = new MapboxGeocoder({
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

  map.addControl(geocoer);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
var i = document.createElement('img')
i.src = "../imgs/mark.png"
i.style.cursor = 'pointer'
var marker = new mapboxgl.Marker(i).setLngLat(map.getCenter()).addTo(map);
map.on('move', function (e) {
    console.log(`Current Map Center: ${map.getCenter()}`);
    marker.setLngLat(map.getCenter());
});

i.addEventListener("click", function()
{
  // document.getElementById("map").style.width = "0%"
  // document.getElementById("map").style.height = "0%"
  // document.getElementById("map").style.top = "50%"
  map.dragPan.disable()
  document.getElementById("map").style.visibility = "hidden"
  document.getElementById("map").style.opacity = "0"
  
  console.log(map.getCenter())
  document.getElementById("test").innerHTML =" LNG " +  map.getCenter().lng + "<br><br>LAT " + map.getCenter().lat
  validate_location = true;
})

// map.on('moveend', function (e) {
//     console.log(`Current Map Center: ${map.getCenter()}`);
//     marker.setLngLat(map.getCenter());
// });

// map.on('click', (e) => {
  
//   console.log(JSON.stringify(e.lngLat.wrap()))
//   });
window.onload = function(){   
    
    // document.getElementById("map").style.display = "none"
    // document.getElementById("map").style.width = "0%"
    // document.getElementById("map").style.height = "0%"
    // document.getElementById("map").style.position = "fixed"
    // document.getElementById("map").style.top = "50%"
    map.dragPan.disable()
    document.getElementById("map").style.visibility = "hidden"
    document.getElementById("map").style.opacity = "0"
    
    if (Dark=="true") {
    r.style.setProperty('--TitleParbackground-color', 'black');
    r.style.setProperty('--ATitleParbackground-color', 'black');
    r.style.setProperty('--ButttonGradiantColor', 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)');
    r.style.setProperty('--Apartment', '#151515');
    r.style.setProperty('--FontColor', 'white');
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
    // r.style.setProperty('--IconColor','white');
    r.style.setProperty('--menu','#526DA1');
    r.style.setProperty('--BodyBackground','white');
    r.style.setProperty('--PreloaderBackground','white');
    map.setStyle('mapbox://styles/mapbox/streets-v12');

  }
  // document.body.style.flexDirection = "column";
  // document.body.style.alignItems = "center";
  document.getElementById("PreLoader").style.display="none";
   

    var pic = localStorage.getItem("pic")
   
  if (pic == null) {
        document.getElementById("profilepic").src = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    }
    else {
      
      document.getElementById("profilepic").src = pic;
    }
    












    var b = document.getElementById("MyPropertiesBody");
    fetch('../database/csvjson.json')
    .then(function(response) {
      
    console.log(response)
    
    return response.json();
    
    })
    .then(function(d) {
      
      SH = d;
      console.log(SH)
    
      d.forEach(({host_id,id,name})=>{
        if (host_id==124245) {/////////////////////////////////this should be the user id
            var p = document.createElement("div")
            p.style.width="100%";
            p.style.height="15%";
            p.style.borderRadius="15px";
            p.style.marginTop="20px"
            p.style.padding="10px 10px"
            Dark=="true"?p.style.backgroundColor="#000000b3":p.style.backgroundColor="rgb(82 109 161 / 65%)";
            // Dark=="true"?p.style.backgroundColor="black":p.style.backgroundColor="#526DA1";
            p.style.Color="black";
            p.style.fontSize="30px"
            // var c = document.createElement("p")
            // c.setAttribute("lng-tag", 'lng-tag');
            // p.appendChild(c);
            p.innerHTML="<div style=\"display: flex;\"><p lng-tag=\"apartment id: \"></p> <p>&nbsp"+id+"</p></div><p>"+name+"</p>"
            b.appendChild(p)
        }
    
    })
    

    if(L=='ar'){
      translate(L,'lng-tag');  
      document.body.dir="rtl" 
      // document.getElementsByClassName('wrapper')[0].style.clipPath = 'circle(0px at calc(100% + 30px) 30px)'
      r.style.setProperty('--cp', 'circle(0px at calc(100% + 30px) 30px)');
      r.style.setProperty('--cp2', 'circle(75%)');
    }else{
      translate('en','lng-tag'); 
      document.body.dir="ltr" 
      // document.getElementsByClassName('wrapper')[0].style.clipPath = 'circle(0px at calc(0% + 30px) 30px)'
      r.style.setProperty('--cp', 'circle(0px at calc(0% + 30px) 30px)');
      r.style.setProperty('--cp2', 'circle(75%)');
  
    }
    });
    






  }
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        console.log('jh')
    }
}

  function addappartement(){
    document.getElementById("div").style.transition = "width 0.5s,height 0.5s";
    function responsive(x) {
      if (x.matches) { // If media query matches
        document.getElementById("div").style.width="570px";//570
        document.getElementById("div").style.height="570px";//500//570
        // document.getElementsByClassName("mapboxgl-canvas")[0].style.width="100%";
        // document.getElementsByClassName("mapboxgl-canvas")[0].style.height="100%";
        // ApartmentImagess.style.height='50%';
        } else {
        document.getElementById("div").style.width="270px";//570
        document.getElementById("div").style.height="420px";//500//570
        
        // ApartmentImagess.style.height='35%';

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


    // removeAllChildNodes(document.getElementById("MyPropertiesBody"))
    // document.getElementById("map").style.width = "100%"
    // document.getElementById("map").style.height = "100%"
    // document.getElementById("map").style.top = "0%"

    // document.getElementById("map").style.transition = "all 0.5s";

    // document.getElementById("map").style.display = "block"
  }


  function Xbtn(elm) {
    //document.getElementById(elm.addresssentNode.id).style.display="none"
    //x.style.display = "none";
    d.style.height="0px";
    d.style.width="0px";
    
     // console.log("ali");
     var cDiv = d.children;
         for (var i = 0; i < cDiv.length; i++) {
             //cDiv[i].style.transition = "visibility 0s";
             // cDiv[i].style.visibility= "hidden";  //do styling here
             cDiv[i].setAttribute("class","m-fadeOut");
         }
  //    var cDivimgs = ApartmentImagess.children; //ملهاش لازمة
  //    for (var g = 0; g < cDivimgs.length; g++) {
  //      //cDiv[g].style.transition = "visibility 0s";
  //      // cDiv[g].style.visibility= "hidden";  //do styling here
  //      cDivimgs[g].remove();
  //  }
   // document.getElementById("32.274186,30.607398").remove();
   }


   function map_open(){
    // document.getElementById("map").style.width = "100%"
    // document.getElementById("map").style.height = "100%"
    // document.getElementById("map").style.top = "0%"
    map.dragPan.enable()
    document.getElementById("map").style.visibility = "visible"
    document.getElementById("map").style.opacity = "1"
    document.getElementById("map").style.transition = "all 0.5s";

    // document.getElementById("map").style.display = "block"
   }


   var myform = document.getElementById("myform")

  //  function addappartement2() {

    myform.addEventListener("submit", (e) => {
      // console.log(validate_location)
      if (!validate_location) {
        e.preventDefault();
        document.getElementById("test").innerHTML = "you should enter the location"
      }else if(!validate_image){
        e.preventDefault();
        console.log(validate_image)
        document.getElementById("test").innerHTML = "you should enter an image"
      }else{
        myform.submit()
      }
      // validate_location?myform.submit():
      
    
      // handle submit
    });
    // console.log(document.getElementById("myform").noValidate=true)
    // document.getElementById("i1").required;
    // document.getElementById("i2").required;
    // document.getElementById("i3").required;
    // document.getElementById("i4").required;
  //  }

  const fileInput = document.getElementById('select-image');

  function select_images(){
    fileInput.click();
    fileInput.addEventListener('change', ()=>{
    if(!fileInput.files.length == 0){
      //Cancel clicked
       console.log("djlhljhlh")
       document.getElementById("test").innerHTML = ""
       validate_image = true;
    } 
    console.log(fileInput.files.length)
  })
  }