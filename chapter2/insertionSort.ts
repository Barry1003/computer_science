class insertionSort{
    value: number[]
    constructor(value:number[]){
        this.value =  value
    }

    // so basically what i want to  do is that check 
    // using [3, 5, 8, 1, 4]
    // if the current index is less that the value  be4 it 
    // if yes  swtich their postion 
    // so  we would only move element to the right is tehy are bigger than the current value 
    insertion(){
        let newArry : number[] = []
        // we are starting at the  second value and looping
        for(let i = 1; i < this.value.length; i++){
            //asigin  it to the current index
            let currentIdx = this.value[i]
            // trying to refrece to the value be for it so wwwwwe can compare
            let j = i-1
            // checking that  we stat from the first value and compareing if i is greater than the current index
            while(j>=0 &&  this.value[j] > currentIdx){
                // we are shiffting the postion   and decrementing backward for we are always conpare 
                this.value[j + 1] = this.value[j]
                j--
            }
            // so we  update the current index after every shifing so it can  go to the next number 
            this.value[j + 1] = currentIdx
       }
    }
}

const arr = new insertionSort([5, 3, 8, 1, 4])
arr.insertion()
console.log(arr.value)

