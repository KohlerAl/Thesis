namespace Script {
    export class Answer {
        //class for a dialogue when the player has the option to choose from different options
        //both options are saved in english and german, so that they can be shown in both languages
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