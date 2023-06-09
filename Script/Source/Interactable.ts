namespace Script {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

    export class Interactable extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(Interactable);
        // Properties may be mutated by users in the editor via the automatically created user interface
        public dialogue: Text = new Text();
        private timeout: any; 

        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;

            // Listen to this component being added to or removed from a node
            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
            this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
            this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
        }

        // Activate the functions of this component as response to events
        public hndEvent = (_event: Event): void => {
            switch (_event.type) {
                case ƒ.EVENT.COMPONENT_ADD:
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case ƒ.EVENT.COMPONENT_REMOVE:
                    this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
                    this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
                    break;
                case ƒ.EVENT.NODE_DESERIALIZED:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        }

        public showText(): void {
            let dialogueBox: HTMLDivElement = document.querySelector("#dialogue"); 
            let text: HTMLParagraphElement = dialogueBox.querySelector("p"); 
            dialogueBox.style.visibility = "visible"; 
            text.innerHTML = this.dialogue.text; 

            this.timeout = window.setTimeout(this.hideText, 10000); 
        }

        public hideText(): void {
            clearTimeout(this.timeout); 
            let dialogueBox: HTMLDivElement = document.querySelector("#dialogue"); 
            dialogueBox.style.visibility = "hidden"; 
        }
    }
}