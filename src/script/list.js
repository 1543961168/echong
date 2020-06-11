! function($) {
    //导入头部组建
    $(document).ready(function() {
        $("header").load("header.html")
    });
    //导入尾部组建
    $(document).ready(function() {
        $("footer").load("footer.html")
            // console.log(1) 
    })
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;
    const $list = $('.list');
    $.ajax({
        url: 'http://10.31.162.28/echong/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        //将数据渲染出来
        let $strhtml = '<ul>';
        $.each(data, function(index, value) {
            $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}" target="_blank">
                        <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        <p>${value.sid}${value.title}</p>
                        <span class="price">￥${value.price}</span>
                        <span class="kucun">库存:${value.sailnumber}</span>
                    </a>
                </li>
            `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);
        //添加懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        array_default = [];
        array = [];
        prev = null;
        next = null;
        $('.list li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });
    //分页
    $('.page').pagination({
        pageCount: 2,
        jump: true,
        coping: true,
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取的页码给后端
            $.ajax({
                url: 'http://10.31.162.28/echong/php/listdata.php',
                data: {
                    page: api.getCurrent()
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                                <img src="${value.url}"/>
                                <p>${value.sid}${value.title}</p>
                                <span class="price">￥${value.price}</span>
                                <span class="kucun">库存:${value.sailnumber}</span>
                            </a>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                array_default = [];
                array = [];
                prev = null;
                next = null;
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });

    //3.排序
    $('button').eq(0).on('click', function() {
        $(this).addClass('qie').siblings('button').removeClass('qie')
        $.each(array_default, function(index, value) {
            $('.list ul').append(value);
        });
        return;
    });
    $('button').eq(1).on('click', function() {
        $(this).addClass('qie').siblings('button').removeClass('qie')
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('.list ul').append(value);
        });
    });
    $('button').eq(2).on('click', function() {
        $(this).addClass('qie').siblings('button').removeClass('qie')
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1));
                next = parseFloat(array[j + 1].find('.price').html().substring(1));
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('.list ul').append(value);
        });
    })


}(jQuery);