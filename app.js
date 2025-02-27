require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT || 5001

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		app.listen(PORT, () => {
			console.log(`Server is running on port http://localhost:${PORT}`)
		})
	} catch (e) {
		console.log('Server Error', e.message)
		process.exit(1)
	}
}

start()
