//The sum of a range
let range = (start,end, step) => {
    step = step || 1;
    let arr = [];

    if (step > 0) {        
        for (let i = start; i <= end; i = i + step) {
            arr.push(i);        
        }
    }else{
        for (let i = start; i >= end; i = i + step) {
            arr.push(i);        
        }
    }  

    return arr;
}

let sum = (start,end) => {

    let sum = 0;
    range(start,end).forEach(num => {
        sum += num
    });

    return sum;
}

//Reversing an array;
let reverseArray = arr => {
    let reverseArray = [];
    for (let i = arr.length -1; i >= 0; i--) {
       reverseArray.push(arr[i]);        
    }
    console.log(reverseArray);
}

let reverseArrayInPlace = arr => {
    for (var i = 0, j = arr.length - 1; i < j; i++, j--) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    console.log(arr);
}
