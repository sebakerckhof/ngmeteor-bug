import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

const Foo = new Mongo.Collection('foo')

if (Meteor.isServer) {
  Meteor.publish('foo.list', function (barId) {
    return Foo.find({barId}, {fields: {name: 1,barId: 1}})
  })

  Meteor.publish('foo.details', function (fooId) {
    return Foo.find(fooId, {fields: {name: 1,barId: 1,description: 1}})
  })
}

export default Foo
