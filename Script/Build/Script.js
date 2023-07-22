"use strict";
var Script;
(function (Script) {
    let STATE;
    (function (STATE) {
        STATE[STATE["LEFT"] = 0] = "LEFT";
        STATE[STATE["RIGHT"] = 1] = "RIGHT";
        STATE[STATE["STAND"] = 2] = "STAND";
    })(STATE = Script.STATE || (Script.STATE = {}));
    class Alien extends ƒ.ComponentScript {
        static iSubclass = ƒ.Component.registerSubclass(Alien);
        alienNode;
        animation;
        currentTransform;
        nextTransform;
        state;
        animationLeft;
        animationRight;
        animationStand;
        constructor() {
            super();
            this.alienNode = Script.branch.getChildrenByName("Player")[0];
            this.animation = this.alienNode.getComponent(ƒ.ComponentAnimator);
            this.state = STATE.STAND;
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
            this.setup();
            this.changeAnimation();
        }
        changeState(_new, _current) {
            if (_new.mtxLocal.translation.x < _current.mtxLocal.translation.x)
                this.state = STATE.LEFT;
            else if (_new.mtxLocal.translation.x > _current.mtxLocal.translation.x)
                this.state = STATE.RIGHT;
            this.changeAnimation();
        }
        changeAnimation() {
            switch (this.state) {
                case STATE.LEFT:
                    this.animation.animation = this.animationLeft.animation;
                    break;
                case STATE.RIGHT:
                    this.animation.animation = this.animationRight.animation;
                    break;
                case STATE.STAND:
                    this.animation.animation = this.animationStand.animation;
                    break;
            }
        }
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
        async setup() {
            this.animationLeft = Script.branch.getChildrenByName("Animations")[0].getChildrenByName("AnimationLeft")[0].getComponent(ƒ.ComponentAnimator);
            this.animationRight = Script.branch.getChildrenByName("Animations")[0].getChildrenByName("AnimationRight")[0].getComponent(ƒ.ComponentAnimator);
            this.animationStand = Script.branch.getChildrenByName("Animations")[0].getChildrenByName("AnimationStand")[0].getComponent(ƒ.ComponentAnimator);
        }
        setToGround() {
            Script.player.mtxLocal.translateY(500);
        }
    }
    Script.Alien = Alien;
})(Script || (Script = {}));
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
            new Script.Page("Nianna Blume <br> -Die Blume riecht süß. <br>- Blasse, runde Blüten <br>- Die Blume blüht das ganze Jahr lang. <br> Die Blüten sind blau, rosa und lila.", "Nianna flower <br>- The flower smells sweet. <br>- Pale, round flowers <br>- The flower blooms all year round. <br> The flowers are blue, pink and purple.", true),
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
                Script.pagesCollected = true;
                Script.update(null);
            }
        }
    }
    Script.Board = Board;
})(Script || (Script = {}));
var Script;
(function (Script) {
    class Break {
        typeQuest;
        fulfilled;
        constructor(_type) {
            this.typeQuest = _type;
        }
    }
    Script.Break = Break;
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
    let instance;
    class formTest {
        rightName = "nianna";
        rightOrigin = "Nelara";
        rightColors = ["blau", "rosa", "lila"];
        rightDescription = ["allYear", "smell", "paleRound"];
        rightImage = "nianna";
        buttonEle;
        formEle;
        isShowing = false;
        isChecked = {
            name: false,
            origin: false,
            pink: false,
            blue: false,
            purple: false,
            descriptionYear: false,
            descriptionSmell: false,
            descriptionLook: false,
            image: false
        };
        constructor() {
            this.buttonEle = document.querySelector("#submit");
            this.buttonEle.addEventListener("pointerdown", this.checkSubmit);
            this.formEle = document.querySelector("#form");
            instance = this;
        }
        checkSubmit() {
            instance.handleSubmit();
        }
        handleSubmit() {
            let formData = new FormData(document.forms[0]);
            for (let entry of formData) {
                switch (entry[0]) {
                    case "plantName":
                        let lowerEntry = entry[1];
                        let inputEle = document.querySelector("#plantName");
                        if (this.switchClass(lowerEntry.toLowerCase(), this.rightName, inputEle))
                            this.isChecked.name = true;
                        break;
                    case "origin":
                        let originEle = document.querySelector("#originList");
                        if (this.switchClass(entry[1].toString(), this.rightOrigin, originEle))
                            this.isChecked.origin = true;
                        break;
                    case "color":
                        let colorInputs = document.querySelectorAll(".formInput");
                        for (let input of colorInputs) {
                            if (entry[1].toString().toLowerCase() == this.rightColors[0] || entry[1].toString().toLowerCase() == this.rightColors[1] || entry[1].toString().toLowerCase() == this.rightColors[2]) {
                                input.disabled = true;
                                input.classList.add("right");
                                switch (entry[1].toString().toLowerCase()) {
                                    case "blau":
                                        this.isChecked.blue = true;
                                        break;
                                    case "rosa":
                                        this.isChecked.pink = true;
                                        break;
                                    case "lila":
                                        this.isChecked.purple = true;
                                        break;
                                }
                                if (input.classList.contains("wrong"))
                                    input.classList.remove("wrong");
                            }
                            else {
                                input.classList.add("wrong");
                            }
                        }
                        break;
                    case "description":
                        let input = document.getElementById(entry[1].toString());
                        if (input.checked == true) {
                            if (entry[1].toString() == this.rightDescription[0] || entry[1].toString() == this.rightDescription[1] || entry[1].toString() == this.rightDescription[2]) {
                                input.disabled = true;
                                input.classList.add("right");
                                switch (entry[1]) {
                                    case "allYear":
                                        this.isChecked.descriptionYear = true;
                                        break;
                                    case "smell":
                                        this.isChecked.descriptionSmell = true;
                                        break;
                                    case "paleRound":
                                        this.isChecked.descriptionLook = true;
                                        break;
                                }
                                if (input.classList.contains("wrong")) {
                                    input.classList.remove("wrong");
                                }
                            }
                            else {
                                input.classList.add("wrong");
                            }
                        }
                        if (this.isChecked.descriptionYear == true && this.isChecked.descriptionSmell == true && this.isChecked.descriptionLook == true) {
                            let allInputs = document.querySelectorAll(".descriptionRadio");
                            for (let entry of allInputs) {
                                entry.disabled = true;
                            }
                        }
                        break;
                    case "image":
                        if (entry[1].toString() == this.rightImage) {
                            let allImgs = document.querySelectorAll(".imgRadio");
                            for (let img of allImgs) {
                                img.disabled = true;
                                img.classList.add("right");
                            }
                            this.isChecked.image = true;
                        }
                        break;
                }
            }
            this.checkAll();
        }
        switchClass(_entry, _rightValue, _ele) {
            if (_entry == _rightValue) {
                if (_ele.classList.contains("wrong"))
                    _ele.classList.remove("wrong");
                _ele.classList.add("right");
                _ele.disabled = true;
                return true;
            }
            else {
                if (!_ele.classList.contains("wrong"))
                    _ele.classList.add("wrong");
                return false;
            }
        }
        showForm() {
            if (this.isShowing == false) {
                this.formEle.style.display = "block";
                this.isShowing = true;
            }
            else {
                this.formEle.style.display = "none";
                this.isShowing = false;
            }
        }
        checkAll() {
            let counter = 0;
            for (let entry in this.isChecked) {
                if (this.isChecked[entry] == true)
                    counter++;
            }
            if (counter == 9)
                alert("Das war der Prototyp! Danke fürs Spielen! :)");
        }
    }
    Script.formTest = formTest;
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
    Script.ƒAid = FudgeAid;
    ƒ.Debug.info("Main Program Template running!");
    let first = true;
    Script.translateAllowed = false;
    Script.pagesCollected = false;
    document.addEventListener("interactiveViewportStarted", start);
    Script.inventory = [];
    function start(_event) {
        Script.viewport = _event.detail;
        Script.branch = Script.viewport.getBranch();
        Script.nodePaths = Script.viewport.getBranch().getChildrenByName("Paths")[0];
        Script.crc2 = Script.viewport.canvas.getContext("2d");
        Script.setUpCam();
        Script.viewport.canvas.addEventListener("pointerdown", viewportClick);
        Script.branch.addEventListener("pointerdown", handleClick);
        let dialogueBox = document.querySelector("#dialogue");
        dialogueBox.style.width = Script.viewport.canvas.width + "px";
        let npcBox = document.querySelector("#npcTalk");
        npcBox.style.width = Script.viewport.canvas.width - 300 + "px";
        let nootnoot = document.querySelector("#NOOT");
        nootnoot.style.left = Script.viewport.canvas.width - 200 + "px";
        nootnoot.style.top = Script.viewport.canvas.height - 200 + "px";
        nootnoot.style.visibility = "visible";
        Script.current = Script.branch.getChildrenByName("Paths")[0].getChildrenByName("Door")[0];
        Script.walker = Script.branch.getChildrenByName("Player")[0].getComponent(Script.PathWalker);
        Script.walker.addEventListener("arrived", changeAnimation);
        //#region PathWalker demo
        /*
       
       choosePath(null);
       function choosePath(_event: CustomEvent) {
         current= _event ? _event.detail : nodePaths.getChildren()[0];
         console.log("Arrived at", current.name);
         
         do
         next = ƒ.Random.default.getElement(nodePaths.getChildren());
         while (next == current)
         let path: ƒ.Node[] = nodePaths.getComponent(Paths).findPath(current.name, next.name);
         walker.walk(path);
         console.log("Path: ", ...path.map(_node => _node.name));
       } */
        //#endregion
        Script.noot = new Script.Noot();
        Script.player = Script.branch.getChildrenByName("Player")[0];
        Script.player.addComponent(new Script.Alien);
        Script.player.mtxLocal.translate(Script.current.mtxLocal.translation);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
        // update(null);
        new ƒ.Time();
        animateCoin();
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        Script.viewport.draw();
        Script.nodePaths.broadcastEvent(new CustomEvent("renderWaypoints"));
        //ƒ.AudioManager.default.update();
    }
    Script.update = update;
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
            window.setTimeout(function () {
                let door = node.getComponent(Script.Door);
                door.switchGraph();
            }, 1500);
        }
        else if (node.getComponent(Script.NPC)) {
            let npc = node.getComponent(Script.NPC);
            npc.showDialogue();
        }
        findWaypoint(node.name);
    }
    Script.handleClick = handleClick;
    function viewportClick(_event) {
        Script.viewport.draw();
        Script.viewport.dispatchPointerEvent(_event);
    }
    Script.viewportClick = viewportClick;
    function findWaypoint(_target) {
        if (first == true) {
            first = false;
        }
        let pickedWP = Script.branch.getChildrenByName("Paths")[0].getChildrenByName(_target)[0];
        let path = Script.nodePaths.getComponent(Script.Paths).findPath(Script.current.name, pickedWP.name);
        Script.walker.walk(path);
        Script.player.getComponent(Script.Alien).changeState(pickedWP, Script.current);
        Script.current = pickedWP;
    }
    Script.findWaypoint = findWaypoint;
    function changeAnimation() {
        Script.player.getComponent(Script.Alien).state = Script.STATE.STAND;
        Script.player.getComponent(Script.Alien).changeAnimation();
    }
    function animateCoin() {
        let animseq = new ƒ.AnimationSequence();
        animseq.addKey(new ƒ.AnimationKey(0, 1));
        animseq.addKey(new ƒ.AnimationKey(750, 2));
        animseq.addKey(new ƒ.AnimationKey(1000, 1));
        let animStructure = {
            components: {
                ComponentTransform: [
                    {
                        "ƒ.ComponentTransform": {
                            mtxLocal: {
                                translation: {
                                    x: animseq
                                }
                            }
                        }
                    }
                ]
            }
        };
        let animation = new ƒ.Animation("testAnimation", animStructure);
        let cmpAnimator = new ƒ.ComponentAnimator(animation);
        Script.branch.getChildrenByName("NPC")[0].addComponent(cmpAnimator);
        console.log(Script.branch.getChildrenByName("NPC")[0]);
    }
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
        formEle = new Script.formTest();
        dialogues = [
            this.formEle,
            new Script.Dialogue("Hallo Player. Schön, dich zu sehen. <br> Und danke, dass du uns hilfst.", "Hello Player. It’s good to see you. <br>And thank you for supporting us."),
            new Script.Dialogue("Hallo Mykah.", "Hello Mykah"),
            new Script.Answer("Kann ich dir bei etwas helfen?", "Can I help you with something?", "Wie kann ich dir helfen?", "How can I support you?"),
            new Script.Dialogue("Ich suche Hinweise über eine Blume. <br>Kannst du mir helfen, sie zu finden?", "I am looking for some clues about a flower. <br> Can you help me to find them?"),
            new Script.Answer("Natürlich. Ich helfe dir gerne.", "Of course. I will be happy to help you.", "Ja, ich kann dir helfen. Wo soll ich suchen?", "Yes, I can help you. Where should I look?"),
            new Script.Dialogue("Danke. Du solltest als erstes im Büro suchen. <br> Dazu musst du durch die linke Tür.", "Thank you. You should check the office first. <br> You have to go through the left door."),
            new Script.Break("Pages"),
            new Script.Dialogue("Danke! Kannst du mir ein paar Fragen beantworten?", "Thank you! Can you answer a few questions?"),
            new Script.Dialogue("1. Wo wächst die Nianna Blume? <br> 2. Wie sieht die Nianna Blume aus? <br> 3. Wie wird die Nianna Blume verwendet?", "1. Where does the nianna flower grow? <br>2. What does the nianna flower look like? <br>3. How is the nianna flower used?"),
            new Script.Break("Noot"),
            new Script.Dialogue("Hast du alles nachgeschaut? <br> Dann kannst du deine Ergebnisse hier Eintragen", "Did you look everything up? You can put in your results here")
        ];
        dialogueBox;
        textBox;
        nextButton;
        currentlanguage = "german";
        constructor() {
            super();
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
            console.log(this.node);
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
            else if (this.dialogues[this.currentDialogue] instanceof Script.Break) {
                let current = this.dialogues[this.currentDialogue];
                this.hideDialouge();
                if (current.typeQuest == "Pages" && Script.pagesCollected == true) {
                    this.currentDialogue++;
                    this.showDialogue();
                }
                else if (current.typeQuest == "Noot" && Script.noot.researchAllowed == false) {
                    Script.noot.researchAllowed = true;
                }
                else if (current.typeQuest == "Noot" && Script.noot.researchDone == true) {
                    this.currentDialogue++;
                    this.showDialogue();
                }
            }
            else if (this.dialogues[this.currentDialogue] instanceof Script.formTest) {
                this.formEle.showForm();
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
            if (Script.translateAllowed) {
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
    }
    Script.NPC = NPC;
})(Script || (Script = {}));
var Script;
(function (Script) {
    let instance;
    class Noot {
        activeTranslate = false;
        researchAllowed = false;
        researchDone = false;
        imgElement;
        nootMenu;
        vocabContainer;
        menuActive = false;
        vocabActive = false;
        researchActive = false;
        constructor() {
            this.imgElement = document.querySelector("#NOOT");
            this.nootMenu = document.querySelector("#NootMenu");
            this.vocabContainer = document.querySelector("#vocabContainer");
            this.imgElement.style.left = Script.viewport.canvas.width - 200 + "px";
            this.imgElement.style.top = Script.viewport.canvas.height - 200 + "px";
            this.imgElement.style.visibility = "visible";
            instance = this;
            this.imgElement.addEventListener("pointerdown", this.toggleMenu);
            this.nootMenu.addEventListener("pointerdown", this.handleInteract);
            this.createTable();
        }
        toggleMenu() {
            if (instance.menuActive) {
                instance.menuActive = false;
                instance.nootMenu.style.display = "none";
            }
            else {
                instance.menuActive = true;
                instance.nootMenu.style.display = "block";
            }
        }
        handleInteract(_event) {
            let target = _event.target;
            let id = target.id;
            switch (id) {
                case "translateMode":
                    let translate = document.querySelector("#translateMode");
                    if (this.activeTranslate) {
                        translate.classList.remove("active");
                        translate.innerHTML = "Translate Mode Current Status: OFF";
                        Script.translateAllowed = false;
                        this.activeTranslate = false;
                    }
                    else {
                        this.activeTranslate = true;
                        Script.translateAllowed = true;
                        translate.classList.add("active");
                        translate.innerHTML = "Translate Mode Current Status: ON";
                    }
                    break;
                case "researchMode":
                    if (instance.researchAllowed)
                        instance.setResearch();
                    break;
                case "vocabList":
                    instance.setVocab();
                    break;
            }
        }
        async createTable() {
            let table = await fetch("json/table.json");
            let textTable = await table.text();
            let data = JSON.parse(textTable);
            for (let entry of data) {
                let wrapper = document.createElement("div");
                let pGerman = document.createElement("p");
                wrapper.classList.add("tableRow");
                pGerman.innerHTML = entry[0];
                let pEnglish = document.createElement("p");
                pEnglish.innerHTML = entry[1];
                wrapper.appendChild(pGerman);
                wrapper.appendChild(pEnglish);
                this.vocabContainer.appendChild(wrapper);
            }
        }
        setVocab() {
            if (this.vocabActive) {
                this.vocabActive = false;
                this.vocabContainer.style.display = "none";
                document.querySelector("#vocabList").classList.remove("active");
            }
            else {
                this.vocabActive = true;
                this.vocabContainer.style.display = "flex";
                document.querySelector("#vocabList").classList.add("active");
                if (this.researchActive)
                    this.setResearch();
            }
        }
        setResearch() {
            this.researchDone = true;
            let research = document.querySelector("#researchContainer");
            if (this.researchActive) {
                document.querySelector("#researchMode").classList.remove("active");
                this.researchActive = false;
                research.style.display = "none";
            }
            else {
                this.researchActive = true;
                document.querySelector("#researchMode").classList.add("active");
                research.style.display = "block";
                if (this.vocabActive)
                    this.setVocab();
            }
        }
    }
    Script.Noot = Noot;
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
        #cost = Infinity;
        constructor(_start, _end) {
            super();
            this.start = _start;
            this.end = _end;
        }
        set cost(_cost) {
            this.#cost = _cost;
        }
        get cost() {
            return this.#cost;
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
    class PathWalker extends ƒ.ComponentScript {
        static iSubclass = ƒ.Component.registerSubclass(PathWalker);
        speed = 1;
        #waypoints = [];
        #index = 0;
        constructor() {
            super();
            this.singleton = true;
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    this.node.addEventListener("renderPrepare" /* RENDER_PREPARE */, this.move);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("renderPrepare" /* RENDER_PREPARE */, this.move);
                    break;
            }
        };
        walk(_waypoints) {
            this.#waypoints = _waypoints.slice(); // copy
            // place node on first waypoint
            this.#index = 0;
            this.node.mtxLocal.translation = this.#waypoints[this.#index].mtxLocal.translation;
            this.#index++; // target next waypoint
        }
        move = () => {
            if (this.#index == this.#waypoints.length)
                return;
            let step = ƒ.Vector3.DIFFERENCE(this.#waypoints[this.#index].mtxLocal.translation, this.node.mtxLocal.translation);
            let length = this.speed * ƒ.Loop.timeFrameGame / 1000;
            if (length < step.magnitude) { // next waypoint not yet reached
                step.normalize(length);
                this.node.mtxLocal.translate(step);
                return;
            }
            this.node.mtxLocal.translation = this.#waypoints[this.#index].mtxLocal.translation;
            this.#index++;
            if (this.#index == this.#waypoints.length)
                this.dispatchEvent(new CustomEvent("arrived", { detail: this.#waypoints[this.#index - 1] }));
        };
    }
    Script.PathWalker = PathWalker;
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
        #matrix = {};
        constructor() {
            super();
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
                    this.setupMatrix();
                    break;
                case "renderWaypoints":
                    //console.log(this.node.name);
                    for (let path of this.paths) {
                        // console.log(path);
                        let posStart = Script.viewport.pointWorldToClient(Script.nodePaths.getChildrenByName(path.start)[0].mtxWorld.translation);
                        let posEnd = Script.viewport.pointWorldToClient(Script.nodePaths.getChildrenByName(path.end)[0].mtxWorld.translation);
                        /* crc2.beginPath();
                        crc2.strokeStyle = "red";
                        crc2.moveTo(posStart.x, posStart.y);
                        crc2.lineTo(posEnd.x, posEnd.y);
                        crc2.stroke(); */
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
        setupMatrix() {
            for (let path of this.paths) {
                let posStart = this.node.getChildrenByName(path.start)[0].mtxLocal.translation;
                let posEnd = this.node.getChildrenByName(path.end)[0].mtxLocal.translation;
                path.cost = ƒ.Vector3.DIFFERENCE(posEnd, posStart).magnitude;
                if (!this.#matrix[path.start])
                    this.#matrix[path.start] = {};
                if (!this.#matrix[path.end])
                    this.#matrix[path.end] = {};
                this.#matrix[path.start][path.end] = path.cost;
                this.#matrix[path.end][path.start] = path.cost;
            }
            /* console.warn(this);
            console.table(this.#matrix); */
        }
        findPath(_start, _end) {
            if (this.#matrix[_start][_end]) {
                return this.getPath(_start, _end);
            }
            let search = [];
            let found = [];
            let visit = [];
            for (let waypoint of this.node.getChildren()) {
                search.push({ point: waypoint.name, distance: waypoint.name == _start ? 0 : Infinity, previous: null });
                visit.push(waypoint.name);
            }
            while (visit.length) {
                search.sort((_a, _b) => _a.distance - _b.distance);
                let current = search.shift();
                found.push(current);
                visit.splice(visit.indexOf(current.point), 1);
                if (!this.#matrix[_start][current.point] && _start != current.point) {
                    this.#matrix[_start][current.point] = current.previous;
                    this.#matrix[current.point][_start] = current.previous;
                }
                let distance = current.distance;
                for (let neighbor in this.#matrix[current.point]) {
                    if (neighbor == current.point || !this.#matrix[current.point][neighbor])
                        continue;
                    if (visit.indexOf(neighbor) > -1) {
                        let next = search.find(_info => _info.point == neighbor);
                        let sum = distance + this.#matrix[current.point][neighbor];
                        if (sum < next.distance) {
                            next.previous = current.point;
                            next.distance = sum;
                        }
                    }
                }
            }
            for (let path of found) {
                if (path.point != _start && !this.#matrix[_start][path.point]) {
                    this.#matrix[_start][path.point] = path.previous;
                    this.#matrix[path.point][_start] = path.previous;
                }
                if (path.previous && path.point != _end && !this.#matrix[_end][path.previous]) {
                    this.#matrix[path.previous][_end] = path.point;
                    this.#matrix[_end][path.previous] = path.point;
                }
            }
            // console.table(this.#matrix);
            return this.getPath(_start, _end);
        }
        getPath(_start, _end) {
            let entry = this.#matrix[_start][_end];
            if (typeof (entry) == "string") {
                let info = this.calculateDistance(_start, _end);
                info.path.push(_end);
                return info.path.map(_name => this.node.getChildrenByName(_name)[0]);
            }
            else
                return [_start, _end].map(_name => this.node.getChildrenByName(_name)[0]);
        }
        calculateDistance(_start, _end, _path = [_start]) {
            let result = 0;
            if (_start == _end)
                return { path: [], distance: 0 };
            let value = this.#matrix[_start][_end];
            if (!value)
                return { path: _path, distance: Infinity };
            if (typeof (value) == "number")
                return { path: _path, distance: value };
            result += this.calculateDistance(_start, value, _path).distance;
            _path.push(value);
            result += this.calculateDistance(value, _end, _path).distance;
            return { path: _path, distance: result };
        }
    }
    Script.Paths = Paths;
})(Script || (Script = {}));
var Script;
(function (Script) {
    let instance;
    class Question {
        question;
        answer;
        questionBox;
        commitedAnswer;
        constructor(_question, _answer, _questionBox) {
            this.question = _question;
            this.answer = _answer;
            this.questionBox = _questionBox;
        }
        displayQuestion() {
            let newParagraph = document.createElement("p");
            newParagraph.innerHTML = this.question;
            this.questionBox.appendChild(newParagraph);
        }
        isAnswerRight() {
            if (this.commitedAnswer == this.answer)
                return true;
            else
                return false;
        }
    }
    Script.Question = Question;
    class TextfieldQuestion extends Question {
        input;
        constructor(_question, _answer, _questionBox) {
            super(_question, _answer, _questionBox);
            instance = this;
        }
        displayQuestion() {
            super.displayQuestion();
            this.input = document.createElement("input");
            this.input.placeholder = "answer";
            this.input.classList.add("answerInput");
            this.questionBox.appendChild(this.input);
            let check = document.createElement("div");
            check.innerHTML = "check";
            check.addEventListener("pointerdown", this.isAnswerRight);
        }
        isAnswerRight() {
            this.commitedAnswer = this.input.value.toLowerCase();
            this.answer = this.answer.toLowerCase();
            return super.isAnswerRight();
        }
    }
    Script.TextfieldQuestion = TextfieldQuestion;
    class ImageQuestion extends Question {
        imageOne;
        imageTwo;
        imageThree;
        constructor(_question, _answer, _imgOne, _imgTwo, _imgThree, _questionBox) {
            super(_question, _answer, _questionBox);
            this.imageOne = _imgOne;
            this.imageTwo = _imgTwo;
            this.imageThree = _imgThree;
            instance = this;
        }
        displayQuestion() {
            super.displayQuestion();
            let imageBox = document.createElement("div");
            let imageEleOne = document.createElement("img");
            imageEleOne.setAttribute("src", this.imageOne);
            imageEleOne.classList.add("imageQuestion");
            imageBox.appendChild(imageEleOne);
            let imageEleTwo = document.createElement("img");
            imageEleTwo.setAttribute("src", this.imageTwo);
            imageEleTwo.classList.add("imageQuestion");
            imageBox.appendChild(imageEleTwo);
            let imageEleThree = document.createElement("img");
            imageEleThree.setAttribute("src", this.imageThree);
            imageEleThree.classList.add("imageQuestion");
            imageBox.appendChild(imageEleThree);
            imageBox.addEventListener("pointerdown", this.getAnswer);
        }
        getAnswer(_event) {
        }
        isAnswerRight() {
            return super.isAnswerRight();
        }
    }
    Script.ImageQuestion = ImageQuestion;
    class MultipleChoiceQuestion extends Question {
        answerChoiceOne;
        answerChoiceTwo;
        answerChoiceThree;
        constructor(_question, _answer, _answerChoiceOne, _answerChoiceTwo, _answerChoiceThree, _questionBox) {
            super(_question, _answer, _questionBox);
            this.answerChoiceOne = _answerChoiceOne;
            this.answerChoiceTwo = _answerChoiceTwo;
            this.answerChoiceThree = _answerChoiceThree;
            instance = this;
        }
    }
    Script.MultipleChoiceQuestion = MultipleChoiceQuestion;
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
    function setUpCam() {
        let camNode;
        camNode = new ƒ.Node("camNode");
        camNode.addComponent(createCamera());
        camNode.addComponent(new ƒ.ComponentTransform());
        camNode.mtxLocal.scale(new ƒ.Vector3(1, 2, 1));
    }
    Script.setUpCam = setUpCam;
    function createCamera() {
        let newCam = new ƒ.ComponentCamera();
        Script.viewport.camera = newCam;
        Script.viewport.camera.projectCentral(Script.canvas.clientWidth / Script.canvas.clientHeight, 5);
        Script.viewport.camera.mtxPivot.rotateY(180);
        Script.viewport.camera.mtxPivot.translateZ(-18);
        return newCam;
    }
    Script.createCamera = createCamera;
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
                    // console.log(this.node.name);
                    let posWorld = this.node.mtxWorld.translation;
                    let posClient = Script.viewport.pointWorldToClient(posWorld);
                    /* crc2.fillStyle = "red";
                    crc2.fillRect(posClient.x, posClient.y, 10, 10); */
                    break;
            }
        };
    }
    Script.Waypoint = Waypoint;
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map