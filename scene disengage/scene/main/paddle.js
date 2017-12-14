var Paddle = function (tag) {
    // var image = loadImgFromPath(path)
    var p = {
        x: 100,
        y: canvas.height * 0.98,
        space: 10,
        image: tag,
    }

    p.moveLeft= function () {
        if (p.x > 0) {
            p.x -= p.space
            }
        }


    p.moveRight = function () {
        if (p.x + p.image.width < canvas.width) {
            p.x += p.space
        }
    }

    return p
}
