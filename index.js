import 'dotenv/config'
import express from 'express'

const app = express()
app.use(express.json())

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    console.log('listening on port 8080')
})
