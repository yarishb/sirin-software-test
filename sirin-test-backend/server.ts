import config from './src/config/config'
const express = require('express')

const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

//Auth Router
app.use('/auth', require('./src/routes/authRouter'))

//Repos Router
app.use('/repos', require('./src/routes/reposRoutes'))

app.listen(config.server.port, () => {
    console.log(`Server is running on ${config.server.hostname}:${config.server.port}`)
})
