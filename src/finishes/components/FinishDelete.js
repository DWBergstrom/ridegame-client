import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import { apiDeleteFinish, handleErrors } from '../api'
import messages from '../messages'


class FinishDelete extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      flashMessage: ''
    }

  }

  deleteFinish = event => {
    event.preventDefault()
    const { flash, user } = this.props
    const finishId = this.props.id


    apiDeleteFinish(finishId, user)
      .then(handleErrors)
      .then(() => flash(messages.deleteFinishSuccess, 'flash-success'))
      .then(() => {
        if (this.props.detail === true) {
          this.props.history.push('/finishes')
        } else {
          this.props.changeHandler()
        }
      })
      .catch(() => flash(messages.deleteFinishFailure, 'flash-error'))

  }

  render() {
    return (
      <div>
        <form onSubmit={this.deleteFinish}>
          <button type="submit" className="btn-danger">Remove ride</button>
        </form>
      </div>
    )
  }

}

export default withRouter(FinishDelete)
