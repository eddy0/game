
var guaGame = function (callback) {

    g = {
        keydowns: {},
        actions:{},
        scene:{},
    }

    //events
    window.addEventListener('keydown', function (event) {
        // 存下keydown的键
        var key = event.key
        g.keydowns[event.key] = true

    })

    window.addEventListener('keyup', function (event) {
        // cancel left
        var key = event.key
        g.keydowns[event.key] = false
    })

    g.registerActions = function (key, callback) {
        g.actions[key] = callback
    }

    g.drawImage = function (o) {
        // log(o) o=paddle={}
        ctx.drawImage(o.image, o.x, o.y)
    }

    g.update = function() {
        g.scene.update()
    }

    g.draw = function() {
        g.scene.draw()
    }
    // replaceScene = function (scene) {
    //
    // }
    g.replaceScene = function (scene) {
        g.scene = scene
    }


    var runloop = function () {
        var action = Object.keys(g.actions)
        for (var i = 0; i < action.length; i++) {
            var key = action[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }

        g.update()
        //redraw = clear + draw
        ctx.clearRect(0, 0, canvas.width, canvas.width)
        g.draw()
        //递归next runloop
        setTimeout(function () {
            runloop()
        }, 1000/window.fps)
    }

    g.runWithScene = function (scene) {
        g.scene = scene
            log(scene)
    }

        //第一次启动的settimeout
        setTimeout(function () {
            callback(g)
            runloop()
        }, 1000/window.fps)



    return g
}
