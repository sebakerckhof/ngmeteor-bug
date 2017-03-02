import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';

import { name as FooDetails } from '../foo-details/foo-details.component';
import Foo from '../../api/foo.js';
import Bar from '../../api/bar.js';

import template from './foo-list.component.html';

const name = 'fooList';

class FooList {
  
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    
    this.autorun(() => {
      this.bar = Bar.findOne(this.getReactively('barId'), {fields: {activeFooId : 1}});

      if(this.bar && this.bar.activeFooId) {
         console.log("Selected Foo ID", this.bar.activeFooId);
         this.activeFooId = this.bar.activeFooId;
       }
    });
  
    this.helpers({
      foos: () => Foo.find({'barId':this.getReactively('barId')}, {fields : {_id : 1, name:1}})
    });

  }

  selectFoo(id){
    this.call('bar.setActiveFooId', this.barId, id, (err) => {
      if(err)
        console.log(err);
    })

  }

  $onInit(){
    this.subscribe('bar.details', () => [this.getReactively('barId')], {
      onStart: () => {
        this.loading = true;
      },
      onReady: () => {
        this.loading = false;
      },
      onError: () => {
        this.loading = false;
      }
    });

    this.subscribe('foo.list', () => [this.getReactively('barId')],{
      onStart() {this.loading = true;},
      onReady() {this.loading = false;},
    });
  }
 
}

export default angular
  .module(name, [
    angularMeteor,

    FooDetails
  ])
  .component(name, {
    bindings: {
      barId: '<'
    },
    template,
    controllerAs: 'vm',
    controller: FooList,
  });
