window.userName = 'Loading';

// var fbHangouts = new Firebase('https://hrr-kitchen-legacy.firebaseio.com/hangouts');
// if so then provide the user with the hangout url

var appControllers = angular.module('appControllers', ['ngCookies']);


//this controller handles the kitchen view and designates which seats are available
//It uses functions stored in tableHelpers.js
appControllers.controller('kitchenCtrl', ['$scope', '$cookies', 'TableHelpers',
  function ($scope, $cookies, TableHelpers) {

    var user  = {};
    if ($cookies.user) {
      window.userName = $cookies.user;
    } else {
      window.userName = "Anonymous";
    }

    $scope.satDown = false;
    $scope.currentSeat = "standing";
    $scope.currentURL = "No current hangout url";

    console.log('fbseating', fbSeating);

    $scope.seats = {};
    $scope.hangouts = {};

    // Services
    $scope.handleClick = TableHelpers.handleClick;
    $scope.clearRoom = function(){
      var seating = TableHelpers.clearRoom();
      console.log('seating from callback', seating);
      $scope.seats = seating;
    };
    // not in use
    // $scope.viewThumbs = viewThumbVideos;

    $scope.doClick = function(seat, $event) {
      $scope.handleClick(seat, $event, $scope);
    };

    // Gets the inital values from Firebase and updates the local seating data
    fbSeating.once("value", function(snapshot) {
      $scope.$apply(function(){
        $scope.seats = snapshot.val();
        console.log('fbSeating on value', $scope.seats);
        fbSeating.set($scope.seats);
      });
    });



    // //Updates the hangout urls- currently not used as the app now uses appear.in instead of google hangouts
    // fbHangouts.on("value", function(snapshot) {

    //   // $scope.$apply(function(){
    //     $scope.hangouts = snapshot.val();
    //   // });

    // });

    

    

  }]

);

