import { userService } from '../../services/user.service'

export function transferFund(contact, amount) {
  return async (dispatch) => {
    const user = userService.addMove(contact, amount)
    dispatch({ type: 'SET_LOGGEDIN_USER', user })
  }
}

export function setLoggedinUser(name) {
  return async (dispatch) => {
    try {
      const user = await userService.signup(name)
      dispatch({ type: 'SET_LOGGEDIN_USER', user })
    } catch (error) {
      console.log('error: ', error)
    }
  }
}

export function logout() {
  return async (dispatch) => {
    userService.remove()
    dispatch({ type: 'LOGOUT' })
  }
}
