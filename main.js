
class Item
{
    constructor(size, color)
    {
        this.pixi = new PIXI.Graphics();
        this.pixi.beginFill(color, 1);
        this.pixi.drawCircle(size, size, size);
        this.pixi.endFill();
    }
    setPosition(x, y)
    {
        this.pixi.x = x;
        this.pixi.y = y;
    }
}

function runGame()
{
    var renderWindow = document.getElementById("renderWindow");
    var app = new PIXI.Application(800, 600, {backgroundColor: 0xaa5555});
    renderWindow.appendChild(app.view);

    for (var row = 0; row < 4; ++row)
    {
        for (var column = 0; column < 4; ++column)
        {
            var item = new Item(50, 0x55FFFF);
            item.setPosition(row * 100, column * 100);
            app.stage.addChild(item.pixi);
        }
    }



}
