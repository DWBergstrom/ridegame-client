import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { apiUpdateFinish, handleErrors } from '../api'
import './Finishes.scss'

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
      ride_id: this.props.ride_id,
      notes: this.state.notes,
      date: this.state.date,
      duration: this.state.duration
    }

    const finishId = this.props.id

    apiUpdateFinish(finishData, finishId, user)
      .then(handleErrors)
      .then(() => {
        this.setState({ dateClicked: false })
        if (this.props.detail === true) {
          this.props.history.push('/finishes')
        } else {
          this.props.changeHandler()
        }
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
            className="form-style"
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
            className="form-style"
          />
          <button type="submit" className="btn-primary">Update ride</button>
        </form>
      </div>
    )
  }

}

export default withRouter(FinishUpdate)
