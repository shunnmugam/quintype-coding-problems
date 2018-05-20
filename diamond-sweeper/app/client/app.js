import HomeController from './HomeController';
// global.startApp = function(container) {
//   console.log("Here is the container:", container);
// }

var app = angular.module('dimond-game',[]);

//controllers

app.controller('HomeController',['$scope',HomeController]);
