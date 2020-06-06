! function($) {
    //获取本地id
    //获取本地id
    function benid() {
        //根据本地存储，显示用户信息
        if (localStorage.getItem('username')) {
            // console.log('username')
            $('.login').hide();
            $('.admin').show();
            $('.admin span').html(localStorage.getItem('username'));
        }

        $('.admin a').on('click', function() {
            $('.login').show();
            $('.admin').hide();
            localStorage.removeItem('username');
        });
    }
    benid()
        //头部下拉
    function heardxia() {
        $('.my').on('click', function() {
            $('.muecul').css({ "display": "block" })
            $('.muecul').hover(function() {
                $('.muecul').css({ "display": "block" })
            }, function() {
                $('.muecul').css({ "display": "none" })
            })
        })
    }
    heardxia();
    //读取本地cookie的值
    function cookding() {
        function cook() {
            let $cook = $.cookie('cookienum').split(',');
            let $cooknum = $('.cooknum')
                // console.log($cooknum)
            var $num = 0
                // console.log($cook);
            $.each($cook, function(i, val) {
                $num += +val
            })
            $cooknum.html($num)
        }
        setInterval(cook, 2000);
    }
    cookding()


}(jQuery)