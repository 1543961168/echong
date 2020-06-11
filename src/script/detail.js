! function($) {
    //导入头部组建
    $(document).ready(function() {
        $("header").load("header.html")
            //导入尾部组建
        $("footer").load("footer.html")
            // console.log(1) 
    });

    //1.列表页传来的sid
    let $sid = location.search.substring(1).split('=')[1];
    const $smallpic = $('#smallpic');
    const $bpic = $('#bpic');
    const $title = $('.loadtitle');
    const $price = $('.loadpcp');
    //放大镜
    const $spic = $('#spic');
    const $sf = $('#sf'); //小放
    const $bf = $('#bf'); //大放
    const $left = $('#left'); //左箭头
    const $right = $('#right'); //右箭头
    //将商品的数据存放到cookie中
    let arrsid = [];
    let arrnum = [];
    let $abtn = $('.abtn');
    //计算比例问题
    const $list = $('#list'); //小图列表
    $sf.width($spic.width() * $bf.width() / $bpic.width());
    $sf.height($spic.height() * $bf.height() / $bpic.height());
    let $bili = $bpic.width() / $spic.width();
    if (!$sid) {
        $sid = 1;
    }
    //sid传给后端
    $.ajax({
        url: 'http://10.31.162.28/echong/php/getsid.php',
        data: {
            sid: $sid
        },
        dataType: 'json'
    }).done(function(d) {
        console.log(d);
        $smallpic.attr('src', d.url);
        $smallpic.attr('sid', d.sid);
        $bpic.attr('src', d.url);
        $title.html(d.title);
        $price.html(d.price);
        //渲染小图
        let picarr = d.piclisturl.split(',');
        let $strhtml = '';
        $.each(picarr, function(index, value) {
            $strhtml += '<li><img src="' + value + '"/>></li>';
        });
        $('#list ul').html($strhtml);
    });
    //鼠标移入移出
    $spic.hover(function() {
        $sf.css('visibility', 'visible');
        $bf.css('visibility', 'visible');
        $(this).on('mousemove', function(ev) {
            let $leftvalue = ev.pageX - $('.goodsinfo').offset().left - $sf.width() / 2;
            let $topvalue = ev.pageY - $('.goodsinfo').offset().top - $sf.height() / 2;
            if ($leftvalue < 0) {
                $leftvalue = 0;
            } else if ($leftvalue >= $spic.width() - $sf.width()) {
                $leftvalue = $spic.width() - $sf.width()
            }

            if ($topvalue < 0) {
                $topvalue = 0;
            } else if ($topvalue >= $spic.height() - $sf.height()) {
                $topvalue = $spic.height() - $sf.height()
            }

            $sf.css({
                left: $leftvalue,
                top: $topvalue
            });

            $bpic.css({
                left: -$leftvalue * $bili,
                top: -$topvalue * $bili
            });

        });
    }, function() {
        $sf.css('visibility', 'hidden');
        $bf.css('visibility', 'hidden');
    });

    //小图切换
    $('#list ul').on('click', 'li', function() {
        //$(this):当前操作的li
        let $imgurl = $(this).find('img').attr('src');
        $smallpic.attr('src', $imgurl);
        $bpic.attr('src', $imgurl);
    });

    //箭头事件
    let $num = 6;
    $right.on('click', function() {
        let $lists = $('#list ul li');
        if ($lists.size() > $num) {
            $num++;
            $left.css('color', '#333');
            if ($lists.size() == $num) {
                $right.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });
    $left.on('click', function() {
        let $lists = $('#list ul li');
        if ($num > 6) {
            $num--;
            $right.css('color', '#333');
            if ($num <= 6) {
                $left.css('color', '#fff');
            }
            $('#list ul').animate({
                left: -($num - 6) * $lists.eq(0).outerWidth(true)
            });
        }
    });
    //将商品数据存放到cookie中 与购物车页面数据保持一致
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    $abtn.on('click', function() {
        let $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) {
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val()); //取值
            arrnum[$.inArray($sid, arrsid)] = $num; //赋值
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {
            arrsid.push($sid);
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($('#count').val());
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        // 飞入购物车效果
        var offset = $(".car1").offset();
        var img = $smallpic.attr('src');
        var flyer = $('<img class="u-flyer" src="' + img + '">');
        flyer.fly({
            start: {
                left: $smallpic.offset().top, //开始位置
                top: $smallpic.offset().left //开始位置
            },
            end: {
                left: offset.left + 10, //结束位置 
                top: offset.top + 10, //结束位置
                width: 0, //结束时宽度 
                height: 0 //结束时高度 
            },
            onEnd: function() { //结束回调 
                $("#msg").show().fadeOut(1000); //提示信息 
            }
        });
    });
    //页面倒计时
    $.fn.extend({
        countDown: function(options) {
            var defaults = {
                    endTime: '2020/6/15',
                    day: '.day',
                    hour: '.hour',
                    minute: '.minute',
                    sec: '.sec'
                },
                opts = $.extend({}, defaults, options); //对象扩展到opts
            this.each(function() { //遍历
                var $this = $(this);
                times(); //先执行一次，防止刷新时数字都显示为0
                var timer = setInterval(times, 1000); //定时器执行

                function times() {
                    var nowDate = new Date(),
                        endDate = $this.data('end') ? new Date($this.data('end')) : new Date(opts.endTime), // 定义了两种方式，data-end和defaults.endTime,优先data-end
                        tms = endDate - nowDate, //时间差
                        days = Math.floor(tms / 1000 / 60 / 60 / 24),
                        hours = Math.floor(tms / 1000 / 60 / 60 % 24),
                        minutes = Math.floor(tms / 1000 / 60 % 60),
                        secs = Math.floor(tms / 1000 % 60);
                    if (tms > 0) { //如果时间差大于0，显示倒计时
                        $this.find(opts.day).text(addZero(days));
                        $this.find(opts.hour).text(addZero(hours));
                        $this.find(opts.minute).text(addZero(minutes));
                        $this.find(opts.sec).text(addZero(secs));
                    } else { //否则清除定时器，倒计时结束
                        clearInterval(timer);
                    }
                }
            });


            function addZero(t) { //一位数加0
                if (t < 10) {
                    return t = '0' + t;
                } else {
                    return t;
                }
            }
            return this; //返回this方便链式调用
        }
    });
    $('.count-down').countDown(); //默认调用方法

    //商品数量加减
    function num() {
        const $zuo = $('.zuo')
        const $you = $('.you')
        const $count = $('#count')

        $you.on('click', function() {
            $count.val(parseInt($count.val()) + 1)
        })
        $zuo.on('click', function() {
            $count.val(parseInt($count.val()) - 1)
            if (parseInt($count.val()) - 1 < 1) {
                $count.val(1)
            }
        })

    }
    num()

}(jQuery);