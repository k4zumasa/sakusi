var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#f5f5f5',
    scene: {
        create: create,
        update: update
    }
};

var graphics;
var text;
var rectWidth = window.innerWidth * 0.55;
var rectHeight = 120
;

var game = new Phaser.Game(config);

function create ()
{
    graphics = this.add.graphics();

    //オブジェクトとしてカーソルを表示
    var cursor = this.add.rectangle(window.innerWidth/2, 0, rectWidth, rectHeight, 0x0a0a0a).setInteractive();

    //カーソルをdraggableに
    this.input.setDraggable(cursor);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.y = dragY;
    });

    for (let i = 0; i < 6; i++) {
        graphics.fillRect(window.innerWidth/2 - rectWidth/2,
        window.innerHeight/2 - rectHeight/2*(-11 + i*4),
        rectWidth,
        rectHeight,0x0a0a0a);
    }
}

//毎フレーム実行される
function update ()
{
//    if (this.input.pointer1.isDown || this.input.pointer2.isDown || this.input.pointer3.isDown || this.input.pointer4.isDown)
//    {
//        graphics.clear();
//    }



}
