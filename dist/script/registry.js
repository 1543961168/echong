"use strict";!function(s){var t=s(".username"),h=s(".password"),o=!1,l=!1;t.focus(function(){0==s(this).val().length&&s(".yhmts").show().html("支持中文，字母，数字，'-'，'_'的多种组合")}),t.on("blur",function(){0==s(this).val().length?s(".yhmts").show().html("用户名不能为空").css("color","red"):0<s(this).val().length&&s(this).val().length<20?s(".yhmts").show().html("长度只能在4-20个字符之间").css("color","red"):4<=s(this).val().length&&!isNaN(s(this).val())?s(".yhmts").show().html("用户名不能为纯数字").css("color","red"):(s(".yhmts").hide(),o=!0),s.ajax({type:"post",url:"http://10.31.162.28/echong/php/registry.php",data:{username:t.val()}}).done(function(t){o=!t&&o?(s(".yhmts").show().html("可以注册").css({color:"green",width:"200px"}),!0):(s(".yhmts").show().html("账户名已存在").css("color","red"),!1)})}),h.focus(function(){0==s(this).val().length&&(s(".mits").show().html("建议使用字母、数字和符号两种以上的组合，6-20个字符"),l=!1)}),h.blur(function(){l=0==s(this).val().length?(s(".mits").hide(),!1):0<s(this).val().length&&s(this).val().length<6?(s(".mits").show().html("长度只能在6-20个字符之间").css("color","red"),!1):(s(".mits").hide(),!0)}),s("form").on("submit",function(){return!!(o&l)&&void s("form").subimit()})}(jQuery);