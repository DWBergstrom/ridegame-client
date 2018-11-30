import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Rides.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl

class Leaderboard extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      finishes: []
    }

    this.users = {

    }

  }

  async componentDidMount() {
    const token = this.props.user.token

    const response = await axios.get(`${apiUrl}` + '/finishes', { headers: { Authorization: `Bearer ${token}` } })
    this.setState({finishes: response.data.finishes})

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
    console.log('componentDidMount has run')

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

    console.log('userEmailArray is ', userEmailArray)
    console.log('userPointsArray is ', userPointsArray)


    leaderboardUser = userEmailArray.map(user => {

      return (
        <p key={user}>{user}</p>
      )
    })

    leaderboardPoints = userPointsArray.map(user => {

      return (
        <p key={user}>{user}</p>
      )
    })

    return (
      <div className="leaderboard-aside">
        <h1>Leaderboard</h1>
        <div className="leader-container">
          <div>
            User
            {leaderboardUser}
          </div>
          <div>
            Points
            {leaderboardPoints}
          </div>
        </div>
      </div>

    )
  }

}

export default Leaderboard
