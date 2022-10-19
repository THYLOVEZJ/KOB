import { GameMap } from "../../static/js/game_map/base.js";
import { Player } from "../js/player/player.js";


class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        console.log(this.$kof);

        this.game_map = new GameMap(this);
        this.Players = [
            new Player(this, {
                id: 1,
                x: 200,
                y: 0,
                width: 120,
                height: 200,
                color: 'blue',
            }),
            new Player(this, {
                id: 2,
                x: 900,
                y: 0,
                width: 120,
                height: 200,
                color: 'red',
            }),
        ];
    }
}
export {
    KOF
}
