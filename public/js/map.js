
    {/* let mapToken= mapToken ;
    console.log(mapToken); */}
    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style:"mapbox://styles/mapbox/streets-v12",
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
    });

// console.log(coordinates);

const marker=new mapboxgl.Marker({color: "#d92e34"})
        .setLngLat(coordinates)   // Listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML("<h6>Exact Location will be shared after booking</h6>"))
        .addTo(map);