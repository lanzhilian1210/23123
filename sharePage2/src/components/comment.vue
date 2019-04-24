<template>
    <div class="comment_list">
        <div class="comment_item" v-for="(item,index) in latestComments" :key="index">
            <img data-v-43092277="" :src="`${apiUrl}/attach/img/${item.author.avatarId}`" alt="" class="authorImg">
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
            查看全部{{latestComments.length}}条评论
        </div>
    </div>
</template>

<script>
    import footer2 from './footer2';
    import { wechatConfig } from './stickS/wechatConfig'; 
    import { downLoad } from './stickS/downLoad';
    import {
        base
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
            wechatConfig(this);
        },
        mounted() {
            // console.log(this.latestComments);
            const id = this.$route.params.id;
        },
        methods: {
            clickDownload() {
                downLoad();
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


