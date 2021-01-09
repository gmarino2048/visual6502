import { assert } from "console";

const fs = require('fs')

class Program {

    private address: number;
    private program: number[];

    constructor(){
        this.address = 0x00;
        this.program = [];
    }


    public setupFile(filepath: string){
        this.clearProgram();
        this.reset();

        this.readFile(filepath);
    }


    public setupTestProgram(testProgram: number[]){
        this.clearProgram();
        this.reset();

        this.program = testProgram;
    }


    // Clear the current program
    public clearProgram(){
        this.program = [];
    }


    public reset(){
        this.address = 0x00;
    }


    public setAddress(newAddress: number){
        this.address = newAddress;
    }


    public getBytes(numBytes: number): number[]{
        var output: number[] = [];
        var stopPoint: number = this.address + numBytes;

        if(stopPoint <= this.address){
            throw new Error('Number of bytes to read cannot be negative')
        }
        if(stopPoint >= this.program.length){
            throw new RangeError('Requesting information beyond program bounds')
        }

        for(var i = this.address; i < stopPoint; i++){
            this.address++;
            output.push(this.program[i]);
        }

        return output;
    }


    // Read the raw binary from a source file
    private readFile(filepath: string) {
        this.clearProgram();

        fs.open(filepath, 'r', (err: Error, fd: number) => {
            if(err) {
                console.error(err);
                process.exit(1);
            }

            fs.read(fd, (err: Error, read: number, buffer: Buffer) => {
                if(err){
                    console.error(err);
                    process.exit(1);
                }

                for(var i = 0; i < read; i++){
                    var byte: number = buffer.readUInt8()
                    this.program.push(byte);
                }
            });
        });
    }
}

export {
    Program
}