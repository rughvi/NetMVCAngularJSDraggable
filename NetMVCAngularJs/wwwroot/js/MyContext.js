(function () {
  //Module
  var myApp = angular.module('MyApp', []);

  myApp.controller("myContextController", ["$scope", function($scope){
    console.log("Main Controller loaded.");
    $scope.list=[];
    $scope.myContextDiv = "<ul id='contextmenu-node'><li class='contextmenu-item' ng-click='clickedItem1()'> Item 1 </li><li     class='contextmenu-item' ng-click='clickedItem2()'> Item 2 </li></ul>";
    $scope.clickedItem1 = function(){
      console.log("Clicked item 1.");
      $scope.list.push({
        type:'text',
        name:'item 1',
        top : 0,
        left: 0
      });

      if($("#contextmenu-node"))
        $("#contextmenu-node").remove();
    };

    $scope.clickedItem2 = function(){
      console.log("Clicked item 2.");
      $scope.list.push({
        type:'image',
        name:'item 2',
        top : 0,
        left: 0
      });
      if($("#contextmenu-node"))
        $("#contextmenu-node").remove();
    };

  }]);

  // context menu directive
  myApp.directive( "contextMenu", function($compile){
    contextMenu = {};
    contextMenu.restrict = "AE";
    contextMenu.templateUrl='/js/MyContext.html';
    contextMenu.link = function( lScope, lElem, lAttr ){
        //var options = lScope.$eval(lAttr.contextMenu); //allow options to be passed in
        //lElem.draggable(options);
        lElem.on("contextmenu", function (e) {
            e.preventDefault(); // default context menu is disabled
            //  The customized context menu is defined in the main controller. To function the ng-click functions the, contextmenu HTML should be compiled.
            lElem.append( $compile( lScope[ lAttr.contextMenu ])(lScope) );
            // The location of the context menu is defined on the click position and the click position is catched by the right click event.
            $("#contextmenu-node").css("left", e.clientX);
            $("#contextmenu-node").css("top", e.clientY);            
        });
        lElem.on("mouseleave", function(e){
            console.log("Leaved the div");
            // on mouse leave, the context menu is removed.
            if($("#contextmenu-node") )
                $("#contextmenu-node").remove();
        });
    };
    return contextMenu;
  });

  myApp.directive('draggable', function($document) {
  return function(scope, element, attr) {
    var startX = 0,
      startY = 0,
      x = 0,
      y = 0; 
      var container = null; 
      
    element.css({
      position: 'relative',
      cursor: 'pointer'
    });
    
    element.on('mousedown', function(event) {
      // Prevent default dragging of selected content
      event.preventDefault();
      startX = event.screenX - x;
      startY = event.screenY - y;
      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup); 
      container = attr.$$element.parent();
      console.log(container);
    });

    function mousemove(event) {
      y = event.screenY - startY;
      x = event.screenX - startX;
      if (x < 0){
        x = 0
      }
      if (y < 0){
        y = 0;
      }

      scope.$apply(function(){
        index = attr.index;
        scope.list[index].top = y;
        scope.list[index].left = x;
      });
      
      console.log("x: " + x + " y: " + y)
      container.css({
        top: y + 'px',
        left: x + 'px'
      });
    }

    function mouseup() {
      $document.unbind('mousemove', mousemove);
      $document.unbind('mouseup', mouseup);
    }
  }
});
})();