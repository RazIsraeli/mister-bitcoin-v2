import { contactService } from '../../services/contact.service'

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const filterBy = getState().contactModule.filterBy
      const contacts = await contactService.getContacts(filterBy)
      dispatch({ type: 'SET_CONTACTS', contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      const contacts = await contactService.deleteContact(contactId)
      dispatch({ type: 'REMOVE_CONTACT', contactId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setContact(contactId = '') {
  return async (dispatch) => {
    try {
      const contact = contactId
        ? await contactService.getContactById(contactId)
        : contactService.getEmptyContact()
      dispatch({ type: 'SET_CONTACT', contact })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function updateContact(contact) {
  return async (dispatch) => {
    try {
      await contactService.saveContact(contact)
      contact._id
        ? dispatch({ type: 'UPDATE_CONTACT', contact })
        : dispatch({ type: 'ADD_CONTACT', contact })
    } catch (error) {
      console.log('error: ', error)
    }

    // try {
    //   const contact = contactId
    //     ? await contactService.getContactById(contactId)
    //     : contactService.getEmptyContact()
    //
    // } catch (err) {
    //   console.log('err:', err)
    // }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
