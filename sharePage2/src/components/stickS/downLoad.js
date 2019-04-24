export const downLoad =() => {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if (timeOutDateTime - loadDateTime < 5000) {
                window.location = "https://itunes.apple.com/cn/app/id1236615957?mt=8"; //ios下载地址  
            } else {
                window.close();
            }
        }, 25);
        window.location = "wxb4cd88e06a542940://openwebview/?ret=0";
    } else if (navigator.userAgent.match(/android/i)) {
        var state = null;
        try {
            window.location = 'arttreeyixiaapp://testpage';
            setTimeout(function() {
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.dw.artree"; //android下载地址  
            }, 500);
        } catch (e) {}
    };
}