import { Component } from 'react'

import { connect } from 'react-redux'
import { setLoggedinUser, logout } from '../store/actions/user.actions'

class _SignupPage extends Component {
  state = {
    name: '',
  }

  componentDidMount() {
    this.props.logout()
  }

  onSignup = (ev) => {
    ev.preventDefault()
    const { name } = this.state
    if (!name) return
    this.props.setLoggedinUser(name)
    this.props.history.push('/')
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

    this.setState({ [field]: value })
  }

  render() {
    const { name } = this.state
    return (
      <section className='signup-page'>
        <h1>Welcome to Mister-Bitcoin!</h1>
        <h3>Signup to get rich TODAY</h3>
        <form onSubmit={this.onSignup}>
          <input
            onChange={this.handleChange}
            type='text'
            name='name'
            id='name'
            value={name}
            placeholder='insert your name...'
          />
          <button>signup</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedinUser: state.userModule.loggedinUser,
})

const mapDispatchToProps = {
  setLoggedinUser,
  logout,
}

export const SignupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SignupPage)
