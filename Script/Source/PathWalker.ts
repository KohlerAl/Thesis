namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class PathWalker extends ƒ.ComponentScript {
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(PathWalker);
    public speed: number = 1;
    #waypoints: ƒ.Node[] = [];
    #index: number = 0;


    constructor() {
      super();
      this.singleton = true;

      if (ƒ.Project.mode == ƒ.MODE.EDITOR)
        return;

      this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
      this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
    }

    // Activate the functions of this component as response to events
    public hndEvent = (_event: Event): void => {
      switch (_event.type) {
        case ƒ.EVENT.COMPONENT_ADD:
          this.node.addEventListener(ƒ.EVENT.RENDER_PREPARE, this.move);
          break;
        case ƒ.EVENT.COMPONENT_REMOVE:
          this.removeEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
          this.removeEventListener(ƒ.EVENT.RENDER_PREPARE, this.move);
          break;
      }
    }

    public walk(_waypoints: ƒ.Node[]): void {
      this.#waypoints = _waypoints.slice(); // copy
      // place node on first waypoint
      this.#index = 0;
      this.node.mtxLocal.translation = this.#waypoints[this.#index].mtxLocal.translation;
      this.#index++; // target next waypoint
    }

    private move = (): void => {
      if (this.#index == this.#waypoints.length)
        return;

      let step: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(
        this.#waypoints[this.#index].mtxLocal.translation,
        this.node.mtxLocal.translation
      );

      let length: number = this.speed * ƒ.Loop.timeFrameGame / 1000;
      if (length < step.magnitude) { // next waypoint not yet reached
        step.normalize(length);
        this.node.mtxLocal.translate(step);
        return;
      }

      this.node.mtxLocal.translation = this.#waypoints[this.#index].mtxLocal.translation;
      this.#index++;

      if (this.#index == this.#waypoints.length)
        this.dispatchEvent(new CustomEvent("arrived", {detail: this.#waypoints[this.#index-1]}));
    }
  }
}