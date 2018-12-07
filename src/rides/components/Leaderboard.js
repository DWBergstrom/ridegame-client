import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Rides.scss'
const _ = require('lodash')
const config = require('../../config.js')
const apiUrl = config.apiUrl

class Leaderboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      finishes: [],
      renderPlease: 0,
      flashMessage: ''
    }

    this.users = {

    }

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

    const sortedUsersArray = []
    for (const user in userObject) {
      sortedUsersArray.push([user, userObject[user]])
    }

    sortedUsersArray.sort(function(a, b) {
      return b[1] - a[1]
    })

    const sortedUsersObject = _.fromPairs(sortedUsersArray)
    this.users = sortedUsersObject

    this.setState({renderPlease: Math.random()})

  }


  render () {



    let leaderboardUser = ''
    let leaderboardPoints = ''
    const userEmailArray = []
    const userPointsArray = []
    for (const email in this.users) {
      userEmailArray.push(email)
      userPointsArray.push(this.users[email])
    }

    leaderboardUser = userEmailArray.map(user => {

      return (
        <p key={user}>{user}</p>
      )
    })

    leaderboardPoints = userPointsArray.map(point => {
      return (
        <p key={Math.random()}>{point}</p>
      )
    })



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
