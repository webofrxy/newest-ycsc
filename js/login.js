$(function(){
	//加载头部尾部
	$("#login-header").load("head.html")
	$("#footer-login").load("footer.html")
	//cookie
	

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	
	var config = function (key, value, options) {

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

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};


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
					var users = config("registerUsers") ? config("registerUsers") : "";
					console.log(users)
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
						config("loginedUsers",usn,{expires:7,path:"/"});
						//跳转到首页
						window.location.href = "../index.html";
					}else{
						//登录失败
						alert("用户名或密码不匹配,请确认后重试。");
					}
					
					
				})
})
