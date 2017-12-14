
//游戏开始，结束不同场景需要有不同画面
var SceneEnd =function (tag, game) {
    var s = {
        game: game,
    }

    // game.registerActions('a', function () {
    //     开始游戏
    // })

    s.draw = function () {
        // draw 背景
        ctx.fillStyle = "cadetblue"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "black"
        ctx.font = "20px sans-serif"
        ctx.fillText('WINNER WINER CHIKEN DINNER', 10 , canvas.height / 2 )

    }

    s.update = function () {
        //check death

    }


    return  s
}
