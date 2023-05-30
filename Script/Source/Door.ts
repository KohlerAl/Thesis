namespace Script {
    import ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

    export class Door extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(Door);
        // Properties may be mutated by users in the editor via the automatically created user interface
        switchToGraph: string;

        constructor() {
            super();
            this.constructor;
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;

            // Listen to this component being added to or removed from a node
            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
            this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
            this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
        }

        // Activate the functions of this component as response to events
        public hndEvent = (_event: Event): void => {
            switch (_event.type) {
                case ƒ.EVENT.COMPONENT_ADD:
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case ƒ.EVENT.COMPONENT_REMOVE:
                    this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
                    this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
                    break;
                case ƒ.EVENT.NODE_DESERIALIZED:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        }

        public switchGraph(): void {
            //viewport.initialize("InteractiveViewport", this.switchToGraph, cmpCamera, canvas); 
            let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources[this.switchToGraph];
            viewport.setBranch(graph);
            viewport.canvas.removeEventListener("pointerdown", viewportClick); 
            branch.removeEventListener("pointerdown", <ƒ.EventListenerUnified>handleClick);
            canvas.dispatchEvent(
                new CustomEvent("interactiveViewportStarted", {
                    bubbles: true,
                    detail: viewport
                })
            );
        }
    }
}