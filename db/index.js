const mongoose = require('mongoose')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		console.log('Connected to MongoDB Successfully!')
	})
	.catch((e) => {
		console.error('Connection error', e.message)
	})

const db = mongoose.connection

module.exports = db
