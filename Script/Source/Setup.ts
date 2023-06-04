namespace Script {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);
    export let canvas: HTMLCanvasElement;
    export let cmpCamera: ƒ.ComponentCamera;

    let dialog: HTMLDialogElement;
    function init(_event: Event): void {
        dialog = document.querySelector("dialog");
        dialog.querySelector("h1").textContent = document.title;
        dialog.addEventListener("click", function (_event: Event): void {
            // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
            dialog.close();
            startInteractiveViewport();
        });
        //@ts-ignore
        dialog.showModal();
    }


    async function startInteractiveViewport(): Promise<void> {
        await ƒ.Project.loadResourcesFromHTML();
        ƒ.Debug.log("Project:", ƒ.Project.resources);
        let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources["Graph|2023-05-18T10:13:56.922Z|12376"];
        ƒ.Debug.log("Graph:", graph);
        if (!graph) {
            alert(
                "Nothing to render. Create a graph with at least a mesh, material and probably some light"
            );
            return;
        }
        cmpCamera = new ƒ.ComponentCamera();
        canvas = document.querySelector("canvas");
        let viewport: ƒ.Viewport = new ƒ.Viewport();
        viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
        ƒ.Debug.log("Viewport:", viewport);


        viewport.draw();
        canvas.dispatchEvent(
            new CustomEvent("interactiveViewportStarted", {
                bubbles: true,
                detail: viewport
            })
        );
    }

    export function setUpCam(): void {
        let camNode: ƒ.Node;
        camNode = new ƒ.Node("camNode");
        camNode.addComponent(createCamera());
        camNode.addComponent(new ƒ.ComponentTransform());
        camNode.mtxLocal.scale(new ƒ.Vector3(1, 2, 1));
    }

    export function createCamera(): ƒ.ComponentCamera {
        let newCam: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        viewport.camera = newCam;
        viewport.camera.projectCentral(canvas.clientWidth / canvas.clientHeight, 5);
        viewport.camera.mtxPivot.rotateY(180);
        viewport.camera.mtxPivot.translateZ(-18);
        return newCam;
    }
}