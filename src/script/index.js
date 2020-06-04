! function($) {
    // console.log(2)
    //导入头部组建
    $(document).ready(function() {
            $("header").load("header.html")
                // console.log(1)
        })
        //导入尾部组建
    $(document).ready(function() {
        $("footer").load("footer.html")
            // console.log(1) 
    })

    function erji() {
        $("#erji").find("li").mouseover(function() {
            var index = $(this).index();
            $("#erji").find("li").eq(index).css({
                "border-top": "1px solid #68af5c",
                "border-bottom": "1px solid #68af5c",
            });
            $("#erji").find("div").eq(index).show().siblings("div").hide();
        });
        $("#erji").find("li").mouseleave(function() {
            var index = $(this).index();
            $("#erji").find("li").eq(index).css({
                "border": "none"
            });
        })
        $("#erji").mouseleave(function() {
            $("#erji").find("div").hide();
        });
    }
    erji()


    //渲染数据
    //  const $boxlist1 = $('#tabbox');
    //  console.log($boxlist1)
    //   $.ajax({
    //     url: 'http://10.31.162.28/echong/php/listdata.php',
    //     dataType: 'json'
    //     }).done(function (data) {
    //         let $strhtml = '<div class="boxlist li3">';
    //         $strhtml += '<ul class="li3-1">'
    //         $.each(data, function (index, value) {

    //           $strhtml += `
    //           <li class="topdong">
    //             <a href="#">
    //                 <img class="lazy" data-original="${value.url}" alt="">
    //                 <span>${value.title}</span>
    //                 <span>￥${value.price}</span>
    //             </a>
    //         </li>
    //        `;

    //         if(index==7){
    //          return false
    //         }

    //   });
    //   $strhtml += '</ul>'
    //     $strhtml += '</div>';
    //     $boxlist1.html($strhtml);
    // });
    //图片懒加载
    //添加懒加载
    $(function() {
        $("img.lazy").lazyload({ effect: "fadeIn" });
    });


}(jQuery)