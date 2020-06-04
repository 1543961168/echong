!function($){
  // console.log(2)
  //导入头部组建
  $(document).ready(function(){
    $("header").load("header.html")
    console.log(1)
  })
  //导入尾部组建
  $(document).ready(function(){
    $("footer").load("footer.html")
    console.log(1)
  })

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