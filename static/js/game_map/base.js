import { AcGameObject } from "../../../static/js/ac_game_object/ac_game_object.js";
import { Controller } from "../controller/base.js";

export class GameMap extends AcGameObject {
    constructor(root) {
        super();

        this.root = root;
        // tabindex 可以让元素聚焦
        this.$canvas = $('<canvas width="1280" height="720" tabindex = 0></canvas>');

        // 取出canvas
        this.ctx = this.$canvas[0].getContext('2d');

        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();

        this.controller = new Controller(this.$canvas);
    }

    start() {

    }

    update() {
        this.render();
    }

    // 清空canvas
    render() {
        // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // console.log(this.ctx.canvas.width);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }
}