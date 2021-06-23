function preload ()
{
    //音声ファイルの読み込み
    this.load.audio('suiteki', ['assets/suiteki.mp3']);
    this.load.audio('suityu', ['assets/suityu.mp3']);
    this.load.image('thumb', 'assets/thumb.png');

}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#badae8',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

var cursor;
var cursor2;
var stripes;
var graphics;
var rectangles;
var cursorWidth = window.innerWidth/1.5;
var stripeWidth = window.innerWidth/1.5;
var cursorHeight = 100;
var stripeHeight = 110;
var cursorColor = 0xffffff; //0xffffff
var stripeColor = 0xffffff;
var suitekiplayed;

function create (){

    this.suityu = this.sound.add('suityu', false);
    this.suiteki = this.sound.add('suiteki', false);

    //graphicsオブジェクトの生成
    graphics = this.add.graphics(
    {fillStyle: { color: cursorColor }
    });

    rectangles = [];

    //ストライプ生成
    for(var i = 0; i < 6; i++)
    {
        rectangles.push(new Phaser.Geom.Rectangle(
        window.innerWidth/2 - stripeWidth/2,
        window.innerHeight/2 - stripeHeight/2*(-11 + i*4),
        stripeWidth,
        stripeHeight,
        cursorColor));
    }

    //カーソルの生成とドラッグ有効化
    cursor = new Phaser.Geom.Rectangle(
        window.innerWidth/2 - cursorWidth/2,
        0,
        cursorWidth,
        cursorHeight, Phaser.Geom.Rectangle.Contains);

    cursor2 = new Phaser.Geom.Rectangle(
        window.innerWidth/2 - cursorWidth/2,
        0,
        cursorWidth,
        75,
        Phaser.Geom.Rectangle.Contains);

    this.input.on('pointermove', function (pointer) {
        Phaser.Geom.Rectangle.CenterOn(cursor, window.innerWidth/2, pointer.y);
        Phaser.Geom.Rectangle.CenterOn(cursor2, window.innerWidth/2, pointer.y);
    });

}


function update (){
    graphics.clear();
    graphics.fillRectShape(cursor);

    for(var i = 0; i < rectangles.length; i++){
        graphics.fillRectShape(rectangles[i]);
    }

    if (Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[0])
        || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[1])
        || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[2])
        || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[3])
        || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[4])
        || Phaser.Geom.Intersects.RectangleToRectangle(cursor2, rectangles[5]) ){

//         console.log("intersected");

           if(!this.suityu.isPlaying){
               this.suityu.play();
           }
           suitekiplayed = false;

    }else{
//       console.log("not intersected");
//        this.suityu.stop();
//        this.suiteki.play();
//
       if(this.suityu.isPlaying){
        this.suityu.stop();
       }
//
       if(!this.suiteki.isPlaying
          && !suitekiplayed){
           this.suiteki.play();
           suitekiplayed = true;
        }
    }
}
