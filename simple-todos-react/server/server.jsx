Meteor.publish("tasks",function() {
	Tasks.find()
})

Meteor.methods({
	addTask(text){
		if(!Meteor.userId()){
			throw new Meteor.Error("not authorized")
		}

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		})
	},

	removeTask(taskId) {
		Tasks.remove(taskId)
	},

	setChecked(taskId,setChecked) {
		Tasks.update(taskId, {$set:{checked: setChecked}})
	}
})