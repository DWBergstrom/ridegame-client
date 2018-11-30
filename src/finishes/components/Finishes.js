import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishDelete from './FinishDelete'
import FinishUpdate from './FinishUpdate'
import FinishStats from './FinishStats'
import './Finishes.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl

class Finishes extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      finishes: []
    }

    this.totalDistance = 0
    this.totalRides = 0
    this.totalTime = 0
    this.totalPoints = 0

    this.changeHandler = this.changeHandler.bind(this)

  }

  async componentDidMount() {
    const token = this.props.user.token

    const response = await axios.get(`${apiUrl}` + '/finishes', { headers: { Authorization: `Bearer ${token}` } })
    this.setState({finishes: response.data.finishes})

  }

  changeHandler() {
    this.componentDidMount()
  }



  render() {
    let individualFinish
    const { finishes } = this.state
    const  user = this.props.user

    if (finishes.length === 0) {
      individualFinish = <p>Add some rides!</p>
    } else {

      individualFinish = finishes.map(finish => {
        const { id, notes, date, duration } = finish
        const points = finish.ride.points
        const name = finish.ride.name
        const distance = finish.ride.distance
        const ride_id = finish.ride.id
        const changeProps = {
          user: this.props.user,
          id: id,
          notes: notes,
          date: date,
          duration: duration,
          ride_id: ride_id,
          distance: distance
        }

        // recalc totals
        this.totalDistance += distance
        this.totalRides += 1
        this.totalTime += duration
        this.totalPoints += points

        const detail_link = {
          pathname: `/finishes/${id}`,
          finishParams: {id, name, notes, date, duration, ride_id, points, user, distance}
        }
        return (
          <div className="finishes-div" key={id}>
            <h3><Link to={detail_link} user={user} replace>Ride: {name}</Link></h3>
            <p>Notes: {notes}</p>
            <p>Date: {date}</p>
            <p>Duration: {duration}</p>
            <p>Distance: {distance}</p>
            <p>Points: {points}</p>
            <FinishDelete changeHandler={this.changeHandler} {...changeProps}/>
            <br />
            <FinishUpdate changeHandler={this.changeHandler} {...changeProps}/>
          </div>
        )
      })
    }

    return (
      <React.Fragment>
        <div className="stats-aside">
          <h2>My stats</h2>
          <p>Distance: {this.totalDistance / 2} miles</p>
          <p>Time: {(this.totalTime / 2 / 60).toFixed(1)} hours</p>
          <p>Rides: {this.totalRides / 2}</p>
          <p>Points: {this.totalPoints / 2}</p>
        </div>
        <div className="user-finishes">
          <h1>My completed rides</h1>
          {individualFinish}
        </div>
      </React.Fragment>
    )
  }
}

export default Finishes
