/* JS Document
Function : Bubble
Use for : bubble_test.html
Version : 1.0
Date : 2014/08/19
Author : wzj
*/

(function($){

    /*
        定制animation
        暂时没有比较合适的，且用linear
        x 总时间进度，即x = t/d
        t 当前动画执行时间（毫秒）
        b 常数0
        c 常数1 
        d 动画总的持续时间
    */ 
    $.extend( jQuery.easing , {
        flyFuntion : function (x, t, b, c, d){
            return -c * ((t=t/d-1)*t*t*t  - 1) + b;
        }
    });

    /* 添加bubble方法 */
    $.fn.bubble = function (option){

        var $bubbleBox = $(this);
        var opts = $.extend(true, $.fn.bubble.defaults, option);
        var bubbleBoxWidth = $bubbleBox.width();
        var bubbleBoxHeight = $bubbleBox.height();
        var index = 0;
        setInterval(function(){
            bubbleFly();
        }, opts.bubbleMakeInterval);

        var bubbleFly = function(){

            var startX,startY,endX,endY;
            index = index % opts.Length;
            startX = opts.bubbleStartPostion[index].left;
            startY = opts.bubbleStartPostion[index].top;
            endX = opts.bubbleEndPostion[index];//因为每个泡泡都有一个小角，默认按照角的方向为漂流方向
            endY = startY + rand(-300,-200);//向上飘得距离
            var $fly = $("#"+opts.bubbleId[index]).clone(true);
            !$fly || $fly.insertAfter($("#"+opts.bubbleId[index])).animate({ //基于健壮性考虑，加上!$fly
                top     : endY,
                left    : endX  ,
                opacity : 0
            } , opts.flyTime , 'linear' ,  function(){
                !$fly || $fly.remove();
                $fly = null;            
            });
            $("#"+opts.bubbleId[index]).css("opacity","0");
            $("#"+opts.bubbleId[index]).animate({
                opacity : 1
            } , opts.flyTime, 'linear' , function(){});

            //如果animation关于opacity的设置在IE7/8下不可用 加上.css({flter:"Alpha(Opacity=100)"})
            index++;
        };

        var rand = function(min, max){
            var range = max - min;
            var out = min + Math.round(Math.random() * range);
            return parseInt(out);
        }
        return $bubbleBox;
    }
    $.fn.bubble.defaults = {
    	
        //每个气泡的起始位置
        bubbleStartPostion : [
            {left:90,top:187},{left:178,top:187},{left:96,top:137},{left:246,top:249},{left:72,top:271},
            {left:84,top:226},{left:190,top:120},{left:22,top:202},{left:71,top:104},{left:2,top:237},
            {left:21,top:158},{left:267,top:61},{left:268,top:160},{left:156,top:241},{left:288,top:269}
        ],
        //气泡ID
        bubbleId : ["bubble01","bubble02","bubble03","bubble04","bubble05",
                    "bubble06","bubble07","bubble08","bubble09","bubble10",
                    "bubble11","bubble12","bubble13","bubble14","bubble15"],
        //漂流结束时的横向地址
        bubbleEndPostion : [0,500,40,550,10,70,400,0,0,-70,10,450,600,300,600],
        //气泡个数
        Length : 15,
        //气泡漂流时间
    	flyTime : 4000,
        //气泡产生间隔
    	bubbleMakeInterval : 800
    }

})(jQuery);