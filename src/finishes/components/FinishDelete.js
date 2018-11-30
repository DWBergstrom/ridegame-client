import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { apiCreateFinish, apiDeleteFinish, handleErrors } from '../api'


class FinishDelete extends React.Component {

  constructor(props) {
    super(props)


  }

  deleteFinish = event => {
    event.preventDefault()

    console.log('this.props in deleteFinish is now ', this.props)
    const user = this.props.user
    const finishId = this.props.id

    apiDeleteFinish(finishId, user)
      .then(handleErrors)
      .then(() => {
        console.log('ride successfully deleted')
        console.log('this.props in apiDeleteFinish then is ', this.props)
        this.props.changeHandler()
      })
      .catch(() => console.log('error deleting ride!'))

  }

  render() {

    return (
      <div>
        <form onSubmit={this.deleteFinish}>
          <button type="submit">Remove ride</button>
        </form>
      </div>
    )
  }

}

export default FinishDelete
