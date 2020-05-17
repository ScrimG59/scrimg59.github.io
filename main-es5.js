function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
  /***/
  "./$$_lazy_route_resource lazy recursive":
  /*!******************************************************!*\
    !*** ./$$_lazy_route_resource lazy namespace object ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function $$_lazy_route_resourceLazyRecursive(module, exports) {
    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };

    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
    /***/
  },

  /***/
  "./src/app/algorithms/maze/randomMaze.ts":
  /*!***********************************************!*\
    !*** ./src/app/algorithms/maze/randomMaze.ts ***!
    \***********************************************/

  /*! exports provided: generateRandomMaze */

  /***/
  function srcAppAlgorithmsMazeRandomMazeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "generateRandomMaze", function () {
      return generateRandomMaze;
    });

    function generateRandomMaze(grid) {
      var wallNodes = [];

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          // returns a random int value from 0 to 1
          var random = Math.floor(Math.random() * 3.5);
          var currentNode = grid[i][j];
          if (random == 1 && !currentNode.isStart && !currentNode.isEnd) wallNodes.push(currentNode);
        }
      }

      return wallNodes;
    }
    /***/

  },

  /***/
  "./src/app/algorithms/pathfinding/astar.ts":
  /*!*************************************************!*\
    !*** ./src/app/algorithms/pathfinding/astar.ts ***!
    \*************************************************/

  /*! exports provided: aStar, retraceShortestPath */

  /***/
  function srcAppAlgorithmsPathfindingAstarTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "aStar", function () {
      return aStar;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "retraceShortestPath", function () {
      return retraceShortestPath;
    });

    function aStar(grid, startNode, endNode, heuristic) {
      // intialize
      var openList = [];
      var closedList = [];

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          grid[i][j].f = 0;
          grid[i][j].g = 0;
          grid[i][j].h = 0;
          grid[i][j].parentNode = null;
        }
      }

      openList.push(startNode);

      while (openList.length != 0) {
        var indexOfLowestF = 0;

        for (var _i = 0; _i < openList.length; _i++) {
          if (openList[_i].f < openList[indexOfLowestF].f) {
            indexOfLowestF = _i;
          }
        }

        var currentNode = openList[indexOfLowestF]; // we found the end node

        if (currentNode.isEnd) {
          console.log('Found end node!');
          closedList.push(currentNode);
          return closedList;
        } // remove the node with lowest f value from the openList


        openList.splice(indexOfLowestF, 1); // and push it into the closedList

        currentNode.closed = true;
        closedList.push(currentNode); // get the 4 neighbors of the current node

        var neighbors = getNeighbors(grid, currentNode);

        for (var _i2 = 0; _i2 < neighbors.length; _i2++) {
          var neighbor = neighbors[_i2]; // if the neighbor already is in the closedList or it is a wall, just skip it

          if (closedList.includes(neighbor) || neighbor.isWall) {
            console.log("Neighbor ".concat(neighbor.id, " already in the closedList!"));
            continue;
          } // the gScore is just the distance from the start node to the current node 


          var gScore = currentNode.g + 1; // this boolean value is helping us to differentiate if it's the most optimal path to the current node

          var isBestG = false; // first time visiting the node

          if (!openList.includes(neighbor)) {
            console.log("First time visiting Node ".concat(neighbor.row, " ").concat(neighbor.column)); // if it's the first time visiting the node, the gscore is the best (at least for the moment)

            isBestG = true; // get the heuristic distance 

            neighbor.h = getHeuristicDistance(neighbor, endNode, heuristic); // add the current neighbor to the openList

            openList.push(neighbor);
          } // if it's not the first time visiting the node but the g score was worse on the previous time
          else if (gScore < neighbor.g) {
              isBestG = true;
            } // if we found the temporal best path to this node


          if (isBestG) {
            console.log("Best path to node ".concat(neighbor.row, " ").concat(neighbor.column));
            neighbor.parentNode = currentNode;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
            console.log("F: ".concat(neighbor.f, " G: ").concat(neighbor.g, " H: ").concat(neighbor.h));
          }
        }
      } // return empty array if there was an error


      return [];
    }

    function getNeighbors(grid, currentNode) {
      var neighbors = []; // get the column and row from the current node

      console.log('[A*]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
      var column = currentNode.column;
      var row = currentNode.row; // get the node above

      if (row > 0) {
        var index = neighbors.push(grid[row - 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node below


      if (row < 26) {
        neighbors.push(grid[row + 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node on the left


      if (column > 0) {
        neighbors.push(grid[row][column - 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node on the right


      if (column < 68) {
        neighbors.push(grid[row][column + 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // only return the neighbors that weren't visited yet


      return neighbors;
    }

    function getHeuristicDistance(currentNode, endNode, heuristic) {
      if (heuristic == 'euclidean') {
        var result = Math.sqrt(Math.pow(currentNode.row - endNode.row, 2) + Math.pow(currentNode.column - endNode.column, 2));
        console.log('Euclidean Distance as heuristic');
        console.log("CurrentNode: ".concat(currentNode.row, " ").concat(currentNode.column, ", EndNode: ").concat(endNode.row, " ").concat(endNode.column, ", HeuristicDistance: ").concat(result));
        return result;
      } else {
        var _result = Math.abs(currentNode.row - endNode.row) + Math.abs(currentNode.column - endNode.column);

        console.log('Manhattan Distance as heuristic');
        console.log("CurrentNode: ".concat(currentNode.row, " ").concat(currentNode.column, ", EndNode: ").concat(endNode.row, " ").concat(endNode.column, ", HeuristicDistance: ").concat(_result));
        return _result;
      }
    }

    function retraceShortestPath(endNode) {
      var shortestPath = []; // set the current node to the end node

      var currentNode = endNode; // backtrack from the end node all the way to the starting node

      while (currentNode.parentNode != null) {
        // add the current node to the array of nodes for the shortest path
        shortestPath.unshift(currentNode); // then set current node to the current node's previous node ==> Backtracking

        currentNode = currentNode.parentNode;
      }

      console.log('[A*] LENGTH: ' + shortestPath.length);
      return shortestPath;
    }
    /***/

  },

  /***/
  "./src/app/algorithms/pathfinding/dijkstra.ts":
  /*!****************************************************!*\
    !*** ./src/app/algorithms/pathfinding/dijkstra.ts ***!
    \****************************************************/

  /*! exports provided: executeDijkstra, getUnvisitedNeighbors, getAll, createShortestPath */

  /***/
  function srcAppAlgorithmsPathfindingDijkstraTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "executeDijkstra", function () {
      return executeDijkstra;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getUnvisitedNeighbors", function () {
      return getUnvisitedNeighbors;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getAll", function () {
      return getAll;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createShortestPath", function () {
      return createShortestPath;
    });

    function executeDijkstra(grid, startNode, endNode) {
      var visitedNodes = [];
      var unvisitedNodes = []; // initialize 

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          if (grid[i][j].isStart) {
            grid[i][j].distance = 0;
          } else {
            // setting every node's distance to infinity except the start node
            grid[i][j].distance = Infinity;
          } // setting the parent (previous) node to null


          grid[i][j].parentNode = null;
        }
      } // getting all nodes from the current grid


      unvisitedNodes = getAll(grid);
      console.log('unvisited nodes length: ' + unvisitedNodes.length); // go through every unvisited node until the final node is reached

      while (unvisitedNodes.length != 0) {
        // get an array of unvisited nodes sorted according to the shortest distance
        unvisitedNodes.sort(function (a, b) {
          return a.distance - b.distance;
        }); // currentNode is the node with shortest distance

        var currentNode = unvisitedNodes.shift(); // skip the walls

        if (currentNode.isWall) {
          console.log('Its a wall');
          continue;
        } // if distance is infinite, we are probably trapped in walls


        if (currentNode.distance == Infinity) {
          console.log('WE GOT A PROBLEM!');
          return visitedNodes;
        } // set the current node's "isVisited"-property to true


        if (!currentNode.isStart && !currentNode.isEnd) {
          currentNode.isVisited = true;
        }

        visitedNodes.push(currentNode); // push the current node into an array of already visited nodes

        if (currentNode.isEnd) {
          console.log('End node reached!!');
          return visitedNodes;
        }

        console.log('updating neighbors'); // update the unvisited neighbors

        updateUnvisitedNeighbors(grid, currentNode);
      }
    }

    function getUnvisitedNeighbors(grid, currentNode) {
      var neighbors = []; // get the column and row from the current node

      console.log('[DIJKSTRA]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
      var column = currentNode.column;
      var row = currentNode.row; // get the node above

      if (row > 0) {
        neighbors.push(grid[row - 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node below


      if (row < 26) {
        neighbors.push(grid[row + 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node on the left


      if (column > 0) {
        neighbors.push(grid[row][column - 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node on the right


      if (column < 68) {
        neighbors.push(grid[row][column + 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // only return the neighbors that weren't visited yet


      return neighbors.filter(function (neighbor) {
        return !neighbor.isVisited;
      });
    } // UNDER CONSTRUCTION

    /*export function getUnvisitedDiagonalNeighbors(grid: Node[][], currentNode: Node): Node[]{
        const neighbors = [];
        // get the column and row from the current node
        console.log('[DIJKSTRA]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
        const column = currentNode.column;
        const row = currentNode.row;
        let currentNeighbor = null;
        // get the node above
        if(row > 0){
            currentNeighbor = grid[row - 1][column];
            neighbors.push(currentNeighbor);
            console.log('Neighbor: ' + neighbors[neighbors.length-1].row + ' ' + neighbors[neighbors.length-1].column + ' INDEX: ' + neighbors[neighbors.length-1].id);
        }
        // get the node diagonally right above
        if(row > 0 && column < 68){
            currentNeighbor = grid[row - 1][column + 1];
            currentNeighbor.isDiagonal = true;
            neighbors.push(currentNeighbor);
        }
        // get the node on the right
        if(column < 68){
            currentNeighbor = grid[row][column + 1];
            neighbors.push(currentNeighbor);
            console.log('Neighbor: ' + neighbors[neighbors.length-1].row + ' ' + neighbors[neighbors.length-1].column + ' INDEX: ' + neighbors[neighbors.length-1].id);
        }
        // get the node diagonally right below
        if(row < 26 && column < 68){
            currentNeighbor = grid[row + 1][column + 1];
            currentNeighbor.isDiagonal = true;
            neighbors.push(currentNeighbor);
        }
        // get the node below
        if(row < 26){
            currentNeighbor = grid[row + 1][column];
            neighbors.push(currentNeighbor);
            console.log('Neighbor: ' + neighbors[neighbors.length-1].row + ' ' + neighbors[neighbors.length-1].column + ' INDEX: ' + neighbors[neighbors.length-1].id);
        }
        // get the node diagonally left below
        if(row < 26 && column > 0){
            currentNeighbor = grid[row + 1][column - 1];
            currentNeighbor.isDiagonal = true;
            neighbors.push(currentNeighbor);
        }
        // get the node on the left
        if(column > 0){
            currentNeighbor = grid[row][column - 1];
            neighbors.push(currentNeighbor);
            console.log('Neighbor: ' + neighbors[neighbors.length-1].row + ' ' + neighbors[neighbors.length-1].column + ' INDEX: ' + neighbors[neighbors.length-1].id);
        }
        // get the node diagonally left above
        if(row > 0 && column > 0){
            currentNeighbor = grid[row - 1][column - 1];
            currentNeighbor.isDiagonal = true;
            neighbors.push(currentNeighbor);
        }
        // only return the neighbors that weren't visited yet
        return neighbors.filter(neighbor => !neighbor.isVisited);
    }*/


    function updateUnvisitedNeighbors(grid, currentNode) {
      // get all unvisited neighbors of the current node
      var unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode); // for each unvisited neighbor set the distance to the current node's distance + 1
      // +1 because the distance between the current node and the neighbor is 1
      // also set the neighbors "previousNode"-property to the current node

      unvisitedNeighbors.forEach(function (node) {
        if (node.isDiagonal) {
          node.distance = currentNode.distance + 1.1;
        } else {
          // "1" is the standard weight (distance) from one node to its neighbors
          node.distance = currentNode.distance + 1;
        }

        node.parentNode = currentNode;
      });
    }

    function getAll(grid) {
      var nodes = []; // gets all nodes of the given grid

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          nodes.push(grid[i][j]);
        }
      }

      return nodes;
    }

    function createShortestPath(endNode) {
      var shortestPath = []; // set the current node to the end node

      var currentNode = endNode; // backtrack from the end node all the way to the starting node

      while (currentNode != null) {
        // add the current node to the array of nodes for the shortest path
        shortestPath.unshift(currentNode); // then set current node to the current node's previous node ==> Backtracking

        if (currentNode.parentNode.isStart) {
          break;
        }

        currentNode = currentNode.parentNode;
      }

      return shortestPath;
    }
    /***/

  },

  /***/
  "./src/app/algorithms/pathfinding/dijkstraexperimental.ts":
  /*!****************************************************************!*\
    !*** ./src/app/algorithms/pathfinding/dijkstraexperimental.ts ***!
    \****************************************************************/

  /*! exports provided: executeExperimental, getAll, getUnvisitedNeighbors, createShortestPath */

  /***/
  function srcAppAlgorithmsPathfindingDijkstraexperimentalTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "executeExperimental", function () {
      return executeExperimental;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getAll", function () {
      return getAll;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "getUnvisitedNeighbors", function () {
      return getUnvisitedNeighbors;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "createShortestPath", function () {
      return createShortestPath;
    });

    function executeExperimental(grid, startNode, endNode, heuristic) {
      var visitedNodes = [];
      var unvisitedNodes = []; // initialize 

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          if (grid[i][j].isStart) {
            grid[i][j].distance = 0;
            grid[i][j].h = getHeuristicDistance(grid[i][j], endNode, heuristic);
          } else {
            grid[i][j].distance = Infinity;
            grid[i][j].h = getHeuristicDistance(grid[i][j], endNode, heuristic);
          }

          grid[i][j].parentNode = null;
        }
      }

      unvisitedNodes = getAll(grid);
      console.log('unvisited nodes length: ' + unvisitedNodes.length);

      while (unvisitedNodes.length != 0) {
        // get an array of unvisited nodes sorted according to the shortest distance
        unvisitedNodes.sort(function (a, b) {
          return a.distance - b.distance;
        }); // currentNode is the node with shortest distance

        var currentNode = unvisitedNodes.shift(); // skip the walls

        if (currentNode.isWall) {
          console.log('Its a wall');
          continue;
        } // if distance is infinite, we are probably trapped in walls


        if (currentNode.distance == Infinity) {
          console.log('WE GOT A PROBLEM!');
          return visitedNodes;
        } // set the current node's "isVisited"-property to true


        if (!currentNode.isStart && !currentNode.isEnd) {
          currentNode.isVisited = true;
        }

        visitedNodes.push(currentNode); // push the current node into an array of already visited nodes

        if (currentNode.isEnd) {
          console.log('End node reached!!');
          return visitedNodes;
        }

        console.log('updating neighbors');
        updateUnvisitedNeighbors(grid, currentNode);
      }
    }

    function getAll(grid) {
      var nodes = []; // gets all nodes of the given grid

      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
          nodes.push(grid[i][j]);
        }
      }

      return nodes;
    }

    function getHeuristicDistance(currentNode, endNode, heuristic) {
      if (heuristic == 'euclidean') {
        var result = Math.sqrt(Math.pow(currentNode.row - endNode.row, 2) + Math.pow(currentNode.column - endNode.column, 2));
        console.log('Euclidean Distance as heuristic');
        console.log("CurrentNode: ".concat(currentNode.row, " ").concat(currentNode.column, ", EndNode: ").concat(endNode.row, " ").concat(endNode.column, ", HeuristicDistance: ").concat(result));
        return result;
      } else {
        var _result2 = Math.abs(currentNode.row - endNode.row) + Math.abs(currentNode.column - endNode.column);

        console.log('Manhattan Distance as heuristic');
        console.log("CurrentNode: ".concat(currentNode.row, " ").concat(currentNode.column, ", EndNode: ").concat(endNode.row, " ").concat(endNode.column, ", HeuristicDistance: ").concat(_result2));
        return _result2;
      }
    }

    function updateUnvisitedNeighbors(grid, currentNode) {
      // get all unvisited neighbors of the current node
      var unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode); // for each unvisited neighbor set the distance to the current node's distance + 1
      // +1 because the distance between the current node and the neighbor is 1
      // also set the neighbors "previousNode"-property to the current node

      unvisitedNeighbors.forEach(function (node) {
        node.distance = currentNode.distance + node.h + 1;
        node.parentNode = currentNode;
      });
    }

    function getUnvisitedNeighbors(grid, currentNode) {
      var neighbors = []; // get the column and row from the current node

      console.log('[A*]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
      var column = currentNode.column;
      var row = currentNode.row; // get the node above

      if (row > 0) {
        var index = neighbors.push(grid[row - 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node below


      if (row < 26) {
        neighbors.push(grid[row + 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node on the left


      if (column > 0) {
        neighbors.push(grid[row][column - 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // get the node on the right


      if (column < 68) {
        neighbors.push(grid[row][column + 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
      } // only return the neighbors that weren't visited yet


      return neighbors.filter(function (neighbor) {
        return !neighbor.isVisited;
      });
    }

    function createShortestPath(endNode) {
      var shortestPath = []; // set the current node to the end node

      var currentNode = endNode; // backtrack from the end node all the way to the starting node

      while (currentNode != null) {
        // add the current node to the array of nodes for the shortest path
        shortestPath.unshift(currentNode); // then set current node to the current node's previous node ==> Backtracking

        if (currentNode.parentNode.isStart) {
          break;
        }

        currentNode = currentNode.parentNode;
      }

      console.log('[DIJKSTRA] LENGTH: ' + shortestPath.length);
      return shortestPath;
    }
    /***/

  },

  /***/
  "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/

  /*! exports provided: AppRoutingModule */

  /***/
  function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var routes = [];

    var AppRoutingModule = function AppRoutingModule() {
      _classCallCheck(this, AppRoutingModule);
    };

    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/

  /*! exports provided: AppComponent */

  /***/
  function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./grid/grid.component */
    "./src/app/grid/grid.component.ts");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var AppComponent = function AppComponent(titleService) {
      _classCallCheck(this, AppComponent);

      this.titleService = titleService;
      this.title = 'Pathfinder';
      this.titleService.setTitle('Pathfinder');
    };

    AppComponent.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"]));
    };

    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 4,
      vars: 0,
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "body");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-grid");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
        }
      },
      directives: [_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]],
      styles: ["body[_ngcontent-%COMP%]{\r\n    background-color: #333;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxzQkFBc0I7QUFDMUIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHl7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xyXG59Il19 */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-root',
          templateUrl: './app.component.html',
          styleUrls: ['./app.component.css']
        }]
      }], function () {
        return [{
          type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/

  /*! exports provided: AppModule */

  /***/
  function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material/tooltip */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
    /* harmony import */


    var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser/animations */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./navbar/navbar.component */
    "./src/app/navbar/navbar.component.ts");
    /* harmony import */


    var _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./grid/grid.component */
    "./src/app/grid/grid.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]],
          providers: [],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/grid/grid.component.ts":
  /*!****************************************!*\
    !*** ./src/app/grid/grid.component.ts ***!
    \****************************************/

  /*! exports provided: GridComponent */

  /***/
  function srcAppGridGridComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "GridComponent", function () {
      return GridComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _models_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../models/node */
    "./src/models/node.ts");
    /* harmony import */


    var _algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../algorithms/pathfinding/dijkstra */
    "./src/app/algorithms/pathfinding/dijkstra.ts");
    /* harmony import */


    var _algorithms_pathfinding_astar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../algorithms/pathfinding/astar */
    "./src/app/algorithms/pathfinding/astar.ts");
    /* harmony import */


    var _algorithms_pathfinding_dijkstraexperimental__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ../algorithms/pathfinding/dijkstraexperimental */
    "./src/app/algorithms/pathfinding/dijkstraexperimental.ts");
    /* harmony import */


    var _algorithms_maze_randomMaze__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ../algorithms/maze/randomMaze */
    "./src/app/algorithms/maze/randomMaze.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

    var _c0 = function _c0(a0, a1, a2, a3, a4) {
      return {
        "isStart": a0,
        "isEnd": a1,
        "isWall": a2,
        "isVisited": a3,
        "isShortestPath": a4,
        "node": true
      };
    };

    function GridComponent_tr_127_td_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 44);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function GridComponent_tr_127_td_1_Template_td_mousedown_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r6.mouseDown(row_r2, col_r5);
        })("mouseenter", function GridComponent_tr_127_td_1_Template_td_mouseenter_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r9.mouseEnter(row_r2, col_r5);
        })("mouseleave", function GridComponent_tr_127_td_1_Template_td_mouseleave_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r11.mouseLeave(row_r2, col_r5);
        })("mouseup", function GridComponent_tr_127_td_1_Template_td_mouseup_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r13.mouseUp(row_r2, col_r5);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 45);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var node_r4 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](1, _c0, node_r4.isStart, node_r4.isEnd, node_r4.isWall, node_r4.isActuallyVisited, node_r4.isShortestPath));
      }
    }

    function GridComponent_tr_127_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_tr_127_td_1_Template, 2, 7, "td", 43);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var rows_r1 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", rows_r1);
      }
    }

    var GRID_NODES = [];
    var ALGORITHM = "nothing";
    var distance = 'euclidean';
    var showProcess = true;
    var animationSpeed = 20;
    var mouseIsPressed = false;
    var startIsMoving = false;
    var endIsMoving = false;
    var isRunning = false;
    var startCoordiantes = new Map();
    var endCoordinates = new Map();

    var GridComponent = /*#__PURE__*/function () {
      function GridComponent() {
        _classCallCheck(this, GridComponent);

        this.exampleArray = [];
        this.nodes = GRID_NODES;
        this.algorithm = ALGORITHM;
      }

      _createClass(GridComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          //generates the nodes for the grid
          this.generateTwoDimensionalGrid(); // setting the default coordinates for start node and end node

          startCoordiantes.set('Row', 13);
          startCoordiantes.set('Col', 10);
          endCoordinates.set('Row', 13);
          endCoordinates.set('Col', 58); // setting the default checkboxes

          this.setHeuristicCheckboxes();
          this.initShowProcessCheckbox();
        }
      }, {
        key: "generateTwoDimensionalGrid",
        value: function generateTwoDimensionalGrid() {
          var index = 0;

          for (var row = 0; row <= 26; row++) {
            var currentRow = [];

            for (var column = 0; column < 69; column++) {
              if (row == 13 && column == 10) {
                currentRow.push(new _models_node__WEBPACK_IMPORTED_MODULE_1__["Node"](index, true, false, false, false, row, column));
              } else if (row == 13 && column == 58) {
                currentRow.push(new _models_node__WEBPACK_IMPORTED_MODULE_1__["Node"](index, false, true, false, false, row, column));
              } else {
                currentRow.push(new _models_node__WEBPACK_IMPORTED_MODULE_1__["Node"](index, false, false, false, false, row, column));
              }

              index++;
            }

            GRID_NODES.push(currentRow);
          }
        }
      }, {
        key: "checkAlgorithm",
        value: function checkAlgorithm() {
          if (isRunning) return;

          if (this.algorithm == 'nothing') {
            document.getElementById('btn-visualize').textContent = "Pick an algortihm!";
          } else {
            document.getElementById('btn-visualize').textContent = 'Visualizing...';
            document.getElementById('btn-visualize').style.backgroundColor = '#ff0000';
            this.clearVisitedNodes();
            isRunning = true;
            this.visualizeAlgorithm();
          }
        }
      }, {
        key: "visualizeAlgorithm",
        value: function visualizeAlgorithm() {
          if (this.algorithm == 'Dijkstra') {
            var startRow = startCoordiantes.get('Row');
            var startCol = startCoordiantes.get('Col');
            var startNode = this.nodes[startRow][startCol];
            var endRow = endCoordinates.get('Row');
            var endCol = endCoordinates.get('Col');
            var endNode = this.nodes[endRow][endCol];
            var visitedNodes = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["executeDijkstra"])(this.nodes, startNode, endNode);

            if (!this.checkIfFound(visitedNodes)) {
              setTimeout(function () {
                document.getElementById('btn-visualize').textContent = 'Visualize!';
                document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
              }, 1500);
              document.getElementById('btn-visualize').textContent = 'No path found!';
              this.algorithm = 'nothing';
              isRunning = false;
              return;
            } else {
              var shortestPath = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["createShortestPath"])(endNode);
              this.animateAlgorithm(visitedNodes, shortestPath, showProcess);
              this.setStatistics(visitedNodes, shortestPath, showProcess);
            }
          } else if (this.algorithm == 'A*') {
            var _startRow = startCoordiantes.get('Row');

            var _startCol = startCoordiantes.get('Col');

            var _startNode = this.nodes[_startRow][_startCol];

            var _endRow = endCoordinates.get('Row');

            var _endCol = endCoordinates.get('Col');

            var _endNode = this.nodes[_endRow][_endCol];

            var _visitedNodes = Object(_algorithms_pathfinding_astar__WEBPACK_IMPORTED_MODULE_3__["aStar"])(this.nodes, _startNode, _endNode, distance);

            console.log('VISITED NODES:' + _visitedNodes.length);

            if (!this.checkIfFound(_visitedNodes)) {
              setTimeout(function () {
                document.getElementById('btn-visualize').textContent = 'Visualize!';
                document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
              }, 1500);
              document.getElementById('btn-visualize').textContent = 'No path found!';
              this.algorithm = 'nothing';
              isRunning = false;
              return;
            } else {
              var _shortestPath = Object(_algorithms_pathfinding_astar__WEBPACK_IMPORTED_MODULE_3__["retraceShortestPath"])(_endNode);

              this.animateAlgorithm(_visitedNodes, _shortestPath, showProcess);
              this.setStatistics(_visitedNodes, _shortestPath, showProcess);
            }
          } else if (this.algorithm == 'Alt-Dijkstra') {
            var _startRow2 = startCoordiantes.get('Row');

            var _startCol2 = startCoordiantes.get('Col');

            var _startNode2 = this.nodes[_startRow2][_startCol2];

            var _endRow2 = endCoordinates.get('Row');

            var _endCol2 = endCoordinates.get('Col');

            var _endNode2 = this.nodes[_endRow2][_endCol2];

            var _visitedNodes2 = Object(_algorithms_pathfinding_dijkstraexperimental__WEBPACK_IMPORTED_MODULE_4__["executeExperimental"])(this.nodes, _startNode2, _endNode2, distance);

            if (!this.checkIfFound(_visitedNodes2)) {
              setTimeout(function () {
                document.getElementById('btn-visualize').textContent = 'Visualize!';
                document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
              }, 1500);
              document.getElementById('btn-visualize').textContent = 'No path found!';
              this.algorithm = 'nothing';
              isRunning = false;
              return;
            } else {
              var _shortestPath2 = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["createShortestPath"])(_endNode2);

              this.animateAlgorithm(_visitedNodes2, _shortestPath2, showProcess);
              this.setStatistics(_visitedNodes2, _shortestPath2, showProcess);
            }
          }
        }
      }, {
        key: "animateAlgorithm",
        value: function animateAlgorithm(visitedNodes, shortestPath, showProcess) {
          var _this = this;

          if (showProcess) {
            var _loop = function _loop(i) {
              if (i == visitedNodes.length) {
                setTimeout(function () {
                  console.log('[GRID] Shortest Path: ' + shortestPath.length);
                  console.log('[GRID]: ' + shortestPath[0].row + ' ' + shortestPath[0].column);

                  _this.animateShortestPath(shortestPath);
                }, i * animationSpeed);
                return {
                  v: void 0
                };
              }

              setTimeout(function () {
                if (visitedNodes[i].isStart || visitedNodes[i].isEnd) {} else {
                  visitedNodes[i].isActuallyVisited = true;
                }
              }, i * animationSpeed);
            };

            for (var i = 0; i <= visitedNodes.length; i++) {
              var _ret = _loop(i);

              if (typeof _ret === "object") return _ret.v;
            }
          } else {
            this.animateShortestPath(shortestPath);
          }
        }
      }, {
        key: "animateShortestPath",
        value: function animateShortestPath(shortestPath) {
          var _this2 = this;

          var _loop2 = function _loop2(i) {
            setTimeout(function () {
              if (i == shortestPath.length) {
                _this2.algorithm = 'nothing';
                isRunning = false;
                document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                setTimeout(function () {
                  document.getElementById('btn-visualize').textContent = 'Visualize!';
                }, 1500);
                document.getElementById('btn-visualize').textContent = 'Done!';
                return;
              }

              console.log('[ANIMATE_SHORTEST_PATH]: ' + shortestPath[i].row + ' ' + shortestPath[i].column);
              shortestPath[i].isActuallyVisited = false;

              if (shortestPath[i].isEnd) {} else {
                shortestPath[i].isShortestPath = true;
              }
            }, i * animationSpeed * 2);
          };

          for (var i = 0; i <= shortestPath.length; i++) {
            _loop2(i);
          }
        }
      }, {
        key: "visualizeMazeAlgorithm",
        value: function visualizeMazeAlgorithm() {
          if (isRunning) return;
          console.log("Generating random maze...");
          this.clearBoard();
          isRunning = true;
          var walls = Object(_algorithms_maze_randomMaze__WEBPACK_IMPORTED_MODULE_5__["generateRandomMaze"])(this.nodes);
          this.animateMazeAlgorithm(walls);
        }
      }, {
        key: "animateMazeAlgorithm",
        value: function animateMazeAlgorithm(walls) {
          console.log("Animating random maze...");

          var _loop3 = function _loop3(i) {
            setTimeout(function () {
              if (i == walls.length) {
                isRunning = false;
                document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                setTimeout(function () {
                  document.getElementById('btn-visualize').textContent = 'Visualize!';
                }, 1500);
                document.getElementById('btn-visualize').textContent = 'Done!';
                return;
              }

              walls[i].isWall = true;
            }, i * 10);
          };

          for (var i = 0; i <= walls.length; i++) {
            _loop3(i);
          }
        }
      }, {
        key: "toggleWall",
        value: function toggleWall(row, column) {
          if (this.nodes[row][column].isStart || this.nodes[row][column].isEnd) {
            console.log('Cannot toggle wall!');
            return;
          } else if (isRunning) {} else {
            this.nodes[row][column].isWall = !this.nodes[row][column].isWall;
          }

          console.log('ROW: ' + this.nodes[row][column].row + ' COLUMN: ' + this.nodes[row][column].column);
        }
      }, {
        key: "setStart",
        value: function setStart(row, column) {
          if (isRunning) {
            return;
          }

          this.nodes[row][column].isStart = true;
          startCoordiantes.set('Row', row);
          startCoordiantes.set('Col', column);
        }
      }, {
        key: "deleteStart",
        value: function deleteStart(row, column) {
          if (isRunning) {
            return;
          }

          this.nodes[row][column].isStart = false;
        }
      }, {
        key: "setEnd",
        value: function setEnd(row, column) {
          if (isRunning) {
            return;
          }

          this.nodes[row][column].isEnd = true;
          endCoordinates.set('Row', row);
          endCoordinates.set('Col', column);
        }
      }, {
        key: "deleteEnd",
        value: function deleteEnd(row, column) {
          if (isRunning) {
            return;
          }

          this.nodes[row][column].isEnd = false;
        }
      }, {
        key: "mouseDown",
        value: function mouseDown(row, col) {
          mouseIsPressed = true;

          if (this.nodes[row][col].isStart) {
            startIsMoving = true;
          } else if (this.nodes[row][col].isEnd) {
            endIsMoving = true;
          } else {
            this.toggleWall(row, col);
          }

          console.log('Mouse down');
        }
      }, {
        key: "mouseEnter",
        value: function mouseEnter(row, column) {
          if (mouseIsPressed && !startIsMoving && !endIsMoving) {
            this.toggleWall(row, column);
          } else if (mouseIsPressed && startIsMoving) {
            if (this.nodes[row][column].isWall) {
              this.toggleWall(row, column);
            }

            this.setStart(row, column);
          } else if (mouseIsPressed && endIsMoving) {
            if (this.nodes[row][column].isWall) {
              this.toggleWall(row, column);
            }

            this.setEnd(row, column);
          } else {}
        }
      }, {
        key: "mouseLeave",
        value: function mouseLeave(row, column) {
          if (mouseIsPressed && startIsMoving) {
            this.deleteStart(row, column);
          } else if (mouseIsPressed && endIsMoving) {
            this.deleteEnd(row, column);
          } else {}
        }
      }, {
        key: "mouseUp",
        value: function mouseUp(row, column) {
          mouseIsPressed = false;
          startIsMoving = false;
          endIsMoving = false;
          console.log('Mouse up');
        }
      }, {
        key: "clearWalls",
        value: function clearWalls() {
          if (isRunning) return;

          for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
              if (this.nodes[i][j].isWall) this.nodes[i][j].isWall = false;
            }
          }
        }
      }, {
        key: "clearBoard",
        value: function clearBoard() {
          if (isRunning) return;

          for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
              this.nodes[i][j].isWall = false;
              this.nodes[i][j].isVisited = false;
              this.nodes[i][j].isActuallyVisited = false;
              this.nodes[i][j].isShortestPath = false;
            }
          }

          this.resetStatistics();
        }
      }, {
        key: "resetStatistics",
        value: function resetStatistics() {
          document.getElementById('visitedNodes').style.color = 'white';
          document.getElementById('shortestPath').style.color = 'white';
          document.getElementById('visitedNodes').textContent = '0';
          document.getElementById('shortestPath').textContent = '0';
        }
      }, {
        key: "clearVisitedNodes",
        value: function clearVisitedNodes() {
          if (isRunning) return;

          for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
              if (this.nodes[i][j].isActuallyVisited || this.nodes[i][j].isVisited || this.nodes[i][j].closed) {
                this.nodes[i][j].isVisited = false;
                this.nodes[i][j].isActuallyVisited = false;
                this.nodes[i][j].isShortestPath = false;
                this.nodes[i][j].closed = false;
              }
            }
          }

          this.resetStatistics();
        }
      }, {
        key: "setPathfindingAlgorithm",
        value: function setPathfindingAlgorithm(algorithm) {
          //this.openDijkstraDialog();
          this.algorithm = algorithm;
          document.getElementById('btn-visualize').textContent = "Visualize ".concat(this.algorithm, "!");
          console.log(this.algorithm);
        }
      }, {
        key: "setSpeed",
        value: function setSpeed(speed) {
          switch (speed) {
            case "Very Fast":
              animationSpeed = 5;
              break;

            case "Fast":
              animationSpeed = 10;

            case "Normal":
              animationSpeed = 20;
              break;

            case "Slow":
              animationSpeed = 40;
              break;

            case "Very Slow":
              animationSpeed = 60;
          }
        }
      }, {
        key: "initShowProcessCheckbox",
        value: function initShowProcessCheckbox() {
          var showProcessCheckbox = document.getElementById('showProcess');
          showProcess = true;
          showProcessCheckbox.checked = true;
        }
      }, {
        key: "setShowProcessCheckbox",
        value: function setShowProcessCheckbox() {
          var showProcessCheckbox = document.getElementById('showProcess');

          if (showProcessCheckbox.checked) {
            showProcess = true;
            console.log(showProcess);
          } else {
            showProcess = false;
            console.log(showProcess);
          }
        }
      }, {
        key: "setStatistics",
        value: function setStatistics(visitedNodes, shortestPath, showProcess) {
          if (showProcess) {
            var _loop4 = function _loop4(i) {
              if (i == visitedNodes.length) {
                setTimeout(function () {
                  var _loop5 = function _loop5(j) {
                    setTimeout(function () {
                      document.getElementById('visitedNodes').style.color = '#0398f4';
                      document.getElementById('shortestPath').style.color = 'yellow';
                      document.getElementById('shortestPath').textContent = "".concat(j);
                    }, j * animationSpeed * 2);
                  };

                  for (var j = 0; j < shortestPath.length; j++) {
                    _loop5(j);
                  }
                }, i * animationSpeed);
              } else {
                setTimeout(function () {
                  document.getElementById('visitedNodes').style.color = '#ff0000';
                  document.getElementById('visitedNodes').textContent = "".concat(i);
                }, i * animationSpeed);
              }
            };

            for (var i = 0; i <= visitedNodes.length; i++) {
              _loop4(i);
            }
          } else {
            var _loop6 = function _loop6(_i3) {
              setTimeout(function () {
                document.getElementById('shortestPath').style.color = 'yellow';
                document.getElementById('shortestPath').textContent = "".concat(_i3);
              }, _i3 * animationSpeed * 2);
            };

            for (var _i3 = 0; _i3 < shortestPath.length; _i3++) {
              _loop6(_i3);
            }
          }
        }
      }, {
        key: "setHeuristicCheckboxes",
        value: function setHeuristicCheckboxes() {
          var euclideanCheckbox = document.getElementById('euclidean');
          var manhattanCheckbox = document.getElementById('manhattan');

          if (distance == 'euclidean') {
            euclideanCheckbox.checked = true;
            manhattanCheckbox.checked = false;
          } else {
            euclideanCheckbox.checked = false;
            manhattanCheckbox.checked = true;
          }
        }
      }, {
        key: "setHeuristicDistance",
        value: function setHeuristicDistance(heuristic) {
          distance = heuristic;
          this.setHeuristicCheckboxes();
        }
      }, {
        key: "checkVisited",
        value: function checkVisited() {
          for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
              if (this.nodes[i][j].isActuallyVisited && this.nodes[i][j].isShortestPath) return true;
            }
          }

          return false;
        }
      }, {
        key: "checkClosed",
        value: function checkClosed() {
          for (var i = 0; i < this.nodes.length; i++) {
            for (var j = 0; j < this.nodes[i].length; j++) {
              if (this.nodes[i][j].closed) return true;
            }
          }

          return false;
        } // checks if the given algorithm found the final node

      }, {
        key: "checkIfFound",
        value: function checkIfFound(visitedNodes) {
          if (visitedNodes.length == 0) {
            return false;
          } else if (visitedNodes[visitedNodes.length - 1].isEnd) {
            return true;
          } else {
            return false;
          }
        }
      }, {
        key: "toggleSlideMenu",
        value: function toggleSlideMenu() {
          var slideMenu = document.querySelector('.slideMenu');
          slideMenu.classList.toggle('slideMenu-active');
          console.log(slideMenu.classList);
        }
      }]);

      return GridComponent;
    }();

    GridComponent.ɵfac = function GridComponent_Factory(t) {
      return new (t || GridComponent)();
    };

    GridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: GridComponent,
      selectors: [["app-grid"]],
      decls: 128,
      vars: 1,
      consts: [["href", "#", 1, "title"], [1, "titleName"], [1, "nav-links"], [1, "algorithms"], [1, "dropdown"], [1, "dropbtn"], [1, "dropdown-content"], ["href", "#", 3, "click"], [1, "maze"], ["href", "#"], [1, "visualize"], ["id", "btn-visualize", 1, "btn-visualize", 3, "click"], [1, "clearBoard"], ["id", "btn-clearBoard", 1, "btn-clearBoard", 3, "click"], [1, "clearWalls"], ["id", "btn-clearWalls", 1, "btn-clearWalls", 3, "click"], [1, "speed"], [1, "burger", 3, "click"], [1, "line1"], [1, "line2"], [1, "line3"], [1, "slideMenu"], [1, "navLinks"], [1, "slideMenuTitle"], [1, "item", 3, "click"], [1, "item"], [1, "slideMenuVisualize", 3, "click"], [1, "slideMenuClear", 3, "click"], [1, "options"], [1, "options-container"], [1, "stats"], ["id", "showProcess", "type", "checkbox", 3, "click"], ["for", "checkbox", 1, "checkboxLabel"], ["id", "euclidean", "type", "checkbox", 3, "click"], ["id", "visitedNodesStats"], ["id", "visitedNodes"], ["id", "bidirectional", "type", "checkbox"], ["id", "manhattan", "type", "checkbox", 3, "click"], ["id", "shortestPathStats"], ["id", "shortestPath"], [1, "grid-container"], [1, "grid"], [4, "ngFor", "ngForOf"], ["draggable", "false", 3, "mousedown", "mouseenter", "mouseleave", "mouseup", 4, "ngFor", "ngForOf"], ["draggable", "false", 3, "mousedown", "mouseenter", "mouseleave", "mouseup"], ["id", "node.id", 3, "ngClass"]],
      template: function GridComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Pathfinder");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Algorithms");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_11_listener() {
            return ctx.setPathfindingAlgorithm("Dijkstra");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_13_listener() {
            return ctx.setPathfindingAlgorithm("A*");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "A*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_15_listener() {
            return ctx.setPathfindingAlgorithm("Alt-Dijkstra");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Alt-Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Mazes");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_22_listener() {
            return ctx.visualizeMazeAlgorithm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Random Maze");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "To be continued...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_27_listener() {
            return ctx.checkAlgorithm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Visualize!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_30_listener() {
            return ctx.clearBoard();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Clear Board");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_33_listener() {
            return ctx.clearWalls();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Clear Walls");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "li", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Speed of Animation");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_40_listener() {
            return ctx.setSpeed("Very Fast");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Very Fast");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_42_listener() {
            return ctx.setSpeed("Fast");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Fast");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_44_listener() {
            return ctx.setSpeed("Normal");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Normal");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_46_listener() {
            return ctx.setSpeed("Slow");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Slow");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_48_listener() {
            return ctx.setSpeed("Very Slow");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Very Slow");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_div_click_50_listener() {
            return ctx.toggleSlideMenu();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "ul", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Algorithms");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_58_listener() {
            return ctx.setPathfindingAlgorithm("Dijkstra");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_60_listener() {
            return ctx.setPathfindingAlgorithm("A*");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "A*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_62_listener() {
            return ctx.setPathfindingAlgorithm("Alt-Dijkstra");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Alt-Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Mazes");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_66_listener() {
            return ctx.visualizeMazeAlgorithm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Random Maze");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "li", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "To be continued...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "li", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_70_listener() {
            return ctx.checkAlgorithm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Visualize");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "li", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_72_listener() {
            return ctx.clearBoard();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Clear Board");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "li", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_74_listener() {
            return ctx.clearWalls();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Clear Walls");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Speed of Animation");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_78_listener() {
            return ctx.setSpeed("Very Fast");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Very Fast");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_80_listener() {
            return ctx.setSpeed("Fast");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Fast");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_82_listener() {
            return ctx.setSpeed("Normal");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "Normal");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_84_listener() {
            return ctx.setSpeed("Slow");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "Slow");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "li", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_86_listener() {
            return ctx.setSpeed("Very Slow");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "Very Slow");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "table", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "General");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "Heuristics");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](96, "Statistics");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "input", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_99_listener() {
            return ctx.setShowProcessCheckbox();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "label", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "Show Process");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "input", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_103_listener() {
            return ctx.setHeuristicDistance("euclidean");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "label", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, "Euclidean");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "p", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, "Visited Nodes: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "label", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, "0");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "input", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "label", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, "Bidirectional");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "input", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_117_listener() {
            return ctx.setHeuristicDistance("manhattan");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "label", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, "Manhattan");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "p", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "Shortest path: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "label", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "0");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "div", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "table", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](127, GridComponent_tr_127_Template, 2, 1, "tr", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](127);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.nodes);
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"]],
      styles: ["body[_ngcontent-%COMP%]{\r\n  position: fixed;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\nheader[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: #222;\r\n  \r\n}\r\nheader[_ngcontent-%COMP%]::after{\r\n  content: '';\r\n  display: table;\r\n  clear: both;\r\n}\r\n.title[_ngcontent-%COMP%]{\r\n  font-size: 2em;\r\n  color: rgb(226, 226, 226);\r\n  text-transform: uppercase;\r\n  letter-spacing: 5px;\r\n  cursor: default;\r\n  text-decoration: none;\r\n  flex: 1.1;\r\n  margin-left: 1vw;\r\n}\r\nnav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{\r\n  flex: 6;\r\n}\r\n.titleName[_ngcontent-%COMP%]:hover{\r\n  color: #0398f4;\r\n}\r\nnav[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  width: 100%;\r\n  align-items: center;\r\n  min-height: 8.5vh;\r\n}\r\n.nav-links[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  list-style: none;\r\n  width: 40%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\nnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n  display: inline-block;\r\n  margin-left: 5.5vw;\r\n}\r\n.burger[_ngcontent-%COMP%]{\r\n  cursor: pointer;\r\n  flex: 1;\r\n  display: none;\r\n}\r\n.burger[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{\r\n  width: 25px;\r\n  height: 3px;\r\n  background-color: rgb(226, 226, 226);\r\n  margin: 5px;\r\n}\r\n.visualize[_ngcontent-%COMP%]{\r\n  justify-content: center;\r\n  padding-left: 20px;\r\n  padding-bottom: 5px;\r\n}\r\nbutton[_ngcontent-%COMP%]{\r\n  color: white;\r\n  outline: none;\r\n  border: none;\r\n  background-color: transparent;\r\n}\r\nbutton[_ngcontent-%COMP%]:hover{\r\n  color: #0398f4;\r\n}\r\n.btn-visualize[_ngcontent-%COMP%]{\r\n  background-color: #0398f4;\r\n  padding: 10px 10px;\r\n  border-radius: 5px;\r\n  font-size: 1em;\r\n}\r\n.btn-visualize[_ngcontent-%COMP%]:hover{\r\n  color: white !important;\r\n}\r\n.slideMenu[_ngcontent-%COMP%]{\r\n  display: none;\r\n}\r\n\r\n.dropbtn[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n  color: white;\r\n  padding: 16px;\r\n  font-size: 1em;\r\n  border: none;\r\n}\r\n.dropdown[_ngcontent-%COMP%]{\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]{\r\n  display: none;\r\n  position: absolute;\r\n  background-color: #333;\r\n  min-width: 160px;\r\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\r\n  z-index: 1;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  color: white;\r\n  padding: 12px 16px;\r\n  display: block;\r\n  text-decoration: none;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n  background-color: #0398f4;\r\n  color: white;\r\n}\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{\r\n  display: block;\r\n}\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropbtn[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n}\r\n\r\nth[_ngcontent-%COMP%]{\r\n  padding-right: 20vw;\r\n  padding-bottom: 0.5vh;\r\n  color: #0398f4;\r\n}\r\ntd[_ngcontent-%COMP%]{\r\n  border: none;\r\n  padding: 0;\r\n  border-spacing: 0;\r\n}\r\n.stats[_ngcontent-%COMP%]{\r\n  margin-bottom: 1vh;\r\n}\r\n.options-container[_ngcontent-%COMP%]{\r\n  position: absolute;\r\n  top: 8.8%;\r\n  left: 20%;\r\n  color: white;\r\n  border-collapse: separate;\r\n  border-spacing: 0;\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]{\r\n  position: relative;\r\n  width: 30px;\r\n  height: 12px;\r\n  -webkit-appearance: none;\r\n  background: linear-gradient(0deg, #222, #000);\r\n  outline: none;\r\n  border-radius: 20px;\r\n  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0, 0, 0, 1), 0 5px 20px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 0, 0, 0.2);\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]{\r\n  background: linear-gradient(0deg, #6dd1ff, #20b7ff);\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]:before{\r\n  content: '';\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0;\r\n  width: 15px;\r\n  height: 11px;\r\n  background: linear-gradient(0deg, #000, #6b6b6b);\r\n  border-radius: 20px;\r\n  box-shadow: 0 0 0 1px #232323;\r\n  transform: scale(0.98, 0.96);\r\n  transition: 0.5s;\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]:before{\r\n  left: 15px;\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]:after{\r\n  content: '';\r\n  position: absolute;\r\n  top: 4px;\r\n  left: 10px;\r\n  width: 3px;\r\n  height: 3px;\r\n  background: linear-gradient(0deg, #6b6b6b, #000);\r\n  border-radius: 50%;\r\n  transition: .5s;\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]:after{\r\n  background: #63cdff;\r\n  left: 25px;\r\n  box-shadow: 0 0 5px #13b3ff, 0 0 15px #13b3ff;\r\n}\r\n.checkboxLabel[_ngcontent-%COMP%]{\r\n  padding-left: 10px;\r\n}\r\n\r\n\r\n.node[_ngcontent-%COMP%]{\r\n    width: 1.3vw;\r\n    height: 2.7vh;\r\n}\r\n.isStart[_ngcontent-%COMP%]{\r\n    background-color: green !important;\r\n}\r\n.isEnd[_ngcontent-%COMP%]{\r\n    background-color: red !important;\r\n}\r\n.isWall[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: wallAnimation;\r\n          animation-name: wallAnimation;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: normal;\r\n          animation-direction: normal;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes wallAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: white;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.3);\r\n    background-color: white;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: white;\r\n  }\r\n}\r\n@keyframes wallAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: white;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.3);\r\n    background-color: white;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: white;\r\n  }\r\n}\r\n.isVisited[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: visitedAnimation;\r\n          animation-name: visitedAnimation;\r\n  -webkit-animation-duration: 1.5s;\r\n          animation-duration: 1.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: alternate;\r\n          animation-direction: alternate;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes visitedAnimation {\r\n  0% {\r\n    transform: scale(0.3);\r\n    background-color: rgba(0, 217, 159, 0.75);\r\n    border-radius: 100%;\r\n  }\r\n\r\n  50% {\r\n    background-color: rgba(0, 190, 218, 0.75);\r\n  }\r\n\r\n  75% {\r\n    transform: scale(1.2);\r\n    background-color: rgba(17, 104, 217, 0.75);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgba(0, 54, 85, 0.75);\r\n  }\r\n}\r\n@keyframes visitedAnimation {\r\n  0% {\r\n    transform: scale(0.3);\r\n    background-color: rgba(0, 217, 159, 0.75);\r\n    border-radius: 100%;\r\n  }\r\n\r\n  50% {\r\n    background-color: rgba(0, 190, 218, 0.75);\r\n  }\r\n\r\n  75% {\r\n    transform: scale(1.2);\r\n    background-color: rgba(17, 104, 217, 0.75);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgba(0, 54, 85, 0.75);\r\n  }\r\n}\r\n.isShortestPath[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: shortestPathAnimation;\r\n          animation-name: shortestPathAnimation;\r\n  -webkit-animation-duration: 1.5s;\r\n          animation-duration: 1.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: alternate;\r\n          animation-direction: alternate;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes shortestPathAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: yellow;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.2);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: yellow;\r\n  }\r\n}\r\n@keyframes shortestPathAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: yellow;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.2);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: yellow;\r\n  }\r\n}\r\n@media screen and (max-width: 1900px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 24px;\r\n  }\r\n}\r\n@media screen and (max-width: 1840px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 23px;\r\n  }\r\n}\r\n@media screen and (max-width: 1780px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 22px;\r\n  }\r\n}\r\n@media screen and (max-width: 1720px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 21px;\r\n  }\r\n}\r\n@media screen and (max-width: 1660px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 20px;\r\n  }\r\n}\r\n@media screen and (max-width: 1600px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 19px;\r\n  }\r\n}\r\n@media screen and (max-width: 1540px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 19px;\r\n  }\r\n}\r\n@media screen and (max-width: 1480px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 18px;\r\n  }\r\n}\r\n@media screen and (max-width: 1420px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 17px;\r\n  }\r\n}\r\n@media screen and (max-width: 1360px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 16px;\r\n  }\r\n}\r\n@media screen and (max-width: 1300px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 15px;\r\n  }\r\n}\r\n@media screen and (max-width: 1240px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 14px;\r\n  }\r\n}\r\n@media screen and (max-width: 1180px){\r\n  body[_ngcontent-%COMP%]{\r\n    overflow-x: hidden;\r\n  }\r\n  .nav-links[_ngcontent-%COMP%]{\r\n    display: none;\r\n  }\r\n  \r\n  .burger[_ngcontent-%COMP%]{\r\n    display: block;\r\n    flex: 0.1;\r\n  }\r\n\r\n  .burger[_ngcontent-%COMP%]:hover{\r\n    color: #0398f4;\r\n  }\r\n\r\n  .slideMenu[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    right: 0px;\r\n    height: 92vh;\r\n    top: 8.5vh;\r\n    background-color: #222;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 0%;\r\n    transform: translateX(100%);\r\n    z-index: 2; \r\n    overflow-x: hidden;\r\n    transition: transform 0.5s ease-in;\r\n    color: white;\r\n  }\r\n\r\n  .navLinks[_ngcontent-%COMP%]{\r\n    list-style: none;\r\n  }\r\n\r\n  .slideMenuTitle[_ngcontent-%COMP%]{\r\n    font-size: 20px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 5px;\r\n    padding: 20px 0 20px 0;\r\n    color: #0398f4;\r\n  }\r\n\r\n  .slideMenuClear[_ngcontent-%COMP%]{\r\n    font-size: 20px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 5px;\r\n    padding: 20px 0 20px 0;\r\n    color: #0398f4;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .slideMenuClear[_ngcontent-%COMP%]:hover{\r\n    transform: translateX(2%);\r\n    transition: transform 0.3s ease-out;\r\n    color: #00568b;\r\n  }\r\n\r\n  .item[_ngcontent-%COMP%]{\r\n    padding: 3px;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .slideMenuVisualize[_ngcontent-%COMP%]{\r\n    font-size: 20px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 5px;\r\n    padding: 20px 0 20px 0;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .slideMenuVisualize[_ngcontent-%COMP%]:hover{\r\n    transform: translateX(2%);\r\n    transition: transform 0.3s ease-out;\r\n  }\r\n\r\n  .item[_ngcontent-%COMP%]:hover{\r\n    transform: translateX(2%);\r\n    transition: transform 0.3s ease-out;\r\n    color: #0398f4;\r\n  }\r\n}\r\n.slideMenu-active[_ngcontent-%COMP%]{\r\n  transform: translateX(0%);\r\n  width: 50%;\r\n}\r\n@media screen and (max-width: 1120px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 12px;\r\n  }\r\n}\r\n@media screen and (max-width: 1060px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 11px;\r\n  }\r\n}\r\n@media screen and (max-width: 1000px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 11px;\r\n  }\r\n}\r\n@media screen and (max-width: 940px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 10px;\r\n  }\r\n}\r\n@media screen and (max-width: 880px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 9px;\r\n  }\r\n}\r\n@media screen and (max-width: 820px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 8px;\r\n  }\r\n}\r\n@media screen and (max-width: 760px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 8px;\r\n  }\r\n\r\n  .options-container[_ngcontent-%COMP%]{\r\n    left: 1%;\r\n  }\r\n}\r\n@media screen and (max-width: 700px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 6px;\r\n  }\r\n}\r\n\r\n.grid-container[_ngcontent-%COMP%]{\r\n  margin-top: 13vh;\r\n  margin-left: 1.4vw;\r\n}\r\n.grid[_ngcontent-%COMP%]{\r\n  border-collapse: separate;\r\n  border-spacing: 0;\r\n}\r\n.grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\r\n  padding: 0;\r\n  border-spacing: 0;\r\n  border: 1px groove white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9ncmlkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLFdBQVc7QUFDYjtBQUNBLFdBQVc7QUFDWDtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFlBQVk7RUFDWixzQkFBc0I7RUFDdEIsc0JBQXNCO0FBQ3hCO0FBRUE7RUFDRSxXQUFXO0VBQ1gsY0FBYztFQUNkLFdBQVc7QUFDYjtBQUVBO0VBQ0UsY0FBYztFQUNkLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsU0FBUztFQUNULGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsT0FBTztBQUNUO0FBRUE7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixTQUFTO0VBQ1QsVUFBVTtBQUNaO0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxlQUFlO0VBQ2YsT0FBTztFQUNQLGFBQWE7QUFDZjtBQUVBO0VBQ0UsV0FBVztFQUNYLFdBQVc7RUFDWCxvQ0FBb0M7RUFDcEMsV0FBVztBQUNiO0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjtBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixZQUFZO0VBQ1osNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCO0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBLGFBQWE7QUFFYjtFQUNFLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGdCQUFnQjtFQUNoQiwrQ0FBK0M7RUFDL0MsVUFBVTtBQUNaO0FBRUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7QUFFQTtFQUNFLGNBQWM7QUFDaEI7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjtBQUVBLFlBQVk7QUFFWjtFQUNFLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsY0FBYztBQUNoQjtBQUVBO0VBQ0UsWUFBWTtFQUNaLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxTQUFTO0VBQ1QsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLHdCQUF3QjtFQUN4Qiw2Q0FBNkM7RUFDN0MsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixtSkFBbUo7QUFDcko7QUFFQTtFQUNFLG1EQUFtRDtBQUNyRDtBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osZ0RBQWdEO0VBQ2hELG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsNEJBQTRCO0VBQzVCLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UsVUFBVTtBQUNaO0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixVQUFVO0VBQ1YsVUFBVTtFQUNWLFdBQVc7RUFDWCxnREFBZ0Q7RUFDaEQsa0JBQWtCO0VBQ2xCLGVBQWU7QUFDakI7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsNkNBQTZDO0FBQy9DO0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFHQSxTQUFTO0FBQ1Q7Ozs7Ozs7OztFQVNFO0FBRUY7SUFDSSxZQUFZO0lBQ1osYUFBYTtBQUNqQjtBQUVBO0lBQ0ksa0NBQWtDO0FBQ3RDO0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7QUFFQTtFQUNFLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IsZ0NBQXdCO1VBQXhCLHdCQUF3QjtFQUN4QiwyQ0FBbUM7VUFBbkMsbUNBQW1DO0VBQ25DLDBCQUFrQjtVQUFsQixrQkFBa0I7RUFDbEIsbUNBQTJCO1VBQTNCLDJCQUEyQjtFQUMzQixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IscUNBQTZCO1VBQTdCLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQix1QkFBdUI7RUFDekI7QUFDRjtBQWZBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLHVCQUF1QjtFQUN6Qjs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQix1QkFBdUI7RUFDekI7QUFDRjtBQUVBO0VBQ0Usd0NBQWdDO1VBQWhDLGdDQUFnQztFQUNoQyxnQ0FBd0I7VUFBeEIsd0JBQXdCO0VBQ3hCLDJDQUFtQztVQUFuQyxtQ0FBbUM7RUFDbkMsMEJBQWtCO1VBQWxCLGtCQUFrQjtFQUNsQixzQ0FBOEI7VUFBOUIsOEJBQThCO0VBQzlCLG9DQUE0QjtVQUE1Qiw0QkFBNEI7RUFDNUIscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3QixxQ0FBNkI7VUFBN0IsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQix5Q0FBeUM7SUFDekMsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UseUNBQXlDO0VBQzNDOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLDBDQUEwQztFQUM1Qzs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQix1Q0FBdUM7RUFDekM7QUFDRjtBQXBCQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLHlDQUF5QztJQUN6QyxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSx5Q0FBeUM7RUFDM0M7O0VBRUE7SUFDRSxxQkFBcUI7SUFDckIsMENBQTBDO0VBQzVDOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHVDQUF1QztFQUN6QztBQUNGO0FBRUE7RUFDRSw2Q0FBcUM7VUFBckMscUNBQXFDO0VBQ3JDLGdDQUF3QjtVQUF4Qix3QkFBd0I7RUFDeEIsMkNBQW1DO1VBQW5DLG1DQUFtQztFQUNuQywwQkFBa0I7VUFBbEIsa0JBQWtCO0VBQ2xCLHNDQUE4QjtVQUE5Qiw4QkFBOEI7RUFDOUIsb0NBQTRCO1VBQTVCLDRCQUE0QjtFQUM1QixxQ0FBNkI7VUFBN0IsNkJBQTZCO0VBQzdCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLHFCQUFxQjtFQUN2Qjs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQix3QkFBd0I7RUFDMUI7QUFDRjtBQWRBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsd0JBQXdCO0VBQzFCOztFQUVBO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHdCQUF3QjtFQUMxQjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtFQUNwQjtFQUNBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsY0FBYztJQUNkLFNBQVM7RUFDWDs7RUFFQTtJQUNFLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFlBQVk7SUFDWixVQUFVO0lBQ1Ysc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCwyQkFBMkI7SUFDM0IsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixrQ0FBa0M7SUFDbEMsWUFBWTtFQUNkOztFQUVBO0lBQ0UsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsY0FBYztJQUNkLGVBQWU7RUFDakI7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIsbUNBQW1DO0lBQ25DLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxZQUFZO0lBQ1osZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UseUJBQXlCO0lBQ3pCLG1DQUFtQztFQUNyQzs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixtQ0FBbUM7SUFDbkMsY0FBYztFQUNoQjtBQUNGO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsVUFBVTtBQUNaO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjtBQUNGO0FBRUE7RUFDRTtJQUNFLFVBQVU7RUFDWjtBQUNGO0FBRUE7RUFDRTtJQUNFLFVBQVU7RUFDWjtBQUNGO0FBRUE7RUFDRTtJQUNFLFVBQVU7RUFDWjs7RUFFQTtJQUNFLFFBQVE7RUFDVjtBQUNGO0FBRUE7RUFDRTtJQUNFLFVBQVU7RUFDWjtBQUNGO0FBRUEsZUFBZTtBQUNmO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtFQUNqQix3QkFBd0I7QUFDMUIiLCJmaWxlIjoic3JjL2FwcC9ncmlkL2dyaWQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJvZHl7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG4vKiBOQVZCQVIgKi9cclxuaGVhZGVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjtcclxuICAvKm1hcmdpbi1ib3R0b206IDhlbTsqL1xyXG59XHJcblxyXG5oZWFkZXI6OmFmdGVye1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGRpc3BsYXk6IHRhYmxlO1xyXG4gIGNsZWFyOiBib3RoO1xyXG59XHJcblxyXG4udGl0bGV7XHJcbiAgZm9udC1zaXplOiAyZW07XHJcbiAgY29sb3I6IHJnYigyMjYsIDIyNiwgMjI2KTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGxldHRlci1zcGFjaW5nOiA1cHg7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICBmbGV4OiAxLjE7XHJcbiAgbWFyZ2luLWxlZnQ6IDF2dztcclxufVxyXG5cclxubmF2IHVse1xyXG4gIGZsZXg6IDY7XHJcbn1cclxuXHJcbi50aXRsZU5hbWU6aG92ZXJ7XHJcbiAgY29sb3I6ICMwMzk4ZjQ7XHJcbn1cclxuXHJcbm5hdntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWluLWhlaWdodDogOC41dmg7XHJcbn1cclxuXHJcbi5uYXYtbGlua3N7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgd2lkdGg6IDQwJTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG5cclxubmF2IGxpe1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tbGVmdDogNS41dnc7XHJcbn1cclxuXHJcbi5idXJnZXJ7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGZsZXg6IDE7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLmJ1cmdlciBkaXZ7XHJcbiAgd2lkdGg6IDI1cHg7XHJcbiAgaGVpZ2h0OiAzcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNiwgMjI2LCAyMjYpO1xyXG4gIG1hcmdpbjogNXB4O1xyXG59XHJcblxyXG4udmlzdWFsaXple1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmctbGVmdDogMjBweDtcclxuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xyXG59XHJcblxyXG5idXR0b257XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5idXR0b246aG92ZXJ7XHJcbiAgY29sb3I6ICMwMzk4ZjQ7XHJcbn1cclxuXHJcbi5idG4tdmlzdWFsaXple1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzk4ZjQ7XHJcbiAgcGFkZGluZzogMTBweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLmJ0bi12aXN1YWxpemU6aG92ZXJ7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5zbGlkZU1lbnV7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLyogRFJPUERPV04gKi9cclxuXHJcbi5kcm9wYnRue1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLmRyb3Bkb3due1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1jb250ZW50e1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgbWluLXdpZHRoOiAxNjBweDtcclxuICBib3gtc2hhZG93OiAwcHggOHB4IDE2cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4uZHJvcGRvd24tY29udGVudCBhe1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAxMnB4IDE2cHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uZHJvcGRvd24tY29udGVudCBhOmhvdmVye1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzk4ZjQ7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXIgLmRyb3Bkb3duLWNvbnRlbnR7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi5kcm9wZG93bjpob3ZlciAuZHJvcGJ0bntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLyogT1BUSU9OUyAqL1xyXG5cclxudGh7XHJcbiAgcGFkZGluZy1yaWdodDogMjB2dztcclxuICBwYWRkaW5nLWJvdHRvbTogMC41dmg7XHJcbiAgY29sb3I6ICMwMzk4ZjQ7XHJcbn1cclxuXHJcbnRke1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xyXG59XHJcblxyXG4uc3RhdHN7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXZoO1xyXG59XHJcblxyXG4ub3B0aW9ucy1jb250YWluZXJ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogOC44JTtcclxuICBsZWZ0OiAyMCU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XHJcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJjaGVja2JveFwiXXtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgd2lkdGg6IDMwcHg7XHJcbiAgaGVpZ2h0OiAxMnB4O1xyXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgIzIyMiwgIzAwMCk7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMCAwIDRweCAjMzUzNTM1LCAwIDAgMCA1cHggIzNlM2UzZSwgaW5zZXQgMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAxKSwgMCA1cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSksIGluc2V0IDAgMCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxufVxyXG5cclxuaW5wdXQ6Y2hlY2tlZFt0eXBlPVwiY2hlY2tib3hcIl17XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICM2ZGQxZmYsICMyMGI3ZmYpO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06YmVmb3Jle1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDBweDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxNXB4O1xyXG4gIGhlaWdodDogMTFweDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgIzAwMCwgIzZiNmI2Yik7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBib3gtc2hhZG93OiAwIDAgMCAxcHggIzIzMjMyMztcclxuICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgsIDAuOTYpO1xyXG4gIHRyYW5zaXRpb246IDAuNXM7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWRbdHlwZT1cImNoZWNrYm94XCJdOmJlZm9yZXtcclxuICBsZWZ0OiAxNXB4O1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl06YWZ0ZXJ7XHJcbiAgY29udGVudDogJyc7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogNHB4O1xyXG4gIGxlZnQ6IDEwcHg7XHJcbiAgd2lkdGg6IDNweDtcclxuICBoZWlnaHQ6IDNweDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgIzZiNmI2YiwgIzAwMCk7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIHRyYW5zaXRpb246IC41cztcclxufVxyXG5cclxuaW5wdXQ6Y2hlY2tlZFt0eXBlPVwiY2hlY2tib3hcIl06YWZ0ZXJ7XHJcbiAgYmFja2dyb3VuZDogIzYzY2RmZjtcclxuICBsZWZ0OiAyNXB4O1xyXG4gIGJveC1zaGFkb3c6IDAgMCA1cHggIzEzYjNmZiwgMCAwIDE1cHggIzEzYjNmZjtcclxufVxyXG5cclxuLmNoZWNrYm94TGFiZWx7XHJcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xyXG59XHJcblxyXG5cclxuLyogR1JJRCAqL1xyXG4vKi5ncmlkLWNvbnRhaW5lcntcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgICBtYXJnaW4tbGVmdDogMjIwcHg7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgYm9yZGVyOiBibGFjaztcclxuICAgIGZvbnQtc2l6ZTogMDtcclxuICAgIHdpZHRoOiAxNTAwcHg7XHJcbiAgICBoZWlnaHQ6IDcxNXB4O1xyXG59Ki9cclxuXHJcbi5ub2Rle1xyXG4gICAgd2lkdGg6IDEuM3Z3O1xyXG4gICAgaGVpZ2h0OiAyLjd2aDtcclxufVxyXG5cclxuLmlzU3RhcnR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uaXNFbmR7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmlzV2FsbHtcclxuICBhbmltYXRpb24tbmFtZTogd2FsbEFuaW1hdGlvbjtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDAuNHM7XHJcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAwO1xyXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IG5vcm1hbDtcclxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHdhbGxBbmltYXRpb24ge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC42KTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuXHJcbiAgNTAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4zKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIH1cclxuXHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgfVxyXG59XHJcblxyXG4uaXNWaXNpdGVke1xyXG4gIGFuaW1hdGlvbi1uYW1lOiB2aXNpdGVkQW5pbWF0aW9uO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMS41cztcclxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxuICBhbmltYXRpb24tZGVsYXk6IDA7XHJcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xyXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XHJcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdmlzaXRlZEFuaW1hdGlvbiB7XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjMpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAyMTcsIDE1OSwgMC43NSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xyXG4gIH1cclxuXHJcbiAgNTAlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTkwLCAyMTgsIDAuNzUpO1xyXG4gIH1cclxuXHJcbiAgNzUlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTcsIDEwNCwgMjE3LCAwLjc1KTtcclxuICB9XHJcblxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgNTQsIDg1LCAwLjc1KTtcclxuICB9XHJcbn1cclxuXHJcbi5pc1Nob3J0ZXN0UGF0aHtcclxuICBhbmltYXRpb24tbmFtZTogc2hvcnRlc3RQYXRoQW5pbWF0aW9uO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMS41cztcclxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxuICBhbmltYXRpb24tZGVsYXk6IDA7XHJcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xyXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XHJcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc2hvcnRlc3RQYXRoQW5pbWF0aW9uIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XHJcbiAgfVxyXG5cclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xyXG4gIH1cclxuXHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTkwMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAyNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTg0MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAyM3B4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTc4MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAyMnB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTcyMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAyMXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTY2MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTYwMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxOXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTU0MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxOXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQ4MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxOHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTQyMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxN3B4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTM2MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxNnB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTMwMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxNXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTI0MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxNHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTE4MHB4KXtcclxuICBib2R5e1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gIH1cclxuICAubmF2LWxpbmtze1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgXHJcbiAgLmJ1cmdlcntcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgZmxleDogMC4xO1xyXG4gIH1cclxuXHJcbiAgLmJ1cmdlcjpob3ZlcntcclxuICAgIGNvbG9yOiAjMDM5OGY0O1xyXG4gIH1cclxuXHJcbiAgLnNsaWRlTWVudXtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHJpZ2h0OiAwcHg7XHJcbiAgICBoZWlnaHQ6IDkydmg7XHJcbiAgICB0b3A6IDguNXZoO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcclxuICAgIHotaW5kZXg6IDI7IFxyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZS1pbjtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICB9XHJcblxyXG4gIC5uYXZMaW5rc3tcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgfVxyXG5cclxuICAuc2xpZGVNZW51VGl0bGV7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDVweDtcclxuICAgIHBhZGRpbmc6IDIwcHggMCAyMHB4IDA7XHJcbiAgICBjb2xvcjogIzAzOThmNDtcclxuICB9XHJcblxyXG4gIC5zbGlkZU1lbnVDbGVhcntcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogNXB4O1xyXG4gICAgcGFkZGluZzogMjBweCAwIDIwcHggMDtcclxuICAgIGNvbG9yOiAjMDM5OGY0O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLnNsaWRlTWVudUNsZWFyOmhvdmVye1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIlKTtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xyXG4gICAgY29sb3I6ICMwMDU2OGI7XHJcbiAgfVxyXG5cclxuICAuaXRlbXtcclxuICAgIHBhZGRpbmc6IDNweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC5zbGlkZU1lbnVWaXN1YWxpemV7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDVweDtcclxuICAgIHBhZGRpbmc6IDIwcHggMCAyMHB4IDA7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuc2xpZGVNZW51VmlzdWFsaXplOmhvdmVye1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIlKTtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xyXG4gIH1cclxuXHJcbiAgLml0ZW06aG92ZXJ7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMiUpO1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQ7XHJcbiAgICBjb2xvcjogIzAzOThmNDtcclxuICB9XHJcbn1cclxuXHJcbi5zbGlkZU1lbnUtYWN0aXZle1xyXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwJSk7XHJcbiAgd2lkdGg6IDUwJTtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTEyMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxMnB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTA2MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxMXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTAwMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiAxMXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTQwcHgpe1xyXG4gIC5ub2Rle1xyXG4gICAgd2lkdGg6IDEwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4ODBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogOXB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogODIwcHgpe1xyXG4gIC5ub2Rle1xyXG4gICAgd2lkdGg6IDhweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiA4cHg7XHJcbiAgfVxyXG5cclxuICAub3B0aW9ucy1jb250YWluZXJ7XHJcbiAgICBsZWZ0OiAxJTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiA2cHg7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBHUklELVRBQkxFICovXHJcbi5ncmlkLWNvbnRhaW5lcntcclxuICBtYXJnaW4tdG9wOiAxM3ZoO1xyXG4gIG1hcmdpbi1sZWZ0OiAxLjR2dztcclxufVxyXG5cclxuLmdyaWR7XHJcbiAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxufVxyXG5cclxuLmdyaWQgdGR7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxuICBib3JkZXI6IDFweCBncm9vdmUgd2hpdGU7XHJcbn1cclxuIl19 */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-grid',
          templateUrl: './grid.component.html',
          styleUrls: ['./grid.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/navbar/navbar.component.ts":
  /*!********************************************!*\
    !*** ./src/app/navbar/navbar.component.ts ***!
    \********************************************/

  /*! exports provided: NavbarComponent */

  /***/
  function srcAppNavbarNavbarComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "NavbarComponent", function () {
      return NavbarComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var NavbarComponent = /*#__PURE__*/function () {
      function NavbarComponent() {
        _classCallCheck(this, NavbarComponent);
      }

      _createClass(NavbarComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return NavbarComponent;
    }();

    NavbarComponent.ɵfac = function NavbarComponent_Factory(t) {
      return new (t || NavbarComponent)();
    };

    NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: NavbarComponent,
      selectors: [["app-navbar"]],
      decls: 35,
      vars: 0,
      consts: [[1, "navbar-container"], [1, "title"], [1, "navmenu-brand"], [1, "algorithms"], [1, "dropdown"], [1, "dropbtn"], [1, "dropdown-content"], ["href", "#"], [1, "maze"], [1, "addBomb"], [1, "btn-addBomb"], [1, "visualize"], [1, "btn-visualize"], [1, "clearBoard"], [1, "btn-clearBoard"], [1, "clearWalls"], [1, "btn-clearWalls"]],
      template: function NavbarComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Pathfinding Visualizer");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "li", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Algorithms");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "A*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Maze & Patterns");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Add Bomb");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Visualize!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Clear Board");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Clear Walls");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: [".navbar-container[_ngcontent-%COMP%]{\r\n    width: 80%;\r\n    margin: 0 auto;\r\n}\r\n\r\n.title[_ngcontent-%COMP%]{\r\n    font-size: 30px;\r\n    float: left;\r\n    margin-left: -180px;\r\n    margin-top: 5px;\r\n    color: white;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n    display: inline-block;\r\n    margin-left: 70px;\r\n}\r\n\r\n.algorithms[_ngcontent-%COMP%]{\r\n    margin-right: -50px;\r\n}\r\n\r\n.maze[_ngcontent-%COMP%]{\r\n    margin-right: -50px;\r\n}\r\n\r\n.btn-addBomb[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n    border: none;\r\n    color: white;\r\n    margin-right: 50px;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]{\r\n    color: white;\r\n    border: none;\r\n    background-color: transparent;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:hover{\r\n    color: #0398f4;\r\n}\r\n\r\n.visualize[_ngcontent-%COMP%]{\r\n    margin-right: 50px;\r\n}\r\n\r\n.btn-visualize[_ngcontent-%COMP%]{\r\n    background-color: #0398f4 !important;\r\n    padding: 10px 10px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.btn-visualize[_ngcontent-%COMP%]:hover{\r\n    color: white !important;\r\n}\r\n\r\n.clearBoard[_ngcontent-%COMP%]{\r\n    margin-right: -30px;\r\n}\r\n\r\n.dropbtn[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n    color: white;\r\n    padding: 16px;\r\n    font-size: 16px;\r\n    border: none;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]{\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n.dropdown-content[_ngcontent-%COMP%]{\r\n    display: none;\r\n    position: absolute;\r\n    background-color: #333;\r\n    min-width: 160px;\r\n    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n}\r\n\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: white;\r\n    padding: 12px 16px;\r\n    display: block;\r\n    text-decoration: none;\r\n}\r\n\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n    background-color: #222;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{\r\n    display: block;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropbtn[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksVUFBVTtJQUNWLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixZQUFZO0lBQ1osWUFBWTtJQUNaLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLCtDQUErQztJQUMvQyxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksNkJBQTZCO0FBQ2pDIiwiZmlsZSI6InNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdmJhci1jb250YWluZXJ7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi50aXRsZXtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xODBweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxubmF2IHVse1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuXHJcbm5hdiBsaXtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1sZWZ0OiA3MHB4O1xyXG59XHJcblxyXG4uYWxnb3JpdGhtc3tcclxuICAgIG1hcmdpbi1yaWdodDogLTUwcHg7XHJcbn1cclxuXHJcbi5tYXple1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAtNTBweDtcclxufVxyXG5cclxuLmJ0bi1hZGRCb21ie1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbmJ1dHRvbntcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5idXR0b246aG92ZXJ7XHJcbiAgICBjb2xvcjogIzAzOThmNDtcclxufVxyXG5cclxuLnZpc3VhbGl6ZXtcclxuICAgIG1hcmdpbi1yaWdodDogNTBweDtcclxufVxyXG5cclxuLmJ0bi12aXN1YWxpemV7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5OGY0ICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5idG4tdmlzdWFsaXplOmhvdmVye1xyXG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5jbGVhckJvYXJke1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAtMzBweDtcclxufVxyXG5cclxuLmRyb3BidG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi5kcm9wZG93bntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnR7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgIG1pbi13aWR0aDogMTYwcHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggOHB4IDE2cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICAgIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1jb250ZW50IGF7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnQgYTpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI7XHJcbn1cclxuXHJcbi5kcm9wZG93bjpob3ZlciAuZHJvcGRvd24tY29udGVudHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXIgLmRyb3BidG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufSJdfQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-navbar',
          templateUrl: './navbar.component.html',
          styleUrls: ['./navbar.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/

  /*! exports provided: environment */

  /***/
  function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    }); // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.


    var environment = {
      production: false
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    /***/
  },

  /***/
  "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/

  /*! no exports provided */

  /***/
  function srcMainTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./environments/environment */
    "./src/environments/environment.ts");
    /* harmony import */


    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./app/app.module */
    "./src/app/app.module.ts");
    /* harmony import */


    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/platform-browser */
    "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");

    if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }

    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
      return console.error(err);
    });
    /***/

  },

  /***/
  "./src/models/node.ts":
  /*!****************************!*\
    !*** ./src/models/node.ts ***!
    \****************************/

  /*! exports provided: Node */

  /***/
  function srcModelsNodeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Node", function () {
      return Node;
    });

    var Node = function Node(id, isStart, isEnd, isWall, isVisited, row, column) {
      _classCallCheck(this, Node);

      this.id = id;
      this.isStart = isStart;
      this.isEnd = isEnd;
      this.isWall = isWall;
      this.isVisited = isVisited;
      this.row = row;
      this.column = column;
      this.parentNode = null;
      this.isShortestPath = false;
      this.isActuallyVisited = false;
      this.closed = false;
      this.isDiagonal = false;
    };
    /***/

  },

  /***/
  0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/

  /*! no static exports found */

  /***/
  function _(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(
    /*! D:\PROGGERS\Pathfinding-Visualizer\src\main.ts */
    "./src/main.ts");
    /***/
  }
}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main-es5.js.map