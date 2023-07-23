declare namespace Script {
    enum STATE {
        LEFT = 0,
        RIGHT = 1,
        STAND = 2
    }
    class Alien extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        alienNode: ƒ.Node;
        animation: ƒ.ComponentAnimator;
        currentTransform: ƒ.ComponentTransform;
        nextTransform: ƒ.ComponentTransform;
        state: STATE;
        animationLeft: ƒ.ComponentAnimator;
        animationRight: ƒ.ComponentAnimator;
        animationStand: ƒ.ComponentAnimator;
        constructor();
        changeState(_new: ƒ.Node, _current: ƒ.Node): void;
        changeAnimation(): void;
        hndEvent: (_event: Event) => void;
        setup(): Promise<void>;
        setToGround(): void;
    }
}
declare namespace Script {
    class Answer {
        choiceAGerman: string;
        choiceAEnglish: string;
        choiceBGerman: string;
        choiceBEnglish: string;
        constructor(_choiceAGerman: string, _choiceAEnglish: string, _choiceBGerman: string, _choiceBEnglish: string);
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Board extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        pages: Page[];
        currentPage: number;
        letterBox: HTMLDivElement;
        p: HTMLParagraphElement;
        currentLanguage: string;
        constructor();
        hndEvent: (_event: Event) => void;
        openPage(): void;
        showTranslation(): void;
        changePage(_event: Event): void;
        flipPage(): void;
        closePage(): void;
        collectPage(): void;
    }
}
declare namespace Script {
    class Break {
        typeQuest: string;
        fulfilled: boolean;
        constructor(_type: string);
    }
}
declare namespace Script {
    class Dialogue {
        textGerman: string;
        textEnglish: string;
        constructor(_textGerman: string, _textEnglish: string);
        setNewText(_newTextGerman: string, _newTextEnglish: string): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Door extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        switchToGraph: string;
        constructor();
        hndEvent: (_event: Event) => void;
        switchGraph(): void;
    }
}
declare namespace Script {
    class formTest {
        private rightName;
        private rightOrigin;
        private rightColors;
        private rightDescription;
        private rightImage;
        private buttonEle;
        private formEle;
        private isShowing;
        private isChecked;
        checkSubmit(): void;
        setup(): void;
        handleSubmit(): void;
        switchClass(_entry: string, _rightValue: string, _ele: HTMLInputElement | HTMLSelectElement): boolean;
        showForm(): void;
        checkAll(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Interactable extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        dialogue: Text;
        private timeout;
        constructor();
        hndEvent: (_event: Event) => void;
        showText(): void;
        hideText(): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    export import ƒAid = FudgeAid;
    let viewport: ƒ.Viewport;
    let nodePaths: ƒ.Node;
    let crc2: CanvasRenderingContext2D;
    let branch: ƒ.Node;
    let walker: PathWalker;
    let player: ƒ.Node;
    let current: ƒ.Node;
    let next: ƒ.Node;
    let noot: Noot;
    let translateAllowed: boolean;
    let pagesCollected: boolean;
    let quest: Quest;
    let inventory: Page[];
    function update(_event: Event): void;
    function handleClick(_event: PointerEvent): void;
    function viewportClick(_event: PointerEvent): void;
    function findWaypoint(_target: string): void;
}
declare namespace Script {
    import ƒ = FudgeCore;
    class NPC extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        currentDialogue: number;
        private formEle;
        talk: talkyTalk;
        answertoSaid: string;
        translateSaid: string;
        private dialogue;
        dialogues: (formTest | Dialogue | Answer | Break | talkyTalk)[];
        readonly dialogueBox: HTMLDivElement;
        readonly textBox: HTMLParagraphElement;
        readonly nextButton: HTMLDivElement;
        currentlanguage: string;
        constructor();
        hndEvent: (_event: Event) => void;
        showDialogue(): void;
        showNext(): void;
        hideDialouge(): void;
        choose(): void;
        switchLanguage(_event: Event): void;
        getSpeech(): void;
    }
}
declare namespace Script {
    class Noot {
        private activeTranslate;
        researchAllowed: boolean;
        researchDone: boolean;
        private imgElement;
        private nootMenu;
        private vocabContainer;
        private menuActive;
        private vocabActive;
        private researchActive;
        constructor();
        private toggleMenu;
        handleInteract(_event: PointerEvent): void;
        private createTable;
        private setVocab;
        private setResearch;
    }
}
declare namespace Script {
    class Page {
        textenglish: string;
        textgerman: string;
        shouldCollect: boolean;
        constructor(_textgerman: string, _textenglish: string, _shouldCollect: boolean);
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Path extends ƒ.Mutable {
        #private;
        start: string;
        end: string;
        constructor(_start?: string, _end?: string);
        set cost(_cost: number);
        get cost(): number;
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class PathWalker extends ƒ.ComponentScript {
        #private;
        static readonly iSubclass: number;
        speed: number;
        constructor();
        hndEvent: (_event: Event) => void;
        walk(_waypoints: ƒ.Node[]): void;
        private move;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Paths extends ƒ.ComponentScript {
        #private;
        static readonly iSubclass: number;
        paths: ƒ.MutableArray<Path>;
        constructor();
        hndEvent: (_event: Event) => void;
        deserialize(_serialization: ƒ.Serialization): Promise<ƒ.Serializable>;
        private setupMatrix;
        findPath(_start: string, _end: string): ƒ.Node[];
        private getPath;
        private calculateDistance;
    }
}
declare namespace Script {
    class Quest {
        quests: string[];
        questsCounter: number;
        questEle: HTMLDivElement;
        questHeader: HTMLHeadingElement;
        constructor();
        displayQuest(): void;
        updateCounter(): void;
        hideQuest(): void;
    }
}
declare namespace Script {
    abstract class Question {
        question: string;
        answer: string;
        questionBox: HTMLElement;
        commitedAnswer: string;
        constructor(_question: string, _answer: string, _questionBox: HTMLElement);
        displayQuestion(): void;
        isAnswerRight(): boolean;
    }
    class TextfieldQuestion extends Question {
        input: HTMLInputElement;
        constructor(_question: string, _answer: string, _questionBox: HTMLElement);
        displayQuestion(): void;
        isAnswerRight(): boolean;
    }
    class ImageQuestion extends Question {
        imageOne: string;
        imageTwo: string;
        imageThree: string;
        constructor(_question: string, _answer: string, _imgOne: string, _imgTwo: string, _imgThree: string, _questionBox: HTMLElement);
        displayQuestion(): void;
        getAnswer(_event: Event): void;
        isAnswerRight(): boolean;
    }
    class MultipleChoiceQuestion extends Question {
        answerChoiceOne: string;
        answerChoiceTwo: string;
        answerChoiceThree: string;
        constructor(_question: string, _answer: string, _answerChoiceOne: string, _answerChoiceTwo: string, _answerChoiceThree: string, _questionBox: HTMLElement);
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    let canvas: HTMLCanvasElement;
    let cmpCamera: ƒ.ComponentCamera;
    function setUpCam(): void;
    function createCamera(): ƒ.ComponentCamera;
}
declare namespace Script {
    function startArtyom(): void;
    class talkyTalk {
        prompt: string;
        whatWasSaid: string;
        talkingAllowed: boolean;
        returnSaid(): string;
        returnAllowed(): boolean;
        setSaid(_newValue: string): void;
        setAllowed(_newValue: boolean): void;
        returnPrompt(): string;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Text extends ƒ.Mutable {
        text: string;
        constructor(_englishText?: string);
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Waypoint extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
