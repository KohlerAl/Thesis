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
        let graph: ƒ.Graph = <ƒ.Graph>ƒ.Project.resources["Graph|2023-05-18T10:13:48.300Z|18467"];
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
}