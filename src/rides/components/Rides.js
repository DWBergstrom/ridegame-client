import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'
import './Rides.scss'


// Class Component
class Rides extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      rides: []
    }
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:4741/rides')
    this.setState({rides: response.data.rides})

  }

  render() {
    let individualRide
    const { rides } = this.state
    const user = this.props.user

    if (rides.length === 0) {
      individualRide = <p>Loading</p>
    } else {
      individualRide = rides.map(ride => {
        const { id, name, photo_url, description, distance, points } = ride

        const finishData = {
          user_id: this.props.user.id,
          ride_id: id,
          notes: '',
          date: '',
          duration: ''
        }

        return (
          <div className="ride-div" key={id}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Distance: {distance}</p>
            <p>Points: {points}</p>
            <FinishNew user={user} {...finishData}/>
            <br />
          </div>
        )
      })
    }
    return (
      <React.Fragment>
        <h2 className="leaderboard-aside">Leaderboard</h2>
        <h1>Rides</h1>
        {individualRide}
      </React.Fragment>
    )
  }

}

export default Rides
