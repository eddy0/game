

//debug
var enableDebug = function (enable, ball, tag) {
    if (!enable) {
        return
    }
    //pause & block 停止游戏和增加砖块
    // blocks = []
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var key = event.key
        if (key == 'p') {
            window.paused = !window.paused
        } else if ('123456789'.includes(key)) {
            blocks = loadLevel(Number(key), tag)
        }
    })

    //fps fps滑块调节
    var input = e('#id-input-fps')
    input.value = window.fps
    input.addEventListener('input', function (event) {
        var t = event.target
        log(t.value)
        window.fps = t.value
    })

    //球拖拽
    var dragable = false
    window.addEventListener('mousedown', function (event) {
        var x = event.offsetX
        var y = event.offsetY
        if (ball.hasPoint(x, y)) {
            dragable = true
        }
    })
    window.addEventListener('mousemove', function (event) {
        if (dragable) {
            ball.x = event.offsetX
            ball.y = event.offsetY
        }

    })
    window.addEventListener('mouseup', function (event) {
        dragable = false
    })
}

var loadLevel = function (n, tag) {
    // log(images.block)
    var n = n - 1
    var blocks = []
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p, tag.block)
        blocks.push(b)
    }
    return blocks
}


// ball & block 相撞 , 屎一样的判断
var exposureBB = function (block, ball) {
    var bl = block
    var qq = ball
    if ( (qq.y  < bl.y + bl.image.height && qq.x <  bl.x + bl.image.width ) && (qq.y  < bl.y + bl.image.height && bl.x < qq.x + qq.image.width )) {
        if ((bl.y  < qq.y + qq.image.height &&  qq.x <  bl.x + bl.image.width) && (bl.y < qq.y + qq.image.height && bl.x < qq.x + qq.image.width )) {
            return true
        }
    }
}

//ball & paddle相撞 反弹
var intersection = function (paddle, ball) {
    var b = ball
    var p = paddle
    if (b.y + b.image.height > p.y ) {
        if (b.x + b.image.width >= p.x && p.x + p.image.width >= b.x ) {
            return true
        }
    }
}

//游戏开始，结束不同场景需要有不同画面
var SceneMain =function (tag, game) {
    var s = {
        tag: tag,
        game: game,
    }
    //初始化，
    window.fps = 30

    var paddle = Paddle(tag.paddle)
    var ball = Ball(tag.ball)

    //debug
    enableDebug(true, ball, tag)


    //这里的block要是全局变量才可以与debug函数
    blocks = loadLevel(4, tag)
    var score = 0

    game.registerActions('a', function () {
        paddle.moveLeft()
    })

    game.registerActions('d', function () {
        paddle.moveRight()
    })

//按s的时候ball暂停
    game.registerActions('s', function () {
        ball.fire = false
    })

    game.registerActions('f', function () {
        ball.fire = true
        // 如果只有ball.move() 这会导致keyup之后move就取消了，所以要增加一个状态,这是一个触发机制而移动是一个待命的，只要为true加马上update
    })

    s.draw = function () {

        // draw 背景
        ctx.fillStyle = "#554"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#fff"
        ctx.fillText('分数: ' + score, 30, canvas.height * 0.98)

        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }

    s.update = function () {
        //check death
        if (ball.y + ball.image.height > canvas.height) {
            log('dead')
            var end = SceneEnd(tag, game)
            game.replaceScene(end)
        }

        //设置一个pause的全局变量,如果为true，则update函数什么都不执行
        if (window.paused) {
            return
        }
        ball.move()
        //
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]

            if ( exposureBB(block, ball)) {
                if (block.alive) {
                    ball.reverse()
                    block.dead()
                    //score if block.dead return block.alive==false
                    if (block.alive == false) {
                        score += 100
                    }
                }
            }

        }
        if (intersection(paddle, ball)) {
            ball.reverse()
        }


    }


    return  s
}
