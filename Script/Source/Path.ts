namespace Script {
  import ƒ = FudgeCore;

  export class Path extends ƒ.Mutable {
    public start: string = "A";
    public end: string = "B";
    #cost: number = Infinity;

    constructor(_start?: string, _end?: string) {
      super();
      this.start = _start;
      this.end = _end;
    }

    public set cost(_cost: number) {
      this.#cost = _cost;
    }
    public get cost(): number {
      return this.#cost;
    }

    protected reduceMutator(_mutator: ƒ.Mutator): void {
      // delete properties that should not be mutated
      // undefined properties and private fields (#) will not be included by default
    }
  }
}