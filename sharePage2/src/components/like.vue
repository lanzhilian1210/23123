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
    import footer2 from './footer2';
    import { wechatConfig } from './stickS/wechatConfig'; 
    import { downLoad } from './stickS/downLoad';
    import {
        base
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
            wechatConfig(this)
        },
        mounted() {
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