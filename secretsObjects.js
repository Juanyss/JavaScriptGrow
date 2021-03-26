function talk (line) { 
    console.log(`${this.name} says ${line}`);
}

class person {
    constructor(name){
        this.name = name;        
    }    
    talk = talk;
}

// let talk = (line) => {    
//     console.log(this.person);
//     console.log(`${this.name} say ${line}`);
//     }

// let person1 = new person('Juany')

// //console.log(Object.getPrototypeOf(person1));
// person.prototype.toString = function() {
//     return this.name + this.talk
// }
// console.log(person.prototype.toString);


//A vector type
class Vec {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

Vec.prototype.pluss = function(vec){
    return new Vec(this.x + vec.x, this.y + vec.y)
}

Vec.prototype.minus = function(vec){
    return new Vec(this.x - vec.x, this.y - vec.y)
}

Vec.prototype.length = function(){
    return (Math.sqrt((Math.pow(this.x,2)) + Math.pow(this.y,2)))
}

// console.log(new Vec(1,2).pluss(new Vec(2,3)));
// console.log(new Vec(1,2).minus(new Vec(2,3)));
// console.log(new Vec(3,4).length());

//Groups

class Group {
    constructor(){
        this.arr = [];
    }
}

Group.prototype.add = function(element){
    if (element in this.arr) {
        return;
    }
    this.arr.push(element);
}

Group.prototype.delete = function(element){
    if (element in this.arr) {        
        return this.arr.splice(this.arr.indexOf(element),1);        
    }
    return;
}

Group.prototype.has = function(element){
    if (element in this.arr) {        
        return true;        
    }
    return false;
}

Group.prototype.from = function(arr){
    let group = new Group;
    for (const element of arr) {
        group.add(element)
    }
    return group.arr;    
}


let group = new Group();
group.add(1);
group.add(12);
group.add(13);
group.add(19);
group.add(1);

for (let element of Group.prototype.from(["a",2,"c","d",4])) {
    console.log(element);
}

