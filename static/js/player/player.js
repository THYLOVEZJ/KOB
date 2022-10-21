import { AcGameObject } from "../ac_game_object/ac_game_object.js";

export class Player extends AcGameObject {
    constructor(root, info) {
        super();

        this.root = root;
        // 玩家的id
        this.id = info.id;
        // 玩家的x坐标，y坐标
        this.x = info.x;
        this.y = info.y;
        // 玩家的宽和高
        this.width = info.width;
        this.height = info.height;
        // 玩家的颜色
        this.color = info.color;

        // 玩家当前的速度
        this.vx = 0;
        this.vy = 0;

        // 玩家走的方向
        this.direction = 1;

        // 速度
        this.speedx = 400; // 水平速度
        this.speedy = -2000; // 跳起的初始速度

        // 重力加速度
        this.gravity = 50;

        this.pressed_keys = this.root.game_map.controller.pressed_keys;
        // 状态机
        this.status = 3 // 0:原地不动 1:向前移动 2:向后移动 3:跳跃 4:攻击 5:被打 6:死亡

        // 动作
        this.animations = new Map();

        this.ctx = this.root.game_map.ctx;

        // 计数器
        this.frame_current_cnt = 0;
    }

    start() {

    }

    update_move() {
        this.vy += this.gravity;
        if (this.y > 500) {
            this.y = 500;
            this.vy = 0;
            if (this.status === 3) this.status = 0;
        }
        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        // 超出屏幕
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }

    }

    update_control() {
        let w, a, d, space;
        // 如果用户id为1
        if (this.id === 1) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            // 如果用户id为2
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }

        // 如果用户状态是0 || 1
        if (this.status === 0 || this.status === 1) {
            // 如果是在跳
            if (w) {
                // 如果是在向前，那么则往前方跳。
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                // 更改状态
                this.status = 3;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                // 这里如果不加会有bug
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update() {
        this.update_control();
        this.update_move();
        this.render();
    }

    render() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        let status = this.status;

        let obj = this.animations.get(status);

        // 如果obj存在且已经被渲染
        if (obj && obj.loaded) {
            let k = parseInt(this.frame_current_cnt / obj.frame_rate % obj.frame_cnt);
            let image = obj.gif.frames[k].image;
            // 画图
            this.ctx.drawImage(image, this.x, this.y, this.width, image.height);
        }
        this.frame_current_cnt++;
    }

}