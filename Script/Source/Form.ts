namespace Script {
    let instance: formTest;

    interface arrForm {
        [key: string]: boolean
    }

    export class formTest {
        private rightName: string = "nianna";
        private rightOrigin: string = "Nelara";
        private rightColors: string[] = ["blau", "rosa", "lila"];
        private rightDescription: string[] = ["allYear", "smell", "paleRound"];
        private rightImage: string = "nianna";

        private buttonEle: HTMLButtonElement;
        private formEle: HTMLFormElement;

        private isShowing: boolean = false;

        private isChecked: arrForm = {
            name: false,
            origin: false,
            pink: false,
            blue: false,
            purple: false,
            descriptionYear: false,
            descriptionSmell: false,
            descriptionLook: false,
            image: false
        }


        checkSubmit(): void {
            instance.handleSubmit();
        }

        setup(): void {
            this.buttonEle = document.querySelector("#submit");
            this.buttonEle.addEventListener("pointerdown", this.checkSubmit)

            this.formEle = document.querySelector("#form")
            instance = this;
        }

        handleSubmit(): void {
            let formData: FormData = new FormData(document.forms[0]);
            for (let entry of formData) {
                switch (entry[0]) {
                    case "plantName":
                        let lowerEntry: string = <string>entry[1];
                        let inputEle: HTMLInputElement = document.querySelector("#plantName");
                        if (this.switchClass(lowerEntry.toLowerCase(), this.rightName, inputEle))
                            this.isChecked.name = true;
                        break;

                    case "origin":
                        let originEle: HTMLSelectElement = document.querySelector("#originList");
                        if (this.switchClass(entry[1].toString(), this.rightOrigin, originEle))
                            this.isChecked.origin = true;
                        break;

                    case "color":
                        let colorInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".formInput");
                        for (let input of colorInputs) {
                            if (entry[1].toString().toLowerCase() == this.rightColors[0] || entry[1].toString().toLowerCase() == this.rightColors[1] || entry[1].toString().toLowerCase() == this.rightColors[2]) {
                                input.disabled = true;
                                input.classList.add("right");

                                switch (entry[1].toString().toLowerCase()) {
                                    case "blau":
                                        this.isChecked.blue = true;
                                        break;
                                    case "rosa":
                                        this.isChecked.pink = true;
                                        break;
                                    case "lila":
                                        this.isChecked.purple = true;
                                        break;
                                }

                                if (input.classList.contains("wrong"))
                                    input.classList.remove("wrong");
                            }
                            else {
                                input.classList.add("wrong");
                            }
                        }

                        break;

                    case "description":
                        let input: HTMLInputElement = <HTMLInputElement>document.getElementById(entry[1].toString());
                        if (input.checked == true) {
                            if (entry[1].toString() == this.rightDescription[0] || entry[1].toString() == this.rightDescription[1] || entry[1].toString() == this.rightDescription[2]) {
                                input.disabled = true;
                                input.classList.add("right");

                                switch (entry[1]) {
                                    case "allYear":
                                        this.isChecked.descriptionYear = true;
                                        break;
                                    case "smell":
                                        this.isChecked.descriptionSmell = true;
                                        break;
                                    case "paleRound":
                                        this.isChecked.descriptionLook = true;
                                        break;
                                }

                                if (input.classList.contains("wrong")) {
                                    input.classList.remove("wrong");
                                }
                            }
                            else {
                                input.classList.add("wrong");
                            }
                        }

                        if (this.isChecked.descriptionYear == true && this.isChecked.descriptionSmell == true && this.isChecked.descriptionLook == true) {
                            let allInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".descriptionRadio")
                            for (let entry of allInputs) {
                                entry.disabled = true; 
                            }
                        }
                        break;

                    case "image":
                        if (entry[1].toString() == this.rightImage) {
                            let allImgs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".imgRadio");
                            for (let img of allImgs) {
                                img.disabled = true;
                                img.classList.add("right");
                            }
                            this.isChecked.image = true;
                        }
                        break;

                }
            }
            this.checkAll();
        }

        switchClass(_entry: string, _rightValue: string, _ele: HTMLInputElement | HTMLSelectElement): boolean {
            if (_entry == _rightValue) {
                if (_ele.classList.contains("wrong"))
                    _ele.classList.remove("wrong");

                _ele.classList.add("right");
                _ele.disabled = true;

                return true;
            }
            else {
                if (!_ele.classList.contains("wrong"))
                    _ele.classList.add("wrong");

                return false;
            }
        }

        showForm(): void {
            if (this.isShowing == false) {
                this.formEle.style.display = "block"
                this.isShowing = true;
            }

            else {
                this.formEle.style.display = "none";
                this.isShowing = false;
            }
        }

        checkAll(): void {
            let counter: number = 0;

            for (let entry in this.isChecked) {
                if (this.isChecked[entry] == true)
                    counter++
            }


            if (counter == 9)
                alert("Das war der Prototyp! Danke fürs Spielen! :)")
        }
    }
}