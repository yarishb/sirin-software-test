import React, { useEffect, useState } from 'react'
import styles from './SignBox.module.scss'
import { Button, TextField } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

const SignBox = ({ header, link, adviceText, signFunction, user }) => {
    const [data, setData] = useState()
    const history = useHistory()

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        signFunction(data)
    }

    useEffect(() => {
        if (user !== undefined) {
            history.push('/')
        }
    }, [user, history])

    return (
        <div className={styles.signBox}>
            <form onSubmit={(e) => submit(e)}>
                <div className={styles.signBox__header}>{header}</div>
                <TextField onChange={(e) => handleChange(e)} id="standard-basic" label="логін" name={'login'} type={'text'} />
                <TextField onChange={(e) => handleChange(e)} id="standard-basic" label="пароль" name={'password'} type={'password'} />
                <Button variant="contained" color="primary" type={'submit'}>
                    Надіслати
                </Button>
                <Link to={link}>
                    <div className={styles.signBox__adviceText}>{adviceText}</div>
                </Link>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(SignBox)
