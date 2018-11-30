import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishDelete from './FinishDelete'
import FinishUpdate from './FinishUpdate'
import './Finishes.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl

class Finishes extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      finishes: []
    }

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
      individualFinish = <p>Loading</p>
    } else {
      individualFinish = finishes.map(finish => {
        const { id, notes, date, duration } = finish
        const points = finish.ride.points
        const name = finish.ride.name
        const rideId = finish.ride.id
        const changeProps = {
          user: this.props.user,
          id: id,
          notes: notes,
          date: date,
          duration: duration,
          rideId: rideId
        }
        return (
          <div className="finishes-div" key={id}>
            <h3><Link to={`/finishes/${id}`} replace>Ride: {name}</Link></h3>
            <p>Notes: {notes}</p>
            <p>Date: {date}</p>
            <p>Duration: {duration}</p>
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
        <h2 className="user-stats">My stats</h2>
        <h1>My completed rides</h1>
        {individualFinish}
      </React.Fragment>
    )
  }
}

export default Finishes
