
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
                console.error(err);
                process.exit(1);
            }

            
        })
    }
}

module.exports = {
    Program: Program
}