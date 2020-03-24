import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class Plants extends Component {
  state = {
    plants: [],
  }

  componentDidMount() {
    const url = `http://localhost:3001/users/${this.props.user.id}/plants/`;
    axios
      .get(url, { withCredentials: true })
      .then(response => {
        if (response.statusText == 'OK') {          
          return response.data;
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {
          this.setState({
            plants: json.plants
          })
      })
      .catch(() => this.props.history.push('/'))
  }

  render() {
    const { plants } = this.state;
    const allPlants = plants.map(plant => (
      <div key={plant.id} className='col-md-6 col-lg-4'>
        <div className='card mb-4'>
          <img
            src={plant.image}
            className='card-img-top'
            alt={`${plant.name} image`}
          />
          <div className='card-body'>
            <h5 className='card-title'>{plant.name}</h5>
            <Link
              to={`/users/${this.props.user.id}/plants/${plant.id}`}
              className='btn custom-button'
            >
              View Plant
          </Link>
          </div>
        </div>
      </div>
    ));
    const noPlant = (
      <div className='vw-100 vh-50 d-flex align-items-center justify-content-center'>
        <h4>
          No plants yet.  Why not <Link to='/new_plant'>create one</Link>
        </h4>
      </div>
    )

    return (
      <>
        <section className='jumbotron jumbotron-fluid text-center'>
          <div className='container py-5'>
            <h1 className='display-4'>Grove Guardian</h1>
            <p className='lead text-muted'>
              Keep your plants properly watered.
            </p>
          </div>
        </section>
        <div className='py-5'>
          <main className='container'>
            <div className='text-right mb-3'>
              <Link to={`/users/${this.props.user.id}/plant`} className='btn btn-lg btn-primary'>
                Create New Plant
              </Link>
            </div>
            <div className='row'>
              {plants.length > 0 ? allPlants : noPlant}
            </div>
            <Link to='/' className='btn btn-link'>
              Home
              </Link>
          </main>
        </div>
      </>
    )
  }
}
