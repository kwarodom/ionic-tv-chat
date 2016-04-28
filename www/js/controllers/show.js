var mod = angular.module('tvchat.controllers.show', []);



mod.controller('ShowCtrl', function ($scope,
                                     $stateParams,
                                     ShowsService,
                                     $firebaseArray,
                                     FIREBASE_URL,
                                     $ionicScrollDelegate,
                                     UserService) {

	$scope.user = UserService;

	$scope.show = {};
  $scope.showId = $stateParams.showId;
  $scope.show = ShowsService.getShow(parseInt($scope.showId));
  console.log($scope.show);

	$scope.data = {
		messages: [],
		message: '',
		loading: true,
		showInfo: false
	};

	var messagesRef = new Firebase(FIREBASE_URL);

	$scope.loadMessages = function () {
    console.log("Loading data for show ", $scope.show.name);

    var query = messagesRef
      .child("messages")
      .orderByChild("showId")
      .equalTo($scope.showId)
      .limitToLast(200);

    $scope.data.messages = $firebaseArray(query);
    $scope.data.messages.$loaded().then(function(data){
      console.log("AugularFire $loaded")
      $scope.data.loading = false;
      $ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
    });
	};

	$scope.sendMessage = function () { //send data to firebase
    $scope.data.messages.$add({
      showId: $scope.showId,
      text: $scope.data.message,
      username: $scope.user.current.name,
      userId: $scope.user.current.userId,
      profilePic: $scope.user.current.profilePic,
      timestamp: new Date().getTime()
    });
    console.log("sent message "+$scope.data.message+" by user " +$scope.user.current.name+ " at "+ (new Date().getTime()))
    $scope.data.message = '';
    $ionicScrollDelegate.$getByHandle('show-page').scrollBottom(true);
  };

  $scope.loadMessages();

	console.log("ShowCtrl-Created");

	$scope.$on("$ionicView.enter", function () {
		console.log("ShowCtrl-Enter");
	});

	$scope.$on("$ionicView.beforeLeave", function () {
		console.log("ShowCtrl-Leave");
	});

});
