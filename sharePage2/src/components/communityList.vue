<template>
    <div class="worksListShare">
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <div class="listItem" v-for="(item,index) in content" :key="index">
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
                <div class="title">{{item.title || item.homePlate.name}}</div>
                <p v-html="item.content">{{item.content || item.homePlate.tipText}}</p>
                <div class="img" v-if="item.dtype == 'article'">
                        <!-- <img :src="item.coverId"> -->
                        <img :src="`${apiUrl}/attach/img/${item.coverId}`"  v-show="item.coverId">
                        
                    </div>
                    <div class="img num4" v-else-if="item.pics.length > 1 & item.pics.length<=4 ">
                        <ul>
                            <li v-for="(items,index) in item.pics" :key="index">
                                <img :src="`${apiUrl}/attach/img/${items.id}`">
                            </li>
                        </ul>
                    </div>
                    <div class="img" v-else-if="item.pics.length == 1 ">
                        <ul>
                            <li v-for="(items,index) in item.pics" :key="index">
                                
                                <img :src="`${apiUrl}/attach/img/${items.id}`" >
                                <i class="ico_ct" v-show="items.width/items.height > 2 || items.height/items.width > 2">长图</i>
                            </li>
                        </ul>
                    </div>
                    <div class="img num9" v-else v-show="item.pics.length>0">
                        <ul>
                            <li v-for="(items,index) in item.pics" :key="index">
                                <img :src="`${apiUrl}/attach/img/${items.id}`">
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
        <div class="viewMore" @click="clickDownload">打开艺下查看更多内容</div>
        <footer2></footer2>
    </div>  
</template>

<script>
    import { wechatConfig } from './stickS/wechatConfig'; 
    import { downLoad } from './stickS/downLoad';
    import footer2 from './footer2';
    import wx from 'weixin-js-sdk';
    import {
        getCommunity,base,getWx
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
                apiUrl:base,
                id:'',
            }
        },
        created() {
            wechatConfig(this);
        },
        mounted() {
            this.fetchData();
        },
        methods: { 
        fetchData() {
             const id = this.$route.params.id;
                this.id = id;
            getCommunity(id).then(res => {
                console.log(res.data.contents);
                this.content = res.data.contents;
                // let data = res.data;
                // document.title = data.title
                // this.authorImg = `${this.apiUrl}/attach/img/${data.author.avatarId}/square`
                // this.title = data.title;
                // this.author = data.author.nickname;
                // this.content = data.content;
                // this.time = data.momentCreatedDate;
                // this.thu_image = `${this.apiUrl}/attach/img/${data.coverId}`
                // this.shareDesc = data.shareDesc
            })
        },
            clickDownload() {
                downLoad();
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
                .title {
                    font-size: .426667rem;
                    line-height: .64rem;
                    font-weight: bold;
                    margin-top:10px;
                }
                p {
                    font-size: .373333rem;
                    padding:.266667rem 0 0;
                    line-height: .586667rem;
                    color: #181818;
                    label{
                        color:#0D94BE;
                    }
                }
                .img {
                    position: relative;
                    display: inline-block;
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
        .viewMore {
            background: #f0f2f2;
            color: #757575;
            font-size: .373333rem;
            text-align: center;
            padding:.266667rem .4rem .4rem;
        }
    }
</style>
