namespace Script {
    let instance: Noot;
    export class Noot {
        private activeTranslate: boolean = false;
        public researchAllowed: boolean = false;
        public researchDone: boolean = false;

        private imgElement: HTMLImageElement;
        private nootMenu: HTMLDivElement;
        private vocabContainer: HTMLDivElement;

        private menuActive: boolean = false;
        private vocabActive: boolean = false;
        private researchActive: boolean = false;


        constructor() {
            this.imgElement = document.querySelector("#NOOT");
            this.nootMenu = document.querySelector("#NootMenu");
            this.vocabContainer = document.querySelector("#vocabContainer");

            this.imgElement.style.left = viewport.canvas.width - 200 + "px";
            this.imgElement.style.top = viewport.canvas.height - 200 + "px";
            this.imgElement.style.visibility = "visible";

            instance = this;
            this.imgElement.addEventListener("pointerdown", this.toggleMenu);
            this.nootMenu.addEventListener("pointerdown", this.handleInteract);

            this.createTable();
        }

        private toggleMenu(): void {
            if (instance.menuActive) {
                instance.menuActive = false;
                instance.nootMenu.style.display = "none"
            }
            else {
                instance.menuActive = true;
                instance.nootMenu.style.display = "block"
            }
        }

        public handleInteract(_event: PointerEvent): void {
            let target: HTMLElement = <HTMLElement>_event.target;
            let id: string = <string>target.id;

            switch (id) {
                case "translateMode":
                    let translate: HTMLParagraphElement = document.querySelector("#translateMode")
                    if (this.activeTranslate) {
                        translate.classList.remove("active");
                        translate.innerHTML = "Translate Mode Current Status: OFF"
                        translateAllowed = false;
                        this.activeTranslate = false; 
                    }
                    else {
                        this.activeTranslate = true; 
                        translateAllowed= true;
                        translate.classList.add("active");
                        translate.innerHTML = "Translate Mode Current Status: ON"
                    }
                    break;

                case "researchMode":
                    if (instance.researchAllowed)
                        instance.setResearch();
                    break;

                case "vocabList":
                    instance.setVocab();
                    break;
            }
        }

        private async createTable(): Promise<void> {
            let table: Response = await fetch("json/table.json");
            let textTable: string = await table.text();
            let data = JSON.parse(textTable);

            for (let entry of data) {
                let wrapper = document.createElement("div");
                let pGerman = document.createElement("p");
                wrapper.classList.add("tableRow")
                pGerman.innerHTML = entry[0];

                let pEnglish = document.createElement("p");
                pEnglish.innerHTML = entry[1];

                wrapper.appendChild(pGerman);
                wrapper.appendChild(pEnglish);
                this.vocabContainer.appendChild(wrapper);
            }
        }

        private setVocab(): void {
            if (this.vocabActive) {
                this.vocabActive = false;
                this.vocabContainer.style.display = "none";
                document.querySelector("#vocabList").classList.remove("active");
            }
            else {
                this.vocabActive = true;
                this.vocabContainer.style.display = "flex"
                document.querySelector("#vocabList").classList.add("active");


                if (this.researchActive)
                    this.setResearch();
            }

        }

        private setResearch(): void {
            this.researchDone = true; 
            let research: HTMLDivElement = document.querySelector("#researchContainer")
            if (this.researchActive) {
                document.querySelector("#researchMode").classList.remove("active");
                this.researchActive = false;

                research.style.display = "none"
            }
            else {
                this.researchActive = true;
                document.querySelector("#researchMode").classList.add("active");
                research.style.display = "block"

                if (this.vocabActive)
                    this.setVocab();
            }


        }
    }
}