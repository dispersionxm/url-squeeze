require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

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
