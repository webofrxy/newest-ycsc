$(function(){
	//加载尾部
	$("#footer-details").load("footer.html")
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
//				console.log($left)
				$(".glass_left .glass-move").css({left:$left,top:$top});
				
				var $yd_w = $(".glass_left .glass-mark").width() - $w * 2; 
				var $yd_h = $(".glass_left .glass-mark").height() - $h * 2; 
				
				
				
				var $yd_wbl = $left / $yd_w; 
			
				var $yd_hbl = $top / $yd_h;
				
				var $big_left = ($(".glass_right span img").width() - $(".glass_right").width()) * $yd_wbl; 
				var $big_top = ($(".glass_right span img").height() - $(".glass_right").height()) * $yd_hbl; 
//				console.log($big_left)
				
				
				$(".glass_right img").css({left:$big_left,top:$big_top});
				
			});
//小图轮播功能
//单击切换图片
		$('.glass_nav ul li ').click(function(){
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
		//console.log(1)
		$(this).addClass("title_color").siblings().removeClass("title_color")
	})

//购物车
			$(function(){
				//加载已有的购物车信息
				loadCart();
				
				//给购物车按钮加一个点击事件
				$(".shopping_menue a").click(function(){
					location.href = "shopping-car.html";
				})
				//给加入购物车按钮添加点击事件
				$(".add-cart").click(function(e){
					//获取商品的id（用来区分不同的商品）
					var goodId = $(".brand").attr("data-good-id");
//					alert(goodId);
					//获取商品的名称
					var goodName = $(".title span").html();
					//获取商品的价格
					var goodPrice = parseFloat($(".product_right .price b").html());
					console.log(goodPrice)
					//alert(goodPrice);
					//获取商品的图片src
					var goodSrc = $(".color img").attr("src");
					//alert(goodSrc);
	
					//获取cookie中的信息
					//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
					var cartStr = config("cart") ? config("cart") : "";
					//将字符串转成对象
					var cartObj = convertCartStrToObj(cartStr);
					//判断该商品是否已经在购物车中存在
					if(goodId in cartObj){
						//如果已存在，那么该商品的数量加1
						cartObj[goodId].num += 1;
					}else{
						//如果不存在，那么将新商品的信息存入
						cartObj[goodId] = {
							name : goodName,
							price : goodPrice,
							num : 1,
							src : goodSrc
						};
					}
					
					//将新的购物车信息存回cookie
					//将对象转为字符串
					cartStr = convertObjToCartStr(cartObj);
					//alert(cartStr);
					//存入cookie
					config("cart",cartStr,{expires : 7,path:"/"});
					
					function addnum(){
							$("#buyNum").val(function(index,v){
						//"购物车（0）"
						var pattern = /(\d+)/;
						var num = parseInt(v.match(pattern)[1]);
						return num + 1;
						
						 
						
						});
					}
					addnum();
					//做一个飞入购物车的效果
					var cloneImg = $("#picNum").clone().css({width:50,height:50});
					cloneImg.fly({
						start : {
							top : e.clientY,
							left : e.clientX
						},
						end :{
							top : $("#buyNum").offset().top,
							left : $("#buyNum").offset().left,
							width:0,
							height:0
						},
						autoPlay : true,
						onEnd : function(){
							$("#buyNum").val(function(index,v){
						//"购物车（0）"
						var pattern = /(\d+)/;
						var num = parseInt(v.match(pattern)[1]);
						return num + 1;
						
						 
						
							});
							cloneImg.remove();
						}
					});
				})
			});
			
			
			function convertCartStrToObj(cartStr){
				
				//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
				if(!cartStr){
					return {};
				}
				console.log(cartStr);
				var goods = cartStr.split(":");
				
				var obj = {};
				for(var i = 0; i < goods.length; i ++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						name : data[1],
						price : parseFloat(data[2]),
						num : parseInt(data[3]),
						src : data[4]
					}
				}
				return obj;
			}
			function convertObjToCartStr(obj){
					
					var cartStr = "";
					//遍历对象
					for(var id in obj){
						if(cartStr){
							cartStr += ":";
						}
						cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
					}
					return cartStr;
			}
			
			//加载购物车中的信息（使商品页与购物车页中的购物车数量同步）
			function loadCart(){
				var cartStr = config("cart") ? config("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					console.log(cartObj)
					//获取到购物车中所有商品的数量
					var total = 0;
					for(var id in cartObj){
						total += cartObj[id].num;
					}
					console.log(total)
					$("#buyNum").val(total);
			}

		
//切换选项卡
	console.log(1)
	$("#card1").click(function(){
		console.log(2)
		$(".detail_menue").children().css({"display":"block"});
	})
	$("#card2").click(function(){
		$(".detail_specific").parent().children().first().css({"display":"none"}).siblings().css({"display":"block"});
	})
	$("#card3").click(function(){
		$(".detail_evaluation").siblings().css({"display":"none"})
	})
//获取商品
	var url = window.location.search;
	console.log(url)
	var url1 = url.substring(2,3);
	console.log(url1)
	var num = Number(url1);
	console.log(num)
	console.log(5)
	$.getJSON("../json/child.json",function(data){
		for(var i=0;i<data.content.product_id.length;i++){			
			if(data.content.product_id[i].id == num){
				$(".glass_pic img").attr("src",data.content.content_pic[i].src);
				$(".glass_right img").attr("src",data.content.content_pic[i].src);
				$(".glass_nav img").attr("src",data.content.content_pic[i].src);
				$(".title span").html(data.content.con_name[i].name);
				$(".price b").html(data.content.con_price[i].price);
				$(".num_kind b").html(data.content.con_price[i].price)
			}
		}
	})


})
