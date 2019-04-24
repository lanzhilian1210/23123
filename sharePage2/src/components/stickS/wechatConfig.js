
import wx from 'weixin-js-sdk';
import { getWx } from '../../api/api';
export const wechatConfig = (that) =>{ //create获取config
    let url = location.href.split('#')[0]
    getWx({
        url: url
    }).then((response) => {
        // this.$wechat.config(JSON.parse(response.data.data))
        //api调接口之后配置
        let data = response;
        // console.log(data)
        wx.config({
            debug: false,
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，微信签名
            jsApiList: [
                'updateAppMessageShareData', 'updateTimelineShareData'
            ] // 必填，需要使用的JS接口列表
        });
        let _this = that;
         let loc =  window.location
        let shareUrl = loc.origin+loc.pathname+loc.hash
        wx.ready(function() {
            //              alert(window.location.href.split('#')[0]);
            //分享到朋友/qq
            wx.updateAppMessageShareData({
                title: _this.title, // 分享标题
                desc: document.getElementsByClassName('content')[0].textContent || _this.title, // 分享描述
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: _this.thu_image, // 分享图标
                success: function(res) {
                    // 用户确认分享后执行的回调函数
                    // logUtil.printLog("分享到朋友圈成功返回的信息为:", res);
                    // _this.showMsg("分享成功!")
                },
                cancel: function(res) {
                    // 用户取消分享后执行的回调函数
                    // logUtil.printLog("取消分享到朋友圈返回的信息为:", res);
                }
            });
            //分享给朋友圈 空间
            wx.updateTimelineShareData({
                title: _this.title, // 分享标题
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: _this.thu_image, // 分享图标
                success: function(res) {
                    // 用户确认分享后执行的回调函数
                    // logUtil.printLog("分享给朋友成功返回的信息为:", res);
                },
                cancel: function(res) {
                    // 用户取消分享后执行的回调函数
                    // logUtil.printLog("取消分享给朋友返回的信息为:", res);
                }
            });
        });
    }).catch(() => {
        // this.$vux.loading.hide()
    });
    
};