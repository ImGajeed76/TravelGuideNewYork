let map;

let points = [[([40.74098626727528, -73.98968072574704]), "<h1> Flatiron Building </h1>" + "<h3> Sight </h3>" + "<p> Famous tower named after its iron shape, built in 1902 by architect Daniel Burnham. </p>"], [([40.77942845513298, -73.96323327296925]), "<h1> Metropolitan Museum of Art </h1>" + "<h3> Muesum </h3>" + "<p> Imposing building with one of the most important art collections in the world - from ancient to modern. </p>"], [([40.74851976157696, -73.98569514333286]), "<h1> Empire State Building </h1>" + "<h3> Sight </h3>" + "<p> Famous Art Deco office building from 1931 with exhibitions and observation decks on the 86th and 102nd floors. </p>"]]

function readPositions(file) {
    let newPoints = []

    fetch(file).then((response) => {
        newPoints = response

        points = []
        for (let newPoint of newPoints) {
            points.push([newPoint.position, "<h1>" + newPoint.title + "</h1>"])
        }

        console.log(response)
    })
}

function setup() {
    readPositions("positions.json")
    map = L.map('map').setView([40.75828460278274, -73.98243465344264], 11.5);

    let mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1IjoiaW1nYWplZWQ3NiIsImEiOiJjbDJyZW8zNmMwNWU4M2ZwZ2dmemVpeGZuIn0.4j6pt4Uea6ZGS2gSePrDkA'
    });
    let googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 18, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    let googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 18, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    let googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 18, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    let googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 18, subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    googleSat.addTo(map);
    // googleStreets.addTo(map);
    // googleTerrain.addTo(map);
    // googleHybrid.addTo(map);
    // mapbox.addTo(map)

    for (const point of points) {
        let p = L.marker(point[0]);
        p.bindPopup(point[1]);

        p.on("mouseover", function (ev) {
            p.openPopup()
        });

        p.on("click", function (ev) {
            map.flyTo(point[0], 18)
        });

        p.addTo(map);
    }
}

function draw() {
    console.log(map.centerX);
}

