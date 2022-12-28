import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class _TransferFund extends Component {
    state = {
        amount: '',
        msg: '',
    }
    componentDidMount() { }

    onTransfer = (ev) => {
        ev.preventDefault()
        const { amount } = this.state
        const { maxCoins } = this.props
        if (amount > maxCoins || amount < 1) {
            this.setState({ msg: "can't complete request" })
            return
        }
        this.props.onTransferCoins(amount)
        // this.setState({ msg: '' })
        this.setState({ amount: '', msg: '' })
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }

        this.setState({ [field]: value })
    }

    onBack = () => {
        this.props.history.push('/contact')
    }

    coins() {
        return this.props.maxCoins > 10 ? 'green' : 'red'
    }

    render() {
        const { msg, amount } = this.state
        const { contact, maxCoins } = this.props

        return (
            <section className='transfer-fund'>
                <section className='transfer-details'>
                    <h3>Transfer funds to:</h3>
                    <h2>{contact.name}</h2>
                    <form onSubmit={this.onTransfer}>
                        <input
                            value={amount}
                            onChange={this.handleChange}
                            type='number'
                            name='amount'
                            placeholder='insert amount'
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
                            <button className='primary'>Transfer</button>
                        </div>
                    </form>
                </section>
                <p className={`user-balance ${this.coins()}`}>
                    your current balance: {maxCoins}
                </p>
                {msg && <p className='msg'>{msg}</p>}
            </section>
        )
    }
}

export const TransferFund = withRouter(_TransferFund)
