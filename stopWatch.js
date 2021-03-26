//Constructor method
// function Circle(radius) {
//     this.radius = radius;
//     let defaultLocation = {x:0,y:0};
//     let computeOptimalLocation = () => console.log("OptimalCompute");

//     this.draw = () => {
//         computeOptimalLocation();
//         console.log('draw')
//     };
    
//     Object.defineProperty(this,'defaultLocation',{
//         get: () => defaultLocation,
//         set: value => {
//             if(!value.x || !value.y){
//                 throw new Error('Invalid location, miss X or Y');
//             }
//             defaultLocation = value
//         }
//     });
// }


class StopWatch{
    constructor(){
        let duration = 0;
        let isCounting = false;


        Object.defineProperty(this,'duration',{
            get: () => duration,
            set: duration => {
                if(duration.value != typeof(Number)){
                    throw new Error('Duration must be a number')
                }
                this.duration = duration
            }
        })

        

        this.start = () => {
            if(isCounting){
                throw new Error('clock is already counting')
            }
            isCounting = true;
            duration = new Date().getTime();
        }
            
        

        this.stop = () => {
            if(!isCounting){
                throw new Error('clock is not counting, you must start first')
            }
            isCounting = false;
            duration = ((new Date().getTime() - duration) / 1000 % 60) 
        }

        this.reset = () => duration = 0
    }
}



let stopWatch = new StopWatch();



