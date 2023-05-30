namespace Script {
    export class Answer {
        choiceAGerman: string; 
        choiceAEnglish: string; 

        choiceBGerman: string; 
        choiceBEnglish: string; 

        constructor(_choiceAGerman: string, _choiceAEnglish: string, _choiceBGerman: string, _choiceBEnglish: string) {
            this.choiceAGerman = _choiceAGerman; 
            this.choiceAEnglish = _choiceAEnglish; 

            this.choiceBGerman = _choiceBGerman; 
            this.choiceBEnglish = _choiceBEnglish; 
        }
    }
}