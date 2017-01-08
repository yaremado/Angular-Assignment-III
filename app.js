(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


NarrowItDownController.$ingect = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;
  menu.searchTerm = "";
 menu.searchItemByTerm =  function(){
console.log("Yes, you call me");
  var promises = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
  console.log(menu.searchTerm);
  promises.then(function (response){
    console.log(response);
    menu.found = response;})
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}
}


MenuSearchService.$ingect = ['$http','ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: ApiBasePath
    }).then(function(result){
        var foundItem = result.data;
        var items = [];
        for (var item in foundItem.menu_items ){
          if (foundItem.menu_items[item].name.indexOf(searchTerm) !== -1) items.push(foundItem.menu_items[item]);
        };
        return items;
    })
    .catch(function(error){
      console.log("Something wrong in Service.");
    });
    return response;
  };
}

} )();
