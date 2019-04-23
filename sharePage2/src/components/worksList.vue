<template>
    <div class="worksListShare">
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <div class="listItem">
            <div class="author">
                <div class="authorLeft">
                    <img src="http://web.artree.net.cn/attach/img/7195/square" alt="" class="authorImg">
                    <div class="authorTitle">
                        <div class="name">西西里</div>
                        <div class="time">2月前</div>
                    </div>
                </div>
            </div>
            <div class="content">         
                <div class="img">
                    <img src="http://rs.artree.net.cn/assets/rich/2019/01/23/079eb3a9-8304-4e9a-8730-d43599fc7328.png" >
                    <i class="ico_ct">长图</i>
                </div>
                <p>You Jump, I Jump. | 泰坦尼克号  让水彩艺术和审美成为生活的一部分 | MarinaRen…</p>
            </div>
            <div class="type">水彩</div>
            <div class="box_bt">
                <div class="read">阅读 2,936</div>
                <div class="rt">
                    <div class="comment"><div>296</div><i class="ico_comment2" @click="clickDownload"></i></div>
                    <div class="zan"><div>360</div><i class="ico_zan" @click="clickDownload"></i></div>
                </div>
            </div> 
        </div>
        <div class="listItem">
            <div class="author">
                <div class="authorLeft">
                    <img src="http://web.artree.net.cn/attach/img/7195/square" alt="" class="authorImg">
                    <div class="authorTitle">
                        <div class="name">西西里</div>
                        <div class="time">2月前</div>
                    </div>
                </div>
                <div class="authorRight">
                    <div class="price">￥200</div>
                    <button type="button" @click="clickDownload">洽谈</button>
                </div>
            </div>
            <div class="content">         
                <div class="img">
                    <img src="http://rs.artree.net.cn/assets/rich/2019/01/23/079eb3a9-8304-4e9a-8730-d43599fc7328.png">
                </div>
                <p>You Jump, I Jump. | 泰坦尼克号  让水彩艺术和审美成为生活的一部分 | MarinaRen…</p>
            </div>
            <div class="type">水彩</div>
            <div class="box_bt">
                <div class="read">阅读 2,936</div>
                <div class="rt">
                    <div class="comment"><div>296</div><i class="ico_comment2" @click="clickDownload"></i></div>
                    <div class="zan"><div>360</div><i class="ico_zan" @click="clickDownload"></i></div>
                </div>
            </div> 
        </div>
        <div class="viewMore" @click="clickDownload">打开艺下查看更多内容</div>
        <footer2></footer2>
    </div>  
</template>

<script>
    import wx from 'weixin-js-sdk';
    import footer2 from './footer2';
    import {
        getWx,getCommunity,base
    } from '../api/api'
    export default {
        components: {
            footer2
        },
        data() {
            return {
                authorImg: '',
                time: '',
                author: '',
                content: '',
                thu_image: '',
                shareDesc: '',
                id:'',
                apiUrl:base,
            }
        },
        created() {
            this.wechatConfig()
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
    .worksListShare {
        height: inherit;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
        background: #f2f2f2;
        .listItem {
            background: #fff;
            padding:.4rem;
            margin-bottom:10px;
            .author {
                display: flex;
                justify-content: space-between;
                align-items: center;         
                .authorLeft {
                    display: flex;
                    align-items: center;
                    .authorImg {
                        width: 1.013333rem;
                        height: 1.013333rem;
                        border-radius: 50%;
                        margin-right: .266667rem;
                    }
                    .authorTitle {
                        display: flex;
                        flex-direction: column;
                        .name {
                            font-size: 14px;
                            color: #363636;
                        }
                        .time {
                            color: #BDBDBD;
                        }
                    }
                }
                .authorRight {
                    display: flex;
                    align-items: center;
                    .price {
                        color: #FF2E55;
                        font-size: .426667rem;
                    }
                    button {
                        display: block;
                        background: #fff;
                        width:1.493333rem;
                        height:.666667rem;
                        line-height: .666667rem;
                        text-align: center;
                        border: 1px solid #0D94BE;
                        border-radius: 5px;
                        color: #0D94BE;
                        margin-left:.266667rem;
                    }
                }                
            }
            .content {
                p {
                    font-size: .373333rem;
                    padding:.266667rem 0 0;
                    line-height: .586667rem;
                }
                .img {
                    position: relative;
                    display: inline-block;                    
                    margin-top:15px;
                    .ico_ct {
                        display: block; 
                        position: absolute;
                        right:0; 
                        bottom: 0; 
                        text-indent: -999px;
                        overflow: hidden;
                        width:.8rem; 
                        height:.533333rem; 
                        background: url('../assets/ico_ct.png') center/100%;
                    }
                    img {
                        display: block; 
                        max-height: 6.4rem;
                        object-fit: cover;
                        max-width: 100%; 
                        border-radius: .133333rem;
                    }
                }                
            }
            .type {
                color: #757575;
                font-size:.373333rem;
                margin-top:10px;
            }
            .box_bt {
                display:flex;
                justify-content: space-between;
                align-items: center;
                margin-top:10px;
                .read {
                    color: #BDBDBD;
                }
                .rt {
                    display:flex;
                    font-size:.373333rem;
                    color: #BDBDBD;
                    div {
                        margin-right:.08rem;
                    }
                    .comment {
                        display: flex;
                        margin-right:.266667rem;
                        .ico_comment2 {
                            display:block;
                            width:.533333rem;
                            height:.493333rem;
                            background: url('../assets/comment2.png') center/100%;
                        }
                    }
                    .zan {
                        display: flex;
                        .ico_zan {
                            display: block;
                            width:.533333rem;
                            height:.493333rem;
                            background: url('../assets/zan.png') center/100%;
                        }
                    }
                }
            }          
        }
        .viewMore {
            background: #f0f2f2;
            color: #757575;
            font-size: .373333rem;
            text-align: center;
            padding:.266667rem .4rem .4rem;
        }
    }
</style>
