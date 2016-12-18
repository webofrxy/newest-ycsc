$(function(){
	//放大镜
			$(".glass_left .glass-mark").hover(function(){
				$(".glass_left .glass-move").show();
				$(" .glass_right").show();
			},function(){ 
				$(".glass_left .glass-move").hide();
				$(" .glass_right").hide();
			});
			
		
			$(".glass_left  .glass-mark").mousemove(function(e){
				
				var $x = e.pageX;
				var $y = e.pageY;
				var $l = $(".glass_left").offset().left; 
				var $t = $(".glass_left").offset().top; 
				
				
				var $w = $(".glass_left .glass-move").width()/2; 
			
				var $h = $(".glass_left .glass-move").height()/2;
				var $left = $x - $l - $w; 
				var $top = $y - $t - $h; 
				
				
				
				if($top < 0){
					$top = 0;
					}else if($top > ($(".glass_left .glass-mark").height() - $h * 2 - 2)){
						$top = $(".glass_left .glass-mark").height() - $h * 2 - 2;
					};
					
				if($left < 0){
					$left = 0;
					}else if($left >  ($(".glass_left .glass-mark").width() - $w * 2 - 2)){
						$left = $(".glass_left .glass-mark").width() - $w * 2 - 2;
					}
				console.log($left)
				$(".glass_left .glass-move").css({left:$left,top:$top});
				
				var $yd_w = $(".glass_left .glass-mark").width() - $w * 2; 
				var $yd_h = $(".glass_left .glass-mark").height() - $h * 2; 
				
				
				
				var $yd_wbl = $left / $yd_w; 
			
				var $yd_hbl = $top / $yd_h;
				
				var $big_left = ($(".glass_right span img").width() - $(".glass_right").width()) * $yd_wbl; 
				var $big_top = ($(".glass_right span img").height() - $(".glass_right").height()) * $yd_hbl; 
				console.log($big_left)
				
				
				$(".glass_right img").css({left:$big_left,top:$big_top});
				
			});
	
	//小图轮播功能
	//获取对象
//	var index=0;
//	var timer=0;
//	var $li_index=$(".glass_nav ul li").index();
//	var $li_width=$(".glass_nav ul li").width();
	
//单击切换图片
		$('.glass_nav ul li ').click(function(){
//			alert($(this).index());
			$('.glass_left .glass_pic img').eq($(this).index()).css({'display':'block'}).siblings().css({'display':'none'});
			$('.glass_right img').eq($(this).index()).css({'display':'block'}).siblings().css({'display':'none'})
		})
		
	//左右切换图片
		/*获取元素*/
	   	var $prev = $(".glass-l");
	    var $next = $(".glass-r");
	    var $list = $(".glass_nav ul");
	    var $picLi = $(".glass_nav ul li");
	
	    /*可能会用的变量*/
	    var iNow = 0;
	    var iW = $(".glass_nav ul li").width();
	    var len = $picLi.length;
	    var timer = null;
	
	    /*右按钮事件*/
	    $next.click(function () {
	        if(iNow>=len){ //判断到最后了，还要显示下一张，那就跳到第一张，运动到第二张
	            iNow =0;
	            $list.css({"left":0}) //跳到第一张
	        }
	        iNow++;
	        setTimeout(function () {
	            changeView()
	        },500)
	
	    });
	
	    /*左按钮事件*/
	    $prev.click(function () {
	        if(iNow<=0){
	            iNow = len;
	            $list.css({"left":-iNow*iW})//到最后的位置
	        }
	        iNow--;
	        setTimeout(function () {
	            changeView()
	        },500)
	    });
	
	    function changeView() {
	       $list.animate({"left":-iW*iNow});
	//      $btnLi.removeClass("active").eq(iNow%len).addClass("active")
	    }
//商品详情菜单
	//鼠标移入时变色
	$(".product_detail a").mouseover(function(){
		console.log(1)
		$(this).addClass("title_color").siblings().removeClass("title_color")
	})


})
