namespace Script {
    let instance: Question; 
    export abstract class Question {
        question: string; 
        answer: string; 
        questionBox: HTMLElement; 
        commitedAnswer: string; 

        constructor(_question: string, _answer: string, _questionBox: HTMLElement) {
            this.question = _question; 
            this.answer = _answer; 
            this.questionBox = _questionBox; 
        }

        displayQuestion(): void {
            let newParagraph: HTMLParagraphElement = document.createElement("p"); 
            newParagraph.innerHTML = this.question; 
            this.questionBox.appendChild(newParagraph); 
        }

        isAnswerRight(): boolean {
            if (this.commitedAnswer == this.answer) 
                return true; 
            
            else   
                return false; 
        }
    }


    export class TextfieldQuestion extends Question {
        input: HTMLInputElement; 
        constructor(_question: string, _answer: string, _questionBox: HTMLElement) {
            super(_question, _answer, _questionBox); 
            instance = this; 
        }

        displayQuestion(): void {
            super.displayQuestion(); 

            this.input = document.createElement("input"); 
            this.input.placeholder = "answer"; 
            this.input.classList.add("answerInput"); 
            this.questionBox.appendChild(this.input); 

            let check: HTMLDivElement = document.createElement("div");
            check.innerHTML = "check"; 
            check.addEventListener("pointerdown", this.isAnswerRight);  
        }

        isAnswerRight(): boolean {
            this.commitedAnswer = this.input.value.toLowerCase(); 
            this.answer = this.answer.toLowerCase(); 
            return super.isAnswerRight(); 
        }
    }

    export class ImageQuestion extends Question {
        imageOne: string; 
        imageTwo: string; 
        imageThree: string;

        constructor(_question: string, _answer: string, _imgOne: string, _imgTwo: string, _imgThree: string, _questionBox: HTMLElement) {
            super(_question, _answer, _questionBox); 
            this.imageOne = _imgOne; 
            this.imageTwo = _imgTwo; 
            this.imageThree = _imgThree; 
            instance = this; 
        }

        displayQuestion(): void {
            super.displayQuestion(); 
            let imageBox: HTMLDivElement = document.createElement("div"); 

            let imageEleOne: HTMLImageElement = document.createElement("img"); 
            imageEleOne.setAttribute("src", this.imageOne); 
            imageEleOne.classList.add("imageQuestion");
            imageBox.appendChild(imageEleOne); 

            let imageEleTwo: HTMLImageElement = document.createElement("img");
            imageEleTwo.setAttribute("src", this.imageTwo); 
            imageEleTwo.classList.add("imageQuestion");
            imageBox.appendChild(imageEleTwo); 

            let imageEleThree: HTMLImageElement = document.createElement("img");
            imageEleThree.setAttribute("src", this.imageThree);
            imageEleThree.classList.add("imageQuestion");
            imageBox.appendChild(imageEleThree); 

            imageBox.addEventListener("pointerdown", this.getAnswer); 
        }

        getAnswer(_event: Event): void {
            
        }

        isAnswerRight(): boolean {

            return super.isAnswerRight(); 
        }
    }

    export class MultipleChoiceQuestion extends Question {
        answerChoiceOne: string; 
        answerChoiceTwo: string; 
        answerChoiceThree: string;

        constructor(_question: string, _answer: string, _answerChoiceOne: string, _answerChoiceTwo: string,_answerChoiceThree: string, _questionBox: HTMLElement) {
            super(_question, _answer, _questionBox); 
            this.answerChoiceOne = _answerChoiceOne; 
            this.answerChoiceTwo = _answerChoiceTwo; 
            this.answerChoiceThree = _answerChoiceThree; 
            instance = this; 
        }
    }
}