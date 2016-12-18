$(function(){
	//给登录按钮加点击事件
				$("#btn").click(function() {
					//获取用户输入的用户名和密码
					var usn = $("#log_name").val();
					var pwd = $("#log_pass").val();
					//校验用户名和密码是否正确
					if(!usn){
						alert("用户名不能为空！");
						return;
					}
					if(!pwd){
						alert("密码不能为空！");
						return;
					}
					//获取到cookie中的用户信息
					var users = $.cookie("registerUsers") ? $.cookie("registerUsers") : "";
					//将字符串转为对象
					function convertStrToObj(str) {
						if(!str) {
							return {};
						}	
						var users = str.split(":");
						var res = {};
						for(var i = 0; i < users.length; i++) {
							var userData = users[i].split(",");
							
							res[userData[0]] = userData[1];
							
						}
						return res;
					}
					//将对象转为字符串
					function convertObjToStr(obj) {
						var res = "";
						//遍历对象
						for(var usn in obj) {
							var pwd = obj[usn];
							if(res) {
								//看是否是第一组用户名和密码信息
								//如果不是，先在前面添加一个：
								res += ":";
							}
							res += usn + "," + pwd;
						}
						return res;
					}
					
					users = convertStrToObj(users);
					if(users[usn] == pwd){
						//登录成功
						$.cookie("loginedUsers",usn,{expires:7,path:"/"});
						//跳转到首页
						window.location.href = "../index.html";
					}else{
						//登录失败
						alert("用户名或密码不匹配,请确认后重试。");
					}
					
					
				})
})
