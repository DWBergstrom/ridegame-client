import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Rides.scss'
const _ = require('lodash')
const config = require('../../config.js')
const apiUrl = config.apiUrl


// *** leaderboard is not currently in use while reconsidering how to pull
// this data safely from the API
class Leaderboard extends React.Component {

  constructor(props) {
    super(props)

    // renderPlease helps ensure the stats re-render when arriving back at this
    // view from another component
    this.state = {
      finishes: [],
      renderPlease: 0,
      flashMessage: ''
    }

    this.users = {

    }

    // variable to help stabilize the stats calculation (more below)
    this.renderRun = 0

  }

  async componentWillMount() {
    const token = this.props.user.token

    try {
      const response = await axios.get(`${apiUrl}` + '/finishes', { headers: { Authorization: `Bearer ${token}` } })
      this.setState({finishes: response.data.finishes})
    }
    catch(err) {
      this.setState({flashMessage: <p>There may be a network issue...try clicking Rides again</p>})
    }

    const finishes = this.state.finishes

    // create object to associate users with points for finishes
    finishes.forEach(finish => {
      const currentEmail = finish.user.email
      if (!this.users[currentEmail]) {
        this.users[currentEmail] = 0
      }
      const userObject = this.users
      for (const email in userObject) {
        if(email === currentEmail){
          this.users[currentEmail]+=finish.ride.points
        }
      }
    })
    const userObject = this.users

    // create array from the users/points object above (for sorting)
    const sortedUsersArray = []
    for (const user in userObject) {
      sortedUsersArray.push([user, userObject[user]])
    }

    // sort the array
    sortedUsersArray.sort(function(a, b) {
      return b[1] - a[1]
    })

    // create a new sorted object from the array with lodash
    const sortedUsersObject = _.fromPairs(sortedUsersArray)
    this.users = sortedUsersObject

    // use the function passed from the parent to ensure the leaderboard rerenders
    this.setState({renderPlease: Math.random()})

  }


  render () {

    let leaderboardUser = ''
    let leaderboardPoints = ''
    const userEmailArray = []
    const userPointsArray = []

    // separate the users/points object into two arrays
    for (const email in this.users) {
      userEmailArray.push(email)
      userPointsArray.push(this.users[email])
    }

    // create left side of leaderboard (users)
    leaderboardUser = userEmailArray.map(user => {

      return (
        <p key={user}>{user}</p>
      )
    })

    // create right side of leaderboard (points)
    leaderboardPoints = userPointsArray.map(point => {
      // use a random key to avoid key collisions
      return (
        <p key={Math.random()}>{point}</p>
      )
    })


    // generate leaderboard view
    return (
      <div className="leaderboard-aside">
        <h1>Leaderboard</h1>
        <div className="leader-container">
          <div>
            <h3>User</h3>
            {leaderboardUser}
            {this.state.flashMessage}
          </div>
          <div className="leader-points">
            <h3>Points</h3>
            {leaderboardPoints}
          </div>
        </div>
      </div>

    )
  }

}

export default Leaderboard
