class cpu{
    memory : number[] 
    register : number[]
    programCounter: number
    instructionRegister: number 
    halter: boolean

    constructor(){
        this.memory = new Array(256).fill(0)
        this.register = new Array(16).fill(0)
        this.programCounter = 0
        this.halter = false
        this.instructionRegister = 0
    }

    loadProgram(program: number[], startAddress: number){
        // what what i want to to say is that  you loop through the memeory  and 
        // The vlaue of  everything  in the the start adress is would me the  program
        for(let i = 0; i <= program.length ; i++){
            this.memory[startAddress + (i*2)]  = program[i] >> 8
            this.memory[startAddress + (i*2)  +1] = program[i] & 0xff
        }  


    }
    fetch(){
        let highByte = this.memory[this.programCounter]
        let lowByte  = this.memory[this.programCounter + 1] & 0xFF
        this.instructionRegister = highByte << 8 | lowByte
        this.programCounter += 2
    }


// | Instruction | From | To |
// |---|---|---|
// | LOAD | Memory | Register |
// | STORE | Register | Memory |
// | MOVE | Register | Register |

    decode(){
        switch((this.instructionRegister >> 12) & 0xF) {
           case  0x1: // LOAD
              {  const reg = (this.instructionRegister >> 8) & 0xF
                const addr = this.instructionRegister & 0xFF
                this.register[reg] = this.memory[addr]
                break}
            case 0x2: // LOAD
            {    const reg = (this.instructionRegister >> 8) & 0xF
                const addr = this.instructionRegister & 0xFF
                this.register[reg] = addr
                break}
            case 0x3: // STORE
              {  const reg1 = (this.instructionRegister >> 8) & 0xF
                const addr = this.instructionRegister & 0xFF
                this.memory[addr] = this.register[reg1] 
                break}
            case 0x4: // MOVE   
               { const reg1 = (this.instructionRegister >> 8) & 0xF
                const reg2 = this.instructionRegister & 0xF
                this.register[reg1] = this.register[reg2]
                break}
            case 0x5: // ADD
               { const reg1 = (this.instructionRegister >> 8) & 0xF
                const reg2  = (this.instructionRegister >> 4) & 0xF
                const reg3 =  this.instructionRegister & 0xF
                this.register[reg1] = this.register[reg2] + this.register[reg3]
                break
            }
            case 0x6 ://AND FLOATING POINT
            {
                const reg1 = (this.instructionRegister >> 8) & 0xF
                const reg2  = (this.instructionRegister >> 4) & 0xF
                const reg3 =  this.instructionRegister & 0xF
                this.register[reg1] = this.register[reg2] + this.register[reg3]
                break
            }
            case 0X7: //OR
            {
                const reg1 = (this.instructionRegister >> 8) & 0xF
                const reg2  = (this.instructionRegister >> 4) & 0xF
                const reg3 =  this.instructionRegister & 0xF
                this.register[reg1] = this.register[reg2] | this.register[reg3]
                break
            }
            case 0x8: // AND
            {
                const reg1 = (this.instructionRegister >> 8) & 0xF
                const reg2  = (this.instructionRegister >> 4) & 0xF
                const reg3 =  this.instructionRegister & 0xF
                this.register[reg1] = this.register[reg2] & this.register[reg3]
                break
            }
            case 0x9: // XOR
            {
                const reg1 = (this.instructionRegister >> 8) & 0xF
                const reg2  = (this.instructionRegister >> 4) & 0xF
                const reg3 =  this.instructionRegister & 0xF
                this.register[reg1] = this.register[reg2] ^ this.register[reg3]
                break
            }
            case 0xA //ROTATE 
            : {
                const reg = (this.instructionRegister >> 8) & 0xF
                const n = this.instructionRegister & 0xF
                this.register[reg] = ((this.register[reg] >> n) | (this.register[reg] << (8 - n))) & 0xFF
                break
            }
            case 0xb: // JUMP
            {  
                const reg = (this.instructionRegister >> 8) & 0xF
                const addr = this.instructionRegister & 0xFF
                if(this.register[reg] === this.register[0]) this.programCounter = addr
                break
            }
            case 0xc://HALT
             {
                    console.log("HALT")
                    this.halter = true
                    break

            }
            default:
            console.log("Unknown op-code")
            break
                }
    }

    machineCycle(){
        while(!this.halter){
            this.fetch()
            this.decode()
        }
    }
}


const myCPU = new cpu()

// Put some values in memory at 6C and 6D
myCPU.memory[0x6C] = 10
myCPU.memory[0x6D] = 20

// Load and run the program
myCPU.loadProgram([0x156C, 0x166D, 0x5056, 0x306E, 0xC000], 0x00)
myCPU.machineCycle()

// Check the result at memory address 6E
console.log(myCPU.memory[0x6E])  // Should print 30