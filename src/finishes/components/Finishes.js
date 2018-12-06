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

    // declare variables for stats aside
    this.totalDistance = 0
    this.totalRides = 0
    this.totalTime = 0
    this.totalPoints = 0
    this.renderRun = 0

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
    const  currentUser = this.props.user

    if (finishes.length === 0) {
      individualFinish = <Link to="/rides">Add some rides to your finished stats!</Link>
    } else {

      individualFinish = finishes.map(finish => {
        const { id, notes, date, duration, user } = finish
        const points = finish.ride.points
        const name = finish.ride.name
        const distance = finish.ride.distance
        const ride_id = finish.ride.id
        const finishUser = user
        const changeProps = {
          user: this.props.user,
          id: id,
          notes: notes,
          date: date,
          duration: duration,
          ride_id: ride_id,
          distance: distance
        }

        if (finishUser.id === currentUser.id) {
          this.totalDistance += distance
          this.totalRides += 1
          this.totalTime += duration
          this.totalPoints += points

          const detail_link = {
            pathname: `/finishes/${id}`,
            finishParams: {id, name, notes, date, duration, ride_id, points, distance, user: this.props.user}
          }
          return (
            <div className="finishes-div" key={id}>
              <h3>Ride: {name}</h3>
              <p>Notes: {notes}</p>
              <p>Date: {date}</p>
              <p>Duration: {duration} minutes</p>
              <p>Distance: {distance} miles</p>
              <p>Points: {points}</p>
              <Link to={detail_link} >Click here for more options</Link>
              {/*<FinishDelete changeHandler={this.changeHandler} {...changeProps}/>
              <br />
              <FinishUpdate changeHandler={this.changeHandler} {...changeProps}/>*/}
            </div>
          )
        }
      })
      if (this.totalDistance === 0) {
        individualFinish = <Link to="/rides">Add some rides to your finished stats!</Link>
      }
      this.renderRun += 1
      if (this.renderRun > 1) {
        this.totalDistance /= this.renderRun
        this.totalRides /= this.renderRun
        this.totalTime /= this.renderRun
        this.totalPoints /= this.renderRun
        this.renderRun -= 1
      }
    }

    return (
      <React.Fragment>
        <div className="stats-aside">
          <h2>My stats</h2>
          <p>Distance: {this.totalDistance} miles</p>
          <p>Time: {(this.totalTime / 60).toFixed(1)} hours</p>
          <p>Rides: {this.totalRides}</p>
          <p>Points: {this.totalPoints}</p>
        </div>
        <div className="user-finishes">
          <h1>My finished rides</h1>
          {individualFinish}
        </div>
      </React.Fragment>
    )
  }

}

export default Finishes
