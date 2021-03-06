var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

var Character = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 这是我们的玩家要躲避的敌人
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    var enemy = Object.create(Enemy.prototype);

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    Character.call(enemy, x, y, 'images/enemy-bug.png');

    enemy.speed = speed;
    return enemy;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;

    // 敌人到屏幕最右边后重新回到最左边
    if(this.x >= TILE_WIDTH * 5) {
        this.x = -TILE_WIDTH;
    }

};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x, y, speed) {
    var player = Object.create(Player.prototype);
    Character.call(player, x, y,  'images/char-boy.png');
    player.speed = speed;
    return player;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            // 向左移动，不能移动到屏幕外
            this.x -= this.speed;
            if(this.x <= 0){
                this.x = 0;
            }
            break;
        case 'right':
            // 向右移动，移动到屏幕最右边后重新回到最左边
            this.x += this.speed;
            if(this.x >= TILE_WIDTH * 4) {
                this.x = TILE_WIDTH * 4;
            }
            break;
        case 'up':
            this.y -= this.speed;
            // 游戏成功，小人回到起点重新开始游戏
            if(this.y <= 0){
                this.x = TILE_WIDTH * 2;
                this.y = TILE_HEIGHT * 5;
            }
            break;
        case 'down':
            // 向下移动，不能移动到屏幕外
            this.y += this.speed;
            if(this.y >= TILE_HEIGHT * 5) {
                this.y = TILE_HEIGHT * 5;
            }
            break;
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
const enemyCount = 3;
for(var i=0;i<enemyCount;i++) {
    allEnemies.push( new Enemy(i * TILE_WIDTH, (i+1) * TILE_HEIGHT - 20, 100 * (i+1) ) );
}

// 玩家
var player = new Player(101 * 2, 83 * 5, 83);

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
