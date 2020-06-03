var uid = localStorage.getItem("id")
var username = localStorage.getItem("username")
var token = localStorage.getItem("token")
$.get('http://jx.xuzhixiang.top/ap/api/cart-list.php', {
    id: uid
}, function(data) {
    console.log(data);
    data = data.data;
    var arr = data;
    var str = '';
    arr.forEach(function(val) {
        str += "\n            <tr>\n                <td class=\"commodity\">\n                    <div>\n                        <img src=\"".concat(val.pimg, "\" alt=\"\">\n                    </div>\n                    <h3>").concat(val.pdesc, "</h3>\n                                                  </td>\n                <td class=\"spice \">\n                    <h3>").concat(val.pprice, "</h3>\n                                 </td>\n                <td>\n                    <div class=\"num\"  pid=").concat(val.pid, ">\n                        <a href=\"javaScript:;\" class=\"reduce\"> - </a><span class=\"num2\">").concat(val.pnum, "</span><a href=\"javaScript:;\" class=\"add\">+</a>\n                    </div>\n                </td>\n                <td class=\"sumsp \">\n                    <h3>").concat(val.pprice * val.pnum, "</h3>\n                </td>\n                <td >\n                    <a class=\"del\"  pid=").concat(val.pid, " href=\"javaScript:;\">\u5220\u9664</a>\n                </td>\n            </tr>");
    });
    $('table').append(str);
});


$('table').on('click', '.add', function() {
    //只修改当前商品列的值
    var $num = $(this).siblings('.num2');
    var num = parseInt($num.html());
    $.get('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
        uid: uid,
        pid: $(this).parent().attr('pid'),
        pnum: num + 1
    }, function(data) {
        console.log(data);
    });
    $num.html(num + 1);

    let price = parseInt($(this).parent().parent().parent().find('.spice h3').html())

    let sumsp = parseInt($(this).parent().parent().next().find('h3').html());
    console.log(price, sumsp);

    $(this).parent().parent().next().find('h3').html(sumsp + price)
});

$('table').on('click', '.reduce', function() {
    var $num = $(this).siblings('.num2');
    var num = parseInt($num.html());

    if (num != 1) {
        $num.html(num - 1);
        $.get('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
                uid: uid,
                pid: $num.parent().attr('pid'),
                pnum: num - 1
            }, function(data) {
                console.log(data);
            })
            //计数加减
        let price = parseInt($(this).parent().parent().parent().find('.spice h3').html())

        let sumsp = parseInt($(this).parent().parent().next().find('h3').html());
        console.log(price, sumsp);

        $(this).parent().parent().next().find('h3').html(sumsp - price)

    }
}); //删除按钮

$('table').on('click', '.del', function() {
    //当用户点击删除时在页面删除
    $(this).parent().parent().remove(); // console.log($(this).parent().parent());
    $.get('http://jx.xuzhixiang.top/ap/api/cart-delete.php', {
        uid: uid,
        pid: $(this).attr('pid')
    }, data => {
        console.log(data);

    })
});