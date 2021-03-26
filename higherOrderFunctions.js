console.log('Higher Order Functions');

let arr1 = [11,25,3,4,45,6,7,8];


let Flattening = (arr1) => {
    let reducer = (result, arr) => {        
        return result.concat(arr)
    }
    let result = [];
    return arr1.reduce(reducer, result)   
} 

//console.log(Flattening(arr1));
let loopAnPrint = (start, test, update, body) => {    
    for (let value = start; test(value); value = update(value)) {
        body(value)        
    }    
}


let loopAndPush = (start, test, update, body) => {
    loopArray = []
    for (let value = start; test(value); value = update(value)) {
        body(value)        
    }
    return (loopArray);
}

// loopAndPush(3, n => n > 0 , n => n - 1 , console.log);
// console.log(loopAndPush(3, n => n > 0 , n => n - 1 , (element) => loopArray.push(element)));


let everythingWithEvery = (arr,test) => {
    return arr.every(test)
}

let everythingWithEveryLoop = (arr,test) => {
    for (let i = 0; i < arr.length; i++) {
        if(!test(arr[i])){
            return false;            
        }        
    }
    return true;
}

let everythingWithSome = (arr,test) => {
    return arr.some(test)
}

let everythingWithSomeLoop = (arr,test) => {
    for (let i = 0; i < arr.length; i++) {
        if(test(arr[i])){
            return true;            
        }        
    }
    return false;
}

//console.log(everythingWithEvery(arr1, n => n < 55));
// console.log(everythingWithEveryLoop(arr1, n => n < 105));

// console.log(everythingWithSome(arr1, n => n < 0));
// console.log(everythingWithSomeLoop(arr1, n => n < 1));
// console.log(arr1.every(element => element > 2));

