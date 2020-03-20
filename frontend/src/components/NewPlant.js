import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NewPlant extends Component {
  state = {
    name: '',
    notes: '',
    water: null,
    private: true,
    image: '',
    user_id: ''
  }

  stripHtmlEntities = str => {
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const url = 'http://localhost:3001/plants';
    const { name, notes, water, private, image, user_id } = this.state;
    if (name.length == 0 || user_id == 0) {
      return;
    }
    const body = {
      name,
      notes: instruction.replace(/\n/g, '<br />'),
      water,
      private,
      image,
      user_id
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then(json => this.props.history.push(`/recipe/${json.id}`))
      .catch(error => console.log(error.message))
  }

  render() {
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-12 col-lg-6 offset-lg-3'>
            <h1 className='font-weight-normal mb-5'>
              Add new recipe
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='recipeName'>Recipe name</label>
                <input
                  type='text'
                  name='name'
                  id='recipeName'
                  className='form-control'
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='recipeIngredients'>Ingredients</label>
                <input
                  type='text'
                  name='ingredients'
                  id='recipeIngredients'
                  className='form-control'
                  required
                  onChange={this.onChange}
                />
                <small id='ingredientHelp' className='form-text text-muted'>
                  Separate each ingredient with a comma.
                </small>
              </div>
              <label htmlFor='instruction'>Preparation Instructions</label>
              <textarea
                name='instruction'
                id='instruction'
                className='form-control'
                row='5'
                required
                onChange={this.onChange}
              />
              <button type='submit' className='btn custom-button mt-3'>
                Create Recipe
              </button>
              <Link to='/recipes' className='btn btn-link mt-3'>
                Back to recipes
                </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
