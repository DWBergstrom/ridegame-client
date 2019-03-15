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
      finishes: [],
      flashMessage: ''
    }

    // declare variables for stats aside
    this.totalDistance = 0
    this.totalRides = 0
    this.totalTime = 0
    this.totalPoints = 0
    this.renderRun = 0

    // bind this to changeHandler function below, which helps rerender the stats
    // when returning to this view
    this.changeHandler = this.changeHandler.bind(this)

  }

  async componentDidMount() {
    const token = this.props.user.token

    // call to API for finishes
    try {
      const response = await axios.get(`${apiUrl}` + '/finishes', { headers: { Authorization: `Bearer ${token}` } })
      this.setState({finishes: response.data.finishes})
    }
    catch(err) {
      this.setState({flashMessage: <p>There may be a network issue...try clicking My Finished Rides again</p>})
    }

  }

  // changeHandler is passes as prop to help rerender this component when returning
  // after adding a finish
  changeHandler() {
    console.log('changeHandler run')
    this.componentDidMount()
  }

  render() {
    let individualFinish
    const { finishes } = this.state
    const  currentUser = this.props.user
    const flash = this.props.flash

    // handle case of no finishes created yet
    if (finishes.length === 0) {
      individualFinish = <Link to="/rides">Add some rides to your finished stats!</Link>
    } else {

      // pull data from each finish
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

        // calculate unix time of the date of each finish to get weather data
        // from darksky API
        const unixTs = Math.round((new Date(date)).getTime() / 1000)


        // verify this is the current user's data only (was valid when leaderboard was implemented)
        if (finishUser.id === currentUser.id) {
          this.totalDistance += distance
          this.totalRides += 1
          this.totalTime += duration
          this.totalPoints += points

          // create props to send to detail view
          const detail_link = {
            pathname: `/finishes/${id}`,
            finishParams: {id, name, notes, date, unixTs, duration, ride_id, points, distance, user: this.props.user, flash}
          }
          return (
            <div className="finishes-div" key={id}>
              <h3>Ride: {name}</h3>
              <p>Notes: {notes}</p>
              <p>Date: {date}</p>
              <p>Duration: {duration} minutes</p>
              <p>Distance: {distance} miles</p>
              <p>Points: {points}</p>
              <Link to={detail_link} className="finish-detail-link">Click here for more options</Link>
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

    // calculate stats
    return (
      <React.Fragment>
        <div className="stats-aside">
          <h2>My stats</h2>
          <p>Distance: {this.totalDistance} miles</p>
          <p>Time: {(this.totalTime / 60).toFixed(1)} hours</p>
          <p>Rides: {this.totalRides}</p>
          <p>Points: {this.totalPoints}</p>
        </div>
        <h1>My finished rides<img src="https://image.flaticon.com/icons/svg/94/94203.svg" height="50px"/></h1>
        {this.state.flashMessage}
        <div className="user-finishes">
          {individualFinish}
        </div>
      </React.Fragment>
    )
  }

}

export default Finishes
