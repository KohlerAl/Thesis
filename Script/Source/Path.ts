namespace Script {
  import ƒ = FudgeCore;

  export class Path extends ƒ.Mutable {
    public start: string = "A";
    public end: string = "B";
    
    protected reduceMutator(_mutator: ƒ.Mutator): void {
      // delete properties that should not be mutated
      // undefined properties and private fields (#) will not be included by default
    }
  }
}