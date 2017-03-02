import { Meteor } from 'meteor/meteor';
import Foo from '../api/foo';
import Bar from '../api/bar';

Meteor.startup(function(){
  const barDocs = [
    {
      _id: 'a',
      activeFooId:'1'
    }
  ]

  barDocs.forEach(doc => {
    Bar.upsert(doc._id, {$set:doc});
  })

  const fooDocs = [
    {
      _id: '1',
      barId: 'a',
      name: 'foo - 1',
      description: 'foo - 1, foo - 1'
    },
    {
      _id: '2',
      name: 'foo - 2',
      barId: 'a',
      description: 'foo - 2, foo - 2'
    },
    {
      _id: '3',
      name: 'foo - 3',
      barId: 'a',
      description: 'foo - 3, foo - 3'
    },
    {
      _id: '4',
      name: 'foo - 4',
      barId: 'a',
      description: 'foo - 4, foo - 4'
    },
  ];

  fooDocs.forEach(doc => {
    Foo.upsert(doc._id, {$set:doc});
  })
})