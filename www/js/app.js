// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("tableController", function($scope, $ionicModal, $http) {

  var self = this;
  this.users = [];

  $http({
  method: 'GET'
  , url: '/users'
  }).then(function successCallback(response) {
    self.users = response["data"];
  }, function errorCallback(response) {
    
  });

  this.swipe = function(firstName, lastName) {
    var user = {firstName: firstName, lastName: lastName};
    $http({
      method: 'DELETE'
      , params: user
      , url: '/users'
    }).then(function successCallback(response) {
      self.users = response["data"];
    }, function errorCallback(response) {
      
    });
  }

  this.append = function(firstName, lastName) {
    var user = {firstName: firstName, lastName: lastName}
    createUser(user);
    $scope.closeModal();
  }

  function createUser(user) {
    $http({
      method: 'POST'
      , data: user
      , url: '/users'
    }).then(function successCallback(response) {
      self.users = response["data"];
    }, function errorCallback(response) {
      
    });
  }

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.buttonAction = function() {
    console.log("buttonAction");
    $scope.modal.show();
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

})

/////////////////////////////////////////////////////////

.controller("detailController", function($scope, $ionicModal, $http, $stateParams) {

	$scope.update = function(first, last){
		var data = {}; //data koji cemo slati
		var anyInfo = false;
		if(first!=0 && first!=undefined){ //ako nije prazan
			data.first = first;
			anyInfo = true;
		}
		if(last!=0 && last!=undefined){ //ako nije prazan
			data.last = last;
			anyInfo = true;
		}
		if(anyInfo == true){ //ako je barem jedna od prijasnjih zadovoljena onda saljemo na server
			data.userId = $stateParams.userId; //parametar koji smo proslijedili iz config i time saljemo id od osobe
			$http({
				method: 'POST', //post radi jednostavnosti
				params: data, //koji podatak
				url: '/updateUsers' //na koju adresu
			}).then(function successCallback(response) {
				//nista za sad
			}, function errorCallback(response) {
				//nista za sad
			});
		}
	}
})

//Za viewove

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('master', { //glavni
                url: '/master', //url
                templateUrl: '/master.html', //koji html koristimo
                controller: 'tableController' //koji controller koristimo na tom viewu
            })
            .state('users', { //detalji
                url: '/details/:userId', //isto ali :userId je ime parametra (tj. objekta) koji prosljeđujemo
                templateUrl: '/details.html', //isto
                controller: 'detailController' //isto
            });
        $urlRouterProvider.otherwise('/master'); //default
    });