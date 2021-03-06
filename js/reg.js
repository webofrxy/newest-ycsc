$(function(){
	//加载头部尾部
	$("#reg-header").load("head.html")
	$("#footer-reg").load("footer.html")
	//验证注册信息
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
		var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		}
	$("#btn").click(function(){
			var usn = $("#reg_name").val();
			var pwd = $("#reg_pass").val();
			var con = $("#reg_passagin").val();
			var email=$("#reg_bail").val();
			var $pName=$("#phonename");
			var reg1=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ 
			var reg2=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/

				//用户不能为空
					if(!usn) {
						alert("用户名不能为空");
						
//						$("#codetell").css({"display":"block"})	
						return;
					}
					var yemail=reg1.test(email);
					
					if(!yemail){
						console.log(1)
						$(".reg-email span").css({"display":"inline-block"})
						return;
					}
					var pass=reg2.test(pwd)
					if(!pass){
						$(".reg-pass span").css({"display":"inline-block"});
						return;
					}else{
						$(".reg-pass span").css({"display":"none"});
					}
					//检测密码是否相同
					//密码不能为空，密码规则
					if(pwd !== con) {
						alert("两次输入的密码不相同，请重试！");
//						$("#codepas").css({"display":"block"})
						return;
					}
					
					if(!pwd){
						alert("密码不能为空");
//						$("#codepa").css({"display":"block"})	
						return;
					}
					//获取cookie中的用户信息
			
					var users = config("registerUsers") ? config("registerUsers") : "";
					//将字符串转为对象
					users = convertStrToObj(users);

					if(usn in users) {
						alert("用户名已经被注册");
						return;

					} else {
					//将用户添加 到已注册用户列表对象中
						users[usn] = pwd;
						//将用户信息对象转化回字符串，以便于设置cookie
						usersStr = convertObjToStr(users);
						//设置用户信息cookie
						config("registerUsers", usersStr, {
							expires: 7,
							path: "/"
						});
						alert("注册成功");
						window.location.href = "login.html";
					}
				})
				//将字符串转为对象
				function convertStrToObj(str) {
					if(!str) {
						return {};
					}
					//"test1,123:test2,abc:test3,888"

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
			
})
