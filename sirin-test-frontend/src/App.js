import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signin from './pages/Signin/Signin'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import ProtectedRoute from './components/partComponents/ProtectedRoute/ProtectedRoute'
import Alert from './components/usedComponents/Alert/Alert'

const App = () => {
    return (
        <>
            <Alert />
            <Router>
                <Switch>
                    <Route path={'/signin'} component={Signin} />
                    <Route exact path={'/signup'} component={Signup} />
                    <ProtectedRoute exact path={'/'} component={Home} />
                </Switch>
            </Router>
        </>
    )
}

export default App
