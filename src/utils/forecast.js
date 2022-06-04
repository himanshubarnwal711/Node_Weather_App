const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=0caef20ad735d1bec75ddd666e215597&query=${lat},${lng}&units=m`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      const city = response.body.location.name;
      const temperature = response.body.current.temperature;
      const precipitation = response.body.current.precip;
      const weather_description = response.body.current.weather_descriptions[0];
      callback(
        undefined,
        `${weather_description}. It is currently ${temperature} degrees out in ${city}. There is a ${precipitation}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
