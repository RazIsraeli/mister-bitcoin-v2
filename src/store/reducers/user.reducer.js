const INITIAL_STATE = {
  loggedinUser: null,
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // case 'TRANSFER_FUND':
    //   const { loggedinUser } = state
    //   return {
    //     ...state,
    //     loggedinUser: {
    //       ...loggedinUser,
    //       coins: loggedinUser.coins - action.amount,
    //     },
    //   }
    case 'SET_LOGGEDIN_USER':
      return {
        ...state,
        loggedinUser: action.user,
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedinUser: null,
      }

    default:
      return state
  }
}
