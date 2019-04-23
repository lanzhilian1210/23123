<template>
  <div id="app">
    <!-- <headerS></headerS> -->
    <!-- <component v-bind:is="currentTabComponent"></component>-->
    <!-- <ticketShare/> -->
    <router-view/>
    <footerS :comp="comp"></footerS> 
  </div>
</template>

<script>
  import headerS from './components/header';
  import footerS from './components/footer'
 export default {
  name: 'App',
  components:{
    headerS,footerS
  },
  data() {
    return {
      comp:'',
    }
  },
  watch: {
    // 渲染footer
    $route(to, from) {
      let route = this.$route.path;
      if (route.indexOf('articles') > -1) {
        this.comp = 'articles';
      } else if (route.indexOf('goods') > -1) {
        this.comp = 'goods';
      } else if (route.indexOf('tickets') > -1) {
        this.comp =  'tickets';
      } else {
        this.comp = '';
      }
    }
  },
}
  // import articleShare from './components/articleShare'
  // import productShare from './components/productShare'
  // import ticketShare from './components/ticketShare'
  // const articleShare = () =>
  //   import ('./components/articleShare')
  // const productShare = () =>
  //   import ('./components/productShare')
  // const ticketShare = () =>
  //   import ('./components/ticketShare')

  // import footerS from './components/footer'
  // import footer2 from './components/footer2'
  // export default {
  //   name: 'App',
  //   components: {
  //     articleShare,
  //     productShare,
  //     ticketShare,
  //     headerS
  //     footerS
  //   },
  //   data() {
  //     return {}
  //   },
  //   computed: {
  //     currentTabComponent() {
  //       let a = location.href;
  //       if (a.indexOf('articles') > -1) {
  //         return 'articleShare'
  //       } else if (a.indexOf('goods') > -1) {
  //         return 'productShare'
  //       } else if (a.indexOf('tickets') > -1) {
  //         return 'ticketShare'
  //       } else {
  //         return 'homepage'
  //       }
  //     },
  //     comp() {
  //       let a = location.href;
  //       if (a.indexOf('articles') > -1) {
  //         return 'articles'
  //       } else if (a.indexOf('goods') > -1) {
  //         return 'goods'
  //       } else if (a.indexOf('tickets') > -1) {
  //         return 'tickets'
  //       } else {
  //         return ''
  //       }
  //     }
  //   }
  // }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* -webkit-overflow-scrolling: touch; */
  }
  html,
  body {
    width: 100%;
    height: 100%;
    /* overflow: scroll; */
    color: #212121;
    font-family: 'PingFangSC-Regular';
  }
  #app {
    width: 100%;
    height: 100%;
  }
  /* #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    } */
</style>
