+function(a,b,c){if(!a.erya){if(!c)return alert("Error.");var d=c.noop,e=c("#eryaPlayer").getPlayer(),jQuery.fn.PauseMovieBak=c.fn.pauseMovie,c.fn.pauseMovie=d,a.onblur=d,a.onfocus=d,b.onfocusout=d,b.onfocusin=d,c(a).on("onSendProgressSuccess",function(a,b){4==c.parseJSON(b).status&&c(a.target).goPlay(c("#videoNumber").val())}),a.erya=!0,alert("SBD is a pile of shit!")}}(window,document,jQuery);
