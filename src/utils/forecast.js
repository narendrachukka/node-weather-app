const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3db0bcb1a2734636c660d1571c228511&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect");
    } else if (body.error) {
      callback(body.error.info);
    } else {
      const data = body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]},Temperature is ${
          data.temperature
        } but feels like ${data.feelslike}, Humidity is ${data.humidity}%`
      );
    }
  });
};

module.exports = forecast;
