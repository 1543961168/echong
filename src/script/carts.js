! function($) {
    //导入头部组建
    $(document).ready(function() {
        $("header").load("header.html")
    });
    //导入尾部组建
    $(document).ready(function() {
        $("footer").load("footer.html")
            // console.log(1) 
    });
    // 头部滑块
    function tophk() {
        const $hkli = $('.hk>ul>li')
        $(".hk>ul>li").hover(function() {
            var x = $(this).offset().left - $(this).outerWidth() - 51;
            $(this).addClass('hkactive').siblings('li').removeClass('hkactive')
            console.log(x);
            $(".hkspan").css("marginLeft", x)
        }, function() {
            $(".hkspan").css("marginLeft", "0")
            $hkli.eq(0).addClass('hkactive').siblings('li').removeClass('hkactive')
        })
    }
    tophk();

    //获取元素
    let $itemlist = $('.item-list');
    let $anum = $('.amount-sum');
    let $tprice = $('.totalprice');
    let $allselect = $('.allsel'); //全选按钮的获取
    let $numadd = $('.quantity-add'); //添加数量按钮
    let $numdel = $('.quantity-down'); //减少数量按钮
    let $numinput = $('.quantity-form input'); //数字input框
    //将改变后的数量存放到cookie中
    let arrsid = [];
    let arrnum = [];
    //传进去两个参数
    function showlist(sid, num) {
        $.get({
            url: 'http://10.31.162.28/echong/php/alldata.php',
            dataType: 'json'
        }).then(function(data) {
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.goods-pic').find('img').attr('src', value.url); //改变图片
                    $clonebox.find('.goods-pic').find('img').attr('sid', value.sid); //改变sid
                    $clonebox.find('.goods-d-info').find('a').html(value.title); //改变标题
                    $clonebox.find('.b-price').find('strong').html(value.price); //改变价格
                    $clonebox.find('.quantity-form').find('input').val(num); //改变库存数量
                    //计算单个商品的价格
                    $clonebox.find('.b-sum').find('strong').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $itemlist.append($clonebox); //讲克隆的元素添加进去
                    calcprice(); //计算总价
                }
            });
        });
    }

    //cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let s = $.cookie('cookiesid').split(',');
        let n = $.cookie('cookienum').split(',');
        $.each(s, function(index, value) {
            showlist(s[index], n[index]);
        });
    }

    //计算总价的函数
    function calcprice() {
        let $sum = 0; //商品的件数
        let $count = 0; //商品的总价
        $('.goods-item:visible').each(function(index, ele) {
            if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框勾选
                $sum += parseInt($(ele).find('.quantity-form input').val());
                $count += parseFloat($(ele).find('.b-sum strong').html());
            }
        });
        $anum.find('em').html($sum);
        $tprice.html($count.toFixed(2));
    }

    //全选按钮事件的处理
    $allselect.on('change', function() {
        $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $allselect.prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
    });
    let $inputs = $('.goods-item:visible').find(':checkbox');
    $itemlist.on('change', $inputs, function() {
        //$(this):被委托的元素，checkbox
        if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
            $allselect.prop('checked', true);
        } else {
            $allselect.prop('checked', false);
        }
        calcprice(); //计算总价
    });

    //数量的增加
    $numadd.on('click', function() {
        let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
        $num++;
        $(this).parents('.goods-item').find('.quantity-form input').val($num);

        $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });

    //数量的减少
    $numdel.on('click', function() {
        let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
        $num--;
        if ($num < 1) {
            $num = 1;
        }
        $(this).parents('.goods-item').find('.quantity-form input').val($num);
        $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });

    //input框里面数字的改变
    $numinput.on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });

    //计算单价
    function calcsingleprice(obj) { //obj元素对象
        let $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
        let $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
        return ($dj * $num).toFixed(2)
    }


    //存放两个值到cookie中
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }
    //cookie的变化
    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.goods-item').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
        $.cookie('cookienum', arrnum, 10);
    }
    //删除
    function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }

    $('.b-action>a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要删除吗?')) {
            $(this).parents('.goods-item').remove();
            delcookie($(this).parents('.goods-item').find('img').attr('sid'), arrsid);
            calcprice(); //计算总价
        }
    });


    $('.operation a').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要全部删除吗?')) {
            $('.goods-item:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            });
            calcprice(); //计算总价
        }
    });

}(jQuery);