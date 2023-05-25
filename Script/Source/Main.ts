namespace Script {
  import ƒ = FudgeCore;
  
  //import ƒAid = FudgeAid;
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
    branch.addEventListener("pointerdown", <ƒ.EventListenerUnified>handleClick);

    let dialogueBox: HTMLDivElement = document.querySelector("#dialogue");
    dialogueBox.style.width = viewport.canvas.width + "px";
    console.log(dialogueBox)




    /* let zoo: ƒ.Node = branch.getChildrenByName("Interactables")[0];

    let meshShpere: ƒ.MeshSphere = new ƒ.MeshSphere("BoundingSphere", 40, 40);
    let material: ƒ.Material = new ƒ.Material("Transparent", ƒ.ShaderLit, new ƒ.CoatColored(ƒ.Color.CSS("white", 0.5)));
    for (let child of zoo.getChildren()) {

      let sphere: ƒ.Node = new ƒAid.Node(
        "BoundingSphere", ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2)), material, meshShpere
      );
      sphere.mtxLocal.scale(ƒ.Vector3.ONE(child.radius));
      console.warn(child.radius)
      let cmpMesh: ƒ.ComponentMesh = child.getComponent(ƒ.ComponentMesh);
      sphere.mtxLocal.translation = cmpMesh.mtxWorld.translation;
      sphere.getComponent(ƒ.ComponentMaterial).sortForAlpha = true;
      branch.appendChild(sphere);

    } */


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
    let node: ƒ.Node = (<ƒ.Node>_event.target);
    if (node.getComponent(Interactable)) {
      let dialogue: Interactable = node.getComponent(Interactable);
      dialogue.showText();
      console.log(_event.target);
    }

    else if (node.getComponent(Board)) {
      let board: Board = node.getComponent(Board); 
      board.openPage(); 
    }
    /* 
    let interact: ƒ.Node = branch.getChildrenByName("Interactables")[0];
    let childNodes: ƒ.Node[] = interact.getChildren();
    for (let kid of childNodes) {
      let interactable: Interactable = kid.getComponent(Interactable);
      interactable.checkPosition(_event.clientX, _event.clientY);
    } */
  }
  function testClick(_event: PointerEvent): void {
    viewport.draw();
    viewport.dispatchPointerEvent(_event);
  }


}