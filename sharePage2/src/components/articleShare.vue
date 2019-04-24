<template>
    <div class="articleShare">
        <!-- <headerS></headerS> -->
        <div style="width:100%;height:1.6rem;background:#F2F2F2"></div>
        <div class="articleTitle">{{title}}</div>
        <div class="author">
            <div class="authorLeft">
                <img :src="authorImg" alt="" class="authorImg">
                <div class="authorTitle">
                    <div class="name">{{author}}</div>
                    <div class="time">{{time}}</div>
                </div>
            </div>
            <div class="authorRight" v-if="author">
                <div class="focus" @click="clickDownload">
                    关注
                </div>
            </div>
        </div>
        <div class="content" v-html="content">
        </div>
        <!-- <div class="lastSection"></div> -->
        <!-- <div class="footer">
            <div class="footerLeft">
                <div class="footerOne" @click="clickDownload">
                    <img src="../assets/good.png" alt="">
                    <div>点赞</div>
                </div>
                <div class="footerTwo" @click="clickDownload">
                    <img src="../assets/fav.png" alt="">
                    <div>收藏</div>
                </div>
                <div class="footerThree" @click="clickDownload">
                    <img src="../assets/comment.png" alt="">
                    <div>评论</div>
                </div>
            </div>
            <div class="footerRight">
                <div class="footerLike" @click="clickDownload">
                    我喜欢
                </div>
            </div>
        </div> -->
        <!-- <img src="../assets/cc.jpg" alt=""> -->
    </div>
</template>

<script>
    // import headerS from './header';
    import { wechatConfig } from './stickS/wechatConfig'; 
    import { downLoad } from './stickS/downLoad';
    import {
        getArticle,
    } from '../api/api'
    export default {
        components: {
            // headerS
        },
        data() {
            return {
                authorImg: '',
                title: '',
                time: '',
                author: '',
                content: '',
                thu_image: '',
                shareDesc: ''
            }
        },
        created() {
            this.fetchData()
            wechatConfig(this)
        },
        methods: {
            fetchData() {
                let dl = document.location.href.split('/')
                let id = dl[dl.length - 1];
                getArticle(id).then(res => {
                    // console.log(res)
                    let data = res.data;
                    document.title = data.title
                    this.authorImg = `${this.apiUrl}/attach/img/${data.author.avatarId}/square`
                    this.title = data.title;
                    this.author = data.author.nickname;
                    this.content = data.content;
                    this.time = data.momentCreatedDate;
                    this.thu_image = `${this.apiUrl}/attach/img/${data.coverId}`
                    // this.shareDesc = data.shareDesc
                })
            },
            clickDownload() {
                downLoad();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .articleShare {
        height: inherit;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .articleTitle {
        font-size: 24px;
        color: #212121;
        margin: 0.2rem 0.4rem 0 .4rem;
    }
    .author {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem
    }
    .authorImg {
        width: 1.013333rem;
        height: 1.013333rem;
        border-radius: 50%;
        margin-right: .266667rem;
    }
    .authorLeft {
        display: flex;
        align-items: center;
    }
    .authorTitle {
        display: flex;
        flex-direction: column;
    }
    .authorTitle .name {
        font-size: 14px;
        color: #363636;
    }
    .authorTitle .time {
        color: #BDBDBD;
    }
    .focus {
        width: 1.173333rem;
        height: .666667rem;
        background: #FFD95D;
        border-radius: .053333rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #573426;
        border-radius: 2px;
    }
    /* .footer {
        width: 100%;
        height: 1.6rem;
        box-shadow: 0 -1px 2px 0 rgba(204, 204, 204, 0.30);
        position: fixed;
        bottom: 0;
        padding: 0 .4rem;
        display: flex;
        background: white;
    }
    .footerLeft {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: .3rem;
    }
    .footerRight {
        flex: 0 0 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerOne,
    .footerTwo,
    .footerThree {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 60%;
    }
    .footerOne img {
        height: .44rem;
    }
    .footerTwo img {
        height: .48rem;
    }
    .footerThree img {
        height: .48rem;
    }
    .footerOne div,
    .footerTwo div,
    .footerThree div {
        font-size: 10px;
        color: #757575;
    }
    .footerLike {
        font-size: 14px;
        color: #573426;
        width: 100%;
        text-align: center;
        padding: 0.25rem 0;
        background: #FFCA18;
        border-radius: 3px;
    } */
    .content {
        padding: 0 .4rem;
        font-size: 14px;
        margin-bottom: 1.8rem;
        line-height: 20px;
    }
    .content img , .content video{
        max-width: 100%;
    }
     .lastSection {
        width: 100%;
        height: 1.4rem;
        background: white;
    }
</style>
