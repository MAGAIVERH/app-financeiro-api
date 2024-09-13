import 'dotenv/config.js'

import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    try {
        const results = await PostgresHelper.query('SELECT * FROM users;')
        res.send(JSON.stringify(results))
    } catch (error) {
        console.error('Error querying database:', error)
        res.status(500).send('Error querying database')
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
