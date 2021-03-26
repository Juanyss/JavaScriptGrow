let printPyramid = () => {
    let row = '';
    for (let i = 0; i < 7; i++) {
        row += '#';
        console.log(row);  
    }
}

let fizzBuzz = () => {
    for (let i = 1; i <= 100; i++) {
        //Esto se ve feo
        switch (true) {
            case i % 3 === 0 && i % 5 === 0:
                console.log('FIZZBUZZ');
                break;
            case i % 3 === 0:
                console.log('FIZZ');
                break;
            case i % 5 === 0 && i % 3 !== 0:
                console.log('BUZZ');
            default:
                console.log(i);
                break;
        }

        //Este me parece mas lindo
        // if (i % 3 === 0 && i % 5 === 0) {
        //     console.log('FIZZBUZZ');
        // }else if (i % 3 === 0) {
        //    console.log('FIZZ');
        // }else if (i % 5 === 0 && i % 3 !== 0) {
        //     console.log('BUZZ');
        // }else{
        //    console.log(i);
        // }
    }
} 

let chessBoard = () => {
    //Binding emojis to variables
    let blackSquare = String.fromCharCode(0x2B1B);
    let whiteSquare  = String.fromCharCode(0x2B1C);


    for (let i = 0; i < 8; i++) {
        let row = '';
        for (let j = 0; j < 4; j++) {
            if (i % 2 !== 0) {
                row += blackSquare + whiteSquare;
            }else{
                row += whiteSquare + blackSquare;
            }            
        }
        console.log(row);        
    }
}

chessBoard();
let myObject = {
    animal: "wolf",
    "another propertie": "the wolf are old"
}

console.log([1, 2, 3, 2, 1].indexOf(2));
