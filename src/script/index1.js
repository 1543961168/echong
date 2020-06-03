!function(){
    console.log(1)
    //头部下拉
    function heardxia (){
        const myec =document.querySelector('.myec')
        const muecul = document.querySelector('.muecul')
        myec.onmouseover = function (){
            muecul.style.display = "block"
            muecul.onmouseover = function(){
                muecul.style.display =" block"
            }
            muecul.onmouseout = function (){
                muecul.style.display =" none"
            }
        }
    }

    heardxia()
    //头部tab切换
        function qie(){
            const qiespan = document.querySelectorAll('.header-Dl span')
            for (let i = 0; i < qiespan.length; i++) {
                qiespan[i].style = ''
                qiespan[i].onclick  = function () {
                    for (var j = 0; j < qiespan.length; j++) {
                        qiespan[j].className = '';
                        
                        // aContent[j].style.display = 'none';
                    }
                    this.className = 'qieactive';
                    // aContent[this.getAttribute('a')].style.display = 'block';
                }
            }
        }
        qie()


        
    //地址联动菜单
    var arr_province = ["请选择省/城市", "北京市", "上海市", "天津市", "重庆市", "深圳市", "广东省"];

    var arr_city = [
        ["请选择城市/地区"],
        ["东城区", "西城区", "朝阳区", "宣武区", "昌平区", "大兴区", "丰台区", "海淀区"],
        ['宝山区', '长宁区', '丰贤区', '虹口区', '黄浦区', '青浦区', '南汇区', '徐汇区', '卢湾区'],
        ['和平区', '河西区', '南开区', '河北区', '河东区', '红桥区', '塘古区', '开发区'],
        ['俞中区', '南岸区', '江北区', '沙坪坝区', '九龙坡区', '渝北区', '大渡口区', '北碚区'],
        ['福田区', '罗湖区', '盐田区', '宝安区', '龙岗区', '南山区', '深圳周边'],
        ['广州市', '惠州市', '汕头市', '珠海市', '佛山市', '中山市', '东莞市']
    ];
    //网页加载完成，初始化菜单
    window.onload = init; //传入函数地址


    function init() {
        //首先获取对象

        var province = document.form1.province;

        var city = document.form1.city;

        //指定省份中<option>标记的个数
        province.length = arr_province.length;

        //循环将数组中的数据写入<option>标记中

        for (var i = 0; i < arr_province.length; i++) {
            province.options[i].text = arr_province[i];
            province.options[i].value = arr_province[i];

        }

        //修改省份列表的默认选择项

        var index = 0;
        province.selectedIndex = index;

        //指定城市中<option>标记的个数
        city.length = arr_city[index].length;

        //循环将数组中的数据写入<option>标记中

        for (var j = 0; j < arr_city[index].length; j++) {
            city.options[j].text = arr_city[index][j];
            city.options[j].value = arr_city[index][j];

        }


    }

    function changeSelect(index) {
        //选择对象

        var city = document.form1.city;
        //修改省份列表的选择项
        province.selectedIndex = index;

        //指定城市中<option>标记的个数
        city.length = arr_city[index].length;

        //循环将数组中的数据写入<option>标记中

        for (var j = 0; j < arr_city[index].length; j++) {
            city.options[j].text = arr_city[index][j];
            city.options[j].value = arr_city[index][j];

        }

    }

}()

