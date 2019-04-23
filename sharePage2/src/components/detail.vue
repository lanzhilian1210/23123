<template>
    <div class="worksListShare">
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <div class="listItem">
            <div class="author">
                <div class="authorLeft">
                    <img src="http://web.artree.net.cn/attach/img/7195/square" alt="" class="authorImg">
                    <div class="authorTitle">
                        <div class="name">{{nickname}}</div>
                        <div class="time">{{momentCreatedDate}}</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <p><label>#{{label}}# </label>{{content}}</p>         
                <div class="img num9" v-if="pics.length>0">
                    <ul>
                        <li v-for="(items,index) in pics" :key="index">
                            <img :src="`${apiUrl}/attach/img/${id}`"></li>
                    </ul>
                </div>
                <div class="img" v-else>
                    <ul>
                        <li v-for="(items,index) in pics" :key="index">
                            <img :src="`${apiUrl}/attach/img/${id}`"></li>
                    </ul>
                </div>
                <div class="zlBox2">
                    <img src="http://rs.artree.net.cn/assets/rich/2018/02/08/1e6ccd66-fc19-48ba-989f-d717b75e0ded.jpeg">
                    <div class="con">
                        <div class="tit">{{name}}</div>
                        <div class="time" v-if="expireDays>0">{{expireDays}}天后结束</div>
                        <div class="time" v-else>已结束</div>
                    </div>
                </div>
            </div>
            <div class="map">
                <p>{{cityName}}-{{landmark.address}}</p>
            </div> 
        </div>
        <div class="commentBox">
            <div class="taBox">
                <div class="tabs">
                    <div class="tab" @click="toggleTab('comment')" :class="{'active': currentTab == 'comment'}"><a>评论</a></div>
                    <div class="tab" @click="toggleTab('like')" :class="{'active': currentTab == 'like'}"><a>点赞</a></div>
                </div>
                <div class="rt">
                    <div class="comment"><div>{{authorData.commentCount}}</div><i class="ico_comment2" @click="clickDownload"></i></div>
                    <div class="zan"><div>{{authorData.likeCount}}</div><i class="ico_zan" @click="clickDownload"></i></div>
                </div>
            </div>
            <comment :is="currentTab" keep-alive  :latestComments="latestComments" :latestLikeAuthors="latestLikeAuthors"></comment>
        </div>
        <footer2></footer2>
    </div>  
</template>

<script>
    import wx from 'weixin-js-sdk';
    import footer2 from './footer2';
    import comment from './comment';
    import like from './like';
    import {
        getWx,getEvaluations,base
    } from '../api/api'
    export default {
        name: 'app',
        components: {
            footer2,
            comment,
            like
        },
        data() {           
            return {
                authorImg: '',
                time: '',
                author: '',
                content: '',
                thu_image: '',
                shareDesc: '',
                currentTab: '',
                tabActiveClassName: 'active',
                nickname:'',
                momentCreatedDate:'',
                id:'',
                apiUrl:base,
                authorData:{},
                label:'',
                name:'',
                landmark:{},  
                expireDays:'',
                cityName:'',
                latestComments:[],//评论
                latestLikeAuthors:[], // 喜欢
                pics:[],
            }
        },
        created() {
            this.wechatConfig()
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                const id = this.$route.params.id;
                getEvaluations(id).then(res => {
                    this.authorData = res.data;
                    this.id = id;
                    this.nickname = res.data.author.nickname;
                    this.momentCreatedDate = res.data.momentCreatedDate;
                    this.content = res.data.content;
                    this.pics = res.data.pics;
                    this.label = res.data.exhibition.type.label;
                    this.name = res.data.exhibition.name;
                    this.endDay = res.data.exhibition.endDay;
                    this.landmark = res.data.exhibition.landmark;
                    this.cityName = res.data.exhibition.landmark.city.name;
                    this.expireDays = res.data.exhibition.expireDays;
                    this.latestComments = res.data.latestComments;
                    this.latestLikeAuthors = res.data.latestLikeAuthors;
                    this.currentTab = 'comment';
                })
            },
            toggleTab: function(tab) {
                this.currentTab = tab;
            },
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
                    label{
                        color:#0D94BE;
                    }
                }
                .img {
                    position: relative;
                    display: inline-block;
                    max-width: 6.4rem;
                    max-height: 6.4rem;
                    object-fit: cover;
                    margin-top:12px;
                    &.num9 {
                        width:9.2rem;
                        height:9.2rem;
                        ul {
                            display: flex;
                            flex-wrap: wrap;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%; 
                            li {
                                position: relative;
                                width: calc(98% / 3);
                                height: calc(98% / 3);
                                margin-right: 1%;
                                margin-bottom: 1%;
                                overflow: hidden;
                                &:nth-of-type(3n){
                                    margin-right: 0;
                                }
                                &:nth-of-type(n+7){
                                    margin-bottom: 0;
                                }
                                img {
                                    position: absolute;
                                    top:0;
                                    left:0;
                                    width:100%;
                                    height:100%;
                                    object-fit:cover;
                                }
                            }
                        }
                    }
                    &.num4 {
                        width:6.13333rem;
                        height:6.13333rem;
                        ul {
                            display: flex;
                            flex-wrap: wrap;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%; 
                            li {
                                position: relative;
                                width: calc(98% / 2);
                                height: calc(98% / 2);
                                margin-right: 1%;
                                margin-bottom: 1%;
                                overflow: hidden;
                                &:nth-of-type(2n){
                                    margin-right: 0;
                                }
                                &:nth-of-type(n+2){
                                    margin-bottom: 0;
                                }
                                img {
                                    position: absolute;
                                    top:0;
                                    left:0;
                                    width:100%;
                                    height:100%;
                                    object-fit:cover;
                                }
                            }
                        }
                    }
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
                        max-width: 100%; 
                        border-radius: .133333rem;
                    }
                }
                .zlBox2 {
                    display: flex;
                    background: #F1F3F3;
                    border-radius: 5px;
                    margin-top:12px;
                    img {
                        display: block;
                        width:2.133333rem;
                        height:2.133333rem;
                        object-fit:cover;
                        border-radius: 5px;
                    }
                    .con {
                        padding:10px;
                        flex: 1;
                        .tit {
                            font-size: .373333rem;
                            color: #363636;
                        }
                        .time {
                            font-size: 12px;
                            color: #757575;
                            margin-top:.08rem;
                        }
                    }
                }
            }
            .box_bt {
                display:flex;
                justify-content: space-between;
                align-items: center;
                margin-top:10px;
                .read {
                    color: #BDBDBD;
                }               
            }          
        }
        .map {
            display: flex;
            align-items: center;
            margin-top:12px;
            &::before {
                display: block;
                content:"";
                width:.266667rem;
                height:.357333rem;
                background: url('../assets/map.png') center/100%;
                margin-right:6px;
            }
            p {
                color: #757575;
            }
        }
        .viewMore {
            background: #f0f2f2;
            color: #757575;
            font-size: .373333rem;
            text-align: center;
            padding:.266667rem .4rem .4rem;
        }
        .commentBox {
            background: #fff;
            padding:.4rem;
            .taBox {
                display: flex;
                justify-content: space-between;
                margin-bottom:15px;
                .tabs {
                    display: flex;
                    font-size: .48rem;
                    color: #363636;
                    .tab {
                        position: relative;
                        margin-right:.533333rem;
                        color: #BDBDBD;
                    }
                    .active {
                        color: #363636;
                        &::after {
                            position: absolute;
                            left:0;
                            bottom:-10px;
                            content: '';
                            width:100%;
                            height:3px;
                            background: #FFDB24;
                            border-radius: 3px;
                        }
                    }
                }
                .rt {
                    display:flex;
                    font-size:.373333rem;
                    color: #BDBDBD;
                    .comment {
                        display: flex;
                        align-items: center;
                        margin-right:.266667rem;
                        .ico_comment2 {
                            display:block;
                            width:.533333rem;
                            height:.493333rem;
                            background: url('../assets/comment2.png') center/100%;
                            margin-left:.08rem;
                        }
                    }
                    .zan {
                        display: flex;
                        align-items: center;
                        .ico_zan {
                            display: block;
                            width:.533333rem;
                            height:.493333rem;
                            background: url('../assets/zan.png') center/100%;
                            margin-left:.08rem;
                        }
                    }
                }
            }
        }
    }
</style>