"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Interactable extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Interactable);
        // Properties may be mutated by users in the editor via the automatically created user interface
        dialogue = new Script.Text();
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
            console.log(_event);
        };
        handleClick() {
            console.log("hello click");
        }
    }
    Script.Interactable = Interactable;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Text extends ƒ.Mutable {
        text = "A";
        constructor(_englishText) {
            super();
            this.text = _englishText;
        }
        reduceMutator(_mutator) {
            // delete properties that should not be mutated
            // undefined properties and private fields (#) will not be included by default
        }
    }
    Script.Text = Text;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    document.addEventListener("interactiveViewportStarted", start);
    function start(_event) {
        Script.viewport = _event.detail;
        Script.nodePaths = Script.viewport.getBranch().getChildrenByName("Paths")[0];
        Script.crc2 = Script.viewport.canvas.getContext("2d");
        //viewport.canvas.addEventListener("pointerdown", handleClick);
        setUpCam();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        update(null);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        Script.viewport.draw();
        Script.nodePaths.broadcastEvent(new CustomEvent("renderWaypoints"));
        //ƒ.AudioManager.default.update();
    }
    function setUpCam() {
        Script.camNode = new ƒ.Node("camNode");
        Script.camNode.addComponent(createCamera());
        Script.camNode.addComponent(new ƒ.ComponentTransform());
        Script.camNode.mtxLocal.scale(new ƒ.Vector3(1, 2, 1));
    }
    Script.setUpCam = setUpCam;
    function createCamera() {
        let newCam = new ƒ.ComponentCamera();
        //newCam.projectOrthographic(); 
        Script.viewport.camera = newCam;
        Script.viewport.camera.projectCentral(Script.canvas.clientWidth / Script.canvas.clientHeight, 5);
        //viewport.camera.mtxPivot.translate(new ƒ.Vector3(0, 0, 0));
        Script.viewport.camera.mtxPivot.rotateY(180);
        Script.viewport.camera.mtxPivot.translateZ(-18);
        //viewport.camera.mtxPivot.scale(new ƒ.Vector3(2, 1, 2));
        return newCam;
    }
    function handleClick() {
        let branch = Script.viewport.getBranch();
        let children = branch.getChildren();
        for (let child of children) {
            let childNodes = child.getChildren();
            for (let kid of childNodes) {
                console.log(kid.getComponent(Script.Interactable));
            }
        }
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    class Path extends ƒ.Mutable {
        start = "A";
        end = "B";
        constructor(_start, _end) {
            super();
            this.start = _start;
            this.end = _end;
        }
        reduceMutator(_mutator) {
            // delete properties that should not be mutated
            // undefined properties and private fields (#) will not be included by default
        }
    }
    Script.Path = Path;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Paths extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Paths);
        // Properties may be mutated by users in the editor via the automatically created user interface
        paths = new ƒ.MutableArray(Script.Path, new Script.Path());
        constructor() {
            super();
            this.constructor;
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    this.node.addEventListener("renderWaypoints", this.hndEvent, true);
                    break;
                case "renderWaypoints":
                    console.log(this.node.name);
                    for (let path of this.paths) {
                        console.log(path);
                        let posStart = Script.viewport.pointWorldToClient(Script.nodePaths.getChildrenByName(path.start)[0].mtxWorld.translation);
                        let posEnd = Script.viewport.pointWorldToClient(Script.nodePaths.getChildrenByName(path.end)[0].mtxWorld.translation);
                        Script.crc2.beginPath();
                        Script.crc2.strokeStyle = "red";
                        Script.crc2.moveTo(posStart.x, posStart.y);
                        Script.crc2.lineTo(posEnd.x, posEnd.y);
                        Script.crc2.stroke();
                        break;
                    }
            }
        };
        async deserialize(_serialization) {
            let paths = [];
            for (let path of _serialization["paths"])
                paths.push(new Script.Path(path.start, path.end));
            this.paths = new ƒ.MutableArray(Script.Path, ...paths);
            await super.deserialize(_serialization);
            return this;
        }
    }
    Script.Paths = Paths;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let dialog;
    function init(_event) {
        dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event) {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            startInteractiveViewport();
        });
        //@ts-ignore
        dialog.showModal();
    }
    async function startInteractiveViewport() {
        await ƒ.Project.loadResourcesFromHTML();
        ƒ.Debug.log("Project:", ƒ.Project.resources);
        let graph = ƒ.Project.resources["Graph|2023-05-18T10:13:48.300Z|18467"];
        ƒ.Debug.log("Graph:", graph);
        if (!graph) {
            alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
            return;
        }
        let cmpCamera = new ƒ.ComponentCamera();
        Script.canvas = document.querySelector("canvas");
        let viewport = new ƒ.Viewport();
        viewport.initialize("InteractiveViewport", graph, cmpCamera, Script.canvas);
        ƒ.Debug.log("Viewport:", viewport);
        viewport.draw();
        Script.canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", {
            bubbles: true,
            detail: viewport
        }));
    }
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Waypoint extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Waypoint);
        // Properties may be mutated by users in the editor via the automatically created user interface
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    // ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    this.node.addEventListener("renderWaypoints", this.hndEvent, true);
                    break;
                case "renderWaypoints":
                    console.log(this.node.name);
                    let posWorld = this.node.mtxWorld.translation;
                    let posClient = Script.viewport.pointWorldToClient(posWorld);
                    Script.crc2.fillStyle = "red";
                    Script.crc2.fillRect(posClient.x, posClient.y, 10, 10);
                    break;
            }
        };
    }
    Script.Waypoint = Waypoint;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map