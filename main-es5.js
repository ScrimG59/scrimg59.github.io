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

    function executeDijkstra(grid, startNode, endNode, diagonal) {
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

        updateUnvisitedNeighbors(grid, currentNode, diagonal);
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


    function updateUnvisitedNeighbors(grid, currentNode, diagonal) {
      // get all unvisited neighbors of the current node
      var unvisitedNeighbors;

      if (diagonal) {//unvisitedNeighbors = getUnvisitedDiagonalNeighbors(grid, currentNode);
      } else {
        unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
      } // for each unvisited neighbor set the distance to the current node's distance + 1
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


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
    /* harmony import */


    var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/material/form-field */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
    /* harmony import */


    var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material/input */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./app-routing.module */
    "./src/app/app-routing.module.ts");
    /* harmony import */


    var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./app.component */
    "./src/app/app.component.ts");
    /* harmony import */


    var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./navbar/navbar.component */
    "./src/app/navbar/navbar.component.ts");
    /* harmony import */


    var _grid_grid_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./grid/grid.component */
    "./src/app/grid/grid.component.ts");

    var AppModule = function AppModule() {
      _classCallCheck(this, AppModule);
    };

    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
    });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function AppModule_Factory(t) {
        return new (t || AppModule)();
      },
      providers: [],
      imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, {
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_8__["NavbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_9__["GridComponent"]],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_8__["NavbarComponent"], _grid_grid_component__WEBPACK_IMPORTED_MODULE_9__["GridComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"]],
          providers: [],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
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

    function GridComponent_tr_89_td_1_Template(rf, ctx) {
      if (rf & 1) {
        var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 32);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function GridComponent_tr_89_td_1_Template_td_mousedown_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r6.mouseDown(row_r2, col_r5);
        })("mouseenter", function GridComponent_tr_89_td_1_Template_td_mouseenter_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r9.mouseEnter(row_r2, col_r5);
        })("mouseleave", function GridComponent_tr_89_td_1_Template_td_mouseleave_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r11.mouseLeave(row_r2, col_r5);
        })("mouseup", function GridComponent_tr_89_td_1_Template_td_mouseup_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8);

          var col_r5 = ctx.index;

          var row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;

          var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r13.mouseUp(row_r2, col_r5);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 33);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var node_r4 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](1, _c0, node_r4.isStart, node_r4.isEnd, node_r4.isWall, node_r4.isActuallyVisited, node_r4.isShortestPath));
      }
    }

    function GridComponent_tr_89_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_tr_89_td_1_Template, 2, 7, "td", 31);

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
    var diagonal = false;
    var bidirectional = false;
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
          this.setDiagonalCheckbox();
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

            if (this.checkVisited() || this.checkClosed()) {
              this.clearVisitedNodes();
            }

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
            var visitedNodes = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["executeDijkstra"])(this.nodes, startNode, endNode, diagonal);

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
              this.animateAlgorithm(visitedNodes, shortestPath);
              this.setStatistics(visitedNodes, shortestPath);
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

              this.animateAlgorithm(_visitedNodes, _shortestPath);
              this.setStatistics(_visitedNodes, _shortestPath);
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

              this.animateAlgorithm(_visitedNodes2, _shortestPath2);
              this.setStatistics(_visitedNodes2, _shortestPath2);
            }
          }
        }
      }, {
        key: "animateAlgorithm",
        value: function animateAlgorithm(visitedNodes, shortestPath) {
          var _this = this;

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
        key: "setDiagonalCheckbox",
        value: function setDiagonalCheckbox() {
          var diagonalCheckbox = document.getElementById('diagonal');

          if (diagonalCheckbox.checked) {
            diagonal = true;
          } else {
            diagonal = false;
          }
        }
      }, {
        key: "setStatistics",
        value: function setStatistics(visitedNodes, shortestPath) {
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
              if (this.nodes[i][j].isActuallyVisited) return true;
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
        }
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
      }]);

      return GridComponent;
    }();

    GridComponent.ɵfac = function GridComponent_Factory(t) {
      return new (t || GridComponent)();
    };

    GridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: GridComponent,
      selectors: [["app-grid"]],
      decls: 90,
      vars: 1,
      consts: [[1, "navbar-container"], ["href", "#", 1, "title"], [1, "algorithms"], [1, "dropdown"], [1, "dropbtn"], [1, "dropdown-content"], ["href", "#", 3, "click"], [1, "maze"], ["href", "#"], [1, "visualize"], ["id", "btn-visualize", 1, "btn-visualize", 3, "click"], [1, "clearBoard"], ["id", "btn-clearBoard", 1, "btn-clearBoard", 3, "click"], [1, "clearWalls"], ["id", "btn-clearWalls", 1, "btn-clearWalls", 3, "click"], [1, "speed"], [1, "options"], [1, "options-container"], [1, "stats"], ["id", "diagonal", "type", "checkbox", 3, "click"], ["for", "checkbox", 1, "diagonalLabel"], ["id", "euclidean", "type", "checkbox", 3, "click"], ["id", "visitedNodesStats"], ["id", "visitedNodes"], ["id", "bidirectional", "type", "checkbox"], ["id", "manhattan", "type", "checkbox", 3, "click"], ["id", "shortestPathStats"], ["id", "shortestPath"], [1, "grid-container"], [1, "grid"], [4, "ngFor", "ngForOf"], ["draggable", "false", 3, "mousedown", "mouseenter", "mouseleave", "mouseup", 4, "ngFor", "ngForOf"], ["draggable", "false", 3, "mousedown", "mouseenter", "mouseleave", "mouseup"], ["id", "node.id", 3, "ngClass"]],
      template: function GridComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "a", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Pathfinder");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nav");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Algorithms");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_11_listener() {
            return ctx.setPathfindingAlgorithm("Dijkstra");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_13_listener() {
            return ctx.setPathfindingAlgorithm("A*");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "A*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_15_listener() {
            return ctx.setPathfindingAlgorithm("Alt-Dijkstra");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Alt-Dijkstra");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Mazes");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_22_listener() {
            return ctx.visualizeMazeAlgorithm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Random Maze");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "To be continued...");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "li", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_27_listener() {
            return ctx.checkAlgorithm();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Visualize!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_30_listener() {
            return ctx.clearBoard();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Clear Board");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_33_listener() {
            return ctx.clearWalls();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Clear Walls");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "li", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Speed of Animation");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_40_listener() {
            return ctx.setSpeed("Very Fast");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Very Fast");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_42_listener() {
            return ctx.setSpeed("Fast");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Fast");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_44_listener() {
            return ctx.setSpeed("Normal");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Normal");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_46_listener() {
            return ctx.setSpeed("Slow");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Slow");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_48_listener() {
            return ctx.setSpeed("Very Slow");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Very Slow");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "table", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "General");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Heuristics");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "th", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Statistics");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "input", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_61_listener() {
            return ctx.setDiagonalCheckbox();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "label", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Diagonal");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "input", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_65_listener() {
            return ctx.setHeuristicDistance("euclidean");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "label", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Euclidean");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "p", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Visited Nodes: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "label", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "0");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "input", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "label", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Bidirectional");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_79_listener() {
            return ctx.setHeuristicDistance("manhattan");
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "label", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Manhattan");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "p", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Shortest path: ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "label", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "0");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "table", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](89, GridComponent_tr_89_Template, 2, 1, "tr", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](89);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.nodes);
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"]],
      styles: ["header[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: #222;\r\n  \r\n}\r\nheader[_ngcontent-%COMP%]::after{\r\n  content: '';\r\n  display: table;\r\n  clear: both;\r\n}\r\n.navbar-container[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  width: 80%;\r\n}\r\n.title[_ngcontent-%COMP%]{\r\n  font-size: 2.5em;\r\n  flex: 1;\r\n  color: white;\r\n  cursor: default;\r\n  text-decoration: none;\r\n  margin-left: 0.5vw;\r\n}\r\n.title[_ngcontent-%COMP%]:hover{\r\n  color: #0398f4;\r\n}\r\nnav[_ngcontent-%COMP%]{\r\n  flex: 5;\r\n}\r\nnav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\nnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n  display: inline-block;\r\n  justify-content: space-around;\r\n  margin-left: 5.5vw;\r\n}\r\n.algorithms[_ngcontent-%COMP%]{\r\n  flex: 1;\r\n}\r\n.maze[_ngcontent-%COMP%]{\r\n  flex: 1;\r\n}\r\n.visualize[_ngcontent-%COMP%]{\r\n  flex: 1;\r\n  justify-content: center;\r\n  padding-left: 20px;\r\n  padding-bottom: 5px;\r\n}\r\n.clearBoard[_ngcontent-%COMP%]{\r\n  flex: 1;\r\n}\r\n.clearWalls[_ngcontent-%COMP%]{\r\n  flex: 1;\r\n}\r\n.speed[_ngcontent-%COMP%]{\r\n  flex: 1;\r\n}\r\nbutton[_ngcontent-%COMP%]{\r\n  color: white;\r\n  outline: none;\r\n  border: none;\r\n  background-color: transparent;\r\n}\r\nbutton[_ngcontent-%COMP%]:hover{\r\n  color: #0398f4;\r\n}\r\n.btn-visualize[_ngcontent-%COMP%]{\r\n  background-color: #0398f4;\r\n  padding: 10px 10px;\r\n  border-radius: 5px;\r\n  font-size: 1em;\r\n}\r\n.btn-visualize[_ngcontent-%COMP%]:hover{\r\n  color: white !important;\r\n}\r\n\r\n.dropbtn[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n  color: white;\r\n  padding: 16px;\r\n  font-size: 1em;\r\n  border: none;\r\n}\r\n.dropdown[_ngcontent-%COMP%]{\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]{\r\n  display: none;\r\n  position: absolute;\r\n  background-color: #333;\r\n  min-width: 160px;\r\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\r\n  z-index: 1;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  color: white;\r\n  padding: 12px 16px;\r\n  display: block;\r\n  text-decoration: none;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n  background-color: #0398f4;\r\n  color: white;\r\n}\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{\r\n  display: block;\r\n}\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropbtn[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n}\r\n\r\nth[_ngcontent-%COMP%]{\r\n  padding-right: 20vw;\r\n  padding-bottom: 0.5vh;\r\n  color: #0398f4;\r\n}\r\ntd[_ngcontent-%COMP%]{\r\n  border: none;\r\n  padding: 0;\r\n  border-spacing: 0;\r\n}\r\n.stats[_ngcontent-%COMP%]{\r\n  margin-bottom: 1vh;\r\n}\r\n.options-container[_ngcontent-%COMP%]{\r\n  position: absolute;\r\n  top: 8.8%;\r\n  left: 20%;\r\n  color: white;\r\n  border-collapse: separate;\r\n  border-spacing: 0;\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]{\r\n  position: relative;\r\n  width: 30px;\r\n  height: 12px;\r\n  -webkit-appearance: none;\r\n  background: linear-gradient(0deg, #222, #000);\r\n  outline: none;\r\n  border-radius: 20px;\r\n  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0, 0, 0, 1), 0 5px 20px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 0, 0, 0.2);\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]{\r\n  background: linear-gradient(0deg, #6dd1ff, #20b7ff);\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]:before{\r\n  content: '';\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0;\r\n  width: 15px;\r\n  height: 11px;\r\n  background: linear-gradient(0deg, #000, #6b6b6b);\r\n  border-radius: 20px;\r\n  box-shadow: 0 0 0 1px #232323;\r\n  transform: scale(0.98, 0.96);\r\n  transition: 0.5s;\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]:before{\r\n  left: 15px;\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]:after{\r\n  content: '';\r\n  position: absolute;\r\n  top: 4px;\r\n  left: 10px;\r\n  width: 3px;\r\n  height: 3px;\r\n  background: linear-gradient(0deg, #6b6b6b, #000);\r\n  border-radius: 50%;\r\n  transition: .5s;\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]:after{\r\n  background: #63cdff;\r\n  left: 25px;\r\n  box-shadow: 0 0 5px #13b3ff, 0 0 15px #13b3ff;\r\n}\r\n.diagonalLabel[_ngcontent-%COMP%]{\r\n  padding-left: 10px;\r\n}\r\n\r\n\r\n.node[_ngcontent-%COMP%]{\r\n    width: 1.3vw;\r\n    height: 2.7vh;\r\n}\r\n.isStart[_ngcontent-%COMP%]{\r\n    background-color: green !important;\r\n}\r\n.isEnd[_ngcontent-%COMP%]{\r\n    background-color: red !important;\r\n}\r\n.isWall[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: wallAnimation;\r\n          animation-name: wallAnimation;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: normal;\r\n          animation-direction: normal;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes wallAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: white;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.3);\r\n    background-color: white;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: white;\r\n  }\r\n}\r\n@keyframes wallAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: white;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.3);\r\n    background-color: white;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: white;\r\n  }\r\n}\r\n.isVisited[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: visitedAnimation;\r\n          animation-name: visitedAnimation;\r\n  -webkit-animation-duration: 1.5s;\r\n          animation-duration: 1.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: alternate;\r\n          animation-direction: alternate;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes visitedAnimation {\r\n  0% {\r\n    transform: scale(0.3);\r\n    background-color: rgba(0, 217, 159, 0.75);\r\n    border-radius: 100%;\r\n  }\r\n\r\n  50% {\r\n    background-color: rgba(0, 190, 218, 0.75);\r\n  }\r\n\r\n  75% {\r\n    transform: scale(1.2);\r\n    background-color: rgba(17, 104, 217, 0.75);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgba(0, 54, 85, 0.75);\r\n  }\r\n}\r\n@keyframes visitedAnimation {\r\n  0% {\r\n    transform: scale(0.3);\r\n    background-color: rgba(0, 217, 159, 0.75);\r\n    border-radius: 100%;\r\n  }\r\n\r\n  50% {\r\n    background-color: rgba(0, 190, 218, 0.75);\r\n  }\r\n\r\n  75% {\r\n    transform: scale(1.2);\r\n    background-color: rgba(17, 104, 217, 0.75);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgba(0, 54, 85, 0.75);\r\n  }\r\n}\r\n.isShortestPath[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: shortestPathAnimation;\r\n          animation-name: shortestPathAnimation;\r\n  -webkit-animation-duration: 1.5s;\r\n          animation-duration: 1.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: alternate;\r\n          animation-direction: alternate;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes shortestPathAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: yellow;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.2);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: yellow;\r\n  }\r\n}\r\n@keyframes shortestPathAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: yellow;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.2);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: yellow;\r\n  }\r\n}\r\n@media screen and (max-width: 1900px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 24px;\r\n  }\r\n}\r\n@media screen and (max-width: 1840px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 23px;\r\n  }\r\n}\r\n@media screen and (max-width: 1780px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 22px;\r\n  }\r\n}\r\n@media screen and (max-width: 1720px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 21px;\r\n  }\r\n}\r\n@media screen and (max-width: 1660px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 20px;\r\n  }\r\n}\r\n@media screen and (max-width: 1600px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 19px;\r\n  }\r\n}\r\n@media screen and (max-width: 1540px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 19px;\r\n  }\r\n}\r\n@media screen and (max-width: 1480px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 18px;\r\n  }\r\n}\r\n@media screen and (max-width: 1420px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 17px;\r\n  }\r\n}\r\n@media screen and (max-width: 1360px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 16px;\r\n  }\r\n}\r\n@media screen and (max-width: 1300px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 15px;\r\n  }\r\n}\r\n@media screen and (max-width: 1240px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 14px;\r\n  }\r\n}\r\n@media screen and (max-width: 1180px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 13px;\r\n  }\r\n}\r\n@media screen and (max-width: 1120px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 12px;\r\n  }\r\n}\r\n@media screen and (max-width: 1060px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 11px;\r\n  }\r\n}\r\n@media screen and (max-width: 1000px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 10px;\r\n  }\r\n}\r\n@media screen and (max-width: 940px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 9px;\r\n  }\r\n}\r\n@media screen and (max-width: 880px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 8px;\r\n  }\r\n}\r\n@media screen and (max-width: 820px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 7px;\r\n  }\r\n}\r\n@media screen and (max-width: 760px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 6px;\r\n  }\r\n\r\n  .options-container[_ngcontent-%COMP%]{\r\n    left: 1%;\r\n  }\r\n}\r\n@media screen and (max-width: 700px){\r\n  .node[_ngcontent-%COMP%]{\r\n    width: 5px;\r\n  }\r\n}\r\n\r\n.grid-container[_ngcontent-%COMP%]{\r\n  margin-top: 13vh;\r\n  margin-left: 0.75vw;\r\n}\r\n.grid[_ngcontent-%COMP%]{\r\n  border-collapse: separate;\r\n  border-spacing: 0;\r\n}\r\n.grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\r\n  padding: 0;\r\n  border-spacing: 0;\r\n  border: 1px groove white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9ncmlkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVztBQUNYO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixzQkFBc0I7QUFDeEI7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsV0FBVztBQUNiO0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFVBQVU7QUFDWjtBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLE9BQU87RUFDUCxZQUFZO0VBQ1osZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGNBQWM7QUFDaEI7QUFFQTtFQUNFLE9BQU87QUFDVDtBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsVUFBVTtFQUNWLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDZCQUE2QjtFQUM3QixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLE9BQU87QUFDVDtBQUVBO0VBQ0UsT0FBTztBQUNUO0FBRUE7RUFDRSxPQUFPO0VBQ1AsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7QUFFQTtFQUNFLE9BQU87QUFDVDtBQUVBO0VBQ0UsT0FBTztBQUNUO0FBRUE7RUFDRSxPQUFPO0FBQ1Q7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsWUFBWTtFQUNaLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0UsY0FBYztBQUNoQjtBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjtBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCO0FBRUEsYUFBYTtBQUViO0VBQ0UsNkJBQTZCO0VBQzdCLFlBQVk7RUFDWixhQUFhO0VBQ2IsY0FBYztFQUNkLFlBQVk7QUFDZDtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHFCQUFxQjtBQUN2QjtBQUVBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLCtDQUErQztFQUMvQyxVQUFVO0FBQ1o7QUFFQTtFQUNFLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLHFCQUFxQjtBQUN2QjtBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLFlBQVk7QUFDZDtBQUVBO0VBQ0UsY0FBYztBQUNoQjtBQUVBO0VBQ0UsNkJBQTZCO0FBQy9CO0FBRUEsWUFBWTtBQUVaO0VBQ0UsbUJBQW1CO0VBQ25CLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCO0FBRUE7RUFDRSxZQUFZO0VBQ1osVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULFNBQVM7RUFDVCxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osd0JBQXdCO0VBQ3hCLDZDQUE2QztFQUM3QyxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLG1KQUFtSjtBQUNySjtBQUVBO0VBQ0UsbURBQW1EO0FBQ3JEO0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixnREFBZ0Q7RUFDaEQsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3Qiw0QkFBNEI7RUFDNUIsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxVQUFVO0FBQ1o7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFVBQVU7RUFDVixVQUFVO0VBQ1YsV0FBVztFQUNYLGdEQUFnRDtFQUNoRCxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjtBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFVBQVU7RUFDViw2Q0FBNkM7QUFDL0M7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUdBLFNBQVM7QUFDVDs7Ozs7Ozs7O0VBU0U7QUFFRjtJQUNJLFlBQVk7SUFDWixhQUFhO0FBQ2pCO0FBRUE7SUFDSSxrQ0FBa0M7QUFDdEM7QUFFQTtJQUNJLGdDQUFnQztBQUNwQztBQUVBO0VBQ0UscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3QixnQ0FBd0I7VUFBeEIsd0JBQXdCO0VBQ3hCLDJDQUFtQztVQUFuQyxtQ0FBbUM7RUFDbkMsMEJBQWtCO1VBQWxCLGtCQUFrQjtFQUNsQixtQ0FBMkI7VUFBM0IsMkJBQTJCO0VBQzNCLG9DQUE0QjtVQUE1Qiw0QkFBNEI7RUFDNUIscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3QixxQ0FBNkI7VUFBN0IsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQix1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSxxQkFBcUI7SUFDckIsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHVCQUF1QjtFQUN6QjtBQUNGO0FBZkE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQix1QkFBdUI7RUFDekI7O0VBRUE7SUFDRSxxQkFBcUI7SUFDckIsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHVCQUF1QjtFQUN6QjtBQUNGO0FBRUE7RUFDRSx3Q0FBZ0M7VUFBaEMsZ0NBQWdDO0VBQ2hDLGdDQUF3QjtVQUF4Qix3QkFBd0I7RUFDeEIsMkNBQW1DO1VBQW5DLG1DQUFtQztFQUNuQywwQkFBa0I7VUFBbEIsa0JBQWtCO0VBQ2xCLHNDQUE4QjtVQUE5Qiw4QkFBOEI7RUFDOUIsb0NBQTRCO1VBQTVCLDRCQUE0QjtFQUM1QixxQ0FBNkI7VUFBN0IsNkJBQTZCO0VBQzdCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLHlDQUF5QztJQUN6QyxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSx5Q0FBeUM7RUFDM0M7O0VBRUE7SUFDRSxxQkFBcUI7SUFDckIsMENBQTBDO0VBQzVDOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHVDQUF1QztFQUN6QztBQUNGO0FBcEJBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIseUNBQXlDO0lBQ3pDLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLHlDQUF5QztFQUMzQzs7RUFFQTtJQUNFLHFCQUFxQjtJQUNyQiwwQ0FBMEM7RUFDNUM7O0VBRUE7SUFDRSxtQkFBbUI7SUFDbkIsdUNBQXVDO0VBQ3pDO0FBQ0Y7QUFFQTtFQUNFLDZDQUFxQztVQUFyQyxxQ0FBcUM7RUFDckMsZ0NBQXdCO1VBQXhCLHdCQUF3QjtFQUN4QiwyQ0FBbUM7VUFBbkMsbUNBQW1DO0VBQ25DLDBCQUFrQjtVQUFsQixrQkFBa0I7RUFDbEIsc0NBQThCO1VBQTlCLDhCQUE4QjtFQUM5QixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IscUNBQTZCO1VBQTdCLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsd0JBQXdCO0VBQzFCOztFQUVBO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHdCQUF3QjtFQUMxQjtBQUNGO0FBZEE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQix3QkFBd0I7RUFDMUI7O0VBRUE7SUFDRSxxQkFBcUI7RUFDdkI7O0VBRUE7SUFDRSxtQkFBbUI7SUFDbkIsd0JBQXdCO0VBQzFCO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsV0FBVztFQUNiO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaOztFQUVBO0lBQ0UsUUFBUTtFQUNWO0FBQ0Y7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0Y7QUFFQSxlQUFlO0FBQ2Y7RUFDRSxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25CO0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLHdCQUF3QjtBQUMxQiIsImZpbGUiOiJzcmMvYXBwL2dyaWQvZ3JpZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTkFWQkFSICovXHJcbmhlYWRlcntcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjI7XHJcbiAgLyptYXJnaW4tYm90dG9tOiA4ZW07Ki9cclxufVxyXG5cclxuaGVhZGVyOjphZnRlcntcclxuICBjb250ZW50OiAnJztcclxuICBkaXNwbGF5OiB0YWJsZTtcclxuICBjbGVhcjogYm90aDtcclxufVxyXG5cclxuLm5hdmJhci1jb250YWluZXJ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHdpZHRoOiA4MCU7XHJcbn1cclxuXHJcbi50aXRsZXtcclxuICBmb250LXNpemU6IDIuNWVtO1xyXG4gIGZsZXg6IDE7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIGN1cnNvcjogZGVmYXVsdDtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgbWFyZ2luLWxlZnQ6IDAuNXZ3O1xyXG59XHJcblxyXG4udGl0bGU6aG92ZXJ7XHJcbiAgY29sb3I6ICMwMzk4ZjQ7XHJcbn1cclxuXHJcbm5hdntcclxuICBmbGV4OiA1O1xyXG59XHJcblxyXG5uYXYgdWx7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuXHJcbm5hdiBsaXtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgbWFyZ2luLWxlZnQ6IDUuNXZ3O1xyXG59XHJcblxyXG4uYWxnb3JpdGhtc3tcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4ubWF6ZXtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4udmlzdWFsaXple1xyXG4gIGZsZXg6IDE7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XHJcbn1cclxuXHJcbi5jbGVhckJvYXJke1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuXHJcbi5jbGVhcldhbGxze1xyXG4gIGZsZXg6IDE7XHJcbn1cclxuXHJcbi5zcGVlZHtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG5idXR0b257XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5idXR0b246aG92ZXJ7XHJcbiAgY29sb3I6ICMwMzk4ZjQ7XHJcbn1cclxuXHJcbi5idG4tdmlzdWFsaXple1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzk4ZjQ7XHJcbiAgcGFkZGluZzogMTBweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLmJ0bi12aXN1YWxpemU6aG92ZXJ7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8qIERST1BET1dOICovXHJcblxyXG4uZHJvcGJ0bntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMTZweDtcclxuICBmb250LXNpemU6IDFlbTtcclxuICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi5kcm9wZG93bntcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG59XHJcblxyXG4uZHJvcGRvd24tY29udGVudHtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xyXG4gIG1pbi13aWR0aDogMTYwcHg7XHJcbiAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnQgYXtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnQgYTpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5OGY0O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmRyb3Bkb3duOmhvdmVyIC5kcm9wZG93bi1jb250ZW50e1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXIgLmRyb3BidG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi8qIE9QVElPTlMgKi9cclxuXHJcbnRoe1xyXG4gIHBhZGRpbmctcmlnaHQ6IDIwdnc7XHJcbiAgcGFkZGluZy1ib3R0b206IDAuNXZoO1xyXG4gIGNvbG9yOiAjMDM5OGY0O1xyXG59XHJcblxyXG50ZHtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxufVxyXG5cclxuLnN0YXRze1xyXG4gIG1hcmdpbi1ib3R0b206IDF2aDtcclxufVxyXG5cclxuLm9wdGlvbnMtY29udGFpbmVye1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDguOCU7XHJcbiAgbGVmdDogMjAlO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl17XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIGhlaWdodDogMTJweDtcclxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICMyMjIsICMwMDApO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBib3gtc2hhZG93OiAwIDAgMCA0cHggIzM1MzUzNSwgMCAwIDAgNXB4ICMzZTNlM2UsIGluc2V0IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMSksIDAgNXB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjUpLCBpbnNldCAwIDAgMTVweCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWRbdHlwZT1cImNoZWNrYm94XCJde1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCAjNmRkMWZmLCAjMjBiN2ZmKTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmJlZm9yZXtcclxuICBjb250ZW50OiAnJztcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwcHg7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTVweDtcclxuICBoZWlnaHQ6IDExcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICMwMDAsICM2YjZiNmIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICMyMzIzMjM7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4LCAwLjk2KTtcclxuICB0cmFuc2l0aW9uOiAwLjVzO1xyXG59XHJcblxyXG5pbnB1dDpjaGVja2VkW3R5cGU9XCJjaGVja2JveFwiXTpiZWZvcmV7XHJcbiAgbGVmdDogMTVweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmFmdGVye1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDRweDtcclxuICBsZWZ0OiAxMHB4O1xyXG4gIHdpZHRoOiAzcHg7XHJcbiAgaGVpZ2h0OiAzcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICM2YjZiNmIsICMwMDApO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB0cmFuc2l0aW9uOiAuNXM7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWRbdHlwZT1cImNoZWNrYm94XCJdOmFmdGVye1xyXG4gIGJhY2tncm91bmQ6ICM2M2NkZmY7XHJcbiAgbGVmdDogMjVweDtcclxuICBib3gtc2hhZG93OiAwIDAgNXB4ICMxM2IzZmYsIDAgMCAxNXB4ICMxM2IzZmY7XHJcbn1cclxuXHJcbi5kaWFnb25hbExhYmVse1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxufVxyXG5cclxuXHJcbi8qIEdSSUQgKi9cclxuLyouZ3JpZC1jb250YWluZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDIyMHB4O1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICAgIGJvcmRlcjogYmxhY2s7XHJcbiAgICBmb250LXNpemU6IDA7XHJcbiAgICB3aWR0aDogMTUwMHB4O1xyXG4gICAgaGVpZ2h0OiA3MTVweDtcclxufSovXHJcblxyXG4ubm9kZXtcclxuICAgIHdpZHRoOiAxLjN2dztcclxuICAgIGhlaWdodDogMi43dmg7XHJcbn1cclxuXHJcbi5pc1N0YXJ0e1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW4gIWltcG9ydGFudDtcclxufVxyXG5cclxuLmlzRW5ke1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5pc1dhbGx7XHJcbiAgYW5pbWF0aW9uLW5hbWU6IHdhbGxBbmltYXRpb247XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjRzO1xyXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMDtcclxuICBhbmltYXRpb24tZGlyZWN0aW9uOiBub3JtYWw7XHJcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcclxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICBhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZztcclxufVxyXG5cclxuQGtleWZyYW1lcyB3YWxsQW5pbWF0aW9uIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICB9XHJcblxyXG4gIDUwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMyk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICB9XHJcblxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIH1cclxufVxyXG5cclxuLmlzVmlzaXRlZHtcclxuICBhbmltYXRpb24tbmFtZTogdmlzaXRlZEFuaW1hdGlvbjtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XHJcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAwO1xyXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcclxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHZpc2l0ZWRBbmltYXRpb24ge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4zKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjE3LCAxNTksIDAuNzUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICB9XHJcblxyXG4gIDUwJSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDE5MCwgMjE4LCAwLjc1KTtcclxuICB9XHJcblxyXG4gIDc1JSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE3LCAxMDQsIDIxNywgMC43NSk7XHJcbiAgfVxyXG5cclxuICAxMDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDU0LCA4NSwgMC43NSk7XHJcbiAgfVxyXG59XHJcblxyXG4uaXNTaG9ydGVzdFBhdGh7XHJcbiAgYW5pbWF0aW9uLW5hbWU6IHNob3J0ZXN0UGF0aEFuaW1hdGlvbjtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XHJcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAwO1xyXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcclxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNob3J0ZXN0UGF0aEFuaW1hdGlvbiB7XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xyXG4gIH1cclxuXHJcbiAgNTAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICB9XHJcblxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE5MDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMjRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE4NDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMjNweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE3ODBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMjJweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE3MjBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMjFweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE2NjBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMjBweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE2MDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTlweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE1NDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTlweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE0ODBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMThweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDE0MjBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTdweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEzNjBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTZweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEzMDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTVweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEyNDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTRweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDExODBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTNweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDExMjBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTJweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwNjBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTFweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwMDBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogMTBweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk0MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiA5cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA4ODBweCl7XHJcbiAgLm5vZGV7XHJcbiAgICB3aWR0aDogOHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogODIwcHgpe1xyXG4gIC5ub2Rle1xyXG4gICAgd2lkdGg6IDdweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2MHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiA2cHg7XHJcbiAgfVxyXG5cclxuICAub3B0aW9ucy1jb250YWluZXJ7XHJcbiAgICBsZWZ0OiAxJTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KXtcclxuICAubm9kZXtcclxuICAgIHdpZHRoOiA1cHg7XHJcbiAgfVxyXG59XHJcblxyXG4vKiBHUklELVRBQkxFICovXHJcbi5ncmlkLWNvbnRhaW5lcntcclxuICBtYXJnaW4tdG9wOiAxM3ZoO1xyXG4gIG1hcmdpbi1sZWZ0OiAwLjc1dnc7XHJcbn1cclxuXHJcbi5ncmlke1xyXG4gIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XHJcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XHJcbn1cclxuXHJcbi5ncmlkIHRke1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XHJcbiAgYm9yZGVyOiAxcHggZ3Jvb3ZlIHdoaXRlO1xyXG59XHJcbiJdfQ== */"]
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