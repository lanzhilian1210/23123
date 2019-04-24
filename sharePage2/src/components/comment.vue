<template>
    <div class="comment_list">
        <div class="comment_item" v-for="(item,index) in latestComments" :key="index">
            <img data-v-43092277="" :src="`${apiUrl}/attach/img/${item.avatarId}`" alt="" class="authorImg">
            <div class="con">
                <div class="name">{{item.author.nickname}}</div>
                <p>{{item.content}}</p>
                <div class="mod_bt">
                    <div class="date">{{item.createdDate}}</div>
                    <div class="like">{{item.likeCount}}次赞</div>
                    <i class="ico_comment1" @click="clickDownload"></i>
                    <i class="ico_zan" @click="clickDownload"></i>
                </div>
                <ul class="reply_list">
                    <li v-if="item.father != null">
                        
                        <img data-v-43092277="" :src="`${apiUrl}/attach/img/${item.father.author.avatarId}`" alt="" class="authorImg">
                        <div class="con">
                            <div class="name">罗密欧与麦当娜</div>
                            <p>回复<label>@{{item.author.nickname}}</label>：{{item.father.content}}</p>
                            <div class="mod_bt">
                                <div class="date">{{item.father.createdDate}}</div>
                                <div class="like">{{item.father.commentCount}}次赞</div>
                                <i class="ico_comment1" @click="clickDownload"></i>
                                <i class="ico_zan" @click="clickDownload"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>           
        </div>
        <div class="lookAll" @click="clickDownload">
            查看全部2,936条评论
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    import footer2 from './footer2';
    import {
        getWx,base
    } from '../api/api'
    export default {
        props: {
            latestComments: {
                type: Array
            }
        },
        components: {
            footer2
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
            // console.log(this.latestComments);
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
.comment_list {
    .comment_item {
        display: flex;
        padding:.4rem 0 0;
        .authorImg {
            width:1.013333rem;
            height:1.013333rem;
            border-radius: 50%;
            margin-right:10px;
        }
        .con {
            flex: 1;          
            .name {
                font-size: 12px;
                color: #363636;
                margin-top:3px;
            }
            p {
                font-size: .373333rem;
                color: #363636;
                margin-top:10px;
            }
            .mod_bt {
                display: flex;
                color: #BDBDBD;
                font-size: 12px;
                margin-top:10px;
                border-bottom: 1px solid #F1F3F3;
                padding-bottom:.4rem;
                .date {
                    margin-right: .533333rem;
                }
                .like {
                    flex:1;
                }
                .ico_comment1 {
                    display: block; 
                    width:.381333rem;
                    height:.352rem;
                    background: url('../assets/comment1.png') center/100%;
                }
                .ico_zan {
                    display: block; 
                    width:.381333rem;
                    height:.352rem;
                    background: url('../assets/zan.png') center/100%;
                    margin-left:.533333rem;
                }
            }
        }
        .reply_list {
            li {
                display: flex;
                padding:.4rem 0 0;
                .authorImg {
                    width:.533333rem;
                    height:.533333rem;
                    border-radius: 50%;
                    margin-right:10px;
                }
                label {
                    color:#0D94BE;                    
                }
            }
        }
    }
    .lookAll {
        color: #BDBDBD;
        padding:.4rem 0;
        margin-left:1.28rem;
    }
}
</style>


