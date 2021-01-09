/**
 * This is the common file, designed to hold all the persistant
 * data throughout the runtime of the program.
 */

import { Program } from './program'

export class Config{
    public chip: string
    public program: Program

    public transdefs: any[]
    public segdefs: any[]

    constructor(){
        this.chip = null
        this.program = null
        
        this.transdefs = []
        this.segdefs = []
    }
}