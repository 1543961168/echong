! function($) {
    let $user = $('.username');
    let $pas = $('.password')
        // let $yhmts = ('.yhmts');
        //用户名输入框开关
    let $usernameflag = false;
    //密码框开关
    let $password = false
        //用户名框获取焦点提示
    $user.focus(function() {
        if ($(this).val().length == 0) {
            $('.yhmts').show().html("支持中文，字母，数字，'-'，'_'的多种组合");
        }
    });
    //用户名框输入时候的提示
    //用户名框失去焦点做的判断
    $user.on('blur', function() {
        console.log(1)
        if ($(this).val().length == 0) {
            $('.yhmts').show().html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        } else if ($(this).val().length > 1 && $(this).val().length < 6) {
            $('.yhmts').show().html("长度只能在6-20个字符之间").css("color", 'red');
            $usernameflag = false;
        } else if ($(this).val().length >= 6 && !isNaN($(this).val())) {
            $('.yhmts').show().html("用户名不能为纯数字").css("color", 'red');
            $usernameflag = false;
        } else {
            $usernameflag = true;
            $.get({
                type: 'post',
                url: 'http://10.31.162.28/echong/php/registry.php',
                data: {
                    username: $user.val()
                }
            }).then(function(result) {
                console.log($usernameflag)
                if (!result && $usernameflag) { //不存在
                    $('.yhmts').show().html('可以注册').css({ 'color': 'green', 'width': '200px' });
                    $usernameflag = true;
                } else {
                    $('.yhmts').show().html('账户名已存在').css('color', 'red');
                    $usernameflag = false;
                }
            })
        }
    });
    //密码框获取焦点提示
    $pas.focus(function() {
        if ($(this).val().length == 0) {
            $('.mits').show().html("建议使用字母、数字和符号两种以上的组合，8-20个字符");
            $password = false
        }
    })
    $pas.on('input', function() {
        let $pass = $(this).val();
        if ($pass.length >= 8 && $pass.length <= 20) {
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\W\_]+/; //其他字符

            //test():匹配存在感
            let $count = 0; //计数

            if (regnum.test($pass)) {
                $count++;
            }

            if (regupper.test($pass)) {
                $count++;
            }

            if (reglower.test($pass)) {
                $count++;
            }

            if (regother.test($pass)) {
                $count++;
            }

            switch ($count) {
                case 1:
                    $('.mits').show().html("密码强度弱").css("color", 'red');
                    $password = false;
                    break;
                case 2:
                case 3:
                    $('.mits').show().html("密码强度中").css("color", 'orange');
                    $password = true;
                    break;
                case 4:
                    $('.mits').show().html("密码强度强").css("color", 'green');
                    $password = true;
                    break;
            }

        } else {
            $('.mits').show().html("密码长度不符合").css("color", 'red');
            $password = false;
        }
    });
    //密码框失去焦点做的判断
    $pas.on('blur', function() {
        if ($(this).val() !== '') {
            if ($password) {
                $('.mits').show().html("密码可以使用").css("color", 'green');
                $password = true;
            }
        } else {
            $('.mits').show().html("密码不能为空").css("color", 'red');
            $password = false;
        }
    });
    // console.log($password)
    //提交按钮做的判断
    $('form').on('submit', function() {
        if ($usernameflag & $password) {
            $('form').subimit()
        } else {
            return false
        }

    });
    //密码框小眼睛特效
    $('.mima').on('click', function() {
        if ($(this).attr('class') == 'iconfont icon-yanjing mima') {
            $(this).attr('class', 'iconfont icon-biyanjing mima')
            $('.password').attr('type', 'password')
        } else { 
            $(this).attr('class', 'iconfont icon-yanjing mima')
            $('.password').attr('type', 'text')
        }
    });
    //删除用户框信息
    $('.del').on('click', function() {
        $('.username').val('')
        $('.yhmts').show().html('用户名不能为空').css('color', 'red');
    })
}(jQuery);