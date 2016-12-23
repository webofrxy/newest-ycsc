/**
 * 公共类库 时间倒计时
 */
(function($){
    var day = 24 * 3600  ;
    var hour = 3600  ;
    var minute = 60  ;
    //var oTime = new Date();
    var hasD,hasH,hasM,hasS;
    var T = {
        _get_finalTime : function ($obj) {
            var restTimeObj = $.parseJSON($obj.attr("data-attr"));
            if ($.type(restTimeObj) == 'null') {
                return 0;
            }
            if ($.type(restTimeObj.endTime) != 'undefined') {
                var endTime = restTimeObj.endTime.split(',');
                endTime = new Date(endTime[0], endTime[1] - 1, endTime[2], endTime[3], endTime[4], endTime[5]);
                var nowTime = new Date();
                return (endTime.getTime() - nowTime.getTime()) / 1000;
            }
            return restTimeObj.left;
        },
        /**
         * @params tpl D天H时I分S秒  23天03时04分08秒
         * @params tpl H:I:S  时:分钟:秒
         * @params tpl I:S  分:秒
         * @params tpl 0 自动变化的 天时分秒
         * @type {number}
         */
        _writeLast : function($obj, tpl){

            if (tpl == 'H:I:S') {
                var H = parseInt(hasD) * 24 + parseInt(hasH);
                if (H <= 9) {
                    H = '0' + H;
                }
                var data_desc = '';
                if($obj.attr('data-desc') != undefined){
                    data_desc = $obj.attr('data-desc')+ ' ' ;
                }
                $obj.html(data_desc + H + ":" + hasM + ":" + hasS);
            } else if (tpl == 'I:S') {
                var M = parseInt(hasD) * 24 * 60 + parseInt(hasH) * 60 + parseInt(hasM);
                if (M <= 9) {
                    M = '0' + M;
                }
                $obj.html(M + ":" + hasS);
            } else if (tpl == 'D天H时I分S秒') {
                var hasDay = hasD<= 0 ||hasD == 'undefined' ? '' : hasD + '天';
                $obj.html(hasDay + hasH + '时' + hasM + '分' + hasS + '秒');
            } else {
                if (hasD > 0) {
                    $obj.html(hasD + '天' + hasH + '时' + hasM + '分' + hasS + '秒');
                } else if (hasH > 0) {
                    $obj.html(hasH + '时' + hasM + '分' + hasS + '秒');
                } else if (hasM > 0) {
                    $obj.html(hasM + '分' + hasS + '秒');
                }
				else{
					 $obj.html('');
					}
            }
        },
        _setTwoPos : function () {
            for (var i = 0, len = arguments.length; i < len; i++) {
                if (arguments[i] > 9) {
                    continue;
                }
                switch (arguments[i]) {
                    case hasD:
                        hasD = "0" + arguments[i];
                        break;
                    case hasH:
                        hasH = "0" + arguments[i];
                        break;
                    case hasM:
                        hasM = "0" + arguments[i];
                        break;
                    case hasS:
                        hasS = "0" + arguments[i];
                        break;
                }
            }
        },
        _getLast : function ($obj) {
            this.finaltime = this._get_finalTime($obj);
            this.finaltime = this.finaltime == undefined || this.finaltime.toString() == "NaN"||this.finaltime<=0 ? 0 : this.finaltime;
            hasD = Math.floor(this.finaltime / day);
            hasH = Math.floor((this.finaltime - hasD * day) / hour);
            hasM = Math.floor((this.finaltime - hasD * day - hasH * hour) / minute);
            hasS = Math.floor((this.finaltime - hasD * day - hasH * hour - hasM * minute));
            //hasH = hasH + hasD * 24
            this._setTwoPos(hasD, hasH, hasM, hasS);
        }
    };
    var F = function($obj, tpl){
        this.tpl = tpl;
        this.obj = $obj;

        this.run = function () {
            if($.type(this.obj)=='undefined'){
                return false;
            }
            if(this.obj.size()<1){
                return false;
            }
            var self = this;
            window.setTimeout(function(){
                self.run()
            }, 1000);
            if (this.obj.size() > 1) {
                this.obj.each(function () {
                    T._getLast($(this));
                    T._writeLast($(this), self.tpl);
                });
            } else {
                T._getLast(this.obj);
                T._writeLast(this.obj, this.tpl);
            }
        };
    };
    window.TimeRun = F;
})(jQuery);

$(function(){
    var timRest = new TimeRun($(".time_rest"), 'H:I:S');
    timRest.run();
    var HISTimeRest = new TimeRun($(".HIS_time_rest"), 'D天H时I分S秒');
    HISTimeRest.run();
});


