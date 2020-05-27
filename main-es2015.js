(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/algorithms/maze/randomMaze.ts":
/*!***********************************************!*\
  !*** ./src/app/algorithms/maze/randomMaze.ts ***!
  \***********************************************/
/*! exports provided: generateRandomMaze */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRandomMaze", function() { return generateRandomMaze; });
function generateRandomMaze(grid) {
    const wallNodes = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            // returns a random int value from 0 to 1
            const random = Math.floor(Math.random() * 3.5);
            const currentNode = grid[i][j];
            if (random == 1 && !currentNode.isStart && !currentNode.isEnd)
                wallNodes.push(currentNode);
        }
    }
    return wallNodes;
}


/***/ }),

/***/ "./src/app/algorithms/pathfinding/astar.ts":
/*!*************************************************!*\
  !*** ./src/app/algorithms/pathfinding/astar.ts ***!
  \*************************************************/
/*! exports provided: aStar, retraceShortestPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aStar", function() { return aStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "retraceShortestPath", function() { return retraceShortestPath; });
function aStar(grid, startNode, endNode, heuristic) {
    // intialize
    let openList = [];
    let closedList = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j].f = 0;
            grid[i][j].g = 0;
            grid[i][j].h = 0;
            grid[i][j].parentNode = null;
        }
    }
    openList.push(startNode);
    while (openList.length != 0) {
        let indexOfLowestF = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < openList[indexOfLowestF].f) {
                indexOfLowestF = i;
            }
        }
        const currentNode = openList[indexOfLowestF];
        // we found the end node
        if (currentNode.isEnd) {
            console.log('Found end node!');
            closedList.push(currentNode);
            return closedList;
        }
        // remove the node with lowest f value from the openList
        openList.splice(indexOfLowestF, 1);
        // and push it into the closedList
        currentNode.closed = true;
        closedList.push(currentNode);
        // get the 4 neighbors of the current node
        const neighbors = getNeighbors(grid, currentNode);
        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];
            // if the neighbor already is in the closedList or it is a wall, just skip it
            if (closedList.includes(neighbor) || neighbor.isWall) {
                console.log(`Neighbor ${neighbor.id} already in the closedList!`);
                continue;
            }
            // the gScore is just the distance from the start node to the current node 
            let gScore = currentNode.g + 1;
            // this boolean value is helping us to differentiate if it's the most optimal path to the current node
            let isBestG = false;
            // first time visiting the node
            if (!openList.includes(neighbor)) {
                console.log(`First time visiting Node ${neighbor.row} ${neighbor.column}`);
                // if it's the first time visiting the node, the gscore is the best (at least for the moment)
                isBestG = true;
                // get the heuristic distance 
                neighbor.h = getHeuristicDistance(neighbor, endNode, heuristic);
                // add the current neighbor to the openList
                openList.push(neighbor);
            }
            // if it's not the first time visiting the node but the g score was worse on the previous time
            else if (gScore < neighbor.g) {
                isBestG = true;
            }
            // if we found the temporal best path to this node
            if (isBestG) {
                console.log(`Best path to node ${neighbor.row} ${neighbor.column}`);
                neighbor.parentNode = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                console.log(`F: ${neighbor.f} G: ${neighbor.g} H: ${neighbor.h}`);
            }
        }
    }
    // return empty array if there was an error
    return [];
}
function getNeighbors(grid, currentNode) {
    const neighbors = [];
    // get the column and row from the current node
    console.log('[A*]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
    const column = currentNode.column;
    const row = currentNode.row;
    // get the node above
    if (row > 0) {
        var index = neighbors.push(grid[row - 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node below
    if (row < 26) {
        neighbors.push(grid[row + 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node on the left
    if (column > 0) {
        neighbors.push(grid[row][column - 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node on the right
    if (column < 68) {
        neighbors.push(grid[row][column + 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // only return the neighbors that weren't visited yet
    return neighbors;
}
function getHeuristicDistance(currentNode, endNode, heuristic) {
    if (heuristic == 'euclidean') {
        const result = Math.sqrt(Math.pow((currentNode.row - endNode.row), 2) + Math.pow((currentNode.column - endNode.column), 2));
        console.log('Euclidean Distance as heuristic');
        console.log(`CurrentNode: ${currentNode.row} ${currentNode.column}, EndNode: ${endNode.row} ${endNode.column}, HeuristicDistance: ${result}`);
        return result;
    }
    else {
        const result = Math.abs(currentNode.row - endNode.row) + Math.abs(currentNode.column - endNode.column);
        console.log('Manhattan Distance as heuristic');
        console.log(`CurrentNode: ${currentNode.row} ${currentNode.column}, EndNode: ${endNode.row} ${endNode.column}, HeuristicDistance: ${result}`);
        return result;
    }
}
function retraceShortestPath(endNode) {
    const shortestPath = [];
    // set the current node to the end node
    var currentNode = endNode;
    // backtrack from the end node all the way to the starting node
    while (currentNode.parentNode != null) {
        // add the current node to the array of nodes for the shortest path
        shortestPath.unshift(currentNode);
        // then set current node to the current node's previous node ==> Backtracking
        currentNode = currentNode.parentNode;
    }
    console.log('[A*] LENGTH: ' + shortestPath.length);
    return shortestPath;
}


/***/ }),

/***/ "./src/app/algorithms/pathfinding/dijkstra.ts":
/*!****************************************************!*\
  !*** ./src/app/algorithms/pathfinding/dijkstra.ts ***!
  \****************************************************/
/*! exports provided: executeDijkstra, getUnvisitedNeighbors, getAll, createShortestPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeDijkstra", function() { return executeDijkstra; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnvisitedNeighbors", function() { return getUnvisitedNeighbors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShortestPath", function() { return createShortestPath; });
function executeDijkstra(grid, startNode, endNode) {
    let visitedNodes = [];
    let unvisitedNodes = [];
    // initialize 
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].isStart) {
                grid[i][j].distance = 0;
            }
            else {
                // setting every node's distance to infinity except the start node
                grid[i][j].distance = Infinity;
            }
            // setting the parent (previous) node to null
            grid[i][j].parentNode = null;
        }
    }
    // getting all nodes from the current grid
    unvisitedNodes = getAll(grid);
    console.log('unvisited nodes length: ' + unvisitedNodes.length);
    // go through every unvisited node until the final node is reached
    while (unvisitedNodes.length != 0) {
        // get an array of unvisited nodes sorted according to the shortest distance
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        // currentNode is the node with shortest distance
        const currentNode = unvisitedNodes.shift();
        // skip the walls
        if (currentNode.isWall) {
            console.log('Its a wall');
            continue;
        }
        // if distance is infinite, we are probably trapped in walls
        if (currentNode.distance == Infinity) {
            console.log('WE GOT A PROBLEM!');
            return visitedNodes;
        }
        // set the current node's "isVisited"-property to true
        if (!currentNode.isStart && !currentNode.isEnd) {
            currentNode.isVisited = true;
        }
        visitedNodes.push(currentNode);
        // push the current node into an array of already visited nodes
        if (currentNode.isEnd) {
            console.log('End node reached!!');
            return visitedNodes;
        }
        console.log('updating neighbors');
        // update the unvisited neighbors
        updateUnvisitedNeighbors(grid, currentNode);
    }
}
function getUnvisitedNeighbors(grid, currentNode) {
    const neighbors = [];
    // get the column and row from the current node
    console.log('[DIJKSTRA]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
    const column = currentNode.column;
    const row = currentNode.row;
    // get the node above
    if (row > 0) {
        neighbors.push(grid[row - 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node below
    if (row < 26) {
        neighbors.push(grid[row + 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node on the left
    if (column > 0) {
        neighbors.push(grid[row][column - 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node on the right
    if (column < 68) {
        neighbors.push(grid[row][column + 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // only return the neighbors that weren't visited yet
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
// UNDER CONSTRUCTION
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
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
    // for each unvisited neighbor set the distance to the current node's distance + 1
    // +1 because the distance between the current node and the neighbor is 1
    // also set the neighbors "previousNode"-property to the current node
    unvisitedNeighbors.forEach(node => {
        if (node.isDiagonal) {
            node.distance = currentNode.distance + 1.1;
        }
        else {
            // "1" is the standard weight (distance) from one node to its neighbors
            node.distance = currentNode.distance + 1;
        }
        node.parentNode = currentNode;
    });
}
function getAll(grid) {
    const nodes = [];
    // gets all nodes of the given grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push(grid[i][j]);
        }
    }
    return nodes;
}
function createShortestPath(endNode) {
    const shortestPath = [];
    // set the current node to the end node
    var currentNode = endNode;
    // backtrack from the end node all the way to the starting node
    while (currentNode != null) {
        // add the current node to the array of nodes for the shortest path
        shortestPath.unshift(currentNode);
        // then set current node to the current node's previous node ==> Backtracking
        if (currentNode.parentNode.isStart) {
            break;
        }
        currentNode = currentNode.parentNode;
    }
    return shortestPath;
}


/***/ }),

/***/ "./src/app/algorithms/pathfinding/dijkstraexperimental.ts":
/*!****************************************************************!*\
  !*** ./src/app/algorithms/pathfinding/dijkstraexperimental.ts ***!
  \****************************************************************/
/*! exports provided: executeExperimental, getAll, getUnvisitedNeighbors, createShortestPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeExperimental", function() { return executeExperimental; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAll", function() { return getAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnvisitedNeighbors", function() { return getUnvisitedNeighbors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShortestPath", function() { return createShortestPath; });
function executeExperimental(grid, startNode, endNode, heuristic) {
    let visitedNodes = [];
    let unvisitedNodes = [];
    // initialize 
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].isStart) {
                grid[i][j].distance = 0;
                grid[i][j].h = getHeuristicDistance(grid[i][j], endNode, heuristic);
            }
            else {
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
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        // currentNode is the node with shortest distance
        const currentNode = unvisitedNodes.shift();
        // skip the walls
        if (currentNode.isWall) {
            console.log('Its a wall');
            continue;
        }
        // if distance is infinite, we are probably trapped in walls
        if (currentNode.distance == Infinity) {
            console.log('WE GOT A PROBLEM!');
            return visitedNodes;
        }
        // set the current node's "isVisited"-property to true
        if (!currentNode.isStart && !currentNode.isEnd) {
            currentNode.isVisited = true;
        }
        visitedNodes.push(currentNode);
        // push the current node into an array of already visited nodes
        if (currentNode.isEnd) {
            console.log('End node reached!!');
            return visitedNodes;
        }
        console.log('updating neighbors');
        updateUnvisitedNeighbors(grid, currentNode);
    }
}
function getAll(grid) {
    const nodes = [];
    // gets all nodes of the given grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            nodes.push(grid[i][j]);
        }
    }
    return nodes;
}
function getHeuristicDistance(currentNode, endNode, heuristic) {
    if (heuristic == 'euclidean') {
        const result = Math.sqrt(Math.pow((currentNode.row - endNode.row), 2) + Math.pow((currentNode.column - endNode.column), 2));
        console.log('Euclidean Distance as heuristic');
        console.log(`CurrentNode: ${currentNode.row} ${currentNode.column}, EndNode: ${endNode.row} ${endNode.column}, HeuristicDistance: ${result}`);
        return result;
    }
    else {
        const result = Math.abs(currentNode.row - endNode.row) + Math.abs(currentNode.column - endNode.column);
        console.log('Manhattan Distance as heuristic');
        console.log(`CurrentNode: ${currentNode.row} ${currentNode.column}, EndNode: ${endNode.row} ${endNode.column}, HeuristicDistance: ${result}`);
        return result;
    }
}
function updateUnvisitedNeighbors(grid, currentNode) {
    // get all unvisited neighbors of the current node
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
    // for each unvisited neighbor set the distance to the current node's distance + 1
    // +1 because the distance between the current node and the neighbor is 1
    // also set the neighbors "previousNode"-property to the current node
    unvisitedNeighbors.forEach(node => {
        node.distance = currentNode.distance + node.h + 1;
        node.parentNode = currentNode;
    });
}
function getUnvisitedNeighbors(grid, currentNode) {
    const neighbors = [];
    // get the column and row from the current node
    console.log('[A*]: CurrentNode: ' + currentNode.row + ' ' + currentNode.column);
    const column = currentNode.column;
    const row = currentNode.row;
    // get the node above
    if (row > 0) {
        var index = neighbors.push(grid[row - 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node below
    if (row < 26) {
        neighbors.push(grid[row + 1][column]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node on the left
    if (column > 0) {
        neighbors.push(grid[row][column - 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // get the node on the right
    if (column < 68) {
        neighbors.push(grid[row][column + 1]);
        console.log('Neighbor: ' + neighbors[neighbors.length - 1].row + ' ' + neighbors[neighbors.length - 1].column + ' INDEX: ' + neighbors[neighbors.length - 1].id);
    }
    // only return the neighbors that weren't visited yet
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
function createShortestPath(endNode) {
    const shortestPath = [];
    // set the current node to the end node
    var currentNode = endNode;
    // backtrack from the end node all the way to the starting node
    while (currentNode != null) {
        // add the current node to the array of nodes for the shortest path
        shortestPath.unshift(currentNode);
        // then set current node to the current node's previous node ==> Backtracking
        if (currentNode.parentNode.isStart) {
            break;
        }
        currentNode = currentNode.parentNode;
    }
    console.log('[DIJKSTRA] LENGTH: ' + shortestPath.length);
    return shortestPath;
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid/grid.component */ "./src/app/grid/grid.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





class AppComponent {
    constructor(titleService) {
        this.titleService = titleService;
        this.title = 'Pathfinder';
        this.titleService.setTitle('Pathfinder');
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 5, vars: 0, consts: [[1, "wrapper"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-grid");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet");
    } }, directives: [_grid_grid_component__WEBPACK_IMPORTED_MODULE_2__["GridComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["body[_ngcontent-%COMP%]{\r\n    background-color: #1c2228;\r\n    height: 100%;\r\n    width: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.wrapper[_ngcontent-%COMP%]{\r\n    overflow-x: hidden;\r\n    overflow-y: hidden;\r\n    position: relative;\r\n    height: 100%;\r\n    width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx5QkFBeUI7SUFDekIsWUFBWTtJQUNaLFdBQVc7SUFDWCxTQUFTO0lBQ1QsVUFBVTtBQUNkOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFdBQVc7QUFDZiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keXtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYzIyMjg7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbi53cmFwcGVye1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return [{ type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/navbar/navbar.component.ts");
/* harmony import */ var _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./grid/grid.component */ "./src/app/grid/grid.component.ts");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
        _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                    _grid_grid_component__WEBPACK_IMPORTED_MODULE_7__["GridComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/grid/grid.component.ts":
/*!****************************************!*\
  !*** ./src/app/grid/grid.component.ts ***!
  \****************************************/
/*! exports provided: GridComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridComponent", function() { return GridComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _models_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/node */ "./src/models/node.ts");
/* harmony import */ var _algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../algorithms/pathfinding/dijkstra */ "./src/app/algorithms/pathfinding/dijkstra.ts");
/* harmony import */ var _algorithms_pathfinding_astar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../algorithms/pathfinding/astar */ "./src/app/algorithms/pathfinding/astar.ts");
/* harmony import */ var _algorithms_pathfinding_dijkstraexperimental__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../algorithms/pathfinding/dijkstraexperimental */ "./src/app/algorithms/pathfinding/dijkstraexperimental.ts");
/* harmony import */ var _algorithms_maze_randomMaze__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../algorithms/maze/randomMaze */ "./src/app/algorithms/maze/randomMaze.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");








const _c0 = function (a0, a1, a2, a3, a4) { return { "isStart": a0, "isEnd": a1, "isWall": a2, "isVisited": a3, "isShortestPath": a4, "node": true }; };
function GridComponent_tr_127_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mousedown", function GridComponent_tr_127_td_1_Template_td_mousedown_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const col_r5 = ctx.index; const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.mouseDown(row_r2, col_r5); })("mouseenter", function GridComponent_tr_127_td_1_Template_td_mouseenter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const col_r5 = ctx.index; const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.mouseEnter(row_r2, col_r5); })("mouseleave", function GridComponent_tr_127_td_1_Template_td_mouseleave_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const col_r5 = ctx.index; const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.mouseLeave(row_r2, col_r5); })("mouseup", function GridComponent_tr_127_td_1_Template_td_mouseup_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const col_r5 = ctx.index; const row_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.mouseUp(row_r2, col_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](1, _c0, node_r4.isStart, node_r4.isEnd, node_r4.isWall, node_r4.isActuallyVisited, node_r4.isShortestPath));
} }
function GridComponent_tr_127_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GridComponent_tr_127_td_1_Template, 2, 7, "td", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rows_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", rows_r1);
} }
const GRID_NODES = [];
let ALGORITHM = "nothing";
let distance = 'euclidean';
let showProcess = true;
let animationSpeed = 20;
let mouseIsPressed = false;
let startIsMoving = false;
let endIsMoving = false;
let isRunning = false;
let isWall = false;
let startCoordiantes = new Map();
let endCoordinates = new Map();
let lastPosition = new Map();
class GridComponent {
    constructor() {
        this.exampleArray = [];
        this.nodes = GRID_NODES;
        this.algorithm = ALGORITHM;
    }
    ngOnInit() {
        //generates the nodes for the grid
        this.generateTwoDimensionalGrid();
        // setting the default coordinates for start node and end node
        startCoordiantes.set('Row', 13);
        startCoordiantes.set('Col', 10);
        endCoordinates.set('Row', 13);
        endCoordinates.set('Col', 58);
        // setting the default checkboxes
        this.setHeuristicCheckboxes();
        this.initShowProcessCheckbox();
    }
    // generates a two-dimensional grid
    generateTwoDimensionalGrid() {
        let index = 0;
        for (let row = 0; row <= 26; row++) {
            const currentRow = [];
            for (let column = 0; column < 69; column++) {
                if (row == 13 && column == 10) {
                    currentRow.push(new _models_node__WEBPACK_IMPORTED_MODULE_1__["Node"](index, true, false, false, false, row, column));
                }
                else if (row == 13 && column == 58) {
                    currentRow.push(new _models_node__WEBPACK_IMPORTED_MODULE_1__["Node"](index, false, true, false, false, row, column));
                }
                else {
                    currentRow.push(new _models_node__WEBPACK_IMPORTED_MODULE_1__["Node"](index, false, false, false, false, row, column));
                }
                index++;
            }
            GRID_NODES.push(currentRow);
        }
    }
    // method that checks if there's a algorithm selected and if there's is one, it calls the visualizeAlgorithm-method
    checkAlgorithm() {
        if (isRunning)
            return;
        if (this.algorithm == 'nothing') {
            document.getElementById('btn-visualize').textContent = "Pick an algortihm!";
        }
        else {
            document.getElementById('btn-visualize').textContent = 'Visualizing...';
            document.getElementById('btn-visualize').style.backgroundColor = '#ff0000';
            this.clearVisitedNodes();
            isRunning = true;
            const slideMenu = document.querySelector('.slideMenu');
            if (slideMenu.classList.contains('slideMenu-active')) {
                this.toggleSlideMenu();
            }
            this.visualizeAlgorithm();
        }
    }
    // method that prepares everything for the animation-algorithm
    visualizeAlgorithm() {
        if (this.algorithm == 'Dijkstra') {
            const startRow = startCoordiantes.get('Row');
            const startCol = startCoordiantes.get('Col');
            const startNode = this.nodes[startRow][startCol];
            const endRow = endCoordinates.get('Row');
            const endCol = endCoordinates.get('Col');
            const endNode = this.nodes[endRow][endCol];
            const visitedNodes = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["executeDijkstra"])(this.nodes, startNode, endNode);
            if (!this.checkIfFound(visitedNodes)) {
                setTimeout(() => {
                    document.getElementById('btn-visualize').textContent = 'Visualize!';
                    document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                }, 1500);
                document.getElementById('btn-visualize').textContent = 'No path found!';
                this.algorithm = 'nothing';
                isRunning = false;
                return;
            }
            else {
                const shortestPath = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["createShortestPath"])(endNode);
                this.animateAlgorithm(visitedNodes, shortestPath, showProcess);
                this.setStatistics(visitedNodes, shortestPath, showProcess);
            }
        }
        else if (this.algorithm == 'A*') {
            const startRow = startCoordiantes.get('Row');
            const startCol = startCoordiantes.get('Col');
            const startNode = this.nodes[startRow][startCol];
            const endRow = endCoordinates.get('Row');
            const endCol = endCoordinates.get('Col');
            const endNode = this.nodes[endRow][endCol];
            const visitedNodes = Object(_algorithms_pathfinding_astar__WEBPACK_IMPORTED_MODULE_3__["aStar"])(this.nodes, startNode, endNode, distance);
            console.log('VISITED NODES:' + visitedNodes.length);
            if (!this.checkIfFound(visitedNodes)) {
                setTimeout(() => {
                    document.getElementById('btn-visualize').textContent = 'Visualize!';
                    document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                }, 1500);
                document.getElementById('btn-visualize').textContent = 'No path found!';
                this.algorithm = 'nothing';
                isRunning = false;
                return;
            }
            else {
                const shortestPath = Object(_algorithms_pathfinding_astar__WEBPACK_IMPORTED_MODULE_3__["retraceShortestPath"])(endNode);
                this.animateAlgorithm(visitedNodes, shortestPath, showProcess);
                this.setStatistics(visitedNodes, shortestPath, showProcess);
            }
        }
        else if (this.algorithm == 'Alt-Dijkstra') {
            const startRow = startCoordiantes.get('Row');
            const startCol = startCoordiantes.get('Col');
            const startNode = this.nodes[startRow][startCol];
            const endRow = endCoordinates.get('Row');
            const endCol = endCoordinates.get('Col');
            const endNode = this.nodes[endRow][endCol];
            const visitedNodes = Object(_algorithms_pathfinding_dijkstraexperimental__WEBPACK_IMPORTED_MODULE_4__["executeExperimental"])(this.nodes, startNode, endNode, distance);
            if (!this.checkIfFound(visitedNodes)) {
                setTimeout(() => {
                    document.getElementById('btn-visualize').textContent = 'Visualize!';
                    document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                }, 1500);
                document.getElementById('btn-visualize').textContent = 'No path found!';
                this.algorithm = 'nothing';
                isRunning = false;
                return;
            }
            else {
                const shortestPath = Object(_algorithms_pathfinding_dijkstra__WEBPACK_IMPORTED_MODULE_2__["createShortestPath"])(endNode);
                this.animateAlgorithm(visitedNodes, shortestPath, showProcess);
                this.setStatistics(visitedNodes, shortestPath, showProcess);
            }
        }
    }
    // animates the selected algorithm
    animateAlgorithm(visitedNodes, shortestPath, showProcess) {
        if (showProcess) {
            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i == visitedNodes.length) {
                    setTimeout(() => {
                        console.log('[GRID] Shortest Path: ' + shortestPath.length);
                        console.log('[GRID]: ' + shortestPath[0].row + ' ' + shortestPath[0].column);
                        this.animateShortestPath(shortestPath);
                    }, i * animationSpeed);
                    return;
                }
                setTimeout(() => {
                    if (visitedNodes[i].isStart || visitedNodes[i].isEnd) { }
                    else {
                        visitedNodes[i].isActuallyVisited = true;
                    }
                }, i * animationSpeed);
            }
        }
        else {
            this.animateShortestPath(shortestPath);
        }
    }
    // animates the shortest path
    animateShortestPath(shortestPath) {
        for (let i = 0; i <= shortestPath.length; i++) {
            setTimeout(() => {
                if (i == shortestPath.length) {
                    this.algorithm = 'nothing';
                    isRunning = false;
                    document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                    setTimeout(() => {
                        document.getElementById('btn-visualize').textContent = 'Visualize!';
                    }, 1500);
                    document.getElementById('btn-visualize').textContent = 'Done!';
                    return;
                }
                console.log('[ANIMATE_SHORTEST_PATH]: ' + shortestPath[i].row + ' ' + shortestPath[i].column);
                shortestPath[i].isActuallyVisited = false;
                if (shortestPath[i].isEnd) { }
                else {
                    shortestPath[i].isShortestPath = true;
                }
            }, i * animationSpeed * 2);
        }
    }
    // method that checks some constraints and calls the animation-method
    visualizeMazeAlgorithm() {
        if (isRunning)
            return;
        console.log("Generating random maze...");
        this.clearBoard();
        isRunning = true;
        const walls = Object(_algorithms_maze_randomMaze__WEBPACK_IMPORTED_MODULE_5__["generateRandomMaze"])(this.nodes);
        this.animateMazeAlgorithm(walls);
    }
    // method that animates the maze algorithms
    animateMazeAlgorithm(walls) {
        console.log("Animating random maze...");
        for (let i = 0; i <= walls.length; i++) {
            setTimeout(() => {
                if (i == walls.length) {
                    isRunning = false;
                    document.getElementById('btn-visualize').style.backgroundColor = '#0398f4';
                    setTimeout(() => {
                        document.getElementById('btn-visualize').textContent = 'Visualize!';
                    }, 1500);
                    document.getElementById('btn-visualize').textContent = 'Done!';
                    return;
                }
                walls[i].isWall = true;
            }, i * 10);
        }
    }
    // helper method to set or delete a wall node
    toggleWall(row, column) {
        if ((this.nodes[row][column].isStart || this.nodes[row][column].isEnd)) {
            console.log('Cannot toggle wall!');
            return;
        }
        else if (isRunning) { }
        else {
            this.nodes[row][column].isWall = !this.nodes[row][column].isWall;
        }
        console.log('ROW: ' + this.nodes[row][column].row + ' COLUMN: ' + this.nodes[row][column].column);
    }
    // sets the start node
    setStart(row, column) {
        if (isRunning) {
            return;
        }
        this.nodes[row][column].isStart = true;
        startCoordiantes.set('Row', row);
        startCoordiantes.set('Col', column);
    }
    // deletes the start node
    deleteStart(row, column) {
        if (isRunning) {
            return;
        }
        this.nodes[row][column].isStart = false;
    }
    // sets the end node
    setEnd(row, column) {
        if (isRunning) {
            return;
        }
        this.nodes[row][column].isEnd = true;
        endCoordinates.set('Row', row);
        endCoordinates.set('Col', column);
    }
    // deletes the end node
    deleteEnd(row, column) {
        if (isRunning) {
            return;
        }
        this.nodes[row][column].isEnd = false;
    }
    /*
    ######## These are all the mouse events that handle things like dragging and moving nodes #########
    */
    mouseDown(row, col) {
        mouseIsPressed = true;
        if (this.nodes[row][col].isStart) {
            startIsMoving = true;
        }
        else if (this.nodes[row][col].isEnd) {
            endIsMoving = true;
        }
        else {
            this.toggleWall(row, col);
        }
        console.log('Mouse down');
    }
    mouseEnter(row, column) {
        if (mouseIsPressed && !startIsMoving && !endIsMoving) {
            this.toggleWall(row, column);
        }
        else if (mouseIsPressed && startIsMoving) {
            if (this.nodes[row][column].isWall) {
                this.toggleWall(row, column);
                isWall = true;
            }
            if (this.nodes[row][column].isEnd) {
                this.setStart(lastPosition.get('Row'), lastPosition.get('Col'));
            }
            else {
                this.setStart(row, column);
            }
        }
        else if (mouseIsPressed && endIsMoving) {
            if (this.nodes[row][column].isWall) {
                this.toggleWall(row, column);
                isWall = true;
            }
            if (this.nodes[row][column].isStart) {
                this.setEnd(lastPosition.get('Row'), lastPosition.get('Col'));
            }
            else {
                this.setEnd(row, column);
            }
        }
        else { }
    }
    mouseLeave(row, column) {
        if (mouseIsPressed && startIsMoving && this.nodes[row][column].isEnd) {
            this.deleteStart(lastPosition.get('Row'), lastPosition.get('Col'));
        }
        else if (mouseIsPressed && startIsMoving) {
            lastPosition.set('Row', row);
            lastPosition.set('Col', column);
            this.deleteStart(row, column);
        }
        else if (mouseIsPressed && endIsMoving && this.nodes[row][column].isStart) {
            this.deleteEnd(lastPosition.get('Row'), lastPosition.get('Col'));
        }
        else if (mouseIsPressed && endIsMoving) {
            lastPosition.set('Row', row);
            lastPosition.set('Col', column);
            this.deleteEnd(row, column);
        }
        else { }
        if (isWall) {
            this.toggleWall(row, column);
            isWall = false;
        }
    }
    mouseUp(row, column) {
        mouseIsPressed = false;
        startIsMoving = false;
        endIsMoving = false;
        console.log('Mouse up');
    }
    /*
    #########################################################
    */
    // deletes all wall nodes of the grid
    clearWalls() {
        if (isRunning)
            return;
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                if (this.nodes[i][j].isWall)
                    this.nodes[i][j].isWall = false;
            }
        }
    }
    // deletes everything of the grid except the start and end node
    clearBoard() {
        if (isRunning)
            return;
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                this.nodes[i][j].isWall = false;
                this.nodes[i][j].isVisited = false;
                this.nodes[i][j].isActuallyVisited = false;
                this.nodes[i][j].isShortestPath = false;
            }
        }
        this.resetStatistics();
        const currentStartRow = startCoordiantes.get('Row');
        const currentStartCol = startCoordiantes.get('Col');
        const currentEndRow = endCoordinates.get('Row');
        const currentEndCol = endCoordinates.get('Col');
        this.deleteStart(currentStartRow, currentStartCol);
        this.deleteEnd(currentEndRow, currentEndCol);
        this.setStart(13, 10);
        this.setEnd(13, 58);
    }
    // resets the statistics of the options
    resetStatistics() {
        document.getElementById('visitedNodes').style.color = 'white';
        document.getElementById('shortestPath').style.color = 'white';
        document.getElementById('visitedNodes').textContent = '0';
        document.getElementById('shortestPath').textContent = '0';
    }
    // deletes every visited node from any previous algorithm
    clearVisitedNodes() {
        if (isRunning)
            return;
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
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
    // helper method to set an selected algorithm
    setPathfindingAlgorithm(algorithm) {
        //this.openDijkstraDialog();
        this.algorithm = algorithm;
        document.getElementById('btn-visualize').textContent = `Visualize ${this.algorithm}!`;
        console.log(this.algorithm);
    }
    // helper method that sets the speed of animation
    setSpeed(speed) {
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
    // helper method that sets the initial state of the show-process checkbox
    initShowProcessCheckbox() {
        const showProcessCheckbox = document.getElementById('showProcess');
        showProcess = true;
        showProcessCheckbox.checked = true;
    }
    // helper method that handles the show-process checkbox
    setShowProcessCheckbox() {
        const showProcessCheckbox = document.getElementById('showProcess');
        if (showProcessCheckbox.checked) {
            showProcess = true;
            console.log(showProcess);
        }
        else {
            showProcess = false;
            console.log(showProcess);
        }
    }
    // sets the statistics in real time 
    setStatistics(visitedNodes, shortestPath, showProcess) {
        if (showProcess) {
            for (let i = 0; i <= visitedNodes.length; i++) {
                if (i == visitedNodes.length) {
                    setTimeout(() => {
                        for (let j = 0; j < shortestPath.length; j++) {
                            setTimeout(() => {
                                document.getElementById('visitedNodes').style.color = '#0398f4';
                                document.getElementById('shortestPath').style.color = 'yellow';
                                document.getElementById('shortestPath').textContent = `${j}`;
                            }, j * animationSpeed * 2);
                        }
                    }, i * animationSpeed);
                }
                else {
                    setTimeout(() => {
                        document.getElementById('visitedNodes').style.color = '#ff0000';
                        document.getElementById('visitedNodes').textContent = `${i}`;
                    }, i * animationSpeed);
                }
            }
        }
        else {
            for (let i = 0; i < shortestPath.length; i++) {
                setTimeout(() => {
                    document.getElementById('shortestPath').style.color = 'yellow';
                    document.getElementById('shortestPath').textContent = `${i}`;
                }, i * animationSpeed * 2);
            }
        }
    }
    // sets the heuristic checkboxes according to some constraints
    setHeuristicCheckboxes() {
        let euclideanCheckbox = document.getElementById('euclidean');
        let manhattanCheckbox = document.getElementById('manhattan');
        if (distance == 'euclidean') {
            euclideanCheckbox.checked = true;
            manhattanCheckbox.checked = false;
        }
        else {
            euclideanCheckbox.checked = false;
            manhattanCheckbox.checked = true;
        }
    }
    // helper method that sets the selected heuristic internally and also calls the setHeuristicCheckboxed()-method
    setHeuristicDistance(heuristic) {
        distance = heuristic;
        this.setHeuristicCheckboxes();
    }
    // helper method that checks if there are visited nodes in the grid
    checkVisited() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                if (this.nodes[i][j].isActuallyVisited && this.nodes[i][j].isShortestPath)
                    return true;
            }
        }
        return false;
    }
    // same helper method as above but for the A*-algorithm
    checkClosed() {
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = 0; j < this.nodes[i].length; j++) {
                if (this.nodes[i][j].closed)
                    return true;
            }
        }
        return false;
    }
    // checks if the given algorithm found the final node
    checkIfFound(visitedNodes) {
        if (visitedNodes.length == 0) {
            return false;
        }
        else if (visitedNodes[visitedNodes.length - 1].isEnd) {
            return true;
        }
        else {
            return false;
        }
    }
    // toggles the side menu at right-hand side of the screen when the viewports width is getting smaller and a burger menu appears
    toggleSlideMenu() {
        const slideMenu = document.querySelector('.slideMenu');
        const burger = document.querySelector('.burger');
        slideMenu.classList.toggle('slideMenu-active');
        burger.classList.toggle('toggle');
        console.log(slideMenu.classList);
    }
}
GridComponent.ɵfac = function GridComponent_Factory(t) { return new (t || GridComponent)(); };
GridComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GridComponent, selectors: [["app-grid"]], decls: 128, vars: 1, consts: [["href", "#", 1, "title"], [1, "titleName"], [1, "nav-links"], [1, "algorithms"], [1, "dropdown"], [1, "dropbtn"], [1, "dropdown-content"], ["href", "#", 3, "click"], [1, "maze"], ["href", "#"], [1, "visualize"], ["id", "btn-visualize", 1, "btn-visualize", 3, "click"], [1, "clearBoard"], ["id", "btn-clearBoard", 1, "btn-clearBoard", 3, "click"], [1, "clearWalls"], ["id", "btn-clearWalls", 1, "btn-clearWalls", 3, "click"], [1, "speed"], [1, "burger", 3, "click"], [1, "line1"], [1, "line2"], [1, "line3"], [1, "slideMenu"], [1, "navLinks"], [1, "slideMenuTitle"], [1, "item", 3, "click"], [1, "item"], [1, "slideMenuVisualize", 3, "click"], [1, "slideMenuClear", 3, "click"], [1, "options"], [1, "options-container"], [1, "stats"], ["id", "showProcess", "type", "checkbox", 3, "click"], ["for", "checkbox", 1, "checkboxLabel"], ["id", "euclidean", "type", "checkbox", 3, "click"], ["id", "visitedNodesStats"], ["id", "visitedNodes"], ["id", "bidirectional", "type", "checkbox"], ["id", "manhattan", "type", "checkbox", 3, "click"], ["id", "shortestPathStats"], ["id", "shortestPath"], [1, "grid-container"], [1, "grid"], [4, "ngFor", "ngForOf"], ["draggable", "false", 3, "mousedown", "mouseenter", "mouseleave", "mouseup", 4, "ngFor", "ngForOf"], ["draggable", "false", 3, "mousedown", "mouseenter", "mouseleave", "mouseup"], ["id", "node.id", 3, "ngClass"]], template: function GridComponent_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Algorithms \u2B9F");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_11_listener() { return ctx.setPathfindingAlgorithm("Dijkstra"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Dijkstra");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_13_listener() { return ctx.setPathfindingAlgorithm("A*"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "A*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_15_listener() { return ctx.setPathfindingAlgorithm("Alt-Dijkstra"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Alt-Dijkstra");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Mazes \u2B9F");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_22_listener() { return ctx.visualizeMazeAlgorithm(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_27_listener() { return ctx.checkAlgorithm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Visualize!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_30_listener() { return ctx.clearBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Clear Board");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_button_click_33_listener() { return ctx.clearWalls(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Clear Walls");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "li", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Speed of Animation \u2B9F");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_40_listener() { return ctx.setSpeed("Very Fast"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Very Fast");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_42_listener() { return ctx.setSpeed("Fast"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Fast");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_44_listener() { return ctx.setSpeed("Normal"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Normal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_46_listener() { return ctx.setSpeed("Slow"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Slow");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_a_click_48_listener() { return ctx.setSpeed("Very Slow"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Very Slow");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_div_click_50_listener() { return ctx.toggleSlideMenu(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_58_listener() { return ctx.setPathfindingAlgorithm("Dijkstra"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Dijkstra");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_60_listener() { return ctx.setPathfindingAlgorithm("A*"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "A*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_62_listener() { return ctx.setPathfindingAlgorithm("Alt-Dijkstra"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Alt-Dijkstra");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "li", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Mazes");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_66_listener() { return ctx.visualizeMazeAlgorithm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Random Maze");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "li", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "To be continued...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "li", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_70_listener() { return ctx.checkAlgorithm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Visualize");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "li", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_72_listener() { return ctx.clearBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Clear Board");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "li", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_74_listener() { return ctx.clearWalls(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Clear Walls");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "li", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Speed of Animation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_78_listener() { return ctx.setSpeed("Very Fast"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Very Fast");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_80_listener() { return ctx.setSpeed("Fast"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "Fast");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_82_listener() { return ctx.setSpeed("Normal"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "Normal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_84_listener() { return ctx.setSpeed("Slow"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "Slow");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_li_click_86_listener() { return ctx.setSpeed("Very Slow"); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_99_listener() { return ctx.setShowProcessCheckbox(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "label", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "Show Process");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_103_listener() { return ctx.setHeuristicDistance("euclidean"); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GridComponent_Template_input_click_117_listener() { return ctx.setHeuristicDistance("manhattan"); });
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
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](127);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.nodes);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"]], styles: ["header[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: #191f26;\r\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.25);\r\n}\r\nheader[_ngcontent-%COMP%]::after{\r\n  content: '';\r\n  display: table;\r\n  clear: both;\r\n}\r\n.title[_ngcontent-%COMP%]{\r\n  font-size: 2em;\r\n  color: rgb(226, 226, 226);\r\n  text-transform: uppercase;\r\n  letter-spacing: 5px;\r\n  cursor: pointer;\r\n  text-decoration: none;\r\n  flex: 1.1;\r\n  margin-left: 1vw;\r\n}\r\nnav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{\r\n  flex: 6;\r\n}\r\n.titleName[_ngcontent-%COMP%]:hover{\r\n  color: #0398f4;\r\n}\r\nnav[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  width: 100%;\r\n  align-items: center;\r\n  min-height: 8.5vh;\r\n}\r\n.nav-links[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  align-items: center;\r\n  list-style: none;\r\n  width: 40%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\nnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n  display: inline-block;\r\n  margin-left: 5.5vw;\r\n}\r\n.burger[_ngcontent-%COMP%]{\r\n  cursor: pointer;\r\n  flex: 1;\r\n  display: none;\r\n}\r\n.burger[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{\r\n  width: 25px;\r\n  height: 3px;\r\n  background-color: rgb(226, 226, 226);\r\n  margin: 5px;\r\n  transition: transform 0.3s ease-out;\r\n}\r\n.toggle[_ngcontent-%COMP%]   .line1[_ngcontent-%COMP%]{\r\n  transform: rotate(-45deg) translate(-5px, 6px);\r\n}\r\n.toggle[_ngcontent-%COMP%]   .line2[_ngcontent-%COMP%]{\r\n  opacity: 0;\r\n}\r\n.toggle[_ngcontent-%COMP%]   .line3[_ngcontent-%COMP%]{\r\n  transform: rotate(45deg) translate(-5px, -6px);\r\n}\r\n.visualize[_ngcontent-%COMP%]{\r\n  justify-content: center;\r\n  padding-left: 20px;\r\n  padding-bottom: 5px;\r\n}\r\nbutton[_ngcontent-%COMP%]{\r\n  color: rgba(226, 226, 226);\r\n  outline: none;\r\n  border: none;\r\n  background-color: transparent;\r\n}\r\nbutton[_ngcontent-%COMP%]:hover{\r\n  color: #0398f4;\r\n}\r\n.btn-visualize[_ngcontent-%COMP%]{\r\n  background-color: #0398f4;\r\n  padding: 10px 10px;\r\n  border-radius: 5px;\r\n  font-size: 1em;\r\n}\r\n.btn-visualize[_ngcontent-%COMP%]:hover{\r\n  color: white !important;\r\n}\r\n.slideMenu[_ngcontent-%COMP%]{\r\n  display: none;\r\n}\r\n\r\n.dropbtn[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n  color: white;\r\n  padding: 16px;\r\n  font-size: 1em;\r\n  border: none;\r\n}\r\n.dropdown[_ngcontent-%COMP%]{\r\n  position: relative;\r\n  display: inline-block;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]{\r\n  display: none;\r\n  position: absolute;\r\n  background-color: #191f26;;\r\n  min-width: 160px;\r\n  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\r\n  z-index: 1;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n  color: white;\r\n  padding: 12px 16px;\r\n  display: block;\r\n  text-decoration: none;\r\n}\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n  background-color: #0398f4;\r\n  color: white;\r\n}\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{\r\n  display: block;\r\n}\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropbtn[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n}\r\n\r\nth[_ngcontent-%COMP%]{\r\n  padding-right: 20vw;\r\n  padding-bottom: 0.5vh;\r\n  color: #0398f4;\r\n}\r\ntd[_ngcontent-%COMP%]{\r\n  border: none;\r\n  padding: 0;\r\n  border-spacing: 0;\r\n}\r\n.options-container[_ngcontent-%COMP%]{\r\n  position: relative;\r\n  left: 20%;\r\n  color: white;\r\n  margin-top: 1vh;\r\n  border-collapse: separate;\r\n  border-spacing: 0;\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]{\r\n  position: relative;\r\n  width: 30px;\r\n  height: 12px;\r\n  -webkit-appearance: none;\r\n  background: linear-gradient(0deg, #222, #000);\r\n  outline: none;\r\n  border-radius: 20px;\r\n  box-shadow: 0 0 0 4px #353535, 0 0 0 5px #3e3e3e, inset 0 0 10px rgba(0, 0, 0, 1), 0 5px 20px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 0, 0, 0.2);\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]{\r\n  background: linear-gradient(0deg, #6dd1ff, #20b7ff);\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]:before{\r\n  content: '';\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0;\r\n  width: 15px;\r\n  height: 11px;\r\n  background: linear-gradient(0deg, #000, #6b6b6b);\r\n  border-radius: 20px;\r\n  box-shadow: 0 0 0 1px #232323;\r\n  transform: scale(0.98, 0.96);\r\n  transition: 0.5s;\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]:before{\r\n  left: 15px;\r\n}\r\ninput[type=\"checkbox\"][_ngcontent-%COMP%]:after{\r\n  content: '';\r\n  position: absolute;\r\n  top: 4px;\r\n  left: 10px;\r\n  width: 3px;\r\n  height: 3px;\r\n  background: linear-gradient(0deg, #6b6b6b, #000);\r\n  border-radius: 50%;\r\n  transition: .5s;\r\n}\r\ninput[_ngcontent-%COMP%]:checked[type=\"checkbox\"]:after{\r\n  background: #63cdff;\r\n  left: 25px;\r\n  box-shadow: 0 0 5px #13b3ff, 0 0 15px #13b3ff;\r\n}\r\n.checkboxLabel[_ngcontent-%COMP%]{\r\n  padding-left: 10px;\r\n}\r\n\r\n.node[_ngcontent-%COMP%]{\r\n    width: 100%;\r\n    height: 2.7vh;\r\n}\r\n\r\n.grid-container[_ngcontent-%COMP%]{\r\n  display: flex;\r\n  margin-top: 1vh;\r\n  margin-left: 1vw;\r\n  margin-right: 1vw;\r\n  padding-bottom: 1.4vh;\r\n}\r\n.grid[_ngcontent-%COMP%]{\r\n  border-collapse: collapse;\r\n  border-spacing: 0;\r\n  width: 100%;\r\n}\r\n.grid[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\r\n  padding: 0;\r\n  border-spacing: 0;\r\n  border: 1px groove white;\r\n}\r\n.isStart[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: startAnimation;\r\n          animation-name: startAnimation;\r\n  -webkit-animation-duration: 0.7s;\r\n          animation-duration: 0.7s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: normal;\r\n          animation-direction: normal;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n  background-color: green;\r\n}\r\n@-webkit-keyframes startAnimation{\r\n  0% {\r\n    transform: scale(0.5);\r\n    background-color: green !important;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.4);\r\n    background-color: green !important;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: green !important;\r\n  }\r\n}\r\n@keyframes startAnimation{\r\n  0% {\r\n    transform: scale(0.5);\r\n    background-color: green !important;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.4);\r\n    background-color: green !important;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: green !important;\r\n  }\r\n}\r\n.isEnd[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: endAnimation;\r\n          animation-name: endAnimation;\r\n  -webkit-animation-duration: 0.7s;\r\n          animation-duration: 0.7s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: normal;\r\n          animation-direction: normal;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n    background-color: red !important;\r\n}\r\n@-webkit-keyframes endAnimation{\r\n  0% {\r\n    transform: scale(0.5);\r\n    background-color: red !important;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.4);\r\n    background-color: red !important;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: red !important;\r\n  }\r\n}\r\n@keyframes endAnimation{\r\n  0% {\r\n    transform: scale(0.5);\r\n    background-color: red !important;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.4);\r\n    background-color: red !important;\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: red !important;\r\n  }\r\n}\r\n.isWall[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: wallAnimation;\r\n          animation-name: wallAnimation;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: normal;\r\n          animation-direction: normal;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes wallAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: rgb(226, 226, 226);\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.3);\r\n    background-color: rgb(226, 226, 226);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgb(226, 226, 226);\r\n  }\r\n}\r\n@keyframes wallAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: rgb(226, 226, 226);\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.3);\r\n    background-color: rgb(226, 226, 226);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgb(226, 226, 226);\r\n  }\r\n}\r\n.isVisited[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: visitedAnimation;\r\n          animation-name: visitedAnimation;\r\n  -webkit-animation-duration: 1.5s;\r\n          animation-duration: 1.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: alternate;\r\n          animation-direction: alternate;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes visitedAnimation {\r\n  0% {\r\n    transform: scale(0.3);\r\n    background-color: rgba(0, 217, 159, 0.75);\r\n    border-radius: 100%;\r\n  }\r\n\r\n  50% {\r\n    background-color: rgba(0, 190, 218, 0.75);\r\n  }\r\n\r\n  75% {\r\n    transform: scale(1.2);\r\n    background-color: rgba(17, 104, 217, 0.75);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgba(0, 54, 85, 0.75);\r\n  }\r\n}\r\n@keyframes visitedAnimation {\r\n  0% {\r\n    transform: scale(0.3);\r\n    background-color: rgba(0, 217, 159, 0.75);\r\n    border-radius: 100%;\r\n  }\r\n\r\n  50% {\r\n    background-color: rgba(0, 190, 218, 0.75);\r\n  }\r\n\r\n  75% {\r\n    transform: scale(1.2);\r\n    background-color: rgba(17, 104, 217, 0.75);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: rgba(0, 54, 85, 0.75);\r\n  }\r\n}\r\n.isShortestPath[_ngcontent-%COMP%]{\r\n  -webkit-animation-name: shortestPathAnimation;\r\n          animation-name: shortestPathAnimation;\r\n  -webkit-animation-duration: 1.5s;\r\n          animation-duration: 1.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n  -webkit-animation-delay: 0;\r\n          animation-delay: 0;\r\n  -webkit-animation-direction: alternate;\r\n          animation-direction: alternate;\r\n  -webkit-animation-iteration-count: 1;\r\n          animation-iteration-count: 1;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\r\n  -webkit-animation-play-state: running;\r\n          animation-play-state: running;\r\n}\r\n@-webkit-keyframes shortestPathAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: yellow;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.2);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: yellow;\r\n  }\r\n}\r\n@keyframes shortestPathAnimation {\r\n  0% {\r\n    transform: scale(0.6);\r\n    background-color: yellow;\r\n  }\r\n\r\n  50% {\r\n    transform: scale(1.2);\r\n  }\r\n\r\n  100% {\r\n    transform: scale(1);\r\n    background-color: yellow;\r\n  }\r\n}\r\n@media screen and (max-width: 1180px){\r\n  .nav-links[_ngcontent-%COMP%]{\r\n    display: none;\r\n  }\r\n  \r\n  .burger[_ngcontent-%COMP%]{\r\n    display: block;\r\n    flex: 0.1;\r\n  }\r\n\r\n  .burger[_ngcontent-%COMP%]:hover{\r\n    color: #0398f4;\r\n  }\r\n\r\n  .slideMenu[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    right: 0px;\r\n    height: 100%;\r\n    top: 8.5vh;\r\n    background-color: #191f26;;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 50%;\r\n    transform: translateX(100%);\r\n    z-index: 2; \r\n    overflow-x: hidden;\r\n    transition: transform 0.5s ease-in;\r\n    color: rgba(226, 226, 226);\r\n    overflow-y: hidden;\r\n  }\r\n\r\n  .navLinks[_ngcontent-%COMP%]{\r\n    list-style: none;\r\n  }\r\n\r\n  .slideMenuTitle[_ngcontent-%COMP%]{\r\n    font-size: 20px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 5px;\r\n    padding: 20px 0 20px 0;\r\n    color: #0398f4;\r\n  }\r\n\r\n  .slideMenuClear[_ngcontent-%COMP%]{\r\n    font-size: 20px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 5px;\r\n    padding: 20px 0 20px 0;\r\n    color: #0398f4;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .slideMenuClear[_ngcontent-%COMP%]:hover{\r\n    transform: translateX(2%);\r\n    transition: transform 0.3s ease-out;\r\n    color: #00568b;\r\n  }\r\n\r\n  .item[_ngcontent-%COMP%]{\r\n    padding: 3px;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .slideMenuVisualize[_ngcontent-%COMP%]{\r\n    font-size: 20px;\r\n    text-transform: uppercase;\r\n    letter-spacing: 5px;\r\n    padding: 20px 0 20px 0;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .slideMenuVisualize[_ngcontent-%COMP%]:hover{\r\n    transform: translateX(2%);\r\n    transition: transform 0.3s ease-out;\r\n    color: #0398f4;\r\n  }\r\n\r\n  .item[_ngcontent-%COMP%]:hover{\r\n    transform: translateX(2%);\r\n    transition: transform 0.3s ease-out;\r\n    color: #0398f4;\r\n  }\r\n}\r\n.slideMenu-active[_ngcontent-%COMP%]{\r\n  transform: translateX(0%);\r\n}\r\n@media screen and (max-width: 760px){\r\n  .options-container[_ngcontent-%COMP%]{\r\n    left: 1%;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZ3JpZC9ncmlkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVztBQUNYO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsWUFBWTtFQUNaLHlCQUF5QjtFQUN6Qix1RUFBdUU7QUFDekU7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0VBQ2QsV0FBVztBQUNiO0FBRUE7RUFDRSxjQUFjO0VBQ2QseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLHFCQUFxQjtFQUNyQixTQUFTO0VBQ1QsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxPQUFPO0FBQ1Q7QUFFQTtFQUNFLGNBQWM7QUFDaEI7QUFFQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxVQUFVO0FBQ1o7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7QUFDcEI7QUFFQTtFQUNFLGVBQWU7RUFDZixPQUFPO0VBQ1AsYUFBYTtBQUNmO0FBRUE7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLG9DQUFvQztFQUNwQyxXQUFXO0VBQ1gsbUNBQW1DO0FBQ3JDO0FBRUE7RUFDRSw4Q0FBOEM7QUFDaEQ7QUFFQTtFQUNFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsOENBQThDO0FBQ2hEO0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjtBQUVBO0VBQ0UsMEJBQTBCO0VBQzFCLGFBQWE7RUFDYixZQUFZO0VBQ1osNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCO0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7QUFFQTtFQUNFLGFBQWE7QUFDZjtBQUVBLGFBQWE7QUFFYjtFQUNFLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQiwrQ0FBK0M7RUFDL0MsVUFBVTtBQUNaO0FBRUE7RUFDRSxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxxQkFBcUI7QUFDdkI7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixZQUFZO0FBQ2Q7QUFFQTtFQUNFLGNBQWM7QUFDaEI7QUFFQTtFQUNFLDZCQUE2QjtBQUMvQjtBQUVBLFlBQVk7QUFFWjtFQUNFLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsY0FBYztBQUNoQjtBQUVBO0VBQ0UsWUFBWTtFQUNaLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsWUFBWTtFQUNaLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25CO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWix3QkFBd0I7RUFDeEIsNkNBQTZDO0VBQzdDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUpBQW1KO0FBQ3JKO0FBRUE7RUFDRSxtREFBbUQ7QUFDckQ7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLGdEQUFnRDtFQUNoRCxtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLDRCQUE0QjtFQUM1QixnQkFBZ0I7QUFDbEI7QUFFQTtFQUNFLFVBQVU7QUFDWjtBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsVUFBVTtFQUNWLFVBQVU7RUFDVixXQUFXO0VBQ1gsZ0RBQWdEO0VBQ2hELGtCQUFrQjtFQUNsQixlQUFlO0FBQ2pCO0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLDZDQUE2QztBQUMvQztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBR0EsU0FBUztBQUNUO0lBQ0ksV0FBVztJQUNYLGFBQWE7QUFDakI7QUFFQSxlQUFlO0FBQ2Y7RUFDRSxhQUFhO0VBQ2IsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIscUJBQXFCO0FBQ3ZCO0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsaUJBQWlCO0VBQ2pCLFdBQVc7QUFDYjtBQUVBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtFQUNqQix3QkFBd0I7QUFDMUI7QUFFQTtFQUNFLHNDQUE4QjtVQUE5Qiw4QkFBOEI7RUFDOUIsZ0NBQXdCO1VBQXhCLHdCQUF3QjtFQUN4QiwyQ0FBbUM7VUFBbkMsbUNBQW1DO0VBQ25DLDBCQUFrQjtVQUFsQixrQkFBa0I7RUFDbEIsbUNBQTJCO1VBQTNCLDJCQUEyQjtFQUMzQixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3Qix1QkFBdUI7QUFDekI7QUFFQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLGtDQUFrQztFQUNwQzs7RUFFQTtJQUNFLHFCQUFxQjtJQUNyQixrQ0FBa0M7RUFDcEM7O0VBRUE7SUFDRSxtQkFBbUI7SUFDbkIsa0NBQWtDO0VBQ3BDO0FBQ0Y7QUFmQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLGtDQUFrQztFQUNwQzs7RUFFQTtJQUNFLHFCQUFxQjtJQUNyQixrQ0FBa0M7RUFDcEM7O0VBRUE7SUFDRSxtQkFBbUI7SUFDbkIsa0NBQWtDO0VBQ3BDO0FBQ0Y7QUFFQTtFQUNFLG9DQUE0QjtVQUE1Qiw0QkFBNEI7RUFDNUIsZ0NBQXdCO1VBQXhCLHdCQUF3QjtFQUN4QiwyQ0FBbUM7VUFBbkMsbUNBQW1DO0VBQ25DLDBCQUFrQjtVQUFsQixrQkFBa0I7RUFDbEIsbUNBQTJCO1VBQTNCLDJCQUEyQjtFQUMzQixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IscUNBQTZCO1VBQTdCLDZCQUE2QjtJQUMzQixnQ0FBZ0M7QUFDcEM7QUFFQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLGdDQUFnQztFQUNsQzs7RUFFQTtJQUNFLHFCQUFxQjtJQUNyQixnQ0FBZ0M7RUFDbEM7O0VBRUE7SUFDRSxtQkFBbUI7SUFDbkIsZ0NBQWdDO0VBQ2xDO0FBQ0Y7QUFmQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLGdDQUFnQztFQUNsQzs7RUFFQTtJQUNFLHFCQUFxQjtJQUNyQixnQ0FBZ0M7RUFDbEM7O0VBRUE7SUFDRSxtQkFBbUI7SUFDbkIsZ0NBQWdDO0VBQ2xDO0FBQ0Y7QUFFQTtFQUNFLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IsZ0NBQXdCO1VBQXhCLHdCQUF3QjtFQUN4QiwyQ0FBbUM7VUFBbkMsbUNBQW1DO0VBQ25DLDBCQUFrQjtVQUFsQixrQkFBa0I7RUFDbEIsbUNBQTJCO1VBQTNCLDJCQUEyQjtFQUMzQixvQ0FBNEI7VUFBNUIsNEJBQTRCO0VBQzVCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7RUFDN0IscUNBQTZCO1VBQTdCLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsb0NBQW9DO0VBQ3RDOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLG9DQUFvQztFQUN0Qzs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQixvQ0FBb0M7RUFDdEM7QUFDRjtBQWZBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsb0NBQW9DO0VBQ3RDOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLG9DQUFvQztFQUN0Qzs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQixvQ0FBb0M7RUFDdEM7QUFDRjtBQUVBO0VBQ0Usd0NBQWdDO1VBQWhDLGdDQUFnQztFQUNoQyxnQ0FBd0I7VUFBeEIsd0JBQXdCO0VBQ3hCLDJDQUFtQztVQUFuQyxtQ0FBbUM7RUFDbkMsMEJBQWtCO1VBQWxCLGtCQUFrQjtFQUNsQixzQ0FBOEI7VUFBOUIsOEJBQThCO0VBQzlCLG9DQUE0QjtVQUE1Qiw0QkFBNEI7RUFDNUIscUNBQTZCO1VBQTdCLDZCQUE2QjtFQUM3QixxQ0FBNkI7VUFBN0IsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRTtJQUNFLHFCQUFxQjtJQUNyQix5Q0FBeUM7SUFDekMsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UseUNBQXlDO0VBQzNDOztFQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLDBDQUEwQztFQUM1Qzs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQix1Q0FBdUM7RUFDekM7QUFDRjtBQXBCQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLHlDQUF5QztJQUN6QyxtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSx5Q0FBeUM7RUFDM0M7O0VBRUE7SUFDRSxxQkFBcUI7SUFDckIsMENBQTBDO0VBQzVDOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHVDQUF1QztFQUN6QztBQUNGO0FBRUE7RUFDRSw2Q0FBcUM7VUFBckMscUNBQXFDO0VBQ3JDLGdDQUF3QjtVQUF4Qix3QkFBd0I7RUFDeEIsMkNBQW1DO1VBQW5DLG1DQUFtQztFQUNuQywwQkFBa0I7VUFBbEIsa0JBQWtCO0VBQ2xCLHNDQUE4QjtVQUE5Qiw4QkFBOEI7RUFDOUIsb0NBQTRCO1VBQTVCLDRCQUE0QjtFQUM1QixxQ0FBNkI7VUFBN0IsNkJBQTZCO0VBQzdCLHFDQUE2QjtVQUE3Qiw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFO0lBQ0UscUJBQXFCO0lBQ3JCLHdCQUF3QjtFQUMxQjs7RUFFQTtJQUNFLHFCQUFxQjtFQUN2Qjs7RUFFQTtJQUNFLG1CQUFtQjtJQUNuQix3QkFBd0I7RUFDMUI7QUFDRjtBQWRBO0VBQ0U7SUFDRSxxQkFBcUI7SUFDckIsd0JBQXdCO0VBQzFCOztFQUVBO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBO0lBQ0UsbUJBQW1CO0lBQ25CLHdCQUF3QjtFQUMxQjtBQUNGO0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGNBQWM7SUFDZCxTQUFTO0VBQ1g7O0VBRUE7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0Usa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixZQUFZO0lBQ1osVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsMkJBQTJCO0lBQzNCLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsa0NBQWtDO0lBQ2xDLDBCQUEwQjtJQUMxQixrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7O0VBRUE7SUFDRSxlQUFlO0lBQ2YseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsY0FBYztFQUNoQjs7RUFFQTtJQUNFLGVBQWU7SUFDZix5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLHlCQUF5QjtJQUN6QixtQ0FBbUM7SUFDbkMsY0FBYztFQUNoQjs7RUFFQTtJQUNFLFlBQVk7SUFDWixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGVBQWU7RUFDakI7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIsbUNBQW1DO0lBQ25DLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSx5QkFBeUI7SUFDekIsbUNBQW1DO0lBQ25DLGNBQWM7RUFDaEI7QUFDRjtBQUVBO0VBQ0UseUJBQXlCO0FBQzNCO0FBRUE7RUFDRTtJQUNFLFFBQVE7RUFDVjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvZ3JpZC9ncmlkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBOQVZCQVIgKi9cclxuaGVhZGVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE5MWYyNjtcclxuICBib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcclxufVxyXG5cclxuaGVhZGVyOjphZnRlcntcclxuICBjb250ZW50OiAnJztcclxuICBkaXNwbGF5OiB0YWJsZTtcclxuICBjbGVhcjogYm90aDtcclxufVxyXG5cclxuLnRpdGxle1xyXG4gIGZvbnQtc2l6ZTogMmVtO1xyXG4gIGNvbG9yOiByZ2IoMjI2LCAyMjYsIDIyNik7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBsZXR0ZXItc3BhY2luZzogNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgZmxleDogMS4xO1xyXG4gIG1hcmdpbi1sZWZ0OiAxdnc7XHJcbn1cclxuXHJcbm5hdiB1bHtcclxuICBmbGV4OiA2O1xyXG59XHJcblxyXG4udGl0bGVOYW1lOmhvdmVye1xyXG4gIGNvbG9yOiAjMDM5OGY0O1xyXG59XHJcblxyXG5uYXZ7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICB3aWR0aDogMTAwJTtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1pbi1oZWlnaHQ6IDguNXZoO1xyXG59XHJcblxyXG4ubmF2LWxpbmtze1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG4gIHdpZHRoOiA0MCU7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbm5hdiBsaXtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgbWFyZ2luLWxlZnQ6IDUuNXZ3O1xyXG59XHJcblxyXG4uYnVyZ2Vye1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmbGV4OiAxO1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5idXJnZXIgZGl2e1xyXG4gIHdpZHRoOiAyNXB4O1xyXG4gIGhlaWdodDogM3B4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDIyNiwgMjI2KTtcclxuICBtYXJnaW46IDVweDtcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLW91dDtcclxufVxyXG5cclxuLnRvZ2dsZSAubGluZTF7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKSB0cmFuc2xhdGUoLTVweCwgNnB4KTtcclxufVxyXG5cclxuLnRvZ2dsZSAubGluZTJ7XHJcbiAgb3BhY2l0eTogMDtcclxufVxyXG5cclxuLnRvZ2dsZSAubGluZTN7XHJcbiAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpIHRyYW5zbGF0ZSgtNXB4LCAtNnB4KTtcclxufVxyXG5cclxuLnZpc3VhbGl6ZXtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDVweDtcclxufVxyXG5cclxuYnV0dG9ue1xyXG4gIGNvbG9yOiByZ2JhKDIyNiwgMjI2LCAyMjYpO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5idXR0b246aG92ZXJ7XHJcbiAgY29sb3I6ICMwMzk4ZjQ7XHJcbn1cclxuXHJcbi5idG4tdmlzdWFsaXple1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzk4ZjQ7XHJcbiAgcGFkZGluZzogMTBweCAxMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBmb250LXNpemU6IDFlbTtcclxufVxyXG5cclxuLmJ0bi12aXN1YWxpemU6aG92ZXJ7XHJcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5zbGlkZU1lbnV7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLyogRFJPUERPV04gKi9cclxuXHJcbi5kcm9wYnRue1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG4gIGJvcmRlcjogbm9uZTtcclxufVxyXG5cclxuLmRyb3Bkb3due1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1jb250ZW50e1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxOTFmMjY7O1xyXG4gIG1pbi13aWR0aDogMTYwcHg7XHJcbiAgYm94LXNoYWRvdzogMHB4IDhweCAxNnB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnQgYXtcclxuICBjb2xvcjogd2hpdGU7XHJcbiAgcGFkZGluZzogMTJweCAxNnB4O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnQgYTpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5OGY0O1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmRyb3Bkb3duOmhvdmVyIC5kcm9wZG93bi1jb250ZW50e1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXIgLmRyb3BidG57XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi8qIE9QVElPTlMgKi9cclxuXHJcbnRoe1xyXG4gIHBhZGRpbmctcmlnaHQ6IDIwdnc7XHJcbiAgcGFkZGluZy1ib3R0b206IDAuNXZoO1xyXG4gIGNvbG9yOiAjMDM5OGY0O1xyXG59XHJcblxyXG50ZHtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgcGFkZGluZzogMDtcclxuICBib3JkZXItc3BhY2luZzogMDtcclxufVxyXG5cclxuLm9wdGlvbnMtY29udGFpbmVye1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBsZWZ0OiAyMCU7XHJcbiAgY29sb3I6IHdoaXRlO1xyXG4gIG1hcmdpbi10b3A6IDF2aDtcclxuICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiY2hlY2tib3hcIl17XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIGhlaWdodDogMTJweDtcclxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICMyMjIsICMwMDApO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICBib3gtc2hhZG93OiAwIDAgMCA0cHggIzM1MzUzNSwgMCAwIDAgNXB4ICMzZTNlM2UsIGluc2V0IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMSksIDAgNXB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjUpLCBpbnNldCAwIDAgMTVweCByZ2JhKDAsIDAsIDAsIDAuMik7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWRbdHlwZT1cImNoZWNrYm94XCJde1xyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgwZGVnLCAjNmRkMWZmLCAjMjBiN2ZmKTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmJlZm9yZXtcclxuICBjb250ZW50OiAnJztcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwcHg7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTVweDtcclxuICBoZWlnaHQ6IDExcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICMwMDAsICM2YjZiNmIpO1xyXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgYm94LXNoYWRvdzogMCAwIDAgMXB4ICMyMzIzMjM7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4LCAwLjk2KTtcclxuICB0cmFuc2l0aW9uOiAwLjVzO1xyXG59XHJcblxyXG5pbnB1dDpjaGVja2VkW3R5cGU9XCJjaGVja2JveFwiXTpiZWZvcmV7XHJcbiAgbGVmdDogMTVweDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdOmFmdGVye1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDRweDtcclxuICBsZWZ0OiAxMHB4O1xyXG4gIHdpZHRoOiAzcHg7XHJcbiAgaGVpZ2h0OiAzcHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDBkZWcsICM2YjZiNmIsICMwMDApO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICB0cmFuc2l0aW9uOiAuNXM7XHJcbn1cclxuXHJcbmlucHV0OmNoZWNrZWRbdHlwZT1cImNoZWNrYm94XCJdOmFmdGVye1xyXG4gIGJhY2tncm91bmQ6ICM2M2NkZmY7XHJcbiAgbGVmdDogMjVweDtcclxuICBib3gtc2hhZG93OiAwIDAgNXB4ICMxM2IzZmYsIDAgMCAxNXB4ICMxM2IzZmY7XHJcbn1cclxuXHJcbi5jaGVja2JveExhYmVse1xyXG4gIHBhZGRpbmctbGVmdDogMTBweDtcclxufVxyXG5cclxuXHJcbi8qIEdSSUQgKi9cclxuLm5vZGV7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMi43dmg7XHJcbn1cclxuXHJcbi8qIEdSSUQtVEFCTEUgKi9cclxuLmdyaWQtY29udGFpbmVye1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgbWFyZ2luLXRvcDogMXZoO1xyXG4gIG1hcmdpbi1sZWZ0OiAxdnc7XHJcbiAgbWFyZ2luLXJpZ2h0OiAxdnc7XHJcbiAgcGFkZGluZy1ib3R0b206IDEuNHZoO1xyXG59XHJcblxyXG4uZ3JpZHtcclxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZ3JpZCB0ZHtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xyXG4gIGJvcmRlcjogMXB4IGdyb292ZSB3aGl0ZTtcclxufVxyXG5cclxuLmlzU3RhcnR7XHJcbiAgYW5pbWF0aW9uLW5hbWU6IHN0YXJ0QW5pbWF0aW9uO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC43cztcclxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxuICBhbmltYXRpb24tZGVsYXk6IDA7XHJcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogbm9ybWFsO1xyXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XHJcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3RhcnRBbmltYXRpb257XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW4gIWltcG9ydGFudDtcclxuICB9XHJcblxyXG4gIDUwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbiAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW4gIWltcG9ydGFudDtcclxuICB9XHJcbn1cclxuXHJcbi5pc0VuZHtcclxuICBhbmltYXRpb24tbmFtZTogZW5kQW5pbWF0aW9uO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMC43cztcclxuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxuICBhbmltYXRpb24tZGVsYXk6IDA7XHJcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogbm9ybWFsO1xyXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDE7XHJcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHJcbiAgYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQgIWltcG9ydGFudDtcclxufVxyXG5cclxuQGtleWZyYW1lcyBlbmRBbmltYXRpb257XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAxMDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQgIWltcG9ydGFudDtcclxuICB9XHJcbn1cclxuXHJcbi5pc1dhbGx7XHJcbiAgYW5pbWF0aW9uLW5hbWU6IHdhbGxBbmltYXRpb247XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjRzO1xyXG4gIGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMDtcclxuICBhbmltYXRpb24tZGlyZWN0aW9uOiBub3JtYWw7XHJcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMTtcclxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcclxuICBhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZztcclxufVxyXG5cclxuQGtleWZyYW1lcyB3YWxsQW5pbWF0aW9uIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2LCAyMjYsIDIyNik7XHJcbiAgfVxyXG5cclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjMpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNiwgMjI2LCAyMjYpO1xyXG4gIH1cclxuXHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIyNiwgMjI2LCAyMjYpO1xyXG4gIH1cclxufVxyXG5cclxuLmlzVmlzaXRlZHtcclxuICBhbmltYXRpb24tbmFtZTogdmlzaXRlZEFuaW1hdGlvbjtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XHJcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAwO1xyXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcclxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHZpc2l0ZWRBbmltYXRpb24ge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4zKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMjE3LCAxNTksIDAuNzUpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwJTtcclxuICB9XHJcblxyXG4gIDUwJSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDE5MCwgMjE4LCAwLjc1KTtcclxuICB9XHJcblxyXG4gIDc1JSB7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMik7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE3LCAxMDQsIDIxNywgMC43NSk7XHJcbiAgfVxyXG5cclxuICAxMDAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDU0LCA4NSwgMC43NSk7XHJcbiAgfVxyXG59XHJcblxyXG4uaXNTaG9ydGVzdFBhdGh7XHJcbiAgYW5pbWF0aW9uLW5hbWU6IHNob3J0ZXN0UGF0aEFuaW1hdGlvbjtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XHJcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAwO1xyXG4gIGFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcclxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxO1xyXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xyXG4gIGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNob3J0ZXN0UGF0aEFuaW1hdGlvbiB7XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xyXG4gIH1cclxuXHJcbiAgNTAlIHtcclxuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcclxuICB9XHJcblxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDExODBweCl7XHJcbiAgLm5hdi1saW5rc3tcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIFxyXG4gIC5idXJnZXJ7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIGZsZXg6IDAuMTtcclxuICB9XHJcblxyXG4gIC5idXJnZXI6aG92ZXJ7XHJcbiAgICBjb2xvcjogIzAzOThmNDtcclxuICB9XHJcblxyXG4gIC5zbGlkZU1lbnV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICByaWdodDogMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgdG9wOiA4LjV2aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxOTFmMjY7O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcclxuICAgIHotaW5kZXg6IDI7IFxyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXMgZWFzZS1pbjtcclxuICAgIGNvbG9yOiByZ2JhKDIyNiwgMjI2LCAyMjYpO1xyXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gIH1cclxuXHJcbiAgLm5hdkxpbmtze1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICB9XHJcblxyXG4gIC5zbGlkZU1lbnVUaXRsZXtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogNXB4O1xyXG4gICAgcGFkZGluZzogMjBweCAwIDIwcHggMDtcclxuICAgIGNvbG9yOiAjMDM5OGY0O1xyXG4gIH1cclxuXHJcbiAgLnNsaWRlTWVudUNsZWFye1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICAgIGxldHRlci1zcGFjaW5nOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAyMHB4IDAgMjBweCAwO1xyXG4gICAgY29sb3I6ICMwMzk4ZjQ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgfVxyXG5cclxuICAuc2xpZGVNZW51Q2xlYXI6aG92ZXJ7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMiUpO1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQ7XHJcbiAgICBjb2xvcjogIzAwNTY4YjtcclxuICB9XHJcblxyXG4gIC5pdGVte1xyXG4gICAgcGFkZGluZzogM3B4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLnNsaWRlTWVudVZpc3VhbGl6ZXtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogNXB4O1xyXG4gICAgcGFkZGluZzogMjBweCAwIDIwcHggMDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC5zbGlkZU1lbnVWaXN1YWxpemU6aG92ZXJ7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMiUpO1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1vdXQ7XHJcbiAgICBjb2xvcjogIzAzOThmNDtcclxuICB9XHJcblxyXG4gIC5pdGVtOmhvdmVye1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIlKTtcclxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2Utb3V0O1xyXG4gICAgY29sb3I6ICMwMzk4ZjQ7XHJcbiAgfVxyXG59XHJcblxyXG4uc2xpZGVNZW51LWFjdGl2ZXtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCUpO1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjBweCl7XHJcbiAgLm9wdGlvbnMtY29udGFpbmVye1xyXG4gICAgbGVmdDogMSU7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GridComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-grid',
                templateUrl: './grid.component.html',
                styleUrls: ['./grid.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/*!********************************************!*\
  !*** ./src/app/navbar/navbar.component.ts ***!
  \********************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class NavbarComponent {
    constructor() { }
    ngOnInit() {
    }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(); };
NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], decls: 35, vars: 0, consts: [[1, "navbar-container"], [1, "title"], [1, "navmenu-brand"], [1, "algorithms"], [1, "dropdown"], [1, "dropbtn"], [1, "dropdown-content"], ["href", "#"], [1, "maze"], [1, "addBomb"], [1, "btn-addBomb"], [1, "visualize"], [1, "btn-visualize"], [1, "clearBoard"], [1, "btn-clearBoard"], [1, "clearWalls"], [1, "btn-clearWalls"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
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
    } }, styles: [".navbar-container[_ngcontent-%COMP%]{\r\n    width: 80%;\r\n    margin: 0 auto;\r\n}\r\n\r\n.title[_ngcontent-%COMP%]{\r\n    font-size: 30px;\r\n    float: left;\r\n    margin-left: -180px;\r\n    margin-top: 5px;\r\n    color: white;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{\r\n    display: inline-block;\r\n    margin-left: 70px;\r\n}\r\n\r\n.algorithms[_ngcontent-%COMP%]{\r\n    margin-right: -50px;\r\n}\r\n\r\n.maze[_ngcontent-%COMP%]{\r\n    margin-right: -50px;\r\n}\r\n\r\n.btn-addBomb[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n    border: none;\r\n    color: white;\r\n    margin-right: 50px;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]{\r\n    color: white;\r\n    border: none;\r\n    background-color: transparent;\r\n}\r\n\r\nbutton[_ngcontent-%COMP%]:hover{\r\n    color: #0398f4;\r\n}\r\n\r\n.visualize[_ngcontent-%COMP%]{\r\n    margin-right: 50px;\r\n}\r\n\r\n.btn-visualize[_ngcontent-%COMP%]{\r\n    background-color: #0398f4 !important;\r\n    padding: 10px 10px;\r\n    border-radius: 5px;\r\n}\r\n\r\n.btn-visualize[_ngcontent-%COMP%]:hover{\r\n    color: white !important;\r\n}\r\n\r\n.clearBoard[_ngcontent-%COMP%]{\r\n    margin-right: -30px;\r\n}\r\n\r\n.dropbtn[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n    color: white;\r\n    padding: 16px;\r\n    font-size: 16px;\r\n    border: none;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]{\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n.dropdown-content[_ngcontent-%COMP%]{\r\n    display: none;\r\n    position: absolute;\r\n    background-color: #333;\r\n    min-width: 160px;\r\n    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n}\r\n\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: white;\r\n    padding: 12px 16px;\r\n    display: block;\r\n    text-decoration: none;\r\n}\r\n\r\n.dropdown-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{\r\n    background-color: #222;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropdown-content[_ngcontent-%COMP%]{\r\n    display: block;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropbtn[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksVUFBVTtJQUNWLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsV0FBVztJQUNYLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLDZCQUE2QjtJQUM3QixZQUFZO0lBQ1osWUFBWTtJQUNaLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCLCtDQUErQztJQUMvQyxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksNkJBQTZCO0FBQ2pDIiwiZmlsZSI6InNyYy9hcHAvbmF2YmFyL25hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdmJhci1jb250YWluZXJ7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi50aXRsZXtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC0xODBweDtcclxuICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxubmF2IHVse1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbn1cclxuXHJcbm5hdiBsaXtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbi1sZWZ0OiA3MHB4O1xyXG59XHJcblxyXG4uYWxnb3JpdGhtc3tcclxuICAgIG1hcmdpbi1yaWdodDogLTUwcHg7XHJcbn1cclxuXHJcbi5tYXple1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAtNTBweDtcclxufVxyXG5cclxuLmJ0bi1hZGRCb21ie1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbmJ1dHRvbntcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG5idXR0b246aG92ZXJ7XHJcbiAgICBjb2xvcjogIzAzOThmNDtcclxufVxyXG5cclxuLnZpc3VhbGl6ZXtcclxuICAgIG1hcmdpbi1yaWdodDogNTBweDtcclxufVxyXG5cclxuLmJ0bi12aXN1YWxpemV7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5OGY0ICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5idG4tdmlzdWFsaXplOmhvdmVye1xyXG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5jbGVhckJvYXJke1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAtMzBweDtcclxufVxyXG5cclxuLmRyb3BidG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbn1cclxuXHJcbi5kcm9wZG93bntcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnR7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgIG1pbi13aWR0aDogMTYwcHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggOHB4IDE2cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcclxuICAgIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5kcm9wZG93bi1jb250ZW50IGF7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLmRyb3Bkb3duLWNvbnRlbnQgYTpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI7XHJcbn1cclxuXHJcbi5kcm9wZG93bjpob3ZlciAuZHJvcGRvd24tY29udGVudHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXIgLmRyb3BidG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavbarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-navbar',
                templateUrl: './navbar.component.html',
                styleUrls: ['./navbar.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
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


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/models/node.ts":
/*!****************************!*\
  !*** ./src/models/node.ts ***!
  \****************************/
/*! exports provided: Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
class Node {
    constructor(id, isStart, isEnd, isWall, isVisited, row, column) {
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
    }
}


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\PROGGERS\Pathfinding-Visualizer\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map