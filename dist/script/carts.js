"use strict";!function(s){var i;s(document).ready(function(){s("header").load("header.html")}),s(document).ready(function(){s("footer").load("footer.html")}),i=s(".hk>ul>li"),s(".hk>ul>li").hover(function(){var i=s(this).offset().left-s(this).outerWidth()-51;s(this).addClass("hkactive").siblings("li").removeClass("hkactive"),console.log(i),s(".hkspan").css("marginLeft",i)},function(){s(".hkspan").css("marginLeft","0"),i.eq(0).addClass("hkactive").siblings("li").removeClass("hkactive")});var o,c,d=s(".item-list"),t=s(".amount-sum"),e=s(".totalprice"),n=s(".allsel"),a=s(".quantity-add"),r=s(".quantity-down"),h=s(".quantity-form input"),f=s(".b-action>a"),p=s(".operation a"),l=[],m=[];function u(){var o=0,n=0;s(".goods-item:visible").each(function(i,t){s(t).find(".cart-checkbox input").prop("checked")&&(o+=parseInt(s(t).find(".quantity-form input").val()),n+=parseFloat(s(t).find(".b-sum strong").html()))}),t.find("em").html(o),e.html(n.toFixed(2))}s.cookie("cookiesid")&&s.cookie("cookienum")&&(o=s.cookie("cookiesid").split(","),c=s.cookie("cookienum").split(","),s.each(o,function(i,t){var n,e;n=o[i],e=c[i],s.get({url:"http://10.31.162.28/echong/php/alldata.php",dataType:"json"}).then(function(i){s.each(i,function(i,t){var o;n==t.sid&&((o=s(".goods-item:hidden").clone(!0,!0)).find(".goods-pic").find("img").attr("src",t.url),o.find(".goods-pic").find("img").attr("sid",t.sid),o.find(".goods-d-info").find("a").html(t.title),o.find(".b-price").find("strong").html(t.price),o.find(".quantity-form").find("input").val(e),o.find(".b-sum").find("strong").html((t.price*e).toFixed(2)),o.css("display","block"),d.append(o),u())})})})),n.on("change",function(){s(".goods-item:visible").find(":checkbox").prop("checked",s(this).prop("checked")),n.prop("checked",s(this).prop("checked")),u()});var k=s(".goods-item:visible").find(":checkbox");function g(i){return(parseFloat(i.parents(".goods-item").find(".b-price strong").html())*parseInt(i.parents(".goods-item").find(".quantity-form input").val())).toFixed(2)}function v(){m=s.cookie("cookiesid")&&s.cookie("cookienum")?(l=s.cookie("cookiesid").split(","),s.cookie("cookienum").split(",")):(l=[],[])}function b(i){v();var t=i.parents(".goods-item").find("img").attr("sid");m[s.inArray(t,l)]=i.parents(".goods-item").find(".quantity-form input").val(),s.cookie("cookienum",m,{expires:10,path:"/"})}function y(o,i){var n=-1;s.each(i,function(i,t){o===t&&(n=i)}),i.splice(n,1),m.splice(n,1),s.cookie("cookiesid",i,{expires:10,path:"/"}),s.cookie("cookienum",m,{expires:10,path:"/"})}d.on("change",k,function(){s(".goods-item:visible").find(":checkbox").length===s(".goods-item:visible").find("input:checked").size()?n.prop("checked",!0):n.prop("checked",!1),u()}),a.on("click",function(){var i=s(this).parents(".goods-item").find(".quantity-form input").val();i++,s(this).parents(".goods-item").find(".quantity-form input").val(i),s(this).parents(".goods-item").find(".b-sum strong").html(g(s(this))),u(),b(s(this))}),r.on("click",function(){var i=s(this).parents(".goods-item").find(".quantity-form input").val();--i<1&&(i=1),s(this).parents(".goods-item").find(".quantity-form input").val(i),s(this).parents(".goods-item").find(".b-sum strong").html(g(s(this))),u(),b(s(this))}),h.on("input",function(){var i=s(this).val();/^\d+$/g.test(i)||s(this).val(1),s(this).parents(".goods-item").find(".b-sum strong").html(g(s(this))),u(),b(s(this))}),f.on("click",function(){v(),window.confirm("你确定要删除吗?")&&(s(this).parents(".goods-item").remove(),y(s(this).parents(".goods-item").find("img").attr("sid"),l),u())}),p.on("click",function(){v(),window.confirm("你确定要全部删除吗?")&&(s(".goods-item:visible").each(function(){s(this).find(":checkbox").is(":checked")&&(s(this).remove(),y(s(this).find("img").attr("sid"),l))}),u())})}(jQuery);