import React, { useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import { addRepo } from '../../../store/actions/repos'

const Search = ({ addRepo }) => {
    const [repoName, setRepoName] = useState()

    const submit = (e) => {
        e.preventDefault()
        addRepo(repoName)
    }

    return (
        <form onSubmit={(e) => submit(e)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
                onChange={(e) => setRepoName(e.target.value)}
                id="outlined-full-width"
                label="Введіть назву репозиторію"
                style={{ width: '30rem' }}
                placeholder="Facebook/React"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <div>
                <IconButton aria-label="add" type={'submit'}>
                    <AddIcon fontSize="large" color={'primary'} />
                </IconButton>
            </div>
        </form>
    )
}

export default connect(null, { addRepo })(Search)
