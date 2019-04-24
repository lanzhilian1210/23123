<template>
    <div class="like_list">
        <ul>
            <li v-for="(item,index) in latestLikeAuthors" :key="index">
                <img data-v-a0559e02="" data-v-43092277="" :src="`${apiUrl}/attach/img/${item.avatarId}`" alt="" class="authorImg">
                <!-- <div class="name">罗密欧与麦当娜</div>
                <div class="time">2小时前</div> -->
                <div class="name">{{item.user.nickname}}</div>
                <div class="time">{{item.likeDate}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import footer2 from './footer2';
    import {
        getWx,base
    } from '../api/api'
    export default {
        components: {
            footer2
        },
        props: {
            latestLikeAuthors: {
                type: Array
            }
        },
        data() {
            return {
                id:'',
                apiUrl:base,
            }
        },
        created() {
            this.wechatConfig()
        },
        mounted() {
            const id = this.$route.params.id;
        },
        methods: {
            clickDownload() {
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
                }
            },
            wechatConfig() { //create获取config
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
                    let _this = this;
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
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.like_list {
    li {
        display: flex;
        align-items: center;
        padding:10px 0;
        .authorImg {
            width:30px;
            height:.8rem;
            border-radius: 50%;
            margin-right:10px;
        }
        .name {
            font-size: .373333rem;
            color: #363636;
            flex: 1;
        }
        .time {
            font-size: 12px;
            color: #BDBDBD;
        }
    }
}
</style>