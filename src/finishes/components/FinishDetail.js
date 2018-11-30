import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import FinishDelete from './FinishDelete'
import FinishUpdate from './FinishUpdate'
const config = require('../../config.js')
const apiUrl = config.apiUrl


class FinishDetail extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      detail: true
    }

  }

  render() {
    const detail = this.state.detail
    const { name, notes, date, duration, points, user, id, ride_id, distance } = this.props.location.finishParams
    const changeProps = {
      name,
      user,
      id,
      notes,
      date,
      duration,
      ride_id,
      distance,
      detail
    }
    return (
      <div>
        <h1>Details for Finished Ride</h1>
        <h3>Ride: {name}</h3>
        <p>Notes: {notes}</p>
        <p>Date: {date}</p>
        <p>Duration: {duration}</p>
        <p>Distance: {distance}</p>
        <p>Points: {points}</p>
        <FinishDelete {...changeProps}/>
        <br />
        <FinishUpdate {...changeProps}/>
      </div>
    )
  }

}

export default FinishDetail
