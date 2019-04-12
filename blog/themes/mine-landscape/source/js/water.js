$(".drabbit-outer").click(function(e) {
    var newWater = $("<a class='drabbit-water' ></a>")
    newWater.css("left", e.clientX - 5)
    newWater.css("top", e.clientY - 5)
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
})

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
