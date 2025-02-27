$(document).ready(function () {
    console.log("🚀 Page loaded, initializing map...");

    let beaches = [];
    let busStops = [];
    let ACCESS_RADIUS = 7000; // ✅ Increased to 7 km

    // ✅ Define coordinate systems for transformation
    proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
    proj4.defs("EPSG:2039", "+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +units=m +no_defs");

    // ✅ Initialize the GovMap
    govmap.createMap('map', {
        token: 'YOUR_TOKEN_HERE',
        layers: ["BUS_STOPS", "HOF_POLYGON"],
        showXY: true,
        identifyOnClick: true,
        isEmbeddedToggle: false,
        background: "0",
        layersMode: 1,
        zoomButtons: true,
        onLoad: function () {
            console.log("✅ GovMap has been successfully loaded.");
            loadBusStops(); // ✅ Load bus stops first
        },
        onError: function (error) {
            console.error("❌ Error loading GovMap:", error);
        }
    });

    // ✅ Load bus stops from bus.json
    function loadBusStops() {
        console.log("⏳ Loading bus stops from `bus.json`...");

        $.getJSON("bus.json", function (data) {
            if (!data || data.length === 0) {
                console.error("❌ No bus stop data found in `bus.json`!");
                return;
            }

            busStops = data.map(stop => {
                let lat = parseFloat(stop.Lat);
                let lon = parseFloat(stop.Long);

                if (isNaN(lat) || isNaN(lon)) {
                    console.warn(`⚠️ Invalid coordinates for station: ${stop.StationId}`);
                    return null;
                }

                // ✅ Convert coordinates to EPSG:2039
                let [x2039, y2039] = proj4("EPSG:4326", "EPSG:2039", [lon, lat]);
                return { ...stop, X: x2039, Y: y2039 };
            }).filter(stop => stop !== null);

            console.log(`✅ Bus stops loaded: ${busStops.length} stops`);
            loadBeachesFromJson();
        }).fail(function (jqxhr, textStatus, error) {
            console.error("❌ Error loading `bus.json`:", textStatus, error);
        });
    }

    // ✅ Load beach data from shores.json
    function loadBeachesFromJson() {
        console.log("⏳ Loading `shores.json`...");

        $.getJSON("shores.json", function (data) {
            if (!data || data.length === 0) {
                console.error("❌ No beach data found in `shores.json`!");
                return;
            }

            beaches = data;
            checkBeachAccessibility(beaches);
            drawBeaches(beaches);

            let firstBeach = beaches[0];
            govmap.zoomToXY({ x: parseFloat(firstBeach.X), y: parseFloat(firstBeach.Y), level: 3 });
            console.log(`✅ Zoomed to first beach: ${firstBeach.Name}`);
        }).fail(function (jqxhr, textStatus, error) {
            console.error("❌ Error loading `shores.json`:", textStatus, error);
        });
    }

    // ✅ Check if beaches are accessible by bus (within 7 km)
    function checkBeachAccessibility(beaches) {
        console.log("⏳ Checking beach accessibility based on bus stops...");

        beaches.forEach(beach => {
            let x = parseFloat(beach.X);
            let y = parseFloat(beach.Y);
            let isAccessible = false;

            for (let stop of busStops) {
                let stopX = parseFloat(stop.X);
                let stopY = parseFloat(stop.Y);
                if (!isNaN(stopX) && !isNaN(stopY)) {
                    let distance = calculateDistance(x, y, stopX, stopY);

                    if (distance <= ACCESS_RADIUS) {
                        isAccessible = true;
                        break;
                    }
                }
            }

            beach.isAccessible = isAccessible;
            console.log(`🏖️ ${beach.Name} - ${beach.isAccessible ? "✅ Accessible" : "⚠️ Requires verification"} (Checked within ${ACCESS_RADIUS / 1000} km)`);
        });
    }

    // ✅ Draw beaches with correct colors based on accessibility
    function drawBeaches(beaches) {
        console.log("⏳ Drawing beaches on the map...");

        let beachMarkers = beaches.map(beach => {
            let x = parseFloat(beach.X);
            let y = parseFloat(beach.Y);

            if (isNaN(x) || isNaN(y)) {
                console.warn(`⚠️ Invalid coordinates for beach: ${beach.Name}`);
                return null;
            }

            return {
                x: x,
                y: y,
                geometryType: govmap.geometryType.POINT,
                defaultSymbol: {
                    type: govmap.drawType.Point,
                    fillColor: beach.isAccessible ? [64, 224, 208, 1] : [255, 0, 0, 1], 
                    outlineColor: [0, 0, 0, 1],
                    outlineWidth: 1,
                    size: 15
                },
                data: {
                    tooltips: beach.isAccessible
                        ? [`🏖️ Beach: ${beach.Name} - ✅ Accessible`]
                        : [`⚠️ ${beach.Name} requires further verification. Enable the GOVMAP bus layer to check nearby stops.`] // ✅ New message
                }
            };
        }).filter(item => item !== null);

        try {
            govmap.clearGeometriesByName("beachMarkers");
            govmap.displayGeometries({
                wkts: beachMarkers.map(b => `POINT(${b.x} ${b.y})`),
                names: beachMarkers.map(b => b.data.tooltips[0]),
                geometryType: govmap.geometryType.POINT,
                defaultSymbol: {
                    type: govmap.drawType.Point,
                    fillColor: [64, 224, 208, 1],
                    outlineColor: [0, 0, 0, 1],
                    outlineWidth: 1,
                    size: 15
                },
                data: {
                    tooltips: beachMarkers.map(b => b.data.tooltips[0] || "No tooltip available")
                }
            });
            console.log("✅ Beaches drawn successfully.");
        } catch (error) {
            console.error("❌ Error drawing beaches:", error);
        }
    }

    // ✅ Function to calculate Euclidean distance
    function calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function goToLocationPage() {
        window.location.href = 'my-location.html';
      }
      
    
      function goToAllBeachesPage() {
        window.location.href = 'all-shores.html';
      }
      
});
function goToLocationPage() {
    window.location.href = 'my-location.html';
  }
  

  function goToAllBeachesPage() {
    window.location.href = 'all-shores.html';
  }
  
