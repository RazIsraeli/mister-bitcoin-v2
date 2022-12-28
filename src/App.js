import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import logo from './logo.svg'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './views/HomePage'
import { SignupPage } from './views/SignupPage'
import { ContactPage } from './views/ContactPage'
import { StatisticPage } from './views/StatisticPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'

import './App.css'
import './assets/style/main.scss'
import { userService } from './services/user.service'

function PrivateRoute(props) {
    const user = userService.getUser()
    return user ? <Route {...props} /> : <Redirect to='/signup' />
}

function App() {
    return (
        <Router>
            <header className='full'>
                <AppHeader />
            </header>
            <main className='container main-app'>
                {/* <HomePage /> */}
                <Switch>
                    <Route path='/contact/edit/:id?' component={ContactEdit} />
                    <Route path='/contact/:id' component={ContactDetails} />
                    <PrivateRoute path='/contact' component={ContactPage} />
                    <Route path='/signup' component={SignupPage} />
                    <PrivateRoute path='/stats' component={StatisticPage} />
                    <PrivateRoute path='/' component={HomePage} />
                </Switch>
            </main>
        </Router>
    )
}

export default App
