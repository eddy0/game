
//游戏开始，结束不同场景需要有不同画面
var SceneStart =function (tag, game) {
    var s = {
        game: game,
    }
    s.ks = false

    canvas.addEventListener('click', function () {
        s.ks = true

    })

    game.registerActions('a', function (event) {
        log('haha')
        s.ks = true
    })
    game.registerActions('Enter', function () {
        s.ks = true
    })

    s.draw = function () {
        // draw 背景
        ctx.fillStyle = "cadetblue"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "black"
        ctx.font = "20px sans-serif"
        ctx.fillText('press Enter / Click to start', 100, canvas.height / 2 )


    }

    s.update = function () {
        // scene update
        if (s.ks) {
            var next = SceneMain(tag, game)
            game.replaceScene(next)
        }

    }

    return  s
}
