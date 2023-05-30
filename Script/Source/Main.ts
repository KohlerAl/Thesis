namespace Script {
  import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let nodePaths: ƒ.Node;
  export let crc2: CanvasRenderingContext2D;
  export let branch: ƒ.Node;
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


    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    update(null);
  }
  export function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    nodePaths.broadcastEvent(new CustomEvent("renderWaypoints"));
    //ƒ.AudioManager.default.update();
  }

  function setUpCam(): void {
    let camNode: ƒ.Node;
    camNode = new ƒ.Node("camNode");
    camNode.addComponent(createCamera());
    camNode.addComponent(new ƒ.ComponentTransform());
    camNode.mtxLocal.scale(new ƒ.Vector3(1, 2, 1));
  }

  function createCamera(): ƒ.ComponentCamera {
    let newCam: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    viewport.camera = newCam;
    viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
    viewport.camera.mtxPivot.rotateY(180);
    viewport.camera.mtxPivot.translateZ(-18);
    return newCam;
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

