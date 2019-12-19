var express = require('express')
var router = express.Router()

const Post = require('../models/post')

/* GET home page. */
router.get('/posts', (req, res) => {
	Post.find({})
		.sort({ createdAt: -1 })
		.exec()
		.then((posts) => res.status(200).json({ success: true, posts }))
		.catch((error) => res.status(400).json({ success: false, error }))
})

router.post('/post', function(req, res) {
	const body = req.body
	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'No Post Provided'
		})
	}

	const post = new Post(body)
	if (!post) {
		return res.status(400).json({ success: false })
	}
	post.save()
		.then(() => res.status(201).json({ success: true, post }))
		.catch((error) => res.status(400).json({ success: false, error }))
})

router.put('/post/upvote/:id', (req, res) => {
	const body = req.body
	if (!body) {
		return res.status(400).json({
			success: false
		})
	}

	Post.findOneAndUpdate({ _id: req.params.id }, { $inc: { upvotes: 1 } }, { new: true })
		.exec()
		.then((post) => res.status(200).json({ success: true, post }))
		.catch((error) => {
			console.log(error)
			res.status(404).json({ success: false, error })
		})
})

module.exports = router
