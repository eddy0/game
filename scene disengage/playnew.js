
//这里的问题是每次创建block都会创建一个，有多少个就会创建多少个一模一样的，所以需要程序第一次run就先把image载入进去， js图片加载是个异步方案,即使是在main函数里面也会之后才加载

var loadImgFromPath = function (images, callback) {
    var loads = []
    var tag={ }
    var names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            tag[name] = img
            loads.push(1)
            // log('load images', loads.length, names.length)
            if (loads.length == names.length) {
                log('tagfrompath,',tag)
                callback(tag)
            }
        }
    }
}



var __main = function () {
    //initial
    var images = {
        paddle:'img/paddle.png',
        ball: 'img/ball.png',
        block: 'img/block.png',
    }

    //把load里面的tag传给回调函数,不知道这个行不行
    // tag = {
    //     paddle: '<img src...>',
    // }
    loadImgFromPath(images ,function (tag) {
        guaGame(function (g) {
            var s = SceneStart(tag, g)
            g.runWithScene(s)
        })
    })
}


__main()
