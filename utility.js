var log = console.log.bind(console)

var e = function (selector) {
    return document.querySelector(selector)
}

var canvas = e('#id-canvas')

var ctx = canvas.getContext('2d')


var loadImgFromPath = function (path) {
    var i = new Image()
    i.src = path
    return i
}
