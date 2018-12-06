import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import { apiDeleteFinish, handleErrors } from '../api'


class FinishDelete extends React.Component {

  constructor(props) {
    super(props)

  }

  deleteFinish = event => {
    event.preventDefault()
    console.log('this.props in FinishDelete is ', this.props)
    const user = this.props.user
    const finishId = this.props.id

    apiDeleteFinish(finishId, user)
      .then(handleErrors)
      .then(() => {
        if (this.props.detail === true) {
          this.props.history.push('/finishes')
        } else {
          this.props.changeHandler()
        }
      })
      .catch(() => console.log('error deleting ride!'))

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
