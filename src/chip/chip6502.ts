
import { Processor } from '../common/processor'
import { nodenames as nodenames6502} from './6502/nodenames'
import { transdefs as transdefs6502 } from './6502/transdefs'
import { segdefs as segdefs6502 } from './6502/segdefs'

class Processor6502 extends Processor {

    private ngnd: any;
    private npwr: any;

    constructor(){
        super(
            '6502',
            nodenames6502,
            transdefs6502,
            segdefs6502
        );

        this.ngnd = this._nodenames['vss'];
        this.npwr = this._nodenames['vcc'];
    }

    setupNodes(segdefs: any[]): void {
        for(var i in segdefs){
            var seg = segdefs[i];
            var w = seg[0];

            if(this._nodes[w] == undefined){
                this._nodes[w] = {
                    segs: new Array(),
                    num: w,
                    pullup: seg[1] == '+',
                    state: false,
                    gates: new Array(),
                    c1c2s: new Array()
                };
            }

            if(w == this.ngnd) continue;
            if(w == this.npwr) continue;

            // segs is guaranteed here
            this._nodes[w].segs.push(seg.slice(3));
        }
    }

    setupTransistors(transdefs: any[]): void {
        for(var i in transdefs){
            var tdef: any = transdefs[i];

            var name = tdef[0];
            var gate = tdef[1];
            var c1 = tdef[2];
            var c2 = tdef[3];
            var bb = tdef[4];

            if(c1 == this.ngnd){
                c1 = c2;
                c2 = this.ngnd;
            }

            if(c1 == this.npwr){
                c1 = c2; 
                c2 = this.npwr;
            }

            var trans: any = {
                name: name,
                on: false,
                gate: gate,
                c1: c1,
                c2: c2,
                bb: bb
            };

            this._nodes[gate].gates.push(trans);
            this._nodes[c1].c1c2s.push(trans);
            this._nodes[c2].c1c2s.push(trans);
            this._transistors[name] = trans;
        }
    }

}