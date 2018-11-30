import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishNew from '../../finishes/components/FinishNew'


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
    console.log('this.props.user in Rides render is ', this.props.user)
    let individualRide
    const { rides } = this.state
    const user = this.props.user

    if (rides.length === 0) {
      individualRide = <p>Loading</p>
    } else {
      individualRide = rides.map(ride => {
        const { id, name, photo_url, description, distance, points } = ride

        return (
          <React.Fragment key={id}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>Distance: {distance}</p>
            <p>Points: {points}</p>
            <FinishNew user={user} />
            <br />
          </React.Fragment>
        )
      })
    }
    return (
      <React.Fragment>
        <h2 className="leaderboard">Leaderboard</h2>
        <h1>Rides</h1>
        {individualRide}
      </React.Fragment>
    )
  }

}

export default Rides
