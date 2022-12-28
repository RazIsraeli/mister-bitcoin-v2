import { Component } from 'react'
import { MovesList } from '../cmps/MovesList'

import { bitcoinService } from '../services/bitcoin.service'

import { connect } from 'react-redux'

class _HomePage extends Component {
  state = {
    userBitcoin: null,
  }

  async componentDidMount() {
    const { loggedinUser } = this.props
    try {
      const userBitcoin = await bitcoinService.getRate(loggedinUser.coins)
      this.setState({ userBitcoin })
    } catch (error) {
      console.log('error: ', error)
    }
  }

  get moves() {
    return this.props.loggedinUser.moves.length > 5
      ? this.props.loggedinUser.moves.slice(-5)
      : this.props.loggedinUser.moves
  }

  render() {
    const { userBitcoin } = this.state
    const { loggedinUser } = this.props
    if (!loggedinUser) return <div>Lodaing...</div>

    return (
      <section className='home-container flex column'>
        <section className='home-page'>
          <section>
            <img src={loggedinUser.imgUrl} alt='contact' className='avatar' />
          </section>
          <section className='user-wallet'>
            <h2>{loggedinUser.name}'s wallet</h2>
            <h3>
              <span>Coins:</span> {loggedinUser.coins}
            </h3>
            <h3>
              <span>Bitcoin value:</span> {userBitcoin}
            </h3>
          </section>
        </section>
        {!!loggedinUser.moves.length && (
          <section>
            <MovesList title='your last moves' movesList={this.moves} />
          </section>
        )}
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedinUser: state.userModule.loggedinUser,
})

const mapDispatchToProps = {}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
