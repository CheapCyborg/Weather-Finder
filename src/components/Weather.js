import React, { Component } from "react";
import $ from "jquery";

let count = 0;

export default class Weather extends Component {
  componentWillReceiveProps = () => {
    count++
    console.log("render");
    if(count === 1) {
      $(".box").css("margin-left", -2000);
      $(".box").animate({
        marginLeft: "+=2050"
      }, 1000);
    }
    console.log(count)  
  };
  render() {
    return (
      <div className="box">
        {this.props.city && (
          <div>
            <i className={"wi wi-owm-" + this.props.conditions + " big-icon"} />
            <p className="location">
            {this.props.city}, {this.props.country}{" "}
            </p>
            <p>Tempature: {this.props.tempature}</p>
            <p>Humidity: {this.props.humidity}</p>
            <p>Conditions: {this.props.description}</p>
          </div>
        )}
        {this.props.error != null && <p className="title">{this.props.error}</p>}
      </div>
    );
  }
}
