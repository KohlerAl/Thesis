namespace Script {
  import ƒ = FudgeCore;
  // import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let nodePaths: ƒ.Node;
  export let crc2: CanvasRenderingContext2D;
  export let branch: ƒ.Node;
  export let walker: PathWalker;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  export let inventory: Page[] = [];

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    branch = viewport.getBranch();
    nodePaths = viewport.getBranch().getChildrenByName("Paths")[0];
    crc2 = viewport.canvas.getContext("2d");
    setUpCam();
    viewport.canvas.addEventListener("pointerdown", viewportClick);
    branch.addEventListener("pointerdown", <ƒ.EventListenerUnified>handleClick);

    let dialogueBox: HTMLDivElement = document.querySelector("#dialogue");
    dialogueBox.style.width = viewport.canvas.width + "px";

    let npcBox: HTMLDivElement = document.querySelector("#npcTalk");
    npcBox.style.width = viewport.canvas.width + "px";

    //#region PathWalker demo
    walker = branch.getChildrenByName("Walker")[0].getComponent(PathWalker);
    walker.addEventListener("arrived", choosePath);
    choosePath(null);
    function choosePath(_event: CustomEvent) {
      let current: ƒ.Node = _event ? _event.detail : nodePaths.getChildren()[0];
      console.log("Arrived at", current.name);
      let next: ƒ.Node;
      do
      next = ƒ.Random.default.getElement(nodePaths.getChildren());
      while (next == current)
      let path: ƒ.Node[] = nodePaths.getComponent(Paths).findPath(current.name, next.name);
      walker.walk(path);
      console.log("Path: ", ...path.map(_node => _node.name));
    }
    //#endregion

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start();
    // update(null);
  }
  export function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    nodePaths.broadcastEvent(new CustomEvent("renderWaypoints"));
    //ƒ.AudioManager.default.update();
  }



  export function handleClick(_event: PointerEvent): void {
    let node: ƒ.Node = (<ƒ.Node>_event.target);
    if (node.getComponent(Interactable)) {
      let dialogue: Interactable = node.getComponent(Interactable);
      dialogue.showText();
    }

    else if (node.getComponent(Board)) {
      let board: Board = node.getComponent(Board);
      board.openPage();
    }

    else if (node.getComponent(Door)) {
      let door: Door = node.getComponent(Door);
      door.switchGraph();
    }

    else if (node.getComponent(NPC)) {
      let npc: NPC = node.getComponent(NPC);
      npc.showDialogue();
    }
  }
  export function viewportClick(_event: PointerEvent): void {
    viewport.draw();
    viewport.dispatchPointerEvent(_event);
  }


}

