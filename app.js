(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', " https://davids-restaurant.herokuapp.com/menu_items.json")


NarrowItDownController.$ingect = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;

  var promises = MenuSearchService.getMatchedMenuItems(searchTerm);
  promises.then(function (response){
    menu.foundItem = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });


}

MenuSearchService.$ingect = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var response = $http({
      method: "GET",
      ulr:ApiBasePath
    });
    return response;
  };

}

} )();
