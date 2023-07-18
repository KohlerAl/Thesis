namespace Script {
  import ƒ = FudgeCore;
  ƒ.Project.registerScriptNamespace(Script);  // Register the namespace to FUDGE for serialization

  type PathMatrix = { [start: string]: { [end: string]: string | number } };

  export class Paths extends ƒ.ComponentScript {
    // Register the script as component for use in the editor via drag&drop
    public static readonly iSubclass: number = ƒ.Component.registerSubclass(Paths);
    // Properties may be mutated by users in the editor via the automatically created user interface
    public paths: ƒ.MutableArray<Path> = new ƒ.MutableArray<Path>(Path, new Path());
    #matrix: PathMatrix = {};

    constructor() {
      super();
      
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
          this.setupMatrix();
          break;
        case "renderWaypoints":
          //console.log(this.node.name);
          for (let path of this.paths) {
            // console.log(path);
            let posStart: ƒ.Vector2 = viewport.pointWorldToClient(
              nodePaths.getChildrenByName(path.start)[0].mtxWorld.translation
            );
            let posEnd: ƒ.Vector2 = viewport.pointWorldToClient(
              nodePaths.getChildrenByName(path.end)[0].mtxWorld.translation
            );
            /* crc2.beginPath();
            crc2.strokeStyle = "red";
            crc2.moveTo(posStart.x, posStart.y);
            crc2.lineTo(posEnd.x, posEnd.y);
            crc2.stroke(); */
            break;
          }
      }
    }

    public async deserialize(_serialization: ƒ.Serialization): Promise<ƒ.Serializable> {
      let paths: Path[] = [];
      for (let path of _serialization["paths"])
        paths.push(new Path(path.start, path.end))
      this.paths = new ƒ.MutableArray<Path>(Path, ...paths);
      await super.deserialize(_serialization);
      return this;
    }

    private setupMatrix(): void {
      for (let path of this.paths) {
        let posStart: ƒ.Vector3 = this.node.getChildrenByName(path.start)[0].mtxLocal.translation;
        let posEnd: ƒ.Vector3 = this.node.getChildrenByName(path.end)[0].mtxLocal.translation;
        console.log(posStart.toString(), posEnd.toString())
        path.cost = ƒ.Vector3.DIFFERENCE(posEnd, posStart).magnitude;

        if (!this.#matrix[path.start])
          this.#matrix[path.start] = {}
        if (!this.#matrix[path.end])
          this.#matrix[path.end] = {}

        this.#matrix[path.start][path.end] = path.cost;
        this.#matrix[path.end][path.start] = path.cost;
      }

      console.warn(this);
      console.table(this.#matrix);
    }

    public findPath(_start: string, _end: string): ƒ.Node[] {
      if (this.#matrix[_start][_end]) {
        return this.getPath(_start, _end);
      }
      type Info = { point: string, distance: number, previous: string };
      let search: Info[] = [];
      let found: Info[] = [];
      let visit: string[] = [];
      for (let waypoint of this.node.getChildren()) {
        search.push({ point: waypoint.name, distance: waypoint.name == _start ? 0 : Infinity, previous: null });
        visit.push(waypoint.name);
      }

      while (visit.length) {
        search.sort((_a, _b) => _a.distance - _b.distance);

        let current: Info = search.shift();
        found.push(current);
        visit.splice(visit.indexOf(current.point), 1);

        if (!this.#matrix[_start][current.point] && _start != current.point) {
          this.#matrix[_start][current.point] = current.previous;
          this.#matrix[current.point][_start] = current.previous;
        }

        let distance: number = current.distance;
        for (let neighbor in this.#matrix[current.point]) {
          if (neighbor == current.point || !this.#matrix[current.point][neighbor])
            continue;
          if (visit.indexOf(neighbor) > -1) {
            let next: Info = search.find(_info => _info.point == neighbor);
            let sum: number = distance + <number>this.#matrix[current.point][neighbor];
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

    private getPath(_start: string, _end: string): ƒ.Node[] {
      let entry: string | number = this.#matrix[_start][_end]
      if (typeof (entry) == "string") {
        let info = this.calculateDistance(_start, _end);
        info.path.push(_end);
        return info.path.map(_name => this.node.getChildrenByName(_name)[0]);
      }
      else
        return [_start, _end].map(_name => this.node.getChildrenByName(_name)[0]);
    }

    private calculateDistance(_start: string, _end: string, _path: string[] = [_start]): { path: string[], distance: number } {
      let result: number = 0;
      if (_start == _end)
        return { path: [], distance: 0 };

      let value: number | string = this.#matrix[_start][_end];

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
}