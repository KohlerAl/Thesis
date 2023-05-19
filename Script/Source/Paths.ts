namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  export class Paths extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(Paths);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public paths: ƒ.MutableArray<Path> = new ƒ.MutableArray<Path>(new Path());;


    constructor() {
      super();

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
          this.node.addEventListener("renderWaypoints", this.hndEvent, true);
          break;
        case "renderWaypoints":
          console.log(this.node.name);
          for (let path of this.paths) {
            console.log(path);
            let posStart: ƒ.Vector2 = viewport.pointWorldToClient(
              nodePaths.getChildrenByName(path.start)[0].mtxWorld.translation
            );
            let posEnd: ƒ.Vector2 = viewport.pointWorldToClient(
              nodePaths.getChildrenByName(path.end)[0].mtxWorld.translation
            );
            crc2.beginPath();
            crc2.strokeStyle = "red";
            crc2.moveTo(posStart.x, posStart.y);
            crc2.lineTo(posEnd.x, posEnd.y);
            crc2.stroke();
            break;
          }
      }
    }
  }
}