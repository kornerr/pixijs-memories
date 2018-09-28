
function runGame()
{
    var renderWindow = document.getElementById("renderWindow");
    var app = new PIXI.Application(800, 600, {backgroundColor: 0xaa5555});
    renderWindow.appendChild(app.view);
}
