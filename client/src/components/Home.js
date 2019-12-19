import React from 'react'

const superagent = require('superagent')
const apiBaseURL = '/api'

class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			post: {
				content: ''
			},
			posts: []
		}
	}

	handleChange = (event) => {
		this.setState({
			post: {
				...this.state.post,
				[event.target.name]: event.target.value
			}
		})
	}

	handleSubmit = (event) => {
		// alert('A name was submitted: ' + this.state.post.content)
		superagent
			.post(apiBaseURL + '/post')
			.send(this.state.post)
			.then((res) => {
				if (res.body.success) {
					this.setState({
						post: {
							...this.state.post,
							content: ''
						},
						posts: [res.body.post, ...this.state.posts]
					})
				}
			})
			.catch(console.error)
		event.preventDefault()
	}

	upvotePost = (id) => {
		superagent
			.put(apiBaseURL + '/post/upvote/' + id)
			.then((res) => {
				if (res.body.success) {
					this.setState({
						posts: this.state.posts.map((post) =>
							post._id === res.body.post._id ? (post = res.body.post) : post
						)
					})
				}
			})
			.catch(console.error)
	}

	componentDidMount() {
		superagent
			.get(apiBaseURL + '/posts')
			.then((res) => {
				if (res.body.success) {
					this.setState({
						posts: res.body.posts
					})
				}
			})
			.catch(console.error)
	}

	render() {
		return (
			<div className="container">
				<div className="section writePost">
					<h2 className="title">Write a Post</h2>
					<form className="field is-grouped" onSubmit={this.handleSubmit}>
						<p className="control is-expanded">
							<input
								className="input"
								name="content"
								onChange={this.handleChange}
								placeholder="Add a post"
								required
								type="text"
								value={this.state.post.content}
							/>
						</p>
						<p className="control">
							<input className="input button is-info" type="submit" />
						</p>
					</form>
				</div>
				<hr />
				<div className="section posts">
					<h2 className="title">Previous Posts</h2>
					<div className="columns is-multiline">
						{this.state.posts.map((post, index) => (
							<div className="column is-4" key={index}>
								<div className="card">
									<div className="card-content">
										<p>{post.content}</p>
										<hr />
										<span className="is-7 has-text-weight-bold">
											{`${post.upvotes} ${
												post.upvotes === 1 ? 'Upvote' : 'Upvotes'
											}`}
										</span>
										&nbsp;<span style={{ margin: '0 auto' }}>|</span>&nbsp;
										<span className="is-7">
											{new Date(post.createdAt).toLocaleString()}
										</span>
									</div>
									<footer className="card-footer">
										<button
											className="button is-link is-inverted is-fullwidth"
											href="#"
											onClick={() => this.upvotePost(post._id)}
										>
											Upvote
										</button>
									</footer>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}

export default Home
