namespace Script {
  
    export enum STATE {
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

        animationLeft: ƒ.ComponentAnimator;
        animationRight: ƒ.ComponentAnimator;
        animationStand: ƒ.ComponentAnimator;

        constructor() {
            super();
            this.alienNode = branch.getChildrenByName("Player")[0];
            this.animation = this.alienNode.getComponent(ƒ.ComponentAnimator);
            this.state = STATE.STAND;

            this.addEventListener(ƒ.EVENT.COMPONENT_ADD, this.hndEvent);
            this.addEventListener(ƒ.EVENT.COMPONENT_REMOVE, this.hndEvent);
            this.addEventListener(ƒ.EVENT.NODE_DESERIALIZED, this.hndEvent);

            this.setup();
            this.changeAnimation();
        }

        changeState(_new: ƒ.Node, _current: ƒ.Node) {
            if (_new.mtxLocal.translation.x < _current.mtxLocal.translation.x)
                this.state = STATE.LEFT;

            else if (_new.mtxLocal.translation.x > _current.mtxLocal.translation.x)
                this.state = STATE.RIGHT;
            
            this.changeAnimation(); 
        }

        changeAnimation(): void {
            switch (this.state) {
                case STATE.LEFT:
                    this.animation.animation = this.animationLeft.animation;
                    break;

                case STATE.RIGHT:
                    this.animation.animation = this.animationRight.animation;
                    break;

                case STATE.STAND:
                    this.animation.animation = this.animationStand.animation;
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

        async setup() {
            this.animationLeft = branch.getChildrenByName("Animations")[0].getChildrenByName("AnimationLeft")[0].getComponent(ƒ.ComponentAnimator);

            this.animationRight = branch.getChildrenByName("Animations")[0].getChildrenByName("AnimationRight")[0].getComponent(ƒ.ComponentAnimator);

            this.animationStand = branch.getChildrenByName("Animations")[0].getChildrenByName("AnimationStand")[0].getComponent(ƒ.ComponentAnimator);

        }

        setToGround(): void {
            player.mtxLocal.translateY(500)
        }

    }
}