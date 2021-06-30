import React from 'react'
import SignBox from '../../components/usedComponents/SignBox/SignBox'
import { connect } from 'react-redux'
import { register } from '../../store/actions/auth'

const Signup = ({ register }) => {
    return <SignBox header={'Реєстрація'} link={'/signin'} adviceText={'Уже зареєстровані? Спробуйте ввійти'} signFunction={register} />
}

export default connect(null, { register })(Signup)
