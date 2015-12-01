Info = React.createClass({

	userInfoUpdate(event) {

		event.preventDefault();
		
		updatedUserInfo = {
			userId: Meteor.userId(),
			firstName: ReactDOM.findDOMNode(this.refs.firstName).value.trim(),
			lastName: ReactDOM.findDOMNode(this.refs.lastName).value.trim(),
			creditCard: ReactDOM.findDOMNode(this.refs.creditCard).value.trim(),
			address: ReactDOM.findDOMNode(this.refs.address).value.trim()
		}

		var userId = Meteor.userId()

		Meteor.call("userInfoUpdate",updatedUserInfo,userId)
	},

	render() {
		return (
			<div>
				<form className='user-info' onSubmit={this.userInfoUpdate}>
					<input ref='firstName' type='text' placeholder={this.props.data.userInfo.firstName ? this.props.data.userInfo.firstName : 'first name'}/>
					<input ref='lastName' type='text' placeholder={this.props.data.userInfo.lastName ? this.props.data.userInfo.lastName : 'last name'}/>
					<input ref='creditCard' type='text' placeholder={this.props.data.userInfo.creditCard ? this.props.data.userInfo.creditCard : 'credit card'}/>
					<input ref='address' type='text' placeholder={this.props.data.userInfo.address ? this.props.data.userInfo.address : 'address'}/>
					<button type='submit'>Update Info</button>
				</form>
				<h3>Current Info:</h3>
				<ul>
					<li>Name: {this.props.data.userInfo.firstName + ' ' + this.props.data.userInfo.lastName}</li>
					<li>Card: {this.props.data.userInfo.creditCard}</li>
					<li>Address: {this.props.data.userInfo.address}</li>
				</ul>
			</div>
		)
	}
})