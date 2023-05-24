namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let nodePaths: ƒ.Node;
  export let crc2: CanvasRenderingContext2D;
  export let camNode: ƒ.Node;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    nodePaths = viewport.getBranch().getChildrenByName("Paths")[0];
    crc2 = viewport.canvas.getContext("2d");
    //viewport.canvas.addEventListener("pointerdown", handleClick);
    setUpCam();

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    update(null);
    // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
  }

  function update(_event: Event): void {
    // ƒ.Physics.simulate();  // if physics is included and used
    viewport.draw();
    nodePaths.broadcastEvent(new CustomEvent("renderWaypoints"));
    //ƒ.AudioManager.default.update();
  }

  export function setUpCam(): void {
    camNode = new ƒ.Node("camNode");
    camNode.addComponent(createCamera());
    camNode.addComponent(new ƒ.ComponentTransform());
    camNode.mtxLocal.scale(new ƒ.Vector3(1, 2, 1));
  }

  function createCamera(): ƒ.ComponentCamera {
    let newCam: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    //newCam.projectOrthographic(); 
    viewport.camera = newCam;
    viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
    //viewport.camera.mtxPivot.translate(new ƒ.Vector3(0, 0, 0));
    viewport.camera.mtxPivot.rotateY(180);
    viewport.camera.mtxPivot.translateZ(-18);

    //viewport.camera.mtxPivot.scale(new ƒ.Vector3(2, 1, 2));

    return newCam;
  }

  function handleClick(): void {
    let branch: ƒ.Node = viewport.getBranch(); 
    let children = branch.getChildren(); 
    for (let child of children) {
      let childNodes = child.getChildren(); 
      for (let kid of childNodes) {
        console.log(kid.getComponent(Interactable)); 
      }
      
    }
  }
}