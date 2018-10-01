
const BACKGROUND_COLOR = 0xCCCCCC;
const BACKGROUND_COLOR_VICTORY = 0x55FF55;
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
    constructor(size)
    {
        // Keep size.
        this.size = size;

        // Define properties.
        this.clickHandler = null;
        this.id = null;
        this.matchId = null;

        // Create container to host default and selected states.
        this.pixi = new PIXI.Container();

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

    }

    setColors(defaultColor, selectedColor)
    {
        // Create sprites to depict default/selected states.
        this.defaultSprite = createSprite(this.size, defaultColor);
        this.selectedSprite = createSprite(this.size, selectedColor);
        this.pixi.removeChildren();
        this.pixi.addChild(this.defaultSprite);
        this.pixi.addChild(this.selectedSprite);

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

class Game
{
    constructor()
    {
        this.gameHasBeenWon = null;
        this.selectedItems = [];

        this.setupItems();
    }

    setupItems()
    {
        this.root = new PIXI.Container();

        var id = 0;
        for (var row = 0; row < ROWS_COUNT; ++row)
        {
            for (var column = 0; column < COLUMNS_COUNT; ++column)
            {
                // Create and add.
                var item = new Item(ITEM_SIZE);
                this.root.addChild(item.pixi);

                // Configure identification.
                item.id = id++;
                item.matchId = Math.floor(item.id / 2);
                var selectedColor = SELECTED_COLORS[item.matchId];
                item.setColors(DEFAULT_COLOR, selectedColor);

                // Configure position.
                var x = ITEM_SPACE + column * ITEM_SPACE;
                var y = ITEM_SPACE + row * ITEM_SPACE;
                item.setPosition(x, y);

                // Configure selection.
                item.clickHandler = (item) => {
                    this.selectItem(item);
                };
            }
        }
    }

    selectItem(item)
    {
        console.log("select item.id: '" + item.id + "' item.matchId: '" + item.matchId + "'");
        // Collect selected items.
        this.selectedItems.push(item);
        // Depict selection.
        item.setSelected(true);

        // Make sure there is a pair of items.
        if (this.selectedItems.length != 2)
        {
            return;
        }

        var item1 = this.selectedItems[0];
        var item2 = this.selectedItems[1];

        // Deselect items.
        this.selectedItems = [];
        item1.setSelected(false);
        item2.setSelected(false);

        // Remove matching items.
        if (item1.matchId == item2.matchId)
        {
            this.removeMatchingItems(item1, item2);
            this.reportVictoryIfNoItemsLeft();
        }
        // Do nothing if items do not match.
        else
        {
            console.log("items DO NOT match");
        }
    }

    removeMatchingItems(item1, item2)
    {
        this.root.removeChild(item1.pixi);
        this.root.removeChild(item2.pixi);
    }

    reportVictoryIfNoItemsLeft()
    {
        // Make sure there are no items left.
        if (this.root.children.length > 0)
        {
            return;
        }

        // Report victory by changing background color.
        if (this.gameHasBeenWon)
        {
            this.gameHasBeenWon();
        }
    }
}

function runGame()
{
    var renderWindow = document.getElementById("renderWindow");
    var app = new PIXI.Application(WINDOW_SIZE, WINDOW_SIZE, {backgroundColor: BACKGROUND_COLOR});
    renderWindow.appendChild(app.view);

    var game = new Game();
    app.stage.addChild(game.root);

    // Change background color when the game is over.
    game.gameHasBeenWon = () => {
        app.renderer.backgroundColor = BACKGROUND_COLOR_VICTORY;
    };
}
