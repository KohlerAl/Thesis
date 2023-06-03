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
    class Dialogue {
        textGerman: string;
        textEnglish: string;
        constructor(_textGerman: string, _textEnglish: string);
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
    let viewport: ƒ.Viewport;
    let nodePaths: ƒ.Node;
    let crc2: CanvasRenderingContext2D;
    let branch: ƒ.Node;
    let walker: PathWalker;
    let inventory: Page[];
    function update(_event: Event): void;
    function handleClick(_event: PointerEvent): void;
    function viewportClick(_event: PointerEvent): void;
}
declare namespace Script {
    import ƒ = FudgeCore;
    class NPC extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        currentDialogue: number;
        dialogues: (Dialogue | Answer)[];
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
    import ƒ = FudgeCore;
    let canvas: HTMLCanvasElement;
    let cmpCamera: ƒ.ComponentCamera;
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
