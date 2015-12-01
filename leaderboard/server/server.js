Meteor.publish('allPlayers',function() {
  var currentUserId = this.userId;
  return PlayersList.find({createdBy:currentUserId});
});
Meteor.methods({
  'addPlayer':function(playerNameVar) {
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerNameVar,
      score:0,
      createdBy:currentUserId
    });
  },
  'removePlayer':function(selectedPlayer) {
    var currentUserId = Meteor.userId();
    PlayersList.remove({_id:selectedPlayer,createdBy:currentUserId});
  },
  'modifyScore':function(selectedPlayer,points) {
    var currentUserId = Meteor.userId();
    PlayersList.update({_id:selectedPlayer,createdBy:currentUserId},{$inc: {score:points}});      
  }
});