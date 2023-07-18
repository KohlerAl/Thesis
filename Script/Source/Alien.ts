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
    export class Alien extends ƒ.Node {
        alienNode: ƒ.Node;
        animation: ƒ.ComponentAnimator;

        currentTransform: ƒ.ComponentTransform;
        nextTransform: ƒ.ComponentTransform;
        state: STATE;


        constructor() {
            super("Avatar");
            this.alienNode = branch.getChildrenByName("Player")[0];
            console.log(this.animation.animation);
            this.state = STATE.STAND;
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
                    break;

            }
        }
    }
}