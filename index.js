const crdDisplay = document.getElementById("crd");

var id, target, options;

async function success(pos) {
  var crd = pos.coords;

  const lat = crd.latitude;
  const lng = crd.longitude;

  //send the coordinates to netlify

  const res = await fetch(
    `https://brave-dubinsky-6f81b2.netlify.app/.netlify/functions/coords?lat=${lat}&lng=${lng}`
  );
  const data = await res.json();
  crdDisplay.innerHTML = "Latitude: " + lat + "\nLongitude: " + lng;

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log("Congratulations, you reached the target");
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.warn("ERROR(" + err.code + "): " + err.message);
}

target = {
  latitude: 0,
  longitude: 0,
};

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

id = navigator.geolocation.watchPosition(success, error, options);

//get set request

// export coords{
//   lng,
//   lat,
// }
