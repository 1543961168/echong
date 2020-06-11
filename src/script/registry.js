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
        })
        //用户名框失去焦点做的判断
    $user.on('blur', function() {
        // $('.yhmts').hide()
        if ($(this).val().length == 0) {
            // $('.yhmts').hide();
            $usernameflag = false;
        } else if ($(this).val().length > 0 && $(this).val().length < 4) {
            $('.yhmts').show().html("长度只能在4-20个字符之间").css("color", 'red');
            $usernameflag = false;
        } else if ($(this).val().length >= 4 && !isNaN($(this).val())) {
            $('.yhmts').show().html("用户名不能为纯数字").css("color", 'red');
            $usernameflag = false;
        } else {
            $('.yhmts').hide();
            $usernameflag = true;
        }
        $.ajax({
            type: 'post',
            url: 'http://10.31.162.28/echong/php/registry.php',
            data: {
                username: $user.val()
            }
        }).done(function(result) {
            console.log($usernameflag)
            if (!result && $usernameflag) { //不存在
                $('.yhmts').show().html('可以注册').css({ 'color': 'green', 'width': '200px' });
                $usernameflag = true;
            } else {
                $('.dui').html('账户名已存在').css('color', 'red');
                $usernameflag = false;
            }
        })
    });
    //密码框获取焦点提示
    $pas.focus(function() {
            if ($(this).val().length == 0) {
                $('.mits').show().html("建议使用字母、数字和符号两种以上的组合，6-20个字符");
                $password = false
            }
        })
        // $pas.on('input', function() {
        //         console.log(1)
        //         let $pass = $(this).val();
        //         if ($pass.length >= 6 && $pass.length <= 20) {
        //             let regnum = /\d+/;
        //             let regupper = /[A-Z]+/;
        //             let reglower = /[a-z]+/;
        //             let regother = /[\W\_]+/; //其他字符
        //             //test():匹配存在感
        //             let $count = 0; //计数

    //             if (regnum.test($pass)) {
    //                 $count++;
    //             }

    //             if (regupper.test($pass)) {
    //                 $count++;
    //             }

    //             if (reglower.test($pass)) {
    //                 $count++;
    //             }

    //             if (regother.test($pass)) {
    //                 $count++;
    //             }

    //             switch ($count) {
    //                 case 1:
    //                     $('.mits').show().html("弱").css("color", 'red');
    //                     $password = false;
    //                     console.log($password)
    //                     break;

    //                 case 2:

    //                 case 3:
    //                     $('.mits').show().html("中").css("color", 'orange');
    //                     $password = true;
    //                     break;
    //                 case 4:
    //                     $('.mits').show().html("强").css("color", 'green');
    //                     $password = true;
    //                     break;
    //             }
    //         }

    //     })
    //密码框失去焦点做的判断
    $pas.blur(function() {
            if ($(this).val().length == 0) {
                $('.mits').hide();
                $password = false
                console.log($password)
            } else if ($(this).val().length > 0 && $(this).val().length < 6) {
                $('.mits').show().html("长度只能在6-20个字符之间").css("color", 'red');
                $password = false
            } else {
                $('.mits').hide();
                $password = true
            }
        })
        //提交按钮做的判断
    $('form').on('submit', function() {
        if ($user.val() == '') {
            $('.yhmts').show().html('用户名不能为空').css('color', 'red');
            $usernameflag = false;
        }
        if (!$usernameflag && !$password) {
            return false; //阻止提交
        }
    });
}(jQuery);