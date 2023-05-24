declare namespace Script {
    import ƒ = FudgeCore;
    class Interactable extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        dialogue: ƒ.Mutable;
        constructor();
        hndEvent: (_event: Event) => void;
        handleClick(): void;
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
    let viewport: ƒ.Viewport;
    let nodePaths: ƒ.Node;
    let crc2: CanvasRenderingContext2D;
    let camNode: ƒ.Node;
    function setUpCam(): void;
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
    class Waypoint extends ƒ.ComponentScript {
        static readonly iSubclass: number;
        constructor();
        hndEvent: (_event: Event) => void;
    }
}
