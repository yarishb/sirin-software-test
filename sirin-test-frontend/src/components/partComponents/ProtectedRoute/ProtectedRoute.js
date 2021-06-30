import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkLogged } from '../../../store/actions/auth'
import { useEffect } from 'react'

const ProtectedRoute = ({ component: Component, isLogged, checkLogged, user, ...restOfProps }) => {
    useEffect(() => {
        if (!user) {
            checkLogged()
        }
    }, [user, checkLogged])

    return <Route {...restOfProps} render={(props) => (isLogged !== false ? <Component {...props} /> : <Redirect to="/signin" />)} />
}

const mapStateToProps = (state) => ({
    isLogged: state.auth.isLogged,
    user: state.auth.user
})

export default connect(mapStateToProps, { checkLogged })(ProtectedRoute)
