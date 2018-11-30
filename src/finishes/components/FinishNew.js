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

    apiCreateFinish(this.state, user)
      .then(handleErrors)
      .then(() => console.log('success!'))
      .then(() => history.push('/examples'))
      .catch(() => console.log('error!'))
  }

  render() {
    console.log('this.state in FinishNew render is ', this.state)
    console.log('this.props in FinishNew is ', this.props)
    const { notes } = this.state
    return (
      <React.Fragment>
        <h1>Add to my finished rides</h1>
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
          <button type="submit">Create Finish</button>
        </form>
      </React.Fragment>
    )
  }

}

export default FinishNew
