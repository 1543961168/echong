var uid = localStorage.getItem("id")
var username = localStorage.getItem("username")
var token = localStorage.getItem("token")
console.log(uid, username, token)

$.get('http://jx.xuzhixiang.top/ap/api/productlist.php', {
    uid: uid
}, function(data) {
    console.log(data);
    data = data.data;
    var arr = data;
    var str = '';

    for (var i = 0; i < 4; i++) {
        arr.forEach(function(val) {
            // console.log(element);
            str +=
                "<li uid=\"".concat(val.pid, "\">\n   <a href=\"../详情/index.html?id=")
                .concat(val.pid, "\"> <img src=\"")
                .concat(val.pimg, "\" alt=\"\">\n     <div>\n      <h2>")
                .concat(val.pprice, "</h2>\n                        <h3>")
                .concat(parseInt(val.pprice / (parseFloat(val.pdesc) / 10)), "</h3> <span>")
                .concat(val.pdesc, "</span></div>\n                    <p>")
                .concat(val.pname, "</p>\n                </a>\n                </li>");
        });
    }

    $('#list').html(str);
});
//添加商品
$('#test').click(function() {
    $.post('http://jx.xuzhixiang.top/ap/api/goods/goods-add.php', {
        pimg: '../img/list1.jpg',
        pname: '爽口脆',
        pprice: '239',
        pdesc: '1.2折',
        uid: uid
    }, data => {
        console.log(data);
    })
    $.post('http://jx.xuzhixiang.top/ap/api/goods/goods-add.php', {
        pimg: '../img/list2.jpg',
        pname: '咸鱼',
        pprice: '339',
        pdesc: '2.6折',
        uid: uid
    }, data => {
        console.log(data);
    })
    $.post('http://jx.xuzhixiang.top/ap/api/goods/goods-add.php', {
        pimg: '../img/list3.jpg',
        pname: '第二条咸鱼',
        pprice: '209',
        pdesc: '2.7折',
        uid: uid
    }, data => {
        console.log(data);
    })
    $.post('http://jx.xuzhixiang.top/ap/api/goods/goods-add.php', {
            pimg: '../img/list4.jpg',
            pname: '第三条咸鱼',
            pprice: '179',
            pdesc: '2.4折',
            uid: uid
        }, data => {
            console.log(data);
        })
        // //获取商品列表
    $.get('http://jx.xuzhixiang.top/ap/api/productlist.php', {
        uid: uid
    }, data => {
        console.log('刷新后');
        console.log(data);
    })
});
//  // //删除商品，
// $.get('http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php', {
//     pid: '197020',
//     uid: uid,
//     token: token
// }, data => {
//     console.log(data);
// })
// $.get('http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php', {
//     pid: '197022',
//     uid: uid,
//     token: token
// }, data => {
//     console.log(data);
// })
// $.get('http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php', {
//     pid: '197017',
//     uid: uid,
//     token: token
// }, data => {
//     console.log(data);
// })
// $.get('http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php', {
//     pid: '197015',
//     uid: uid,
//     token: token
// }, data => {
//     console.log(data);
// })



/*$.post("http://jx.xuzhixiang.top/ap/api/goods/goods-add.php", {
        pname: "商品2",
        pprice: 100,
        pimg: "imgs/1.jpg",
        pdesc: "这是一件物美价廉的商品",
        uid: "32887"
      }).then(data => {
        console.log(data);
      }); */