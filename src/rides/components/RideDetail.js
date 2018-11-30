import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
const config = require('../../config.js')
const apiUrl = config.apiUrl


class RideDetail extends React.Component {


  render () {
    return (
      <h2>Ride Detail</h2>
    )
  }

}

export default RideDetail
