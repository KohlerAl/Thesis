namespace Script {
    export class Dialogue{
        textGerman: string; 
        textEnglish: string; 

        constructor(_textGerman: string, _textEnglish: string) {
            this.textGerman = _textGerman; 
            this.textEnglish = _textEnglish; 
        }

        setNewText(_newTextGerman: string, _newTextEnglish: string): void {
            this.textGerman = _newTextGerman; 
            this.textEnglish = _newTextEnglish; 
        }
    }
}