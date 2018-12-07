import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Rides.scss'

class About extends React.Component {

  render () {
    return (
      <div className="about">
        <h2>What is BOSRide?</h2>
        <p>BOSRide is all about getting you out for some exercise!  Please sign up, then go ahead and choose one of the available rides after you have
        completed it, and it will be added to your Finished Rides.  Add a quick note about how the ride went.
        You will be placed on a leaderboard with other users to see how you are doing! Feel free to update your finished ride details
        from the -more options- link on any of your finished rides.</p>
      </div>

    )
  }
}

export default About
