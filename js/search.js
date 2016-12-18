$(function(){
	var chanageStr = '';
		//创建键盘单击事件
		$("#searchText").keyup(function(event){
			var myEvent = event||window.event;
			var keyCode = myEvent.keyCode;//定义键值对象，不同的值代表不同的键  13是回车键
			//console.log(keyCode)
			//设定只有特殊的键可以有返回值，只有按键盘的字母键，退格，删除，空格，ESC等键才进行响应；8退格backspace46删除delete空格32
			
			//获取文本框中的内容
			var inputTxt=$("#searchText").val();
			//创建一个对象用来存储传回来的数值
			var qsData={"wd":inputTxt,"p":"3","cb":"getData","t":new Date().getMilliseconds().toString()}
			 $.ajax({
                    async: false,
                    url: "http://suggestion.baidu.com/su",
                    type: "GET",
                    dataType: 'jsonp',
                    jsonp: 'jsoncallback',
                    data: qsData,
                    timeout: 5000,
                    success: function (json) {
                    },
                    error: function (xhr) {
                    }
                });
//          
		})
			var highlightindex = -1; 
			var timeoutId;
		function getData(data){
		
			var Info=data['s'];
			var autoNode = $("#auto"); 
			console.log(Info)
			for(var i=0;i<Info.length;i++){
				var wordNode=Info[i];
				var newDivNode=$("<div>").attr("id",i);//attr里面可以放什么还不清楚
				newDivNode.attr("style","font-size:12px;height:25px;padding:0 8px;cursor:pointer;");
				newDivNode.html(wordNode).appendTo(autoNode);
				
				newDivNode.mouseover(function(){
										
					$(this).css("background-color","pink");
					$(this).click(function(){
						var comtext=$(this).text();
						$("#searchText").val(comtext);
						console.log(comtext)
					})
				});
				newDivNode.mouseout(function(){
					$(this).css("background-color","white");
				})

		
			}
			
		}
})
