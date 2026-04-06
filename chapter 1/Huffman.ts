
interface TreeNode {
    char: string;
    count: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

class Huffman{
    value : string

    constructor(value: string){
        this.value =  value
    }
        sortedHash(): TreeNode[] {
            let hash :{[key: string]: number } = {}
            let strArry = this.value.split("")
            for(let i = 0; i <= strArry.length -1; i++){
                if(hash[strArry[i]]=== undefined){
                    hash[strArry[i]] = 1
                }else{
                     hash[strArry[i]] += 1
                }
            }
            let result = []
            for(let key in hash){
                result.push({
                    char: key,
                    count: hash[key],
                    left: null,
                    right: null
                })
            }
            return result.sort((a, b) => b.count - a.count) 
        }

        huffmanTree(){
            let sortedHash = this.sortedHash()

            // while loop for as long as condition is met 
            while(sortedHash.length > 1){
                let  rightnode = sortedHash.pop()
                if(rightnode ===  undefined) return null
                let  leftnode = sortedHash.pop()
                if(leftnode ===  undefined) return null
                let key = rightnode.char + leftnode.char
                let value = rightnode.count + leftnode.count
                 let parent : TreeNode = {
                    char: key,
                    count: value,
                    left: leftnode,
                    right: rightnode
                }
                sortedHash.push(parent)
                sortedHash.sort((a, b) => b.count - a.count )
            }
            return sortedHash[0]
        }
        TransverseTree(TreeNode: TreeNode, code:string, result: {[key: string]: string} ){
            if(TreeNode.left === null && TreeNode.right === null){ result[TreeNode.char] = code }
            if(TreeNode.left) this.TransverseTree(TreeNode.left, code + "0", result)
            if(TreeNode.right) this.TransverseTree(TreeNode.right, code + "1", result)
        }
    getcodes(){
        let result : {[key: string]: string} = {}
        let tree =  this.huffmanTree()
        if(tree == null ) return null
        this.TransverseTree(tree, "", result)
        return result
    }


}
 
const huffman = new Huffman("your string here");
// console.log(huffman.sortedHash());
// console.log(huffman.huffmanTree())
console.log(JSON.stringify(huffman.huffmanTree(), null, 2))
console.log(huffman.getcodes())
// console.log(JSON.stringify(huffman.sortedHash()[0], null, 2))