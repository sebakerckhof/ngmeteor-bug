import angular from 'angular'
import angularMeteor from 'angular-meteor'
import { Meteor } from 'meteor/meteor'

import Foo from '../../api/foo'
import template from './foo-details.component.html'

class FooDetails {
  constructor ($scope, $reactive) {
    'ngInject'
    $reactive(this).attach($scope)

    this.$scope = $scope

    this.loading = true

    $scope.$watch('vm.fooId', () => {
      console.log('$scope.$watch', this.fooId)
    })

    this.autorun(() => {
      this.foo = Foo.findOne(this.getReactively('fooId'))
      console.log('this.getReactively', this.getReactively('fooId'))
    })

    
  }

  $onInit(){
    this.subscribe('foo.details', () => [this.getReactively('fooId')], {
      onStart: () => {
        this.loading = true
      },
      onReady: () => {
        this.loading = false
      },
      onError: () => {
        this.loading = false
        console.log('error')
      }
    })
  }
}

const name = 'fooDetails'

// create a module
export default angular.module(name, [
  angularMeteor
])
  .component(name, {
    bindings: {
      fooId: '<'
    },
    template,
    controller: FooDetails,
    controllerAs: 'vm'
  })
