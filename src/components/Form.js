import React from 'react'

export default (props) => {
  return (
      <form onSubmit={props.getWeather} className="form-container" autoComplete="off">
        <button className="btn">Get Weather</button>
        <input className="form" type="text" name="city" placeholder="City..." />
        <input className="form" type="text" name="country" placeholder="Country..." />
      </form>
  )
}
