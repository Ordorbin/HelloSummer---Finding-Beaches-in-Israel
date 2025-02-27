proj4.defs(
    "EPSG:2039",
    "+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
);

$(document).ready(function () {
    let segregatedSelected = false;
    let nearbyBeachesSelected = false;
    let beachMarkers = [];

    // Create the map
    govmap.createMap("map", {
        token: "your-token-here", // Replace with your token
        layers: ["HOF_POLYGON"],
        showXY: true,
        identifyOnClick: true,
        isEmbeddedToggle: false,
        background: "0",
        layersMode: 1,
        zoomButtons: true,
        center: { x: 175133, y: 657488 },
        level: 6,
        onLoad: function () {
            loadBeaches();
        }
    });

    function calculateDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
      }
      const beaches = [
        { name: "Rishon Lezion Beach", x: 174596, y: 655887 },
        { name: "Bat Yam Beach", x: 175122, y: 657489 },
        { name: "Herzliya Beach", x: 180732, y: 673334 },
        { name: "Dead Sea Beach", x: 237545.67, y: 592244.33 },
        { name: "Northern Tiberias Separate Beach", x: 252231, y: 741316 },
        { name: "Southern Tiberias Separate Beach", x: 252298, y: 741199 },
        { name: "Nordau Tel Aviv Beach", x: 178445, y: 666706 },
        { name: "Kiryat Sanz Netanya Separate Beach", x: 186328, y: 694586 },
        { name: "Eilat Separate Beach", x: 196724, y: 384234 },
        { name: "Argaman Acre Beach", x: 207653, y: 758232 },
        { name: "Ashdod Separate Beach", x: 164726, y: 633285 },
        { name: "Ashkelon Separate Beach", x: 157393, y: 620205 },
        { name: "Quiet Beach Haifa", x: 199297, y: 748638 },
        { name: " Nahariya Religious Beach", x: 208676, y: 768497 },
    
      ];
      function getUserLocationISR() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        try {
                            const longitude = position.coords.longitude;
                            const latitude = position.coords.latitude;
    
                            // Convert coordinates to ISR
                            const [x, y] = proj4("EPSG:4326", "EPSG:2039", [longitude, latitude]);
                            console.log(`Converted coordinates (ISR): X=${x}, Y=${y}`);
                            resolve({ x, y });
                        } catch (conversionError) {
                            console.error("Error converting coordinates:", conversionError);
                            reject("Conversion failed.");
                        }
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                        reject("Unable to fetch user location.");
                    }
                );
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    }

      
    function findNearestBeach(userLocation) {
        let nearestBeach = null;
        let shortestDistance = Infinity;
    
        beaches.forEach((beach) => {
          const distance = calculateDistance(userLocation.x, userLocation.y, beach.x, beach.y);
          console.log(`Distance to ${beach.name}: ${distance}`);
          if (distance < shortestDistance) {
            shortestDistance = distance;
            nearestBeach = beach;
          }
        });
        console.log("Nearest beach:", nearestBeach);
        return nearestBeach;
      }
    
      function markNearestBeach(nearestBeach) {
        console.log("Nearest Beach Data:", nearestBeach); 
        if (!nearestBeach) {
            console.warn("No nearest beach found.");
            return;
        }
    
        const beachMarker = {
            circleGeometries: [
                {
                    x: nearestBeach.x,
                    y: nearestBeach.y,
                    radius: 300,
                },
            ],
            geometryType: govmap.geometryType.CIRCLE,
            defaultSymbol: {
                outlineColor: [0, 255, 0, 1],
                outlineWidth: 4,
                fillColor: [0, 255, 0, 0.5],
            },
            clearExisting: false,
            data: {
                tooltips: [`Nearest Beach: ${nearestBeach.name}`],
            },
        };
    
    
        try {
          govmap.displayGeometries(beachMarker);
          console.log(`Nearest beach (${nearestBeach.name}) marked on map.`);
      } catch (error) {
          console.error("Error marking nearest beach:", error);
      }
    }
    
    
      function displayGeometriesSafe(data) {
        return new Promise((resolve, reject) => {
          const result = govmap.displayGeometries(data);
          if (result) {
            resolve(result);
          } else {
            reject(new Error("displayGeometries failed to execute"));
          }
        });
      }
      
      function drawNearbyBeaches(userLocation) {
        const userCircle = {
          circleGeometries: [
            {
              x: userLocation.x,
              y: userLocation.y,
              radius: 1100, 
            },
          ],
          geometryType: govmap.geometryType.CIRCLE,
          defaultSymbol: {
            outlineColor: [0, 0, 255, 1],
            outlineWidth: 3,
            fillColor: [0, 0, 255, 0.3],
          },
          clearExisting: false,
          data: {
            tooltips: ["Your location"],
          },
        };
      
        try {
          govmap.displayGeometries(userCircle);
          console.log("User location displayed on map.");
    
          const nearestBeach = findNearestBeach(userLocation);
          if (nearestBeach) {
              markNearestBeach(nearestBeach);
          } else {
              console.warn("No nearby beach found.");
          }
      } catch (error) {
          console.error("Error displaying user location or marking beach:", error);
      }
    
      }
      
    
    function drawUmbrellaIcons() {
        if (segregatedSelected) {
          var umbrellaData = {
            circleGeometries: [
              { x: 174596, y: 655887, radius: 350 }, // Rishon Lezion Separate Beach
              { x: 175122, y: 657489, radius: 350 }, // Bat Yam Separate Beach
              { x: 180732, y: 673334, radius: 350 }, // Herzliya Separate Beach
              { x: 216334.67, y: 596027.33, radius: 350 }, // Dead Sea Separate Beach
              { x: 252231, y: 741316, radius: 350 }, // Northern Tiberias Separate Beach
              { x: 252298, y: 741199, radius: 350 }, // Southern Tiberias Separate Beach
              { x: 178445, y: 666706, radius: 350 }, // Nordau Tel Aviv Beach
              { x: 186328, y: 694586, radius: 350 }, // Kiryat Sanz Netanya Separate Beach
              { x: 196724, y: 384234, radius: 350 }, // Eilat Separate Beach
              { x: 207653, y: 758232, radius: 350 }, // Argaman Acre Beach
              { x: 164726, y: 633285, radius: 350 }, // Ashdod Separate Beach
              { x: 157393, y: 620205, radius: 350 }, // Ashkelon Separate Beach
              { x: 199297, y: 748638, radius: 350 }, // Quiet Beach Haifa
              { x: 208676, y: 768497, radius: 350 }, // Nahariya Religious Beach
            ],
            geometryType: govmap.geometryType.CIRCLE,
            defaultSymbol: {
              outlineColor: [255, 105, 180, 1], // Pink
              outlineWidth: 5,
              fillColor: [255, 182, 193, 0.5], // Light Pink
            },
            clearExisting: false,
            data: {
              tooltips: [
                "Click here for information about Rishon Lezion Separate Beach",
                "Click here for information about Bat Yam Separate Beach",
                "Click here for information about Herzliya Separate Beach",
                "Click here for information about Dead Sea Separate Beach",
                "Click here for information about Northern Tiberias Separate Beach",
                "Click here for information about Southern Tiberias Separate Beach",
                "Click here for information about Nordau Tel Aviv Beach",
                "Click here for information about Kiryat Sanz Netanya Separate Beach",
                "Click here for information about Eilat Separate Beach",
                "Click here for information about Argaman Acre Beach",
                "Click here for information about Ashdod Separate Beach",
                "Click here for information about Ashkelon Separate Beach",
                "Click here for information about Quiet Beach Haifa",
                "Click here for information about Nahariya Religious Beach",
              ],
              bubbleHTML: '<h3>{0}</h3><p>{1}</p>',
              bubbleHTMLParameters: [
                ["Rishon Lezion Separate Beach", "Suitable for children, wheelchair accessible including parking lot."],
                ["Bat Yam Separate Beach", "Separate beach days for women (Sun, Tue, Thu) and men (Mon, Wed, Fri)."],
                ["Herzliya Separate Beach", "Women swim Sun, Tue, Thu; men swim Mon, Wed, Fri."],
                ["Dead Sea Separate Beach", "Free entrance, complete separation. Paid parking available."],
                ["Northern Tiberias Separate Beach", "Open 9:00 AM to 5:30 PM. Free entrance."],
                ["Southern Tiberias Separate Beach", "Open 9:00 AM to 5:30 PM. Free entrance."],
                ["Nordau Tel Aviv Beach", "Popular beach with separate swimming days for men and women."],
                ["Kiryat Sanz Netanya Separate Beach", "Wheelchair accessible, separate days for men and women."],
                ["Eilat Separate Beach", "Approved for swimming, managed by Eilat municipality."],
                ["Argaman Acre Beach", "Sandy beach with lifeguard services and fitness facilities."],
                ["Ashdod Separate Beach", "Even days for men, odd days for women."],
                ["Ashkelon Separate Beach", "Accessible for people with disabilities and wheelchairs."],
                ["Quiet Beach Haifa", "Located near Rambam Hospital with separate days for men and women."],
                ["Nahariya Religious Beach", "Even days for men, odd days for women."],
              ],
            },
  
          };
      
          govmap.displayGeometries(umbrellaData).then(function (response) {
            console.log("Segregated beach icons added to the map.");
            segregatedGeometryIds = segregatedGeometryIds.concat(response.data);
          }).catch(function (error) {
            console.error("Error displaying segregated beaches:", error);
          });
        } else {
          clearSegregatedGeometries();
        }
      }
      

    // Load beaches and draw them on the map
    function loadBeaches() {
        $.getJSON("shores.json", function (beaches) {
            drawBeaches(beaches);
        }).fail(function (jqxhr, textStatus, error) {
            console.error("Error loading shores.json:", textStatus, error);
        });
    }

    function drawBeaches(beaches) {
        clearBeachMarkers(); // Clear any existing markers
        
        beachMarkers = beaches.map(beach => {
            return {
                x: beach.X,
                y: beach.Y,
                geometryType: govmap.geometryType.POINT,
                defaultSymbol: {
                    type: govmap.drawType.Point,
                    fillColor: [0, 0, 255, 1], // Blue circles for all beaches
                    outlineColor: [255, 255, 255, 1],
                    outlineWidth: 1,
                    size: 50
                },
                data: {
                    tooltips: [beach.Name] // Tooltip with beach name
                }
            };
        });

        govmap.displayGeometries({
            wkts: beachMarkers.map(b => `POINT(${b.x} ${b.y})`),
            names: beachMarkers.map(b => b.data.tooltips[0]),
            geometryType: govmap.geometryType.POINT,
            defaultSymbol: {
                type: govmap.drawType.Point,
                fillColor: [0, 0, 255, 1],
                outlineColor: [255, 255, 255, 1],
                outlineWidth: 1,
                size: 20
            },
            data: {
                tooltips: beachMarkers.map(b => b.data.tooltips[0])
            }
        });
    }

    function clearBeachMarkers() {
        govmap.clearGeometriesByName("beachMarkers");
    }


    $("#nearby-beaches-btn").click(async function () {
        clearBeachMarkers(); // Clear the beach markers before applying filters
        if (nearbyBeachesSelected) {
            location.reload();
        } else {
            try {
                const userLocation = await getUserLocationISR();
                drawNearbyBeaches(userLocation);
                nearbyBeachesSelected = true;
                $("#nearby-beaches-icon").text("✅");
            } catch (error) {
                console.error("Error fetching user location:", error);
                alert("Unable to fetch user location.");
            }
        }
    });


    
    $("#segregated-btn").click(function () {
        clearBeachMarkers();
        if (segregatedSelected) {
            location.reload(); // Refresh page when unchecking
        } else {
            segregatedSelected = true;
            $("#segregated-icon").text("✅");
            drawUmbrellaIcons();
        }
    });
    
    
  
    $("#more-details-btn").click(function () {
      $("#details-popup").removeClass("hidden");
  });
  
  // Handle "Close" button click in the popup
  $("#close-btn").click(function () {
      $("#details-popup").addClass("hidden");
  });
  
  // Optional: Close the popup when clicking outside of it
  $(document).click(function (event) {
      if (!$(event.target).closest("#details-popup, #more-details-btn").length) {
          $("#details-popup").addClass("hidden");
      }
  });
  $("#location-btn").click(function () {
    window.location.href = "my-location.html";
  });
  
  // Navigate to "Accessible Beaches" page
  $("#bus-btn").click(function () {
    window.location.href = "accessible-beaches.html";
  });
});
