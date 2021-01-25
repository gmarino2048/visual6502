
export abstract class Processor {

    protected _name: string;
    protected _transdefs: any[];
    protected _segdefs: any[];

    protected _nodes: Array<any> = new Array();
    protected _nodenames: any[];
    protected _transistors: any = {};
    protected _nodenamelist: any[] = [];
    
    get name(): string {
        return this._name;
    }

    get transdefs(): any[] {
        return this._transdefs;
    }

    get segdefs(): any[] {
        return this._segdefs;
    }

    protected constructor(
        name: string,
        nodenames: any,
        transdefs: any[],
        segdefs: any[]){
        // Initialize processor information
        this._name = name;
            
        this._nodenames = nodenames;
        this._transdefs = transdefs;
        this._segdefs = segdefs;

        this.setupNodes(this._segdefs);
        this.setupTransistors(this._transdefs);
    }

    protected abstract setupNodes(segdefs: any[]): void;
    protected abstract setupTransistors(transdefs: any[]): void;

    /*
    abstract initChip(): void;
    abstract chipStatus(): void;

    abstract stopChip(): void;
    abstract runChip(): void;
    abstract resetChip(): void;

    abstract halfStep(): void;
    abstract stepBack(): void;
    abstract stepForward(): void;
    */
}