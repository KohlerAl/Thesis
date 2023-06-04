namespace Script {
    import ƒ = FudgeCore;
    let instance: NPC;

    export class NPC extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(NPC);
        // Properties may be mutated by users in the editor via the automatically created user interface
        public currentDialogue: number = 0;
        public dialogues: (Dialogue | Answer)[] = [
            new Dialogue("Hallo Player. Schön, dich zu sehen. <br> Und danke, dass du uns hilfst.",
                "Hello Player. It’s good to see you. <br>And thank you for supporting us."),
            new Dialogue("Hallo Mykah.", "Hello Mykah"),
            new Answer("Kann ich dir bei etwas helfen?", "Can I help you with something?", "Wie kann ich dir helfen?", "How can I support you?")];
        public readonly dialogueBox: HTMLDivElement;
        public readonly textBox: HTMLParagraphElement;
        public readonly nextButton: HTMLDivElement;
        public currentlanguage: string = "german";

        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;

            // Listen to this component being added to or removed from a node
            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
            this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
            this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);

            this.dialogueBox = document.querySelector("#npcTalk");
            this.textBox = this.dialogueBox.querySelector("p");
            this.textBox.addEventListener("pointerdown", this.switchLanguage);

            this.nextButton = this.dialogueBox.querySelector("#Next");
            this.nextButton.addEventListener("pointerdown", this.showNext);
            instance = this;
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

        public showDialogue(): void {
            this.dialogueBox.style.visibility = "visible";
            this.nextButton.style.visibility = "visible";
            this.textBox.innerHTML = "";
            if (this.dialogues[this.currentDialogue] instanceof Dialogue) {
                let current: Dialogue = <Dialogue>this.dialogues[this.currentDialogue];

                if (this.currentlanguage == "german")
                    this.textBox.innerHTML = current.textGerman;
                else
                    this.textBox.innerHTML = current.textEnglish;
            }
            else if (this.dialogues[this.currentDialogue] instanceof Answer) {
                let current: Answer = <Answer>this.dialogues[this.currentDialogue];

                if (this.currentlanguage == "german")
                    this.textBox.innerHTML = "<p>" + current.choiceAGerman + "</p><div id='optionA'>choose</div> <br>" +
                        "<p>" + current.choiceBGerman + "</p><div id='optionB'>choose</div>";

                else
                    this.textBox.innerHTML = "<p>" + current.choiceAEnglish + "</p><div id='optionA'>choose</div> <br>" +
                        "<p>" + current.choiceBEnglish + "</p><div id='optionB'>choose</div>";

                this.nextButton.style.visibility = "hidden";
                this.dialogueBox.querySelector("#optionA").addEventListener("pointerdown", this.choose);
                this.dialogueBox.querySelector("#optionB").addEventListener("pointerdown", this.choose);
            }
        }

        public showNext(): void {
            instance.currentDialogue++;
            instance.currentlanguage = "german";
            if (instance.currentDialogue <= instance.dialogues.length - 1) {
                instance.showDialogue();
            }

            else {
                instance.hideDialouge();
            }
        }
        public hideDialouge(): void {
            this.dialogueBox.style.visibility = "hidden";
            this.nextButton.style.visibility = "hidden";
        }

        public choose(): void {
            instance.nextButton.style.visibility = "visible";
            instance.showNext();
        }

        public switchLanguage(_event: Event): void {
            let target: HTMLElement = <HTMLElement>_event.target;

            if (target.id != "optionA" && target.id != "optionB") {
                if (instance.currentlanguage == "german")
                    instance.currentlanguage = "english";

                else if (instance.currentlanguage == "english")
                    instance.currentlanguage = "german";

                instance.showDialogue();
            }
        }
    }
}