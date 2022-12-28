import { Link } from 'react-router-dom'
import { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'

import { contactService } from '../services/contact.service'

import { connect } from 'react-redux'
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from '../store/actions/contact.actions'

class _ContactPage extends Component {
  componentDidMount() {
    this.props.loadContacts()
  }

  setFilterBy = (filterBy) => {
    this.props.setFilterBy(filterBy)
    this.props.loadContacts(this.props.filterBy)
  }

  onRemove = (contactId) => {
    this.props.removeContact(contactId)
  }

  render() {
    const { contacts, filterBy } = this.props

    if (!contacts) return <div className='loading'>Loading...</div>

    return (
      <section className='contact-page flex column align-center'>
        <ContactFilter onFilterBy={this.setFilterBy} filterBy={filterBy} />
        <Link to='/contact/edit' className='add-contact'>
          Add Contact
        </Link>
        <ContactList onRemove={this.onRemove} contacts={contacts} />
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedinUser: state.userModule.loggedinUser,
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy,
})

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
}

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage)
