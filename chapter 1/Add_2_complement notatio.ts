class Arithmetic{
    value: number

    constructor(value : number){
        this.value = value
    }

    negativeConverter(value: number){
        //first  i need to loop through the whole array to find the   last one in array of bits 
        // so BASICALLY I AM SAYING  go  though everything until you can't find any one in the array
        //   then do smth a do while loop  would hep here 
        // how does the computer know this is that last 1
        // to do this i have to start from the last array and the frist 1 is technicall 
        //  the last  1 in the array so we push the 1 and everything after it to the new array
        //  then we flip the bits of the remaining numbers and  push them to the new array 
        let intArry: number[] = value.toString().split('').map(Number)
        let newArry: number[] = []
        let firstOneFound = false
        for(let i = intArry.length -1 ; i >= 0 ; i --){
            // i need smth to tel the cobuter that it should strore 
            // that particular index location in memory that way it is much easier 
            // To copy every value 
            if(!firstOneFound){
                // so want i  is to push the number at that partuclar index and  everything after 
                // store it in a variable 
                if (intArry[i] === 1) {
                    newArry.unshift(1)
                    firstOneFound = true
                } else {
                    newArry.unshift(0)
                }
                //i need to push the values after temp and put it to the new array  which is the vlaue befor the temp since we are going backward and if there is not value nothing should be added 
                //since it has to be zero i will just the actual index i am on and put zero 

            }else{
                newArry.unshift(intArry[i] === 0 ? 1 : 0)
            }
        }
        return newArry
    }

    addtion(value: number){
        
    }
}