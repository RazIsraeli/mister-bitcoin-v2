import { Component } from 'react'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'

import { connect } from 'react-redux'
import { setContact } from '../store/actions/contact.actions'
import { transferFund } from '../store/actions/user.actions'

class _ContactDetails extends Component {
  componentDidMount() {
    this.props.setContact(this.props.match.params.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.setContact(this.props.match.params.id)
    }
  }

  onTransferCoins = (amount) => {
    const { contact } = this.props
    this.props.transferFund(contact, amount)
  }

  get movesToContact() {
    const { loggedinUser, contact } = this.props
    let moves = loggedinUser.moves.filter((move) => move.toId === contact._id)
    return moves
  }

  render() {
    const { contact, loggedinUser } = this.props
    if (!contact) return <div className='loading'>Loading...</div>

    return (
      <section className='flex column align-center'>
        <section className='contact-details'>
          <img src={contact.imgUrl} alt='contact-image' />
          <div className='info'>
            <h2>{contact.name}</h2>
            <h3>
              <span>Email:</span>
              {contact.email}
            </h3>
            <h3>
              <span>Phone:</span>
              {contact.phone}
            </h3>
          </div>
        </section>

        <section>
          {loggedinUser && (
            <TransferFund
              contact={contact}
              maxCoins={loggedinUser.coins}
              onTransferCoins={this.onTransferCoins}
            />
          )}
          {!!this.movesToContact.length && (
            <MovesList
              title={`your moves with ${contact.name}`}
              movesList={this.movesToContact}
            />
          )}
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedinUser: state.userModule.loggedinUser,
  contact: state.contactModule.contact,
})

const mapDispatchToProps = {
  setContact,
  transferFund,
}

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails)
