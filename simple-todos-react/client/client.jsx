Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
})

Meteor.subscribe('tasks')

Meteor.startup(function() {
	ReactDOM.render(<App />, document.getElementById("render-target"))
})

// Meteor.methods({
// 	addTask(text){
// 		if(!Meteor.userId()){
// 			throw new Meteor.Error("not authorized")
// 		}

// 		Tasks.insert({
// 			text: text,
// 			createdAt: new Date(),
// 			owner: Meteor.userId(),
// 			username: Meteor.user().username
// 		})
// 	},

// 	removeTask(taskId) {
// 		Tasks.remove(taskId)
// 	},

// 	setChecked(taskId,setChecked) {
// 		Tasks.update(taskId, {$set:{checked: setChecked}})
// 	}
// })
