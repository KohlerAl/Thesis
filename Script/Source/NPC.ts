namespace Script {
    import ƒ = FudgeCore;
    let instance: NPC;
    export class NPC extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(NPC);
        // Properties may be mutated by users in the editor via the automatically created user interface
        public currentDialogue: number = 0;
        private formEle: formTest = new formTest();
        public talk: talkyTalk = new talkyTalk(); 
        public answertoSaid: string;
        public translateSaid: string;
        private dialogue: Dialogue = new Dialogue("Hallo Player. Schön, dich zu sehen. <br> Und danke, dass du uns hilfst.",
        "Hello Player. It’s good to see you. <br>And thank you for supporting us."); 
        public dialogues: (formTest | Dialogue | Answer | Break | talkyTalk)[] = [
            this.talk, 
            this.dialogue,
            new Answer("Du:<br>Kann ich dir bei etwas helfen Mykah?", "You:<br>Can I help you with something Mykah?", "Du:<br>Wie kann ich dir helfen Mykah?", "You:<br>How can I support you Mykah?"),
            new Dialogue("Mykah:<br>Ich suche Hinweise über eine Blume. <br>Kannst du mir helfen, sie zu finden?", "Mykah:<br>I am looking for some clues about a flower. <br> Can you help me to find them?"),
            new Answer("Du:<br>Natürlich. Ich helfe dir gerne.", "You:<br>Of course. I will be happy to help you.", "Du:<br>Ja, ich kann dir helfen. Wo soll ich suchen?", "You:<br>Yes, I can help you. Where should I look?"),
            new Dialogue("Mykah:<br>Danke. Du solltest als erstes im Büro suchen. <br> Dazu musst du durch die rechte Tür.", "Mykah:<br>Thank you. You should check the office first. <br> You have to go through the right door."),
            new Break("Pages"),
            new Dialogue("Mykah:<br>Danke! Kannst du mir ein paar Fragen beantworten?", "Mykah:<br>Thank you! Can you answer a few questions?"),
            new Dialogue("Mykah:<br>1. Wo wächst die Nianna Blume? <br> 2. Wie sieht die Nianna Blume aus? <br> 3. Wie wird die Nianna Blume verwendet?", "Mykah:<br>1. Where does the nianna flower grow? <br>2. What does the nianna flower look like? <br>3. How is the nianna flower used?"),
            new Break("Noot"),
            new Dialogue("Mykah:<br>Hast du alles nachgeschaut? <br> Dann kannst du deine Ergebnisse hier Eintragen", "Mykah:<br>Did you look everything up? You can put in your results here"),
            this.formEle,
        ];
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
            else if (this.dialogues[this.currentDialogue] instanceof Break) {
                let current: Break = <Break>this.dialogues[this.currentDialogue];
                this.hideDialouge();

                if (current.typeQuest == "Pages" && pagesCollected == true) {
                    this.currentDialogue++;
                    this.showDialogue();
                }
                else if (current.typeQuest == "Noot" && noot.researchAllowed == false) {
                    noot.researchAllowed = true;
                }

                else if (current.typeQuest == "Noot" && noot.researchDone == true) {
                    this.currentDialogue++
                    this.showDialogue();
                }
                quest.updateCounter(); 

            }

            else if (this.dialogues[this.currentDialogue] instanceof talkyTalk) {
                this.textBox.innerHTML = this.talk.returnPrompt(); 
                this.talk.setAllowed(true); 
                this.nextButton.style.visibility = "hidden";
            }

            else if (this.dialogues[this.currentDialogue] instanceof formTest) {
                this.formEle.setup(); 
                this.formEle.showForm();
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
            if (translateAllowed) {
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

        getSpeech(): void {
            let said: string = this.talk.whatWasSaid;
            switch (said) {
                case "hallo":
                    this.answertoSaid = "Mykah:<br> Hallo!";
                    this.translateSaid = "Mykah:<br>Hello!";
                    break;
                case "hey":
                    this.answertoSaid = "Mykah:<br>Hey!"
                    this.translateSaid = "Mykah:<br>Hey!";
                    break;
                case "guten tag":
                    this.answertoSaid = "Mykah:<br>Guten Tag!"
                    this.translateSaid = "Mykah:<br>Good Day!";
                    break;
                default:
                    this.answertoSaid = "Mykah:<br>Schön dich zu sehen!"
                    this.translateSaid = "Mykah:<br>Nice to see you!";
                    break;
            }
            this.dialogue.setNewText(this.answertoSaid, this.translateSaid);
            this.talk.setAllowed(false); 
            this.currentDialogue++;
            this.showDialogue();  
        }

    }
}