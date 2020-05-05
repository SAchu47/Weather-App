import React from 'react';

import './App.css';

import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import { unstable_batchedUpdates } from 'react-dom';
import Form from './app_component/form.component';

const API_KEY = '076a9e1b6b57e18bb24afc0daad58cbc';

class App extends React.Component {
  constructor(){
    super();
      this.state = {
        city: undefined,
        country: undefined,
        icon: undefined,
        main: undefined,
        temperature: undefined,
        humidity: undefined,
        precepition: undefined,
        description: "",
        error: false
      };
      

      this.weatherIcon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog"
      }
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    return Math.floor(temp - 273.15)
  }

  getWeather = async (e) => {

    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    

    if(city && country) {
      const api_data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    
      const response  = await api_data.json();

      const api_data_his = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${API_KEY}`); 

      const response_his = await api_data_his.json();


      console.log(response_his)

      this.setState({
        city: `${response.name}`,
        country: `${response.sys.country}`,
        temperature: this.calCelsius(response.main.temp),
        humidity: response.main.humidity,
        precepition: response_his.daily[0].rain,
        description: response.weather[0].description,
        error: false
      })

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
    }
    else {
      this.setState({
        error: true
      });
    }

  }

  render () {
    return (
      <div className="App">
      <Form loadWeather={this.getWeather} error={this.state.error}/>
      <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp={this.state.temperature}
        hum={this.state.humidity}
        pre={this.state.precepition}
        description={this.state.description}
        weatherIcon={this.state.icon}
        />
      </div>
    )
  }
}

export default App;
