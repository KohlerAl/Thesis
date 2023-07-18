namespace Script {
    let animationData = {
        standing: "AnimationSprite|2023-05-30T09:04:28.176Z|61590",
        left: "AnimationSprite|2023-05-30T09:10:55.094Z|17281",
        right: "AnimationSprite|2023-07-18T09:16:38.532Z|71512"
    }
    enum STATE {
        LEFT,
        RIGHT,
        STAND
    }
    export class Alien extends ƒ.ComponentScript {
        public static readonly iSubclass: number = ƒ.Component.registerSubclass(Alien);
        alienNode: ƒ.Node;
        animation: ƒ.ComponentAnimator;

        currentTransform: ƒ.ComponentTransform;
        nextTransform: ƒ.ComponentTransform;
        state: STATE;


        constructor() {
            super(); 
            this.alienNode = branch.getChildrenByName("Player")[0];
            this.animation = this.alienNode.getComponent(ƒ.ComponentAnimator); 
            this.state = STATE.STAND;

            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
            this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
            this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);
        }

        changeAnimation(): void {
            switch (this.state) {
                case STATE.LEFT:
                    this.animation.animation.idResource = animationData.left;
                    break;

                case STATE.RIGHT:
                    this.animation.animation.idResource = animationData.right;
                    break;

                case STATE.STAND:
                    this.animation.animation.idResource = animationData.standing;
                    this.animation.animation.clearCache(); 
                    break;

            }
        }

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
                    break;
            }
        }
    }
}