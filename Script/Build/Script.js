"use strict";
var Script;
(function (Script) {
    class Answer {
        choiceAGerman;
        choiceAEnglish;
        choiceBGerman;
        choiceBEnglish;
        constructor(_choiceAGerman, _choiceAEnglish, _choiceBGerman, _choiceBEnglish) {
            this.choiceAGerman = _choiceAGerman;
            this.choiceAEnglish = _choiceAEnglish;
            this.choiceBGerman = _choiceBGerman;
            this.choiceBEnglish = _choiceBEnglish;
        }
    }
    Script.Answer = Answer;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    let classInstance;
    class Board extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Board);
        // Properties may be mutated by users in the editor via the automatically created user interface
        pages = [
            new Script.Page("Nianna Blume <br> -Die Blume riecht süß. <br>- Blasse, runde Blüten <br>- Die Blume blüht das ganze Jahr lang.", "Nianna flower <br>- The flower smells sweet. <br>- Pale, round flowers <br>- The flower blooms all year round", true),
            new Script.Page("- Das Öl der Nianna Blume ist gelb und riecht sehr süß. <br>- Das Öl kann Änderungen im Verhalten und der Persönlichkeit hervorrufen", "- The oil of Nianna flower is yellow and smells very sweet. <br>- The oil can cause changes in behavior and personality", true),
            new Script.Page("Die ersten Menschen kamen 1986 auf Nelara an. <br>Sie kamen von der Erde und sollten auf dem neuen <br>Planeten nach Rohstoffen suchen.", "The first humans arrived on Nelara in 1986. <br>They came from Earth and were supposed to search for<br> raw materials on the new planet.", false),
            new Script.Page("Einkaufsliste: <br>Nudeln<br>Tomaten<br>Pilze<br>Äpfel", "Shopping list: <br>Pasta<br>Tomatoes<br>Mushrooms<br>Apples", false),
            new Script.Page("Samstag, 15.00 Uhr: <br>Besuch bei Mama und Papa", "Saturday, 3:00 p.m.: <br>Visit with mom and dad", false),
            new Script.Page("Nicht vergessen: <br>Elvas Geburtstag ist am 5. Juni 3798", "Don't forget: <br>Elva's birthday is June 5, 3798", false)
        ];
        currentPage = 0;
        letterBox;
        p;
        currentLanguage;
        constructor() {
            super();
            this.constructor;
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            this.letterBox = document.querySelector("#notes");
            this.p = this.letterBox.querySelector("#noteText");
            this.p.addEventListener("click", this.showTranslation);
            this.letterBox.querySelector("#right").addEventListener("pointerdown", this.changePage);
            this.letterBox.querySelector("#left").addEventListener("pointerdown", this.changePage);
            this.letterBox.querySelector("#Close").addEventListener("pointerdown", this.closePage);
            this.letterBox.querySelector("#Collect").addEventListener("pointerdown", this.collectPage);
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
        };
        openPage() {
            this.letterBox.style.height = Script.viewport.canvas.height + "px";
            this.letterBox.style.width = Script.viewport.canvas.width + "px";
            this.letterBox.style.visibility = "visible";
            this.p.innerHTML = this.pages[this.currentPage].textgerman;
            this.currentLanguage = "german";
            classInstance = this;
        }
        showTranslation() {
            console.log("clicky");
            if (classInstance.currentLanguage == "german") {
                classInstance.p.innerHTML = classInstance.pages[classInstance.currentPage].textenglish;
                classInstance.currentLanguage = "english";
            }
            else {
                classInstance.p.innerHTML = classInstance.pages[classInstance.currentPage].textgerman;
                classInstance.currentLanguage = "german";
            }
        }
        changePage(_event) {
            let target = _event.target;
            let id = target.id;
            if (id == "right") {
                if (classInstance.currentPage == classInstance.pages.length - 1)
                    classInstance.currentPage = 0;
                else
                    classInstance.currentPage++;
            }
            else if (id == "left") {
                if (classInstance.currentPage == 0)
                    classInstance.currentPage = classInstance.pages.length - 1;
                else
                    classInstance.currentPage--;
            }
            classInstance.flipPage();
        }
        flipPage() {
            this.p.innerHTML = "";
            this.p.innerHTML = this.pages[this.currentPage].textgerman;
            classInstance.currentLanguage = "german";
        }
        closePage() {
            classInstance.letterBox.style.visibility = "hidden";
            classInstance.p.innerHTML = "";
            classInstance.currentPage = 0;
            classInstance.currentLanguage = "german";
        }
        collectPage() {
            if (classInstance.pages[classInstance.currentPage].shouldCollect == true) {
                Script.inventory.push(classInstance.pages[classInstance.currentPage]);
                classInstance.pages.splice(classInstance.currentPage, 1);
                console.log(Script.inventory);
                classInstance.flipPage();
            }
            if (Script.inventory.length == 2) {
                let letters = Script.branch.getChildrenByName("Letters")[0];
                letters.activate(false);
                Script.update(null);
            }
        }
    }
    Script.Board = Board;
})(Script || (Script = {}));
var Script;
(function (Script) {
    class Dialogue {
        textGerman;
        textEnglish;
        constructor(_textGerman, _textEnglish) {
            this.textGerman = _textGerman;
            this.textEnglish = _textEnglish;
        }
    }
    Script.Dialogue = Dialogue;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Door extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Door);
        // Properties may be mutated by users in the editor via the automatically created user interface
        switchToGraph;
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
                    break;
            }
        };
        switchGraph() {
            //viewport.initialize("InteractiveViewport", this.switchToGraph, cmpCamera, canvas); 
            let graph = ƒ.Project.resources[this.switchToGraph];
            Script.viewport.setBranch(graph);
            Script.viewport.canvas.removeEventListener("pointerdown", Script.viewportClick);
            Script.branch.removeEventListener("pointerdown", Script.handleClick);
            Script.canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", {
                bubbles: true,
                detail: Script.viewport
            }));
        }
    }
    Script.Door = Door;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class Interactable extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(Interactable);
        // Properties may be mutated by users in the editor via the automatically created user interface
        dialogue = new Script.Text();
        timeout;
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
                    break;
            }
        };
        showText() {
            let dialogueBox = document.querySelector("#dialogue");
            let text = dialogueBox.querySelector("p");
            dialogueBox.style.visibility = "visible";
            text.innerHTML = this.dialogue.text;
            this.timeout = window.setTimeout(this.hideText, 10000);
        }
        hideText() {
            clearTimeout(this.timeout);
            let dialogueBox = document.querySelector("#dialogue");
            dialogueBox.style.visibility = "hidden";
        }
    }
    Script.Interactable = Interactable;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    document.addEventListener("interactiveViewportStarted", start);
    Script.inventory = [];
    function start(_event) {
        Script.viewport = _event.detail;
        Script.branch = Script.viewport.getBranch();
        Script.nodePaths = Script.viewport.getBranch().getChildrenByName("Paths")[0];
        Script.crc2 = Script.viewport.canvas.getContext("2d");
        setUpCam();
        Script.viewport.canvas.addEventListener("pointerdown", viewportClick);
        Script.branch.addEventListener("pointerdown", handleClick);
        let dialogueBox = document.querySelector("#dialogue");
        dialogueBox.style.width = Script.viewport.canvas.width + "px";
        let npcBox = document.querySelector("#npcTalk");
        npcBox.style.width = Script.viewport.canvas.width + "px";
        /* let zoo: ƒ.Node = branch.getChildrenByName("NPC")[0];
    
        let meshShpere: ƒ.MeshSphere = new ƒ.MeshSphere("BoundingSphere", 40, 40);
        let material: ƒ.Material = new ƒ.Material("Transparent", ƒ.ShaderLit, new ƒ.CoatColored(ƒ.Color.CSS("white", 0.5)));
    
    
        let sphere: ƒ.Node = new ƒAid.Node(
          "BoundingSphere", ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2)), material, meshShpere
        );
        sphere.mtxLocal.scale(ƒ.Vector3.ONE(zoo.radius));
        console.warn(zoo.radius)
        let cmpMesh: ƒ.ComponentMesh = zoo.getComponent(ƒ.ComponentMesh);
        sphere.mtxLocal.translation = cmpMesh.mtxWorld.translation;
        sphere.getComponent(ƒ.ComponentMaterial).sortForAlpha = true;
        branch.appendChild(sphere); */
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        update(null);
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        Script.viewport.draw();
        Script.nodePaths.broadcastEvent(new CustomEvent("renderWaypoints"));
        //ƒ.AudioManager.default.update();
    }
    Script.update = update;
    function setUpCam() {
        let camNode;
        camNode = new ƒ.Node("camNode");
        camNode.addComponent(createCamera());
        camNode.addComponent(new ƒ.ComponentTransform());
        camNode.mtxLocal.scale(new ƒ.Vector3(1, 2, 1));
    }
    function createCamera() {
        let newCam = new ƒ.ComponentCamera();
        Script.viewport.camera = newCam;
        Script.viewport.camera.projectCentral(Script.canvas.clientWidth / Script.canvas.clientHeight, 5);
        Script.viewport.camera.mtxPivot.rotateY(180);
        Script.viewport.camera.mtxPivot.translateZ(-18);
        return newCam;
    }
    function handleClick(_event) {
        let node = _event.target;
        if (node.getComponent(Script.Interactable)) {
            let dialogue = node.getComponent(Script.Interactable);
            dialogue.showText();
        }
        else if (node.getComponent(Script.Board)) {
            let board = node.getComponent(Script.Board);
            board.openPage();
        }
        else if (node.getComponent(Script.Door)) {
            let door = node.getComponent(Script.Door);
            door.switchGraph();
        }
        else if (node.getComponent(Script.NPC)) {
            let npc = node.getComponent(Script.NPC);
            npc.showDialogue();
        }
    }
    Script.handleClick = handleClick;
    function viewportClick(_event) {
        Script.viewport.draw();
        Script.viewport.dispatchPointerEvent(_event);
    }
    Script.viewportClick = viewportClick;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    let instance;
    class NPC extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(NPC);
        // Properties may be mutated by users in the editor via the automatically created user interface
        currentDialogue = 0;
        dialogues = [
            new Script.Dialogue("Hallo Player. Schön, dich zu sehen. <br> Und danke, dass du uns hilfst.", "Hello Player. It’s good to see you. <br>And thank you for supporting us."),
            new Script.Dialogue("Hallo Mykah.", "Hello Mykah"),
            new Script.Answer("Kann ich dir bei etwas helfen?", "Can I help you with something?", "Wie kann ich dir helfen?", "How can I support you?")
        ];
        dialogueBox;
        textBox;
        nextButton;
        currentlanguage = "german";
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
            this.dialogueBox = document.querySelector("#npcTalk");
            this.textBox = this.dialogueBox.querySelector("p");
            this.textBox.addEventListener("pointerdown", this.switchLanguage);
            this.nextButton = this.dialogueBox.querySelector("#Next");
            this.nextButton.addEventListener("pointerdown", this.showNext);
            instance = this;
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
        };
        showDialogue() {
            this.dialogueBox.style.visibility = "visible";
            this.nextButton.style.visibility = "visible";
            this.textBox.innerHTML = "";
            if (this.dialogues[this.currentDialogue] instanceof Script.Dialogue) {
                let current = this.dialogues[this.currentDialogue];
                if (this.currentlanguage == "german")
                    this.textBox.innerHTML = current.textGerman;
                else
                    this.textBox.innerHTML = current.textEnglish;
            }
            else if (this.dialogues[this.currentDialogue] instanceof Script.Answer) {
                let current = this.dialogues[this.currentDialogue];
                if (this.currentlanguage == "german")
                    this.textBox.innerHTML = "<p>" + current.choiceAGerman + "</p><div id='optionA'>choose</div> <br>" +
                        "<p>" + current.choiceBGerman + "</p><div id='optionB'>choose</div>";
                else
                    this.textBox.innerHTML = "<p>" + current.choiceAEnglish + "</p><div id='optionA'>choose</div> <br>" +
                        "<p>" + current.choiceBEnglish + "</p><div id='optionB'>choose</div>";
                this.nextButton.style.visibility = "hidden";
                this.dialogueBox.querySelector("#optionA").addEventListener("pointerdown", this.choose);
                this.dialogueBox.querySelector("#optionB").addEventListener("pointerdown", this.choose);
            }
        }
        showNext() {
            instance.currentDialogue++;
            instance.currentlanguage = "german";
            if (instance.currentDialogue <= instance.dialogues.length - 1) {
                instance.showDialogue();
            }
            else {
                instance.hideDialouge();
            }
        }
        hideDialouge() {
            this.dialogueBox.style.visibility = "hidden";
            this.nextButton.style.visibility = "hidden";
        }
        choose() {
            instance.nextButton.style.visibility = "visible";
            instance.showNext();
        }
        switchLanguage(_event) {
            let target = _event.target;
            if (target.id != "optionA" && target.id != "optionB") {
                if (instance.currentlanguage == "german")
                    instance.currentlanguage = "english";
                else if (instance.currentlanguage == "english")
                    instance.currentlanguage = "german";
                instance.showDialogue();
            }
        }
    }
    Script.NPC = NPC;
})(Script || (Script = {}));
var Script;
(function (Script) {
    class Page {
        textenglish;
        textgerman;
        shouldCollect;
        constructor(_textgerman, _textenglish, _shouldCollect) {
            this.textenglish = _textenglish;
            this.textgerman = _textgerman;
            this.shouldCollect = _shouldCollect;
        }
    }
    Script.Page = Page;
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
                    //console.log(this.node.name);
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
        let graph = ƒ.Project.resources["Graph|2023-05-18T10:13:56.922Z|12376"];
        ƒ.Debug.log("Graph:", graph);
        if (!graph) {
            alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
            return;
        }
        Script.cmpCamera = new ƒ.ComponentCamera();
        Script.canvas = document.querySelector("canvas");
        let viewport = new ƒ.Viewport();
        viewport.initialize("InteractiveViewport", graph, Script.cmpCamera, Script.canvas);
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