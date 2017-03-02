import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

const Bar = new Mongo.Collection('bar')

if (Meteor.isServer) {
  Meteor.publish('bar.details', function (barId) {
    return Bar.find(barId, {fields: {activeFooId: 1}})
  });

  Meteor.methods({
    'bar.setActiveFooId'(barId,activeFooId){
      Bar.update(barId,{$set:{activeFooId}});
    }
  });
}

export default Bar
