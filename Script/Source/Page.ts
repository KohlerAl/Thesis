namespace Script {
    export class Page {
        public textenglish: string; 
        public textgerman: string; 
        public shouldCollect: boolean; 

        constructor(_textgerman: string, _textenglish: string, _shouldCollect: boolean) {
            this.textenglish = _textenglish; 
            this.textgerman = _textgerman; 
            this.shouldCollect = _shouldCollect; 
        }
    }
}