// you are  are given  an array of string and  and each of them is to be assing a list of 
// of random  numbers  between  1 to 7  the  second string can only be assign an even number 
// i need to find every possible number that they all can have and non of them is to  have the same number
//  it means that a can have 1,2,3,4,5,6,7 and b can have 2,4,6 and c can have 1,2,3,4,5,6,7 
// and the output should be an array of objects 
interface obj{
    key: string,
    val: number
}
class dataPermutation{
    value: string[]
    constructor(value:string[]){
        this.value = value
    }
    objectification(){
        let result: obj[][] = []
        let Arrynum: obj[] = []
        let currentCombo: obj[] = []
        const availableNumbers = [1, 2, 3, 4, 5, 6, 7];
        const backTrack = (index: number)=>{
            if(index === this.value.length){
                result.push([...currentCombo])
            } 
            for(let num  of availableNumbers){
                if(index === 1 &&  num % 2 !== 0){
                    continue
                }
                if(!currentCombo.some((obj)=>obj.val === num)){
                   currentCombo.push({ key: this.value[index], val: num });
                   backTrack(index+1)
                   currentCombo.pop()
                }
            }
        }
        backTrack(0)
        return result;
    }
}



const myPerm = new dataPermutation(["a", "b", "c"]);
console.log(myPerm.objectification());