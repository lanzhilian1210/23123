<template>
    <div class="footer3">
        <div class="logo"><img src="../assets/logo_bottom.png" class="logo_bottom"></div>
        <div class="desc">不无聊的文艺星球</div>
        <button type="button" @click="clickDownload">点击下载</button>
    </div>
</template>
<script>
    import { downLoad } from './stickS/downLoad';
    export default {       
        methods: {
            clickDownload() {
                downLoad();
            },
        }
    }
</script>

<style>
.footer3 {
    display: flex;
    background: #FFE91A;
    color: #fff;
    padding: 12px 15px;
    align-items: center;
}
.footer3 .logo {
    width: .909333rem;
    margin-left:.2rem;
    margin-right: .533333rem;
}
.footer3 .logo_bottom {
    display: block;
    width: 100%;
}
.footer3 .desc {
    font-size: 12px;
    color: #212121;
    flex: 1;
}
.footer3 button {
    width:2.026667rem;
    height:.746667rem;
    background: #fff;
    color: #757575;
    border: 0;
    font-size: 1.2px;
    border-radius: 2px;
}
</style>