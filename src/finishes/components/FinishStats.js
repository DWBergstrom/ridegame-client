import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FinishDelete from './FinishDelete'
import FinishUpdate from './FinishUpdate'
import './Finishes.scss'
const config = require('../../config.js')
const apiUrl = config.apiUrl


class FinishStats extends React.Component {

  render () {

    return (
      <h2> finish stats test component </h2>
    )
  }
}

export default FinishStats
