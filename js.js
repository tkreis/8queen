// 8 - queen problem. backtacks and finds first answer.

function hasConflict(queens, possibleQueen){
    var constraints = calculateConstraints({x: possibleQueen[0], y: possibleQueen[1]});
    var X = 0;
    var Y = 1;

  return _.select(queens, function(queen){
    return (constraints.row == queen[X] 
    || constraints.column == queen[Y]
    || queen[Y] === constraints.leftToRight(queen[X])
    || queen[Y] === constraints.rightToLeft(queen[X]));
  }).length > 0;

  function calculateConstraints(coords){

    var left = calculatePoint(coords, 'left');
    var right = calculatePoint(coords, 'right');

    return {
      row: coords.x,
      column: coords.y,
      leftToRight: function(x){
        return getEquation((coords.y - left.y) / (coords.x - left.x))(x);
      },
      rightToLeft: function(x){
        return getEquation((right.y - coords.y) / (right.x - coords.x))(x);
      }
    };

    function calculatePoint(coords, direction){
      var bounds = [-1, 8];
      if(direction == 'left'){
        return isOutOfBound(coords.x, bounds)
        ?  {x: coords.x + 1, y: coords.y + 1}
        :  {x: coords.x - 1, y: coords.y - 1} 
      }

      return isOutOfBound(coords.x, bounds)
      ?  {x: coords.x + 1, y: coords.y - 1}
      :  {x:  0, y: coords.y + 1} 

      function isOutOfBound(number, bounds){
        return number > bounds[0] && number < bounds[1];
      }
    }

    function getEquation(slope){
      return function(x){
        // y = m*(x - x1) + y2
        return slope * (x - coords.x) + coords.y;
      }
    }
  }
}

function findSolution(x,y){

  return findPermutation(x,y, []);

  function findPermutation(x, y, currentResult){

    while( y < 8 ) {

      if(!hasConflict(currentResult, [x,y])){
        currentResult.push([x,y]);

        if(currentResult.length < 8){
          if(!findPermutation(x+1,0, currentResult)){
            currentResult.pop();

            return findPermutation(x, y+1, currentResult);
          }
        }

        return currentResult;
      }

      y++;
    }

    return false;
  }

}

// tests 

test( "5,5, 3,3 has conflict with 4,4", function() {
  ok( hasConflict([[5,5], [3,3]], [4,4]) , "Not Equal!" );
});

test( "5,5 has no conflict with 3,4", function() {
  ok( !hasConflict([[5,5]], [3,4]) , "Not Equal!" );
});

test( "Find permutations", function() {
  var solution = findSolution(1,1);
  ok( solution.length >= 8 , "Not Equal!" );
});

