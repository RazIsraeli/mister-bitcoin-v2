import { Component } from 'react'

import { connect } from 'react-redux'
import {
  loadContacts,
  setContact,
  updateContact,
} from '../store/actions/contact.actions'

class _ContactEdit extends Component {
  state = {
    contact: null,
  }

  async componentDidMount() {
    const contactId = this.props.match.params.id
    await this.props.setContact(contactId)
    this.setState({ contact: this.props.contact })
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }))
  }

  onAddContact = async (ev) => {
    ev.preventDefault()
    try {
      await this.props.updateContact({ ...this.state.contact })
      await this.props.loadContacts()
      await this.props.setContact()
      this.props.history.push('/contact')
    } catch (error) {
      console.log('error: ', error)
    }
  }

  onBack = () => {
    this.props.history.push('/contact')
  }

  render() {
    const { contact } = this.state
    if (!contact) return

    const { name, email, phone } = contact

    return (
      <section className='contact-edit'>
        <h2>{contact._id ? 'Edit Contact' : 'Add Contact'}</h2>
        {contact._id && (
          <img src={contact.imgUrl} alt='contact' className='contact-avatar' />
        )}
        <form onSubmit={this.onAddContact}>
          <label htmlFor='name'>Name</label>
          <input
            onChange={this.handleChange}
            value={name}
            type='text'
            name='name'
            id='name'
            placeholder='Name'
          />
          <label htmlFor='email'>Email</label>
          <input
            onChange={this.handleChange}
            value={email}
            type='text'
            name='email'
            id='email'
            placeholder='Email'
          />
          <label htmlFor='phone'>Phone</label>
          <input
            onChange={this.handleChange}
            value={phone}
            type='text'
            name='phone'
            id='phone'
            placeholder='Phone'
          />
          <div className='action-btns flex justify-center'>
            <button
              className='secondary'
              onClick={(ev) => {
                ev.stopPropagation()
                this.onBack()
              }}
            >
              Back
            </button>
            <button className='primary'>Save</button>
          </div>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  contact: state.contactModule.contact,
})

const mapDispatchToProps = {
  loadContacts,
  setContact,
  updateContact,
}

export const ContactEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEdit)
