namespace Script {
  import ƒ = FudgeCore;
  ƒ.Debug.info("Main Program Template running!");

  export let viewport: ƒ.Viewport;
  export let nodePaths: ƒ.Node;
  export let crc2: CanvasRenderingContext2D;
  let branch: ƒ.Node;
  document.addEventListener("interactiveViewportStarted", <EventListener>start);

  function start(_event: CustomEvent): void {
    viewport = _event.detail;
    branch = viewport.getBranch();
    nodePaths = viewport.getBranch().getChildrenByName("Paths")[0];
    crc2 = viewport.canvas.getContext("2d");
    setUpCam();
    console.log(branch)
    viewport.canvas.addEventListener("pointerdown", testClick); 
    branch.addEventListener("pointerdown", <ƒ.EventListenerUnified> handleClick);


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

  function setUpCam(): void {
    let camNode: ƒ.Node;
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

  function handleClick(_event: PointerEvent): void {
    console.log("hello pointerdown");
    if(_event.button == 0) {
      console.log("lksdjf"); 
    }
    /* 
    let interact: ƒ.Node = branch.getChildrenByName("Interactables")[0];
    let childNodes: ƒ.Node[] = interact.getChildren();
    for (let kid of childNodes) {
      let interactable: Interactable = kid.getComponent(Interactable);
      interactable.checkPosition(_event.clientX, _event.clientY);
    } */
  } 
  function testClick(): void {
    console.log("hello test click"); 
  }


}