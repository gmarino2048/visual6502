
const fs = require('fs')

class Program {

    constructor() {
        this.address = 0x00
        this.program = []
    }

    setupFile(filepath){

    }

    setupTestProgram(testProgram){

    }

    // Read the raw binary from a source file
    readFile(filepath) {
        fs.open(filepath, 'r', (err, fd) => {
            if(err) {
                console.error(err)
                process.exit(1)
            }

            fs.read(fd, (err, read, buffer) => {
                if(err){
                    console.error(err)
                    process.exit(1);
                }

                for(var i = 0; i < read; i++){
                    
                }
            })
        })
    }
}

module.exports = {
    Program: Program
}