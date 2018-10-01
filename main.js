
const WINDOW_SIZE = 660;

const ROWS_COUNT = 4;
const COLUMNS_COUNT = 4;

const ITEM_SIZE = 40;
const ITEM_SPACE = 110; 
const DEFAULT_COLOR = 0xFFFFFF;
const SELECTED_COLORS = [
    0x555555,
    0x000000,
    0xFFFF00,
    0x00FFFF,
    0xFF00FF,
    0x55AAFF,
    0xFFAA55,
    0x22AA22,
];

function createSprite(size, color)
{
    var sprite = new PIXI.Graphics();
    sprite.beginFill(color, 1);
    sprite.drawCircle(size, size, size);
    sprite.endFill();

    return sprite;
}

class Item
{
    constructor(size, defaultColor, selectedColor)
    {
        // Define properties.
        this.clickHandler = null;
        this.id = null;
        this.matchId = null;

        // Create a sprite for each state.
        this.defaultSprite = createSprite(size, defaultColor);
        this.selectedSprite = createSprite(size, selectedColor);
        // Add sprites to container.
        this.pixi = new PIXI.Container();
        this.pixi.addChild(this.defaultSprite);
        this.pixi.addChild(this.selectedSprite);

        // Setup interaction.
        this.pixi.interactive = true;
        this.pixi.buttomMode = true;
        this.pixi.on(
            "pointerdown",
            () => {
                if (this.clickHandler)
                {
                    this.clickHandler(this)
                }
            }
        );

        // Reset state.
        this.setSelected(false);
    }

    setPosition(x, y)
    {
        this.pixi.x = x;
        this.pixi.y = y;
    }

    setSelected(state)
    {
        this.isSelected = state;
        // Toggle selected sprite visibility based on selection state.
        this.selectedSprite.visible = state
    }
}

function runGame()
{
    var renderWindow = document.getElementById("renderWindow");
    var app = new PIXI.Application(WINDOW_SIZE, WINDOW_SIZE, {backgroundColor: 0xaa5555});
    renderWindow.appendChild(app.view);

    var id = 0;

    for (var row = 0; row < ROWS_COUNT; ++row)
    {
        for (var column = 0; column < COLUMNS_COUNT; ++column)
        {
            var itemId = id++;
            var itemMatchId = Math.floor(itemId / 2);
            var selectedColor = SELECTED_COLORS[itemMatchId];
            var item = new Item(ITEM_SIZE, DEFAULT_COLOR, selectedColor);
            app.stage.addChild(item.pixi);

            item.id = itemId;
            item.matchId = itemMatchId;
            var x = ITEM_SPACE + column * ITEM_SPACE;
            var y = ITEM_SPACE + row * ITEM_SPACE;
            item.setPosition(x, y);
            item.clickHandler = function(item) {
                item.setSelected(true);
                console.log("item.id: '" + item.id + "' item.matchId: '" + item.matchId + "'");
            };
        }
    }



}
