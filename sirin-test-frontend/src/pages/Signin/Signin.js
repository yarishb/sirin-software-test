import React from 'react'
import SignBox from '../../components/usedComponents/SignBox/SignBox'
import { connect } from 'react-redux'
import { login } from '../../store/actions/auth'

const Signin = ({ login }) => {
    return <SignBox header={'Вхід'} link={'/signup'} adviceText={'Не маєте аккаунту? Спробуйте зареєструватись'} signFunction={login} />
}

export default connect(null, { login })(Signin)
