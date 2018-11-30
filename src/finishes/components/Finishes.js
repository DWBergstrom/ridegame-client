import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Finishes.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl

class Finishes extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      finishes: []
    }
  }

  async componentDidMount() {
    const token = this.props.user.token

    const response = await axios.get(`${apiUrl}` + '/finishes', { headers: { Authorization: `Bearer ${token}` } })
    this.setState({finishes: response.data.finishes})

  }

  render() {
    let individualFinish
    const { finishes } = this.state

    if (finishes.length === 0) {
      individualFinish = <p>Loading</p>
    } else {
      individualFinish = finishes.map(finish => {
        const { id, notes, date, duration } = finish
        const points = finish.ride.points
        const name = finish.ride.name
        return (
          <div className="finishes-div" key={id}>
            <h3>Ride: {name}</h3>
            <p>Notes: {notes}</p>
            <p>Date: {date}</p>
            <p>Duration: {duration}</p>
            <p>Points: {points}</p>
          </div>
        )
      })
    }
    return (
      <React.Fragment>
        <h2 className="user-stats">My stats</h2>
        <h1>My completed rides</h1>
        {individualFinish}
      </React.Fragment>
    )
  }
}

export default Finishes
