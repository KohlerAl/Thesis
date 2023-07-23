namespace Script {
    declare var Artyom: any;

    export function startArtyom(): void {
        const artyom = new Artyom();

        artyom.addCommands({
            indexes: ["Hallo *", "Guten Tag *", "Hey *"],
            smart: true,
            action: function (_entry: any, _wildcard: string): void {
            }
        });

        artyom.redirectRecognizedTextOutput(function (recognized: any) {
            let npc: NPC = branch.getChildrenByName("NPC")[0].getComponent(NPC);
            if (npc.talk.talkingAllowed) {
                console.log(recognized.toString().toLowerCase())
                if (recognized.toString().toLowerCase() == "hallo") {
                    npc.talk.whatWasSaid = "hallo";
                }
                else if (recognized.toString().toLowerCase() == "hey") {
                    npc.talk.whatWasSaid = "hey";
                }
                else if (recognized.toString().toLowerCase() == "guten tag") {
                    npc.talk.whatWasSaid = "guten tag";
                }
                else {
                    npc.talk.whatWasSaid = recognized.toString();
                }

                npc.getSpeech();
            }
        });

        function listenArtyom(): void {
            artyom.fatality();

            setTimeout(
                function (): void {
                    artyom.initialize({
                        lang: "de-DE",
                        continuous: false,
                        listen: true,
                        interimResults: true,
                        debug: true
                    }).then(function (): void {
                    });
                },
                250);
        }

        listenArtyom();

    }

    export class talkyTalk {
        public prompt: string = "Use your microphone to say hello to Mykah!";
        public whatWasSaid: string;
        public talkingAllowed: boolean;

        public returnSaid(): string {
            return this.whatWasSaid;
        }

        public returnAllowed(): boolean {
            return this.talkingAllowed;
        }

        public setSaid(_newValue: string) {
            this.whatWasSaid = _newValue;
        }

        public setAllowed(_newValue: boolean) {
            this.talkingAllowed = _newValue;
        }

        public returnPrompt(): string {
            return this.prompt;
        }

    }
}