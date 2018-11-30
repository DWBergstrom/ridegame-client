import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


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

    // axios.get('http://localhost:4741/rides')
    //   .then( response => this.setState({rides: response.data.rides}))
    //   .catch(console.error)
  }

  render() {

    const { rides } = this.state

    const individualRide = rides.map(ride => {
      const { id, name, photo_url, description, distance, points } = ride

      return (
        <React.Fragment key={id}>
          <h1>{name}</h1>
          <p>{description}</p>
          <p>Distance: {distance}</p>
          <p>Points: {points}</p>
          <br />
        </React.Fragment>

      )


    })

    return (
      <React.Fragment>
        <h1>Rides</h1>
        {individualRide}
      </React.Fragment>
    )
  }

}

export default Rides
