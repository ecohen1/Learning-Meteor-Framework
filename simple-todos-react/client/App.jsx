App = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState(){
		return {
			hideCompleted:false
		}
	},

	getMeteorData() {
		let query = this.state.hideCompleted ? {checked: {$ne: true}} : {}
		return {
			tasks: Tasks.find(query,{sort:{createdAt:-1}}).fetch(),
			incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
			currentUser: Meteor.user()
		}
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />
		})
	},

	handleSubmit(event) {
		event.preventDefault()

		var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()

		Meteor.call("addTask",text)

		ReactDOM.findDOMNode(this.refs.textInput).value = ""
	},

	toggleHideCompleted(){
		this.setState({
			hideCompleted: !this.state.hideCompleted
		})
	},

	render(){
		return (
			<div className='container'>
				<header>
					<h1>React Todo List ({this.data.incompleteCount})</h1>

					<label className='hide-completed'>
						<input 
							type='checkbox'
							readOnly={true}
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted} />
						Hide Completed Tasks
					</label>

					<AccountsUIWrapper />
					{this.data.currentUser ?
						<form className='new-task' onSubmit={this.handleSubmit}>
							<input type='text' ref='textInput' placeholder='add task'/>
						</form>
						: ''
					}
				</header>
				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		)
	}
})