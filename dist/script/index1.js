"use strict";!function(){var e,o;console.log(1),e=document.querySelector(".myec"),o=document.querySelector(".muecul"),e.onmouseover=function(){o.style.display="block",o.onmouseover=function(){o.style.display=" block"},o.onmouseout=function(){o.style.display=" none"}},function(){for(var o=document.querySelectorAll(".header-Dl span"),e=0;e<o.length;e++)o[e].style="",o[e].onclick=function(){for(var e=0;e<o.length;e++)o[e].className="";this.className="qieactive"}}();var l=["请选择省/城市","北京市","上海市","天津市","重庆市","深圳市","广东省"],c=[["请选择城市/地区"],["东城区","西城区","朝阳区","宣武区","昌平区","大兴区","丰台区","海淀区"],["宝山区","长宁区","丰贤区","虹口区","黄浦区","青浦区","南汇区","徐汇区","卢湾区"],["和平区","河西区","南开区","河北区","河东区","红桥区","塘古区","开发区"],["俞中区","南岸区","江北区","沙坪坝区","九龙坡区","渝北区","大渡口区","北碚区"],["福田区","罗湖区","盐田区","宝安区","龙岗区","南山区","深圳周边"],["广州市","惠州市","汕头市","珠海市","佛山市","中山市","东莞市"]];window.onload=function(){var e=document.form1.province,o=document.form1.city;e.length=l.length;for(var n=0;n<l.length;n++)e.options[n].text=l[n],e.options[n].value=l[n];e.selectedIndex=0,o.length=c[0].length;for(var t=0;t<c[0].length;t++)o.options[t].text=c[0][t],o.options[t].value=c[0][t]}}();