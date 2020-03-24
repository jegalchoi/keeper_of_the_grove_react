import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'

export class NewPlant extends Component {
  state = {
    name: '',
    notes: '',
    water: '',
    hidden: true,
    image: ''
  }

  componentDidMount() {
    new Pikaday({
      field: this.dateInput.current,
      onSelect: date => {
        const formattedDate = this.formatDate(date);
        this.dateInput.current.value = formattedDate;
        this.updatePlant('water', formattedDate)
      },
    })
  }

  dateInput = React.createRef()

  formatDate = d => {
    const YYYY = d.getFullYear();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const DD = `0${d.getDate()}`.slice(-2);
    return `${YYYY}-${MM}-${DD}`
  }

  stripHtmlEntities = str => {
    return String(str)
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  updatePlant = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onChange = e => {
    const { name, type, value, checked } = e.target;
    const plantValue = type === 'checkbox' ? checked : value
    this.updatePlant(name, plantValue)
  }

  onSubmit = e => {
    e.preventDefault()
    const url = 'http://localhost:3001/plants';
    const { name, notes, water, hidden, image } = this.state;
    if (name.length == 0 || this.props.user.id == 0) return;
    const body = {
      name,
      notes: notes.replace(/\n/g, '<br />'),
      water: (water == '') ? null : water,
      hidden,
      image: (image == '') ? 'https://placeimg.com/320/240/nature' : image,
      user_id: this.props.user.id
    };
    console.log(body)

    fetch(url, {
      method: 'POST',
      headers: {
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
      .then(json => {
        console.log(json)
        this.props.history.push(`/users/${this.props.user.id}/plants/${json.plant.id}`)
      })
      .catch(error => console.log(error.message))
  }

  render() {
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-sm-12 col-lg-6 offset-lg-3'>
            <h1 className='font-weight-normal mb-5'>Add New Plant</h1>
            <form onSubmit={this.onSubmit}>
              <div className='form-group'>
                <label htmlFor='plantName'>
                  <strong>Plant Name</strong>
                </label>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  value={this.state.name}
                  name='name'
                  placeholder='Name'
                  onChange={this.onChange}
                  id='plantName'
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='plantWater'>
                  <strong>Last Date Watered</strong>
                </label>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  id='plantWater'
                  name='water'
                  placeholder='YYYY-MM-DD'
                  value={this.state.water}
                  onChange={this.onChange}
                  ref={this.dateInput}
                  autoComplete='off'
                />
              </div>
              {/* <div className='form-group'>
                <label htmlFor='plantWater'>
                  <strong>Last Watered</strong>
                </label>
                <input
                  className='form-control form-control-lg'
                  type='date'
                  value={this.state.water}
                  name='water'
                  onChange={this.onChange}
                  id='plantWater'
                />
              </div> */}
              <div className='form-group'>
                <label htmlFor='plantNotes'>
                  <strong>Notes</strong>
                </label>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  value={this.state.notes}
                  name='notes'
                  placeholder='Notes'
                  onChange={this.onChange}
                  id='plantNotes'
                />
                <small id='notesHelp' className='form-text text-muted'>
                  Separate each note with a comma.
                </small>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='hidden'
                  checked={this.state.hidden}
                  onChange={this.onChange}
                  id='plantHidden'
                />
                <label className='form-check-label' htmlFor='plantHidden'>
                  <strong>Private</strong>
                </label>
              </div>

              {/* <label htmlFor='instruction'>Preparation Instructions</label>
              <textarea
                name='instruction'
                id='instruction'
                className='form-control'
                row='5'
                required
                onChange={this.onChange}
              /> */}
              <button type='submit' className='btn btn-primary mt-3'>
                Create Plant
              </button>
              <br />
              <Link to='/plants' className='btn btn-link mt-3'>
                Back to plants
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
