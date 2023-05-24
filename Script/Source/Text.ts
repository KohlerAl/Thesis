namespace Script {
    import ƒ = FudgeCore;
  
    export class Text extends ƒ.Mutable {
      public text: string = "A";
  
      constructor(_englishText?: string) {
        super();
        this.text = _englishText;
      }
      
      protected reduceMutator(_mutator: ƒ.Mutator): void {
        // delete properties that should not be mutated
        // undefined properties and private fields (#) will not be included by default
      }
    }
  }