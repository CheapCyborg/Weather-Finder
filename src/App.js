import React, { Component } from "react";
import $ from 'jquery';
import Titles from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";
import "./App.css";
const API_KEY = "e67676f66969cf18ae797f10216c3240";
let count = 0;

export default class App extends Component {
  state = {
    conditions: 0,
    tempature: "",
    humidity: "",
    city: "",
    country: "",
    description: "",
    id: "",
    forecast: null,
    error: null
  };
  componentDidUpdate() {
    console.log("update");
    count++;
    console.log("render");
    if (count === 1) {
      $(".box2").animate({
        marginTop: "-=90%"
      }, 2000);
    }
    console.log(count);
  }

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${API_KEY}`
    );
    const data = await api_call.json();
    console.log(data);
    if (data.cod === "404") {
      this.setState({
        error: data.message
      });
    } 
    else {
      this.setState(
        {
          conditions: data.weather[0].id,
          tempature: data.main.temp,
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
      `http://api.openweathermap.org/data/2.5/forecast?id=${
        this.state.id
      }&units=imperial&APPID=${API_KEY}`
    );
    const data = await api_call.json();
    this.setState(
      {
        forecast: data.list
      },
      () => {
        this.state.forecast.map((forecast, i) => {
          var forecastString = forecast.dt.toString();
          var day = forecastString.slice(0, 5);
          if (forecastString.includes(day)) {
          }
        });
      }
    );
    console.log("i just rendered");
  };

  render() {
    return (
      <div>
        <div className="box2">
          <Titles />
          <Form getWeather={this.getWeather} />
        </div>
        <Weather
          conditions={this.state.conditions}
          tempature={this.state.tempature}
          humidity={this.state.humidity}
          city={this.state.city}
          country={this.state.country}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    );
  }
}
