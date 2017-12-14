
var judgeDirection = function (b) {
    if (b.x < 0 || b.x + b.image.width > canvas.width) {
        b.speedX = -1*b.speedX
    } if (b.y < 0 || b.y + b.image.height > canvas.height) {
        b.speedY = -1*b.speedY
        }
    }


var Ball = function (tag) {
    // var image = loadImgFromPath(path)
    var b = {
        x: 100,
        y: 200,
        speedX: 7,
        speedY: 8,
        image: tag,
        fire : false,
    }

    b.move = function () {
        if (b.fire) {
            judgeDirection(b)
            b.x += b.speedX
            b.y +=b.speedY
        }
    }

    b.reverse = function () {
        b.speedY = -1 * b.speedY
    }

    b.hasPoint = function (x, y) {
        var Inx = x > b.x && x <  b.x + b.image.width
        var Iny = y > b.y && y < b.y + b.image.height
        return Inx && Iny
    }

    return b
}
