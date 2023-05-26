namespace Script {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

    let classInstance: Board;
    export class Board extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(Board);
        // Properties may be mutated by users in the editor via the automatically created user interface
        pages: Page[] =
            [
                new Page("Nianna Blume <br> -Die Blume riecht süß. <br>- Blasse, runde Blüten <br>- Die Blume blüht das ganze Jahr lang.",
                    "Nianna flower <br>- The flower smells sweet. <br>- Pale, round flowers <br>- The flower blooms all year round", true),
                new Page("- Das Öl der Nianna Blume ist gelb und riecht sehr süß. <br>- Das Öl kann Änderungen im Verhalten und der Persönlichkeit hervorrufen",
                    "- The oil of Nianna flower is yellow and smells very sweet. <br>- The oil can cause changes in behavior and personality", true),
                new Page("Die ersten Menschen kamen 1986 auf Nelara an. <br>Sie kamen von der Erde und sollten auf dem neuen <br>Planeten nach Rohstoffen suchen.",
                    "The first humans arrived on Nelara in 1986. <br>They came from Earth and were supposed to search for<br> raw materials on the new planet.", false),
                new Page("Einkaufsliste: <br>Nudeln<br>Tomaten<br>Pilze<br>Äpfel", "Shopping list: <br>Pasta<br>Tomatoes<br>Mushrooms<br>Apples", false),
                new Page("Samstag, 15.00 Uhr: <br>Besuch bei Mama und Papa", "Saturday, 3:00 p.m.: <br>Visit with mom and dad", false),
                new Page("Nicht vergessen: <br>Elvas Geburtstag ist am 5. Juni 3798", "Don't forget: <br>Elva's birthday is June 5, 3798", false)

            ];

        currentPage: number = 0;
        letterBox: HTMLDivElement;
        p: HTMLParagraphElement;
        currentLanguage: string;

        constructor() {
            super();
            this.constructor;
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;


            this.letterBox = document.querySelector("#notes");
            this.p = this.letterBox.querySelector("#noteText");
            this.p.addEventListener("click", this.showTranslation);

            this.letterBox.querySelector("#right").addEventListener("pointerdown", this.changePage);
            this.letterBox.querySelector("#left").addEventListener("pointerdown", this.changePage);
            this.letterBox.querySelector("#Close").addEventListener("pointerdown", this.closePage);
            this.letterBox.querySelector("#Collect").addEventListener("pointerdown", this.collectPage);


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

        public openPage(): void {
            this.letterBox.style.height = viewport.canvas.height + "px";
            this.letterBox.style.width = viewport.canvas.width + "px";
            this.letterBox.style.visibility = "visible";

            this.p.innerHTML = this.pages[this.currentPage].textgerman;
            this.currentLanguage = "german";
            classInstance = this;
        }

        public showTranslation(): void {
            console.log("clicky");
            if (classInstance.currentLanguage == "german") {
                classInstance.p.innerHTML = classInstance.pages[classInstance.currentPage].textenglish;
                classInstance.currentLanguage = "english";
            }
            else {
                classInstance.p.innerHTML = classInstance.pages[classInstance.currentPage].textgerman;
                classInstance.currentLanguage = "german";
            }
        }

        public changePage(_event: Event): void {
            let target: HTMLElement = <HTMLElement>_event.target;
            let id: string = target.id;

            if (id == "right") {
                if (classInstance.currentPage == classInstance.pages.length - 1)
                    classInstance.currentPage = 0;
                else
                    classInstance.currentPage++
            }

            else if (id == "left") {
                if (classInstance.currentPage == 0)
                    classInstance.currentPage = classInstance.pages.length - 1;
                else
                    classInstance.currentPage--;
            }

            classInstance.flipPage();
        }

        public flipPage(): void {
            this.p.innerHTML = "";
            this.p.innerHTML = this.pages[this.currentPage].textgerman;
            classInstance.currentLanguage = "german";
        }

        public closePage(): void {
            classInstance.letterBox.style.visibility = "hidden";
            classInstance.p.innerHTML = "";
            classInstance.currentPage = 0;
            classInstance.currentLanguage = "german";
        }

        public collectPage(): void {
            if (classInstance.pages[classInstance.currentPage].shouldCollect == true) {
                inventory.push(classInstance.pages[classInstance.currentPage]);
                classInstance.pages.splice(classInstance.currentPage, 1);
                console.log(inventory);
                classInstance.flipPage();
            }


            if (inventory.length == 2) {
                let letters: ƒ.Node = branch.getChildrenByName("Letters")[0]; 
                letters.activate(false); 
                update(null)
            }
        }

    }
}