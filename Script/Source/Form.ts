namespace Script {
    let instance: formTest;

    export class formTest {
        private rightName: string = "nianna";
        private rightOrigin: string = "Nelara";
        private rightColors: string[] = ["blau", "rosa", "lila"];
        private rightDescription: string[] = ["allYear", "smell", "paleRound"];
        private rightImage: string = "Nianna";

        private buttonEle: HTMLButtonElement;
        private formEle: HTMLFormElement;

        constructor() {
            this.buttonEle = document.querySelector("#submit");
            this.buttonEle.addEventListener("pointerdown", this.handleSubmit)

            instance = this;
        }

        handleSubmit(): void {
            let formData: FormData = new FormData(document.forms[0]);
            for (let entry of formData) {  
                console.log(entry); 
            }
        }
    }
}