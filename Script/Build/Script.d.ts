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
    let inventory: Page[];
    function update(_event: Event): void;
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
        start: string;
        end: string;
        constructor(_start?: string, _end?: string);
        protected reduceMutator(_mutator: ƒ.Mutator): void;
    }
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Paths extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        paths: ƒ.MutableArray<Path>;
        constructor();
        hndEvent: (_event: Event) => void;
        deserialize(_serialization: ƒ.Serialization): Promise<ƒ.Serializable>;
    }
}
declare namespace Script {
    let canvas: HTMLCanvasElement;
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
