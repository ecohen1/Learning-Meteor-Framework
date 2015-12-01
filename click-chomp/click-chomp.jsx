if (Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })

  Meteor.startup(function () {
    ReactDOM.render(<App />, document.getElementById("render-target"))
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    //Users.insert({userId: 'K5CqQb9ERs7frS7R4',firstName: 'eli',lastName:'cohen',creditCard: '1111',address:'campus'})
  });

  Meteor.methods({

    userInfoUpdate(updatedUserInfo,userId){
      Users.update({userId: userId},updatedUserInfo)
    },

    makePurchase(userId){
      HTTP.call('POST','https://api.postmates.com/v1/customers/cus_KVBWQMV9Xc80AF/deliveries',{
        'params': {
          'pickup_address': '20 McAllister St, San Francisco, CA',
          'pickup_name': 'sargent hall',
          'pickup_phone_number': '2023650490',
          'manifest': 'box of stuff',
          'dropoff_address': '101 Market St, San Francisco, CA',
          'dropoff_name': 'slivka hall',
          'dropoff_phone_number': '2023650490'
        },
        'headers': {'Authorization':'Basic MDBhNzRkOWYtNjNjYy00ZTY3LTg2ZjMtNzYzOTM5ZjU3YmRmOg=='}
      },function(error,response) {
        if(error){
          console.log(error)
        } else {
          console.log(response)
        }
      })
    }
  })
}