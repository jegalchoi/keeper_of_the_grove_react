import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'

export class Plant extends Component {
  state = {
    plant: { 
      notes: ''
    }
  }

  addHtmlEntities = str => {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  }

  deletePlant = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `http://localhost:3001/api/v1/users/${this.props.user.id}/plants/${id}`

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(() => this.props.history.push('/api/v1/plants'))
      .catch(error => console.log(error.message))
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `http://localhost:3001/api/v1/users/${this.props.user.id}/plants/${id}`
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(json => {
        this.setState({
          plant: json.plant,
        })
      })
      .catch(() => this.props.history.push('/api/v1/plants'))
  }

  render() {
    const { plant } = this.state;
    let notes = 'N/A';
    if (plant.notes != null) {
      notes = plant.notes
        .split(',')
        .map((note, idx) => (
          <li key={idx} className='list-group-item'>
            {note}
          </li>
        ))
    }
    const plantWater = this.addHtmlEntities((plant.water) ? 'needs water' : 'does not need water');

    return (
      <div className=''>
        <div className='hero position-relative d-flex align-items-center justify-content-center'>
          <img
            src={plant.image}
            alt={`${plant.name} image`}
            className='img-fluid position-absolute'
          />
          <div className='overlay bg-dark position-absolute' />
          <h1 className='display-4 position-relative text-white'>
            {plant.name}
          </h1>
        </div>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-sm-12 col-lg-3'>
              <ul className='list-group'>
                <h5 className='mb-2'>Notes</h5>
                {notes}
              </ul>
            </div>
            {plant.water !== null ? (
              <div className='col-sm-12 col-lg-7'>
                <h5 className='mb-2'>Last watered</h5>
                <TimeAgo date={plant.water} />
              </div>
            ) : (
              <div className='col-sm-12 col-lg-7'>
                <h5 className='mb-2'>Never been watered...</h5>
              </div>
            )}
            {/* <div
                dangerouslySetInnerHTML={{
                  __html: `${plantWater}`,
                }}
              /> */}

            <div className='col-sm-12 col-lg-2'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={this.deletePlant}
              >
                Delete Plant
              </button>
            </div>
          </div>
          <Link to='/api/v1/plants' className='btn btn-link'>
            Back to plants
          </Link>
        </div>
      </div>
    )
  }
}
