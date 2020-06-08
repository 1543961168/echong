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
    $(document).ready(function() {
        var $tabbox = $('.tabbox .boxlist:nth-of-type(3)')
        var $tabbox1 = $('.tabbox .boxlist:nth-of-type(2)')
        var $tabbox2 = $('.tabbox .boxlist:nth-of-type(1)')
        var $tabbox3 = $('.tabbox')


        // console.log($tabbox)
        $.ajax({
            url: 'http://10.31.162.28/echong/php/indexdata.php',
            dataType: 'json',
        }).done(function(data) {
            let data1 = data.data2
            let $strul = '<ul class="li3-1">'
            $.each(data1, function(index, value) {
                $strul += `
                    <li class="topdong">
                        <a href="#">
                        <img class="lazy" data-original="${value.url}" alt="">
                        <span>${value.title}</span>
                        <span>￥${value.price}</span>
                        </a>
                    </li>
                    `
            });
            $strul += '</ul>'
            $tabbox.html($strul);

            let data2 = data.data3
            let $strul1 = '<ul class="li3-1">'
            $.each(data2, function(index, value) {
                $strul1 += `
                    <li class="topdong">
                        <a href="#">
                        <img class="lazy" data-original="${value.url}" alt="">
                        <span>${value.title}</span>
                        <span>￥${value.price}</span>
                        </a>
                    </li>
                    `
            });
            $strul1 += '</ul>'
            $tabbox1.html($strul1);

            let data3 = data.data4
            let $strul2 = '<ul class="li3-1">'
            $.each(data3, function(index, value) {
                $strul2 += `
                    <li class="topdong">
                        <a href="#">
                        <img class="lazy" data-original="${value.url}" alt="">
                        <span>${value.title}</span>
                        <span>￥${value.price}</span>
                        </a>
                    </li>
                    `
            });
            $strul2 += '</ul>'
            $tabbox2.html($strul2);

            let data01 = data.data1
            let $strul3 = '<div class="boxlist li4" style="display: block;">'
            $.each(data01, function(index, value) {
                if (index == 0) {
                    $strul3 += `
                    <div class="li4-1 dong">
                        <a href="#">
                            <span>${value.atitle}</span>
                            <span>${value.btitle}</span>
                            <img class="lazy" data-original="${value.url}" alt="">
                        </a>
                    </div>
                `
                }
            })
            $strul3 += ` <div class="li4-2 ">`
            $.each(data01, function(index, value) {
                if (index >= 1 && index < 3) {
                    $strul3 += `
                            <div class="dong">
                                <a href="#">
                                    <span>${value.atitle}</span>
                                    <span>${value.btitle}</span>
                                    <img class="lazy" data-original="${value.url}" alt=""></a>
                            </div>
                        `
                }
            })
            $strul3 += `</div>`

            $.each(data01, function(index, value) {
                if (index >= 3 && index < 7) {
                    $strul3 += `
                        <div class="li4-3 dong dong2">
                            <a href="#">
                                <span>${value.atitle}</span>
                                <span>${value.btitle}</span>
                                <img class="lazy" data-original="${value.url}" alt=""></a>
                            </a>
                        </div>
                    `
                }
            })
            $strul3 += '</div>'
            $tabbox3.append($strul3)

            //图片懒加载
            //添加懒加载
            $(function() {
                $("img.lazy").lazyload({ effect: "fadeIn" });
            })
        })
    });


}(jQuery)