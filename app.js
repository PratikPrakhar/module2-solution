// app.js
(function() {
    'use strict';
  
    angular.module('ShoppingListCheckOff', [])
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
      .controller('ToBuyController', ['ShoppingListCheckOffService', ToBuyController])
      .controller('AlreadyBoughtController', ['ShoppingListCheckOffService', AlreadyBoughtController]);
  
    function ShoppingListCheckOffService() {
      var service = this;
  
      // Initial list of items to buy
      var itemsToBuy = [
        { name: 'cookies', quantity: 10 },
        { name: 'milk', quantity: 2 },
        { name: 'bread', quantity: 1 },
        { name: 'apples', quantity: 5 },
        { name: 'bananas', quantity: 6 }
      ];
      var itemsBought = [];
  
      // Expose the items to the controllers
      service.getItemsToBuy = function() {
        return itemsToBuy;
      };
  
      service.getItemsBought = function() {
        return itemsBought;
      };
  
      service.checkOff = function(item) {
        var index = itemsToBuy.indexOf(item);
        if (index !== -1) {
          itemsToBuy.splice(index, 1);
          itemsBought.push(item);
        }
      };
    }
  
    function ToBuyController(ShoppingListCheckOffService) {
      var ctrl = this;
      ctrl.items = ShoppingListCheckOffService.getItemsToBuy();
  
      ctrl.checkOff = function(item) {
        ShoppingListCheckOffService.checkOff(item);
      };
  
      ctrl.isEmpty = function() {
        return ctrl.items.length === 0;
      };
    }
  
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var ctrl = this;
      ctrl.items = ShoppingListCheckOffService.getItemsBought();
  
      ctrl.isEmpty = function() {
        return ctrl.items.length === 0;
      };
    }
  })();
  