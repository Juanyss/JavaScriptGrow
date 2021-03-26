//All posible node connections
//Give it for the chapter challenge
const roads = ["Alice's House-Bob's House",
               "Alice's House-Cabin",
               "Alice's House-Post Office",
               "Bob's House-Town Hall",
               "Daria's House-Ernie's House",
               "Daria's House-Town Hall",
               "Ernie's House-Grete's House",
               "Grete's House-Farm","Grete's House-Shop",
               "Marketplace-Farm",
               "Marketplace-Post Office",
               "Marketplace-Shop",
               "Marketplace-Town Hall",
               "Shop-Town Hall"
            ];


//Create an object were connect each location with their posible next neighbour      
//Give it for the chapter challenge       
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}
const roadGraph = buildGraph(roads);

//Class for robot functions
//Give it for the chapter challenge
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place){
                    return p;
                }                 
                return {
                    place: destination, address: p.address
                };
            }).filter(p => p.place != p.address);
                return new VillageState(destination, parcels);
            }
        }
    }


//Create the amount of packages or parcels to deliver (Default 5 packages)
//Give it for the chapter challenge
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }

    return new VillageState("Post Office", parcels);
};

//Choose a random location for packages
//Give it for the chapter challenge
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

// A route were you can go to each location at least 1 time.
//Give it for the chapter challenge
const mailRoute = ["Alice's House", "Cabin",
                   "Alice's House", "Bob's House",
                   "Town Hall", "Daria's House",
                   "Ernie's House","Grete's House", 
                   "Shop", "Grete's House", 
                   "Farm","Marketplace", "Post Office"
                ];


//This function makes the robot finish his task doing the route at least 2 times or less
//Give it for the chapter challenge
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

//Find the most optional route to go from the current location
//Give it for the chapter challenge
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) {
                return route.concat(place);
            }            
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
    
}

//Take the first element of packages array, then check if the current location is the where it has to go.
//if not che for the most optimal route for deliver the package.
//Give it for the chapter challenge
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}


//
//Give it for the chapter challenge
// Main functition, checks if all the packages are delivered or not.
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;        
    }
}


















//Compare 2 robots challenge (7.1)
//Compare 2 robots and shows on the average turns to finish the same task 100 times
function compareRobots(robot1,memory1,robot2,memory2){
    let counterRobot1 = 0, counterRobot2 = 0;

    for (let i = 0; i < 100; i++) {
        let state = VillageState.random();
        counterRobot1 += countSteps(state,robot1,memory1);
        counterRobot2 += countSteps(state,robot2,memory2);
    }
    console.log(`${robot1.name} has an average of ${Math.round(counterRobot1/100)} per task`);
    console.log(`${robot2.name} Robot has an average of ${Math.round(counterRobot2/100)} per task`);
}

//Function where count and returns the total amount turns until the robot doesn't have any packages to deliver
function countSteps(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            return turn;            
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}


console.log("-------------Compare 2 Robots challenge------------------");
compareRobots(routeRobot, [], goalOrientedRobot, [])







// Robot efficiency (Challenge 7.2)
// Build a better robot than the previus one delivering the packages on least time
// Same logic of goalOrientedRobot but instead of taking just the first package of the array
// use the shortestParcelRoute to determinate wich package its the nearest one.
function bestRobotEver({place, parcels}, route) {     
    if (route.length == 0) {
        let parcel = shortestParcelRoute(place,parcels);        
        if (parcel.place == place) {
            route = findRoute(roadGraph, place, parcel.address);            
        } else {
            route = findRoute(roadGraph, place, parcel.place);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}


//Determinate between packages wich one it's the nearest one to the robot position.
function shortestParcelRoute(place,parcelRoutes){
    let shortestRoute = parcelRoutes[0];
    
    if (parcelRoutes.length > 1) {
      for (let i = 0; i < parcelRoutes.length; i++) {
          if (findRoute(roadGraph, place, parcelRoutes[i].address).length < findRoute(roadGraph, place,shortestRoute.address).length) {
            shortestRoute = parcelRoutes[i];
          }        
      }
    }
  
    return shortestRoute;
  }





  console.log("\n");
console.log("----------Create a new more efficient robot challenge-----------");  
console.log("Compare bestRobotEver and goalOrientedRobot");
compareRobots(goalOrientedRobot,[],bestRobotEver,[]);




//Persistent Group (Challenge 7.3)
// Class and functions that works wihout updating the old instance of the class.
class PGroup{
    
   constructor(){
       this.arr = [];
   }
    
    //Instance a new object of the class taking the same values, add the new element and return it.
    add(e) {
        let newObject = new PGroup();
        this.arr.forEach(element => {
            newObject.arr.push(element)
        });
        newObject.arr.push(e);
        return newObject; 
    }

    //Instance a new object of the class taking the same values, search and delete the element and return the new object.
    delete(e){
        let newObject = new PGroup();
        this.arr.forEach(element => {
            newObject.arr.push(element)
        });        
        newObject.arr.forEach(element => {
            if (element == e) {
                newObject.arr.splice(newObject.arr.indexOf(element),1);
            }
        });

        return newObject;
    }


    //Search in the object if the element given is there and return true or false.
    has(e){
        for (let i = 0; i < this.arr.length; i++) {
            console.log();
            if (this.arr[i] == e) {
                return true;
            }
        }
        return false;
    }
}

PGroup.empty = new PGroup();

//Creating new instances of the objects for testing
let a = PGroup.empty.add("a");
let a1 = a.add(1);
let b = a1.delete("a")

console.log("\n");
console.log("Create object and add the Char 'a'",a);
console.log("Create new object from method 'add()' and add the number 1",a1);
console.log("Show persistence of first object",a);
console.log("Show the result of method 'has()', Object.has('a')",a1.has("a"));
console.log("Create a new Object using method 'delete()' of previus object created and deleting char 'a'",b);
console.log("Show persistence of previus object",a1);
console.log("Show the result of method 'has()', Object.has('a') after deleting char 'a'",b.has("a"));
 



