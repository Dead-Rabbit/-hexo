$(".drabbit-outer").click(function(e) {
    createOneRain(e.clientX - 5, e.clientY - 5)
})

// 创建雨滴
function createOneRain(x, y) {
    var newWater = $("<a class='drabbit-water' ></a>")
    newWater.css("left", x)
    newWater.css("top", y)
    $(".drabbit-outer").append(newWater)

    // 一帧的移动距离
    var speed = 10
    // 到达底部位置
    var bottom_position = -6
    var distance = $(".drabbit-outer-fish-bottom").position().top - $(document).scrollTop() - newWater.position().top

    var newone = setInterval(function(){
        newWater.css("top", newWater.position().top + speed)
        distance = $(".drabbit-outer-fish-bottom").position().top - $(document).scrollTop() - newWater.position().top - speed
        if (distance <= bottom_position) {
            // 添加涟漪
            createDrop(newWater.position().left)

            newWater.remove()
            clearInterval(newone)
        }
    }, 20)
}

function createDrop(x) {
    var newDrop = $("<div class='water-drop'></div>")
    newDrop.css("left", x - 25)
    newDrop.css("top", $(".drabbit-outer-fish-bottom").position().top)
    $(".drabbit-outer").append(newDrop)
    setTimeout(function() {
        newDrop.remove()
    }, 2000)
}

// 监听滚动
function checkForHeader() {
    if ($(document).scrollTop() > ($(".nav-drabbit").offset().top + $(".nav-drabbit").height())) {
        $("#header-inner").css("top", "0px")
    } else {
        $("#header-inner").css("top", "-60px")
    }
}
checkForHeader()
$(window).scroll(function(e){
    checkForHeader()
});

// 绑定raining按钮
var ifRaining = false
$(".drabbit-raining-a").mousedown(function(e){
    $(this).css("top", "0px")
})
$(".drabbit-raining-a").mouseup(function(e){
    $(this).css("top", ifRaining?"-60px":"-20px")
    changeRaining()
})
var intForRain;
function changeRaining() {
    // 更改raining状态
    ifRaining = !ifRaining
    if (ifRaining) {
        intForRain = setInterval(function() {
            var rainLevel = Math.random() * 3
            if (rainLevel <= 1) {
                createOneRain(Math.random() * document.body.clientWidth, $(".drabbit-outer-fish-up").position().top - $(document).scrollTop() + 10)
            }
        }, 100)
    } else {
        clearInterval(intForRain)
    }
}
