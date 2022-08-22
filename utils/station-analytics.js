"use strict";

const stationAnalytics = {

  getLatestReading(station) {
    let latestReading = station.readings[station.readings.length - 1];
    return latestReading;
  },


  getMaxTemperature(station) {
    let maxTemp = null;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
    }
    return maxTemp;
  },

  getMinTemperature(station) {
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
    }
    return minTemp;
  },

  celciusToFahrenheit(station) {
    let fahrenheit = null;
    if (station.readings.length > 0) {
      let celcius = this.getLatestReading(station).temperature;
      fahrenheit = (9 * celcius / 5) + 32
    }
    return fahrenheit;
  },

  getMaxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },

  getMinPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },

  beaufortConversion(station) {
    let beaufort = null;
    if (station.readings.length > 0) {
      let windSpeed = this.getLatestReading(station).windspeed;
      if (windSpeed < 1) {
        beaufort = 0;
      } else if (windSpeed >= 1 && windSpeed < 6) {
        beaufort = 1;
      } else if (windSpeed >= 6 && windSpeed < 12) {
        beaufort = 2;
      } else if (windSpeed >= 12 && windSpeed < 20) {
        beaufort = 3;
      } else if (windSpeed >= 20 && windSpeed < 29) {
        beaufort = 4;
      } else if (windSpeed >= 29 && windSpeed < 39) {
        beaufort = 5;
      } else if (windSpeed >= 39 && windSpeed < 50) {
        beaufort = 6;
      } else if (windSpeed >= 50 && windSpeed < 62) {
        beaufort = 7;
      } else if (windSpeed >= 62 && windSpeed < 75) {
        beaufort = 8;
      } else if (windSpeed >= 75 && windSpeed < 89) {
        beaufort = 9;
      } else if (windSpeed >= 89 && windSpeed < 103) {
        beaufort = 10;
      } else if (windSpeed >= 103 && windSpeed < 118) {
        beaufort = 11;
      } else {
        beaufort = 0;
      }
    }
    return beaufort;

  },

  windCompassDirection(station) {
    let windDirectionCompass = null;
    if (station.readings.length > 0) {
      let windDirection = this.getLatestReading(station).winddirection;
      if ((windDirection >= 348.75) && (windDirection <= 360) || (windDirection >= 0) && (windDirection < 11.25)) {
        windDirectionCompass = "North";
      } else if (windDirection >= 11.25 && windDirection < 33.75) {
        windDirectionCompass = "North North-East";
      } else if (windDirection >= 33.75 && windDirection < 56.25) {
        windDirectionCompass = "North-East";
      } else if (windDirection >= 56.25 && windDirection < 78.75) {
        windDirectionCompass = "East North-East";
      } else if (windDirection >= 78.75 && windDirection < 101.25) {
        windDirectionCompass = "East";
      } else if (windDirection >= 101.25 && windDirection < 123.75) {
        windDirectionCompass = "East South-East";
      } else if (windDirection >= 123.75 && windDirection < 146.25) {
        windDirectionCompass = "South-East";
      } else if (windDirection >= 146.25 && windDirection < 168.75) {
        windDirectionCompass = "South South-East";
      } else if (windDirection >= 168.75 && windDirection < 191.25) {
        windDirectionCompass = "South";
      } else if (windDirection >= 191.25 && windDirection < 213.75) {
        windDirectionCompass = "South South-West";
      } else if (windDirection >= 213.75 && windDirection < 236.25) {
        windDirectionCompass = "South-West";
      } else if (windDirection >= 236.25 && windDirection < 258.75) {
        windDirectionCompass = "West South-West";
      } else if (windDirection >= 258.75 && windDirection < 281.25) {
        windDirectionCompass = "West";
      } else if (windDirection >= 281.25 && windDirection < 303.75) {
        windDirectionCompass = "West North-West";
      } else if (windDirection >= 303.75 && windDirection < 326.25) {
        windDirectionCompass = "North-West";
      } else if (windDirection >= 326.25 && windDirection < 348.75) {
        windDirectionCompass = "North North-West";
      }
      return windDirectionCompass;
    }
  },

  getMaxWindSpeed(station) {
    let maxWindSpeed = null;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0].windspeed;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].windspeed > maxWindSpeed) {
          maxWindSpeed = station.readings[i].windspeed;
        }
      }
    }
    return maxWindSpeed;
  },

  getMinWindSpeed(station) {
    let minWindSpeed = null;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0].windspeed;
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].windspeed < minWindSpeed) {
          minWindSpeed = station.readings[i].windspeed;
        }
      }
    }
    return minWindSpeed;
  },

  calculateWindChill(station){
    let windChill = null;
    if (station.readings.length > 0){
      let temperature = this.getLatestReading(station).temperature;
      let windSpeed = this.getLatestReading(station).windspeed
      windChill = 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
    }
    return Math.round(windChill);
  },

  getWeatherFromCode(code){
    let conditionMap = new Map();
    conditionMap.set(100, "Clear");
    conditionMap.set(200, "Partial Clouds");
    conditionMap.set(300, "Cloudy");
    conditionMap.set(400, "Light Showers");
    conditionMap.set(500, "Heavy Showers");
    conditionMap.set(600, "Rain");
    conditionMap.set(700, "Thunder");
    conditionMap.set(800, "Snow");

    return conditionMap.get(code);
  },

  getWeatherIconFromCode(code){
    let conditionIconMap = new Map();
    conditionIconMap.set(100, "sunny");
    conditionIconMap.set(200, "white_sun_small_cloud");
    conditionIconMap.set(300, "cloud");
    conditionIconMap.set(400, "white_sun_rain_cloud");
    conditionIconMap.set(500, "cloud_rain");
    conditionIconMap.set(600, "umbrella");
    conditionIconMap.set(700, "thunder_cloud_rain");
    conditionIconMap.set(800, "snowflake");

    return conditionIconMap.get(code);

  }
}

module.exports = stationAnalytics;