namespace Script {

    export class Quest {
        quests: string[] = ["Go to Mykah and ask if they need help.", "Find the two notes Mykah described.", "Look up the answers for Mykah’s questions with Noot", "Return to Mykah"]; 
        questsCounter: number = 0;
        questEle: HTMLDivElement; 
        questHeader: HTMLHeadingElement; 
        
        constructor() {
            this.questEle = document.querySelector("#questEle"); 
            this.questHeader = this.questEle.querySelector("h1"); 
        }

        displayQuest(): void {
            this.questEle.style.display = "block"; 
            this.questHeader.innerHTML = this.quests[this.questsCounter];
        }

        updateCounter(): void {
            this.questsCounter++;
            this.displayQuest(); 
        }

        hideQuest(): void {
            this.questEle.style.display = "none"; 
        }
    }
}