import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'
const config = require('../../config.js')
const apiUrl = config.apiUrl


class RideDetail extends React.Component {


  render () {
    const { id, name, photo_url, description, distance, points, user, flash } = this.props.location.rideParams
    const finishData = {
      user_id: user.id,
      ride_id: id,
      distance: distance,
      notes: '',
      date: '',
      duration: '',
      flash
    }
    return (
      <div className="ride-div">
        <h2>Ride Detail</h2>
        <h3> Name: {name} </h3>
        <p>{description}</p>
        <p>Distance: {distance} miles</p>
        <p>Points: {points}</p>
        <iframe src={photo_url} style={{border:0, width:'100%', height:450, frameBorder:0}} allowFullScreen></iframe>
        <FinishNew user={user} {...finishData}/>
      </div>
    )
  }

}

export default RideDetail
