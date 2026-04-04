class Binary{
    value: string | number

    constructor(value: string | number){
        this.value = value
    }
   
    DecodeFullMessage(longString: string){
        const longStrings =  longString.split("").join(" ")
        // where the new arrays would be push to 
        let newArry = []
        for(let i = 0 ; i < longStrings.length; i+=8){
           let chunk = longStrings.slice(i, i + 8);
             newArry.push(chunk.split("").map(Number))
            
        }
        return newArry
    }
    
    // this is the function that will convert the binary to base 10 
    BaseTwo_BaseTen(value: number[][]): number[]{
        let  result: number[]  = []
        for(let i = 0; i < value.length; i++){
             //this help me ensure that the power of 2 is correct  and it reset to 0 every time the loop is done 
            let idx = 0
            // this help me store the value of the binary number  such that after the loop is done it can be pushed to the result array 
            let sum = 0 
            for(let j =  value[i].length - 1; j >= 0; j--){
           sum += value[i][j] * (2 ** idx)
           idx++
        }
        result.push(sum)
        }
        return result
    }
    // function to convert base 10 to base two 
BaseTen_BaseTwo(value: number): number[] {
    // Handle the case where the input is 0
    if (value === 0) return [0];
    let result: number[] = [];
    while (value > 0) {
        // Get the remainder (0 or 1)
        let remainder = value % 2;
        // Add to the FRONT of the array
        result.unshift(remainder);
        //Divide value by 2 and round down
        value = Math.floor(value / 2);
    }
    return result;
}

    // this is the function that will decode the binary to ascii 
    Decoder(value:string): string[]{
        // converting  the  the sting to number 
        let sentence: string[] = []
        let clean = this.DecodeFullMessage(value)
        // first i need to convet the array  from base 2 ro base 10 
        let base10: number[] =  this.BaseTwo_BaseTen(clean)
        for (let i = 0; i < base10.length; i++) {
                let word = String.fromCharCode(base10[i]).split(",").join(" ")
                sentence.push(word)
            }
            return sentence
    }

Encoder(value: string): string {
  return value
    .split("")
    .map(char => {
      const bits = this.BaseTen_BaseTwo(char.charCodeAt(0));
      return bits.join("").padStart(8, "0"); // ensure 8 bits
    })
    .join("");
}
   
}

const binary = new Binary("hello");
console.log("Binary value:", binary.Encoder("Hello"));
console.log("Binary value:", binary.Decoder("01001000011001d23565601011011000110110001101111"));
console.log("Terminal output is working!");
