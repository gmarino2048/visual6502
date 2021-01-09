// Import required modules
const yargs = require('yargs')

// Import TS modules
import * as program from './common/program'
import { Config } from './common/common'

var params = new Config()

// Set up signal handlers
process.on('SIGINT', () => {
    console.error('SIGINT received. Stopping...')
    process.exit(1)
})

process.on('SIGTERM', () => {
    console.error('SIGTERM received. Stopping...')
    process.exit(1)
})

// Set up argument parsing schema
const argv = yargs
    .option('chip', {
        alias: 'c',
        description: 'Select the processor to emulate. Current options are "6502" or "6800".',
        type: 'string'
    })
    .option('program', {
        alias: 'p',
        description: 'The binary program file to run on the emulated processor',
        type: 'string'
    })
    .help()
    .alias('help', 'h')
    .argv;


// Extract data from arguments
var config = {
    importPath: null,
    programPath: null,
    useTestProgram: false,
}

if(!(argv.chip)){
    // Default to 6502 and warn
    console.warn('Chip not specified. Defaulting to 6502.')
    argv.chip = '6502'
}

import { transdefs as td6502 } from './chip/6502/transdefs'
import { transdefs as td6800 } from './chip/6800/transdefs'

import { segdefs as sd6502 } from './chip/6502/segdefs'
import { segdefs as sd6800 } from './chip/6800/segdefs'

switch(argv.chip) {
    case '6502':
        params.chip = argv.chip

        params.transdefs = td6502
        params.segdefs = sd6502
        break;
    case '6800':
        params.chip = argv.chip

        params.transdefs = td6800
        params.segdefs = sd6800
        break;
    default:
        console.error('Provided chip is not a valid option. Select from "6502" or "6800".')
        process.exit(2)
}

if(!(argv.program)){
    console.warn('No input program specified. Using test programs.')
    config.useTestProgram = true
}
else {
    config.programPath = argv.program
}

// Set up test program
params.program = new program.Program()

if(!config.useTestProgram){
    params.program.setupFile(config.programPath)
}
else{
    // TODO: Import and set up test program
}

console.log('Complete')