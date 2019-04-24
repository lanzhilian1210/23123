<template>
    <div class="mainBg">
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <div class="homePage">
            <div class="personBox">
                <div class="personal">
                    <img data-v-376851e1="" src="http://web.artree.net.cn/attach/img/7195/square" alt="" class="authorImg">
                    <div class="name">{{nickname}}</div>
                    <p>不无聊的文艺星球</p>
                </div>
                <div class="information">
                    <div class="attention">
                        <div class="num">{{artistCount}}</div>
                        <label>关注</label>
                        <div class="btn_gz" @click="clickDownload"><div>关注</div></div>
                    </div>
                    <div class="fans">
                        <div class="num">{{fanCount}}</div>
                        <label>粉丝</label>
                        <div class="btn_sx" @click="clickDownload"><div>私信</div></div>
                    </div>
                </div>
            </div>
            <div id="personNav">
                <ul>
                    <li  @click="clickDownload(index)" :class="{'active':index == tabIndex}" v-for="(item,index) in plates" :key="index" :id="item.plate.id" ref="dataId"><label>{{item.plate.name}}</label><div class="num">{{item.count}}</div></li>
                    <!-- <li  class="active"><label>绘画</label><div class="num">10</div></li> -->
                </ul>
            </div>
            <div class="listItem" v-for="(item,index) in contents" :key="index" v-if="contents.length>0">
                <div class="author">
                    <div class="authorLeft">
                        <img src="http://web.artree.net.cn/attach/img/7195/square" alt="" class="authorImg">
                        <div class="authorTitle">
                            <div class="name">{{item.author.nickname}}</div>
                            <div class="time">{{item.momentCreatedDate}}</div>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <p v-html="item.content"> <label>#{{item.title}}# </label >{{item.content}}</p>   
                    <div class="img" v-if="item.dtype == 'article'">
                        <!-- <img :src="item.coverId"> -->
                        <img :src="`${apiUrl}/attach/img/${item.coverId}`">
                        <i class="ico_ct">长图</i>
                    </div>
                    <div class="img num4" v-else-if="item.pics.length > 1 & item.pics.length<=4 ">
                        <ul>
                            <li v-for="(item,index) in item.pics" :key="index">
                                <img :src="`${apiUrl}/attach/img/${id}`">
                            </li>
                        </ul>
                    </div>
                    <div class="img" v-else-if="item.pics.length == 1 ">
                        <ul>
                            <li v-for="(item,index) in item.pics" :key="index">
                                <img :src="`${apiUrl}/attach/img/${id}`">
                            </li>
                        </ul>
                    </div>
                    <div class="img num9" v-else>
                        <ul>
                            <li v-for="(item,index) in item.pics" :key="index">
                                <img :src="`${apiUrl}/attach/img/${id}`">
                            </li>
                        </ul>
                    </div>
                </div>
                
                
                <div class="box_bt">
                    <div class="read">阅读 {{item.clickCount}}</div>
                    <div class="rt">
                        <div class="comment"><div>{{item.commentCount}}</div><i class="ico_comment2" @click="clickDownload"></i></div>
                        <div class="zan"><div>{{item.likeCount}}</div><i class="ico_zan" @click="clickDownload"></i></div>
                    </div>
                </div> 
            </div>
            <div v-if="contents.length == 0" class="listItem">暂无内容</div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import footer2 from './footer2';
    import { wechatConfig } from './stickS/wechatConfig'; 
    import { downLoad } from './stickS/downLoad';
    import {
        getWx,getUers,base,getCommunity
    } from '../api/api'
    export default {      
        components: {
            footer2
        },      
        data() {
            return {
                tabIndex:0,
                nickname:'', //姓名
                artistCount:0, //关注
                fanCount:0, //粉丝
                plates:[], // 列表
                contents:[],
                id:'',
                apiUrl:base,
            }
        },
        created() {
            wechatConfig();  //微信config

        },
        mounted() {
            this.handleGetUseresInfo();
        },
        methods: {
            // 个人主页信息获取
            handleGetUseresInfo() {
                const id = this.$route.params.id;
                this.id = id;
                getUers(id).then(res => {
                    this.nickname = res.data.nickname;
                    this.artistCount = res.data.artistCount;
                    this.fanCount = res.data.fanCount;
                    this.plates = res.data.plates;
                    this.contents = res.data.contents;
                })
            },     
            clickDownload(index) {
                const authorId = this.$refs.dataId[index].id;
                const id = this.id;
                this.tabIndex = index; //active
                downLoad();  //下载
                getCommunity(id,authorId).then(res => {
                    this.contents = res.data.contents;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
.mainBg {
    background: #f2f2f2;
}
.homePage {
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    padding:2.133333rem .533333rem .266667rem;
    background: url('../assets/bg.png') center 0 no-repeat;
    background-size: 100% auto;
    .personBox {
        position: relative;
        background: #FFFFFF;
        border-radius: 5px;
        padding:0 .533333rem .533333rem;
        margin-bottom:10px;
        .personal {
            text-align: center;
            border-bottom: 1px solid #F1F3F3;
            padding:1.2rem 0 .533333rem;
            margin-bottom:.4rem;
            .authorImg {
                position: absolute;
                left:50%;
                top:-.8rem;
                margin-left:-.8rem;
                width:1.6rem;
                height: 1.6rem;
                border-radius: 50%;
            }
            .name {
                font-size: .48rem;
                color: #363636;
                padding-left:.426667rem;
                &::after {
                    display: inline-block;
                    content: '';
                    width:.426667rem;
                    height:.426667rem;
                    background: url('../assets/ico_right.png') center/100%;
                    vertical-align: middle;
                }
            }
            p {
                font-size: 12px;
                color: #BDBDBD;
                margin-top:10px;
            }
        }
        .information {
            display: flex;
            text-align: center;
            width:100%;
            .num {
                font-size: .533333rem;
            }
            label {
                display: block;
                font-size: 12px;
                color: #BDBDBD;
                margin-top:.213333rem;
            }
            .attention {
                width:50%;
                text-align: center;
                .btn_gz {
                    display: flex;
                    margin:15px auto 0;
                    align-items: center;
                    width:2.4rem;
                    height:.853333rem;
                    background: #F1F3F3;
                    border-radius: .48rem;
                    color: #757575;
                    font-size: 12px;
                    justify-content: center;
                    &::before {
                        display: block;
                        content:'';
                        width:.426667rem;
                        height:.426667rem;
                        line-height: .426667rem;
                        background: url('../assets/concern.png') center/100%;
                        margin-right:.133333rem;
                    }
                }
            }
            .fans {
                width:50%;
                text-align: center;
                .btn_sx {
                    display: flex;
                    margin:15px auto 0;
                    align-items: center;
                    width:2.4rem;
                    height:.853333rem;
                    background: #F1F3F3;
                    border-radius: .48rem;
                    color: #757575;
                    font-size: 12px;
                    justify-content: center;
                    &::before {
                        display: block;
                        content:'';
                        width:.426667rem;
                        height:.426667rem;
                        line-height: .426667rem;
                        background: url('../assets/letter.png') center/100%;
                        margin-right:.133333rem;
                    }
                }
            }
        }        
    }
    .listItem {
            background: #fff;
            padding:.4rem;
            margin-bottom:10px;
            border-radius: 5px;
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
                    margin-top:12px;
                    &.num9 {
                        width:8.133333rem;
                        height:8.133333rem;
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
                        width:5.422213rem;
                        height:5.422213rem;
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
                        object-fit: cover;
                        max-height: 6.4rem; 
                        max-width: 100%; 
                        border-radius: .133333rem;
                    }
                }
                .zlBox {
                    display: inline-flex;
                    align-items: center;
                    background: #F1F3F3;
                    border-radius: 5px;
                    padding:6px 15px 6px 0;
                    margin-top:12px;
                    label {
                        display: block;
                        width:1.066667rem;
                        height:.64rem;
                        background: url('../assets/ico_zl.png') center/100%;
                        text-indent: -999px;
                        overflow: hidden;
                        margin-right:6px;
                    }
                    p {
                        padding:0;
                        color: #757575;
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
}
#personNav{
    width: 100%;
    overflow:hidden;
    background: #fff;
    border-radius: 5px;
    margin-bottom:10px;
    ul{
        padding: 0 10px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: middle;
        -ms-flex-align: middle;
        align-items: middle;
        overflow: auto;
        list-style: none;
        li{
            text-align: center;
            font-size: .426667rem;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            padding: 10px 0;
            margin: 0 12px;
            color: #BDBDBD;
            label {
                display:block;
            }
            .num {
                font-size: .32rem;
                margin-top:5px;
            }
        }
        .active{
            color: #363636;
            position: relative;
            &::before {
                display: block;
                content: '';
                position: absolute;
                left:0;
                bottom:0px;
                width:100%;
                height:3px;
                background: #FFDB24;
                border-radius: 3px;
            }
            label {
                font-size: .426667rem;
            }
        }
    }
}
</style>