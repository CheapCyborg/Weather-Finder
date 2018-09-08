import React, { Component } from "react";
import Form from "./components/Form";
import Weather from "./components/Weather";
import "./App.css";
const API_KEY = "e67676f66969cf18ae797f10216c3240";

export default class App extends Component {
  state = {
    id: 0,
    conditions: 0,
    tempature: 0,
    low: 0,
    high: 0,
    humidity: 0,
    city: "",
    country: "",
    description: "",
    forecast: null,
    error: null
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`
    );
    const data = await api_call.json();
    console.log(data);
    if (data.cod === "404") {
      this.setState({
        error: data.message
      });
    } else {
      this.setState(
        {
          conditions: data.weather[0].id,
          tempature: Math.round(data.main.temp),
          low: Math.round(data.main.temp_min),
          high: Math.round(data.main.temp_max),
          humidity: data.main.humidity,
          city: data.name,
          country: data.sys.country,
          description: data.weather[0].description,
          id: data.id,
          error: null
        },
        () => {
          this.getForecast();
          console.log("i just rendered");
        }
      );
    }
  };

  getForecast = async e => {
    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${
        this.state.id
      }&units=imperial&APPID=${API_KEY}`
    );
    const data = await api_call.json();
    console.log(data);
    let date = new Date();
    let dateString = [];
    let day = {};
    this.setState(
      {
        forecast: data.list
      },
      () => {
        for (let i = 1; i <= 5; i++) {
          dateString[i] =
            date.getUTCFullYear() +
            "-" +
            ("0" + (date.getUTCMonth() + 1)).slice(-2) +
            "-" +
            ("0" + (date.getUTCDate() + i)).slice(-2) +
            " ";
        }
        this.state.forecast.map((forecast, i) => {
          let stringForecast = forecast.dt_txt;
          for (let j = 1; j <= 5; j++) {
            if(stringForecast.includes(dateString[j])){
              day[j] += [forecast];
            }
          }
        });
      }
    );
    console.log(day);
    console.log(day[2])
  };

  render() {
    return (
      <div className="container-fluid">
        <Form getWeather={this.getWeather} />
        <div className="box">
          <Weather
            conditions={this.state.conditions}
            tempature={this.state.tempature}
            low={this.state.low}
            high={this.state.high}
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}
