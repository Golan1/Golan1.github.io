//document.onkeydown = function(e){
//    console.log(e);
//};

angular.module('myApp', []);


angular.module('myApp').controller('myCtrl', function SomeController($scope, $document) {

$scope.colors = [];
$scope.colors.push({key:"#ffffff"});
$scope.colors.push({key:"#000000"});
//$scope.colors.push({key:"#ff0000"});

$scope.size = {};
$scope.size.rows = 20;
$scope.size.cols = 20;
$scope.board = [];
$scope.selectedColor = undefined;
$scope.rows =[];
$scope.cols = [];


$document.on("keydown", function(e){
    if ($scope.colors.length > e.keyCode - 49 && e.keyCode > 48)
    {
        $scope.selectedColor = $scope.colors[e.keyCode -49].key;
        $scope.actByState($scope.lastCell);
        $scope.$evalAsync();
    }
});

$document.on("keyup", function(e){
    $scope.selectedColor = undefined;
    $scope.$evalAsync();
});

$scope.$watch('size', function(val){
    $scope.board = [];
    for (var i=0;i<$scope.size.rows;i++){
        $scope.board.push([]);
        for (var j=0; j<$scope.size.cols; j++){
            $scope.board[i].push({style:{"background-color":$scope.colors[0].key}});

        }
    }
}, true);

$scope.actByState = function(cell){
    if (!!cell)
    {
        $scope.lastCell = cell;
        if (!!$scope.selectedColor)
        {
            cell.style["background-color"] = $scope.selectedColor;
        }
    }
};

$scope.disableLastCell = function()
{
    $scope.lastCell = undefined;
};

$scope.addColor = function(){
    $scope.colors.push({key:""});
};

$scope.saveBoard = function(key){
  localStorage.setItem(key, angular.toJson($scope.board));
};

$scope.loadBoard = function(key){
    $scope.board = angular.fromJson(localStorage.getItem(key));
}

$scope.removeBoard = function(key){
    localStorage.removeItem(key);
}

$scope.generateGame = function(){
    $scope.rows = [];
    for (var i=0;i<$scope.size.rows;i++){
        $scope.rows.push(getRowValues($scope.board[i]));
    }

    $scope.cols = [];
    for (var i=0;i<$scope.size.cols;i++){
        var colVals = [];
        var counter = 0;
        for (var j=0; j<$scope.size.rows;j++){
            if ($scope.board[j][i].style["background-color"] === $scope.colors[0].key){
                if (counter !== 0){
                    colVals.push(counter);
                    counter = 0;
                }
            }
            else{
                counter++;
            }

        }

        if (counter !== 0){
            colVals.push(counter);
        }

        $scope.cols.push(colVals);
    }
};

function getRowValues(row)
{
    var rowVals = [];
    var counter = 0;
    for (var i=0; i<$scope.size.cols; i++){
        if (row[i].style["background-color"] === $scope.colors[0].key){
            if (counter !== 0)
            {
                rowVals.push(counter);
                counter = 0;
            }
        }
        else{
            counter++;
        }
    }

    if (counter !== 0){
        rowVals.push(counter);
    }

    return rowVals;
}

});

angular.module('myApp').filter('reverse', function() {
  return function(items) {
    if (items){
        return items.slice().reverse();
    }
    return items;
  };
});
