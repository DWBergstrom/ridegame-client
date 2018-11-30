import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { apiCreateFinish, handleErrors } from '../api'


class FinishNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      created: false,
      date: '',
      notes: '',
      duration: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  createFinish = event => {
    event.preventDefault()

    const { flash, user } = this.props
    const finishData = {
      user_id: this.props.user_id,
      ride_id: this.props.ride_id,
      notes: this.state.notes,
      date: this.state.date,
      duration: this.state.duration
    }

    apiCreateFinish(finishData, user)
      .then(handleErrors)
      .then(() => {
        this.setState({ created: true })
      })
      .catch(() => console.log('error adding ride!'))
  }

  render() {
    if (this.state.created === true) {
      return <Redirect to='/finishes' />
    }
    const { notes, duration, date } = this.state

    return (
      <React.Fragment>
        <h3>Add to my finished rides</h3>
        <form onSubmit={this.createFinish}>
          <label htmlFor="oldpw">Notes</label>
          <input
            required
            name="notes"
            value={notes}
            type="text"
            placeholder="New Finish"
            onChange={this.handleChange}
          />
          <input
            required
            name="date"
            value={date}
            type="date"
            placeholder="Select Date"
            onChange={this.handleChange}
          />
          <input
            required
            name="duration"
            value={duration}
            type="text"
            placeholder="Enter duration in minutes"
            onChange={this.handleChange}
          />
          <button type="submit">Add ride</button>
        </form>
      </React.Fragment>
    )
  }

}

export default FinishNew
