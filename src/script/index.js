!function($){
  console.log(2)
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
  function erji(){
    $("#erji").find("li").mouseover(function() {
      var index = $(this).index();
      $("#erji").find("li").eq(index).css({
          "border-top": "1px solid #68af5c",
          "border-bottom": "1px solid #68af5c",
      });
      $("#erji").find("div").eq(index).show().siblings("div").hide();
    });
    $("#erji").find("li").mouseleave(function() {
      var index = $(this).index();
      $("#erji").find("li").eq(index).css({
          "border": "none"
      });
    })
    $("#erji").mouseleave(function() {
      $("#erji").find("div").hide();
   });
  }
  erji()
}(jQuery)