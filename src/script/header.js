!function($){
    //获取本地id
  //获取本地id
  function benid(){
    //根据本地存储，显示用户信息
    if (localStorage.getItem('username')) {
      // console.log('username')
      $('.login').hide();
      $('.admin').show();
      $('.admin span').html(localStorage.getItem('username'));
    }

    $('.admin a').on('click', function () {
        $('.login').show();
        $('.admin').hide();
        localStorage.removeItem('username');
    });
  }
  benid()
    //头部下拉
    function heardxia (){
      // const myec =document.querySelector('.myec')
      // const muecul = document.querySelector('.muecul')
      // myec.onmouseover = function (){
      //     muecul.style.display = "block"
      //     muecul.onmouseover = function(){
      //         muecul.style.display =" block"
      //     }
      //     muecul.onmouseout = function (){
      //         muecul.style.display =" none"
      //     }
      // }
      $('.my').on('click',function(){
        $('.muecul').css({"display":"block"})
        $('.muecul').hover(function(){
          $('.muecul').css({"display":"block"})
        },function(){
          $('.muecul').css({"display":"none"})
        })
      })
  }

  heardxia()
}(jQuery)