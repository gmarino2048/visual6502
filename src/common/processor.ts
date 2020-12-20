


class Processor {

    name: string;
    instructionWidth: number;

    constructor(
        name: string,
        instructionWidth: number
    ){
        this.name = name;

        // Check that the instruction width is either
        // 16 or 32 bits
        if(instructionWidth != 16 && instructionWidth != 32){
            throw new Error('')
        }
    }
}