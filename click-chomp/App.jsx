App = React.createClass({
	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			home: true
		}
	},

	getMeteorData() {
		return {
			userInfo: Users.findOne({userId: Meteor.userId()}),
			currentUser: Meteor.user(),
			userId: Meteor.userId()
		}
	},

	toggleView(){
		this.setState({home: !this.state.home})
	},

	makePurchase(){
		var userId = Meteor.userId()
		Meteor.call('makePurchase',userId)
	},

	render(){
		return (
			<div>
			{(this.state.home) ?
				<div className='container'>
					<h1>Click Below</h1>

					<AccountsUIWrapper />

					<button className='hide-completed'
							onClick={this.makePurchase}>
						Buy Now
					</button>
				</div>
				: <Info data={this.data}/>
			}
			{this.data.currentUser ?
				<button 
					className='my-account'
					onClick={this.toggleView}>Toggle View</button>
				: 'Login to get started!'
			}
			</div>
		)
	}
})