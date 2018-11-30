import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { apiUpdateFinish, handleErrors } from '../api'

class FinishUpdate extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      date: '',
      notes: '',
      duration: '',
      dateClicked: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleClick = event => {
    this.setState({
      dateClicked: true
    })
  }

  updateFinish = event => {
    event.preventDefault()

    const { flash, user } = this.props
    const finishData = {
      user_id: this.props.user.id,
      ride_id: this.props.rideId,
      notes: this.state.notes,
      date: this.state.date,
      duration: this.state.duration
    }

    const finishId = this.props.id

    apiUpdateFinish(finishData, finishId, user)
      .then(handleErrors)
      .then(() => {
        console.log('ride successfully updated!')
        this.setState({ dateClicked: false })
        this.props.changeHandler()
      })
      .catch(() => console.log('error updating ride!'))

  }

  render () {
    const { notes, duration, date } = this.state
    const dateState = this.state.dateClicked ? '' : 'date-placeholder'

    return (
      <div>
        <h3>Update this ride</h3>
        <form onSubmit={this.updateFinish}>
          <label htmlFor="oldpw">Notes</label>
          <input
            required
            name="notes"
            value={notes}
            type="text"
            placeholder={this.props.notes}
            onChange={this.handleChange}
          />
          <input
            required
            name="date"
            value={date}
            type="date"
            placeholder={this.props.date}
            onChange={this.handleChange}
            className={dateState}
            onClick={this.handleClick}
          />
          <input
            required
            name="duration"
            value={duration}
            type="text"
            placeholder={this.props.duration}
            onChange={this.handleChange}
          />
          <button type="submit">Update ride</button>
        </form>
      </div>
    )
  }

}

export default FinishUpdate
