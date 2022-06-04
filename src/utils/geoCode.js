const request = require("request");

const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=59d13096d45619afa17c61eb1d310ebb&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocoding service.", undefined);
    } else if (response.body.error) {
      callback("Unable to locate the city.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].label,
      });
      // const { latitude: lat, longitude: lng } = response.body.data[0];
      // console.log(lat, lng);
    }
  });
};

module.exports = geoCode;
