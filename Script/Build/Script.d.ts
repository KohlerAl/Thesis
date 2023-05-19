declare namespace Script {
    import ƒ = FudgeCore;
    let viewport: ƒ.Viewport;
    let nodePaths: ƒ.Node;
    let crc2: CanvasRenderingContext2D;
}
declare namespace Script {
    import ƒ = FudgeCore;
    class Path extends ƒ.Mutable {
        start: string;
        end: string;
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
