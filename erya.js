+function(a,b,c){if(!a.erya){if(!c)return alert("Error.");var d=c.noop,e=c("#eryaPlayer").getPlayer(),f="//dwayneten.com/player.swf";c(e).attr("data",f),jQuery.fn.PauseMovieBak=c.fn.pauseMovie,c.fn.pauseMovie=d,a.onblur=d,a.onfocus=d,b.onfocusout=d,b.onfocusin=d,c(a).on("onSendProgressSuccess",function(a,b){4==c.parseJSON(b).status&&c(a.target).goPlay(c("#videoNumber").val())}),a.erya=!0,alert("ver1.1\n后台播放\n消除验证码\n自动播放下一集\n取消自动暂停\n\n出现一切问题为什么不问下神奇的 SBD 呢")}}(window,document,jQuery);
