import React, { Component } from "react";
import $ from "jquery";
import { Grid, Row, Col, ProgressBar } from "react-bootstrap";

let count = 0;

export default class Weather extends Component {
  componentWillReceiveProps = () => {
    count++;
    console.log("render");
    if (count === 1) {
      $(".box").css("margin-left", -3000);
      $(".box").animate(
        {
          marginLeft: "+=2950"
        },
        1000
      );
    }
  };
  render() {
    return (
      <div className="box-container">
        {this.props.city && (
          <div>
            <i className={"wi wi-owm-" + this.props.conditions + " big-icon"} />
            <p className="location">{this.props.city}</p>
            <p className="description">{this.props.description}</p>
            <Grid>
              <div className="container-fluid">
                <Row>
                  {/* Tempature */}
                  <Col sm={6}>
                    {this.props.tempature >= -10 &&
                      this.props.tempature < 60 && (
                        <div>
                          <ProgressBar
                            bsStyle="info"
                            now={20}
                            label={this.props.tempature}
                          />
                        </div>
                      )}
                    {this.props.tempature >= 60 &&
                      this.props.tempature < 80 && (
                        <div>
                          <ProgressBar
                            bsStyle="success"
                            now={40}
                            label={this.props.tempature}
                          />
                        </div>
                      )}
                    {this.props.tempature >= 80 &&
                      this.props.tempature < 90 && (
                        <div>
                          <ProgressBar
                            bsStyle="warning"
                            now={60}
                            label={this.props.tempature}
                          />
                        </div>
                      )}
                    {this.props.tempature >= 90 && (
                      <div>
                        <i className="wi wi-thermometer" />
                        <ProgressBar
                          bsStyle="danger"
                          now={80}
                          label={this.props.tempature}
                        />
                      </div>
                    )}
                    <i className="wi wi-thermometer bigger-icon" />
                    <p className="temp-text">LOW: {this.props.low}</p>
                    <p className="temp-text"> HIGH: {this.props.high}</p>
                  </Col>
                  <Col sm={6}>
                    {/* Humidity */}
                    {this.props.humidity <= 50 &&
                      this.props.humidity < 70 && (
                        <div>
                          <ProgressBar
                            bsStyle="info"
                            now={20}
                            label={this.props.humidity}
                          />
                        </div>
                      )}
                    {this.props.humidity >= 70 &&
                      this.props.humidity < 80 && (
                        <div>
                          <ProgressBar
                            bsStyle="success"
                            now={40}
                            label={this.props.humidity}
                          />
                        </div>
                      )}
                    {this.props.humidity >= 80 &&
                      this.props.humidity < 90 && (
                        <div>
                          <ProgressBar
                            bsStyle="warning"
                            now={60}
                            label={this.props.humidity}
                          />
                        </div>
                      )}
                    {this.props.humidity >= 90 && (
                      <div>
                        <ProgressBar
                          bsStyle="danger"
                          now={80}
                          label={this.props.humidity}
                        />
                      </div>
                    )}
                    <i className="wi wi-humidity bigger-icon" />
                  </Col>

                  {/* Conditions */}
                </Row>
              </div>
            </Grid>
          </div>
        )}
        {this.props.error != null && (
          <p className="title">{this.props.error}</p>
        )}
      </div>
    );
  }
}
