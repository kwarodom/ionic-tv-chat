var mod = angular.module('tvchat.controllers.intro', []);

mod.controller('IntroCtrl', function ($scope, $state, UserService) {

	$scope.loggingIn = false;

	$scope.login = function () {
    console.log("login facebook button clicked!")
		if (!$scope.loggingIn) {
      console.log("inside !$scope.loggingIn")
			$scope.loggingIn = true;
			UserService.loginUser().then(function () {
					$scope.loggingIn = false;
			    $state.go('app.search');
		   });
		} else {
      console.log("outside !$scope.loggingIn")
    }
	}
});
