
class Item
{
    constructor(size, color)
    {
        // Setup visual depiction.
        this.sprite = new PIXI.Graphics();
        this.sprite.beginFill(color, 1);
        this.sprite.drawCircle(size, size, size);
        this.sprite.endFill();

        // Setup interaction.
        this.sprite.interactive = true;
        this.sprite.buttomMode = true;
        this.sprite.on(
            "pointerdown",
            () => {
                if (this.clickHandler)
                {
                    this.clickHandler()
                }
            }
        );

        this.clickHandler = null
    }

    setClickHandler(func)
    {
        this.clickHandler = func;
    }

    setPosition(x, y)
    {
        this.sprite.x = x;
        this.sprite.y = y;
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
            item.setClickHandler(
                () => {
                    console.log("item clicked");
                }
            );

            app.stage.addChild(item.sprite);
        }
    }



}
