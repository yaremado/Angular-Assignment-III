(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItemsDerective);


NarrowItDownController.$ingect = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;
  menu.emptySearch = true;
  menu.found = [];
  menu.searchTerm = "";
  menu.searchItemByTerm =  function(){
    if (menu.searchTerm != "") {
    var promises = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promises.then(function (response){
        menu.found = response;
        if (menu.found.length == 0) menu.emptySearch = false;
        if (menu.found.length != 0) menu.emptySearch = true;
      })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
      }
        if (menu.searchTerm == "" ) menu.emptySearch = false;

    }

  menu.removeThisOne = function(indexItem){
    menu.found.splice(indexItem, 1);
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
          if (foundItem.menu_items[item].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) items.push(foundItem.menu_items[item]);
        };
        return items;
    })
    .catch(function(error){
      console.log("Something wrong in Service.");
    });
    return response;
  };
}

function FoundItemsDerective() {
  var ddo = {
    templateUrl: 'found.html',
    scope: {
      found: '<',
      onRemove: '='
    },
    //controller: FoundItemsDerectiveController,
    //controllerAs: 'list',
    //bindToController: true
  };
  return ddo;
}

function FoundItemsDerectiveController(){
  var list = this;
}
} )();
