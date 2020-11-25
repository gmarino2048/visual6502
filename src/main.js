// Import required modules
const yargs = require('yargs')

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
    useTestProgram: false,
}

if(!(argv.chip)){
    // Default to 6502 and warn
    console.warn('Chip not specified. Defaulting to 6502.')
    argv.chip = '6502'
}

switch(argv.chip) {
    case '6502':
        config.importPath = './chip/6502'
        break;
    case '6800':
        config.importPath = './chip/6800'
        break;
    default:
        console.error('Provided chip is not a valid option. Select from "6502" or "6800".')
        process.exit(2)
}

if(!(argv.program)){
    console.warn('No input program specified. Using test programs.')
    config.useTestProgram = true
}

// Do conditional imports
const nodenames = require(`${config.importPath}/nodenames`).nodenames
const segdefs = require(`${config.importPath}/segdefs`).segdefs
const transdefs = require(`${config.importPath}/transdefs`).transdefs

// Support and testprogram are going to need a little massaging before they're ready
// const support = require(`${config.importPath}/support`)
// const testprogram = require(`${config.importPath}/testprogram`)

/**
 * IMPORTANT:
 * 
 * So it turns out that these are mainly redefined in the support.js file,
 * which gets reimported later:
 * 
 * TODO: Change this to go into support file instead
 */
const wires = require('./common/wires.js')
const program = require('./common/program.js')
const Program = program.Program 

program = new Program()

wires.setupNodes(segdefs, nodenames)
wires.setupTransistors(transdefs, nodenames)
wires.setupNodeNameList(nodenames)


console.log('Complete')