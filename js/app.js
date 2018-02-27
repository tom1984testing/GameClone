// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = speed;

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;

    // 敌人到屏幕最右边后重新回到最左边
    if(this.x >= 101 * 4) {
        this.x = 0;
    }

};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function () {
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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
            if(this.x >= 101 * 4) {
                this.x = 101 * 4;
            }
            break;
        case 'up':
            this.y -= this.speed;
            // 游戏成功，小人回到起点重新开始游戏
            if(this.y <= 0){
                this.x = 101 * 2;
                this.y = 83 * 5;
            }
            break;
        case 'down':
            // 向下移动，不能移动到屏幕外
            this.y += this.speed;
            if(this.y >= 83 * 5) {
                this.y = 83 * 5;
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
    allEnemies.push( new Enemy(i * 101, (i+1) * 83 - 20, 100 * (i+1) ) );
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
