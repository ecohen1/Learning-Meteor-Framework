Meteor.subscribe('allPlayers');

Template.leaderboard.helpers({
  'players': function() {
    return PlayersList.find({},{sort:{score: -1,name:1}}).fetch();
  },
  'selectedClass':function() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if (playerId == selectedPlayer){
      return "selected";
    }      
  },
  'showSelectedPlayer':function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer);
  }
});

Template.leaderboard.events({
  "click .player": function() {
    var playerId = this._id;
    Session.set('selectedPlayer',playerId);
  },
  "click .increment":function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyScore',selectedPlayer,5);
  },    
  "click .decrement":function() {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyScore',selectedPlayer,-5);
  },
  "click #removePlayer":function() {
    if(confirm("Do you REALLY want to remove this player?")){
      var selectedPlayer = Session.get("selectedPlayer");
      Meteor.call('removePlayer',selectedPlayer);
    } else {}
  }
});

Template.addPlayerForm.events({
  "submit form":function(event) {
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    Meteor.call('addPlayer',playerNameVar);
    event.target.playerName.value = "";
  }    
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});