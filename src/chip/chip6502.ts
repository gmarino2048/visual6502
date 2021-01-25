
import { Processor } from '../common/processor'
import { transdefs as transdefs6502 } from './6502/transdefs'
import { segdefs as segdefs6502 } from './6502/segdefs'

class Processor6502 extends Processor {

    constructor(){
        super(
            '6502',
            transdefs6502,
            segdefs6502
        );
    }

    setupTransistors(transdefs: any[]): void {
        for(var i in transdefs){
            var tdef: any = transdefs[i];
            var name = tdef[0];
            var 
        }
    }

}