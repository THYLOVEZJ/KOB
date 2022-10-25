import { Player } from "./player.js";
import { GIF } from "../utils/gif.js"


export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets = [-0, -17, -17, -120, -30, 0, 0];
        let scale_pic = [0.8, 0.8, 0.8, 0.8, 1, 0.8, 0.8]
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`../../../static/img/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, // 当前动画的总帧数
                frame_rate: 10, // 每5帧过渡一次
                offset_y: offsets[i], // y方向偏移量
                loaded: false, // 是否加载完成
                scale: 1.5 * scale_pic[i], // 放大多少倍
            });

            gif.onload = function () {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
                if (i === 3) {
                    this.frame_rate = 3;
                }
            }
        }
    }
}