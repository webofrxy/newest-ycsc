$(function(){
//加载头部尾部
	$("#child-head").load("head.html");
	$("#child-footer").load("footer.html");
//三级菜单
	
	
	//二级菜单出现、消失
	$(".add").click(function(){
		if(this == event.target){
			$(".add").css({"display":"none"})
			$(".del").css({"display":"inline-block"})

			$(".women_dress").css({"display":"none"})
		}
		
		
	})
	$(".del").click(function(){
		if(this == event.target){
			$(".add").css({"display":"inline-block"})
			$(".del").css({"display":"none"})

			$(".women_dress").css({"display":"block"})
		}
		
		
	})
	//三级菜单出现、消失
	$(".add_2").click(function(){
		$(".add_2").css({"display":"none"})
		$(".del_2").css({"display":"inline-block"})
		$(this).parent().siblings().css({"display":"none"})
		
	})
	$(".del_2").click(function(){
		$(".add_2").css({"display":"inline-block"})
		$(".del_2").css({"display":"none"})
		$(this).parent().siblings().css({"display":"block"})
		
	})
//去看看部分
	$.getJSON("../json/child.json",function(data){
		console.log(data.see.see_pic)
		for(var i=0;i<3;i++){
			var $see_part='<dl>'+'<dt><img src="'+data.see.see_pic[i].src+'"/></dt>'+'<dd class="see_name">'+
			data.see.see_name[i].name+'</dd>'+'<dd class="see_price">本站价：<b>'+data.see.see_price[i].price+'</b></dd>'+
			'<dd class="see_go">去看看'+'</dd></dl>'
			$(".see_box").append($see_part);
		}
	})
//商品列表部分

$.getJSON("../json/child.json",function(data){
	console.log(data.content.content_price)
	for(var i=0;i<20;i++){
		var $product_content='<div class="product_content">'+'<dl>'+'<dt class="shop_pic">'+'<img src="'+data.content.content_pic[i].src+'"/>'+'</dt>'+
						'<dd class="shop_name">'+data.content.con_name[i].name+'</dd>'+'<dd class="shop_price">'+'<strong>￥'+data.content.con_price[i].price+'元</strong>'+'<del>￥197.00元</del>'+'</dd>'+
						'</dl>'+'<div class="shopping_part">'+'<p>评价：<b>0</b>人气：89'+'</p>'+
						'<input type="button" value="放入购物车" id="shoppingcart" />'+'<a href="details.html?='+data.content.product_id[i].id+'">收藏'+'</a>'+'</div>'+'</div>';
		$(".product_shopping").append($product_content);
	}
						
})
//
   $("#list-page").createPage({
        pageCount:8,
        current:1,
        backFn:function(page){
            console.log(page);
        }
    });
//底部括号勿删
})
