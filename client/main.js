import { Meteor } from 'meteor/meteor'
import angular from 'angular'
import angularMeteor from 'angular-meteor'

//Import main components and services
import { name as FooList} from '../imports/ui/foo-list/foo-list.component'

function onReady() {
  angular.bootstrap(document.body, [
      FooList
  ]);
}

if (Meteor.isCordova)
  angular.element(document).on('deviceready', onReady)
else
  angular.element(document).ready(onReady)
