
var __main = function () {
    var paddle = Paddle('paddle.png')
    var ball = Ball('ball.png')
    // var block = Block('block.png')

    var blocks = []
    for (var i = 0; i < 3; i++) {
        var b = Block('block.png')
        b.x = i * 50
        blocks.push(b)
        log('ok')
    }
    log('blocks')

    var game = guaGame()
    game.registerActions('a', function () {
        paddle.moveLeft()
        block.moveLeft()
    })
    game.registerActions('d', function () {
        paddle.moveRight()
        block.moveRight()
    })

    game.registerActions('s', function () {
        ball.fire = false
    })

    game.registerActions('f', function () {
        ball.fire = true
        // 如果只有ball.move() 这会导致keyup之后move就取消了，所以要增加一个状态,这是一个触发机制而移动是一个待命的，每次update这个判断
    })



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

    // ball & block 相撞
    var exposureBB = function (block, ball) {
        var bl = block
        var qq = ball
        if ( (qq.y  < bl.y + bl.image.height && qq.x <  bl.x + bl.image.width ) && (qq.y  < bl.y + bl.image.height && bl.x < qq.x + qq.image.width )) {
            if ((bl.y  < qq.y + qq.image.height &&  qq.x <  bl.x + bl.image.width) && (bl.y < qq.y + qq.image.height && bl.x < qq.x + qq.image.width )) {
                return true
            }
        }
    }

    game.update = function () {
        ball.move()
        if (intersection(paddle, ball)) {
            ball.reverse()
        } if (block.alive && exposureBB(block, ball)) {
            ball.reverse()
            block.dead()
        }
    }

    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }

}


__main()
