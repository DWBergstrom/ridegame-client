import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { apiCreateFinish, handleErrors } from '../api'


class FinishNew extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  createFinish = event => {
    event.preventDefault()

    const { newExample } = this.state
    const { flash, history, user } = this.props
    const finishData = {
      user_id: this.props.user_id,
      ride_id: this.props.ride_id,
      notes: this.state.notes,
      date: '2018-11-30',
      duration: '50'
    }

    apiCreateFinish(finishData, user)
      .then(handleErrors)
      .then(() => console.log('success!'))
      .then(() => history.push('/finishes'))
      .catch(() => console.log('error!'))
  }

  render() {
    console.log('this.state in FinishNew render is ', this.state)
    console.log('this.props in FinishNew is ', this.props)
    const { notes, duration } = this.state

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
          <button type="submit">Add ride</button>
        </form>
      </React.Fragment>
    )
  }

}

export default FinishNew
