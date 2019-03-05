<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      intro: {},
      currentSelectPeople: -1,
      zichanList: [],
      zichanPage: 1,
      zichanTotalPages: 1,
      selectedZichan: null,
      zoujinList: [],
      zoujinPage: 1,
      zoujinTotalPages: 1,
      selectedZoujin: null,
      currentTag: 1,
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      zichanSwiperIndex: 0,
      zoujinSwiperIndex: 0
    };
  },
  computed: {
    currentSelectPeopleData() {
      return this.zichanList[this.currentSelectPeople] || {};
    },
    currentPlayer(){
      return this.$refs.audio;
    }
  },
  watch: {
    currentTag(v) {
      if (v !== 2){
        this.selectedZichan = null;
      }
      if (v !== 3) {
        this.selectedZoujin = null;
      }
    }
  },
  async mounted() {
    handleLoading();
    this.intro = await request.getPost('收购初衷');
    this.getZichanList(true);
    this.getZoujinList(true);
  },
  methods: {
    back() {
      if (this.selectedZichan) {
        this.selectedZichan = null;
      } else if (this.selectedZoujin) {
        this.selectedZoujin = null;
      } else {
        this.$router.go(-1);
      }
    },
    prevSwiper(swiper) {
      this.$refs[swiper].swiper.slidePrev();
    },
    nextSwiper(swiper) {
      this.$refs[swiper].swiper.slideNext();
    },
    onSlideChange(swiper) {
      this[swiper+'Index'] = this.$refs[swiper].swiper.activeIndex;
    },
    contentImages(content) {
      const imgTags = content.match(/<img .*?src=".*?".*?>/g);
      if (!imgTags) return [];      
      return imgTags.map(img => img.match(/<img .*?src="(.*?)".*?>/)).map(m => m[1]);
    },
    async getZichanList(getTotalPages = false) {
      this.zichanList = await request.getPosts({
        query: {
          category: "资产展示",
          limit: 3,
          page: this.zichanPage
        },
        options: {
          cacheable: !getTotalPages
        }
      });

      if (getTotalPages) {
        this.zichanTotalPages = this.zichanList._totalPages;
      }
    },
    nextZichanPage() {
      if (this.zichanPage >= this.zichanTotalPages) return;
      this.zichanPage++;
      this.getZichanList();
    },
    prevZichanPage() {
      if (this.zichanPage <= 1) return;
      this.zichanPage--;
      this.getZichanList();
    },
    async getZoujinList(getTotalPages = false) {
      this.zoujinList = await request.getPosts({
        query: {
          category: "走近资产",
          limit: 3,
          page: this.zoujinPage
        },
        options: {
          cacheable: !getTotalPages
        }
      });

      if (getTotalPages) {
        this.zoujinTotalPages = this.zoujinList._totalPages;
      }
    },
    nextZoujinPage() {
      if (this.zoujinPage >= this.zoujinTotalPages) return;
      this.zoujinPage++;
      this.getZoujinList();
    },
    prevZoujinPage() {
      if (this.zoujinPage <= 1) return;
      this.zoujinPage--;
      this.getZoujinList();
    }
  }
};
</script>

<template>
    <body>
    <div class="main page-zichan" >
      <img src="~@/assets/images/banner-zichan.png" width="100%">
      <div class="header">
        <a  @click="back()" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
      </div>
      <div class="content">
        <div class="middle">
            <div class="tab-bar">
              <div :class="{curr: currentTag == 1}"  @click="currentTag =1">
                <p><i class="fa fa-file-text-o" aria-hidden="true"></i><font>收购初衷</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
              <div :class="{curr: currentTag == 2}"  @click="currentTag =2">
                <p><i class="fa fa-building-o" aria-hidden="true"></i><font>资产展示</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
              <div :class="{curr: currentTag == 3}"  @click="currentTag =3" >
                <p><i class="fa fa-address-card-o" aria-hidden="true"></i><font>走近资产</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
            </div>
            
            <div class="list-box">
              <div class="lists">
                <div v-if="currentTag == 1" class="chunk chunk1" v-html="intro.content"></div>
                <div v-if="currentTag == 2" class="chunk chunk2">
                  <ul v-if="!selectedZichan" class="post-list">
                    <li v-for="(item, key) in zichanList" @click="selectedZichan = item" :key="key">
                      <span class="thumbnail"><img :src="item.posterUrl"></span>
                      <span class="title">
                        {{item.title}}
                        <p class="date">{{ item.date }}</p>
                      </span>
                    </li>
                  </ul>
                  <div class="lb-page" v-if="!selectedZichan">
                    <ul>
                      <li :class="{disabled:zichanPage<=1}"><img src="~@/assets/images/index/left-arrow.png" @click="prevZichanPage()"/></li>
                        <li v-for="index in zichanTotalPages" :class="{active: zichanPage === index}" :key="index"><span></span></li>                   
                      <li :class="{disabled:zichanPage>=zichanTotalPages}"><img src="~@/assets/images/index/right-arrow.png" @click="nextZichanPage()"/></li>
                    </ul>
                  </div>
                  <div v-if="selectedZichan" class="detail">
                    <h2 class="title">{{ selectedZichan.title }}</h2>
                    <div class="content">
                      <div class="lunbo">
                        <!-- <img src="~@/assets/images/index/gyx-img.jpg"/> -->
                        <swiper :options="swiperOption" ref="zichanSwiper" @slideChange="onSlideChange('zichanSwiper')">
                          <swiper-slide v-for="(url, index) in contentImages(selectedZichan.content)" :key="index">
                            <img class="img" :src="url" width="100%" height="100%">
                          </swiper-slide>
                        </swiper>
                        <div class="lb-page">
                          <ul>
                            <li><img src="~@/assets/images/index/left-arrow.png" @click="prevSwiper('zichanSwiper')"/></li>
                              <li v-for="(url,index) in contentImages(selectedZichan.content)" :class="{active: zichanSwiperIndex == index}" v-show="index < 10" :key="index"><span></span></li>                   
                            <li><img src="~@/assets/images/index/right-arrow.png" @click="nextSwiper('zichanSwiper')"/></li>
                          </ul>
                        </div>
                      </div>
                      <div v-html="selectedZichan.content.match(/<table[\s\S]*?<\/table>/)[0]"></div>
                    </div>
                  </div>    
                </div>
                <div v-if="currentTag == 3"  class="chunk chunk3">
                  <ul v-if="!selectedZoujin" class="post-list">
                    <li v-for="(item, key) in zoujinList" @click="selectedZoujin = item" :key="key">
                      <span class="thumbnail"><img :src="item.posterUrl"></span>
                      <span class="title">
                        {{item.title}}
                        <p class="date">{{ item.date }}</p>
                      </span>
                    </li>
                  </ul>
                  <div class="lb-page" v-if="!selectedZoujin">
                    <ul>
                      <li :class="{disabled:zoujinPage<=1}"><img src="~@/assets/images/index/left-arrow.png" @click="prevZoujinPage()"/></li>
                        <li v-for="index in zoujinTotalPages" :class="{active: zoujinPage === index}" :key="index"><span></span></li>                   
                      <li :class="{disabled:zoujinPage>=zoujinTotalPages}"><img src="~@/assets/images/index/right-arrow.png" @click="nextZoujinPage()"/></li>
                    </ul>
                  </div>
                  <div v-if="selectedZoujin" class="detail">
                    <h2 class="title">{{ selectedZoujin.title }}</h2>
                    <div class="content lunbo">
                      <!-- <img src="~@/assets/images/index/gyx-img.jpg"/> -->
                      <swiper :options="swiperOption" ref="zoujinSwiper" @slideChange="onSlideChange('zoujinSwiper')">
                        <swiper-slide v-for="(url, index) in contentImages(selectedZoujin.content)" :key="index">
                          <img class="img" :src="url" width="100%" height="100%">
                        </swiper-slide>
                      </swiper>
                      <div class="lb-page">
                        <ul>
                          <li><img src="~@/assets/images/index/left-arrow.png" @click="prevSwiper('zoujinSwiper')"/></li>
                            <li v-for="(url, index) in contentImages(selectedZoujin.content)" v-show="index < 10" :class="{active: zoujinSwiperIndex == index}" :key="index"><span></span></li>                   
                          <li><img src="~@/assets/images/index/right-arrow.png" @click="nextSwiper('zoujinSwiper')"/></li>
                        </ul>
                      </div>
                    </div>
                  </div>    
                </div>
              </div>
            </div>
          </div>
      </div>
            
    </div>
    <!--等待-->
    <div class="pre_load" >
      <div class="wrapper">
        <div class="inner">
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
        </div>
      </div>
    </div>      
  </body>
</template>

<style lang="less">
.page-zichan {
  .chunk1 {
    padding: 0.3rem;
    font-size: 0.2rem;
    font-weight: bold;
    h1 {
      font-size: 0.4rem;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    p {
      text-indent: 2em;
    }
  }
  .chunk2 {
    .swiper-slide {
      img {
        height: 4rem;
        object-fit: cover;
      }
    }
    .lb-page {
      margin-bottom: 0.3rem;
    }
  }
  .chunk3 {
    .lb-page {
      margin-bottom: 0.3rem;
    }
  }
  ul.post-list {
    padding: 0 0.3rem;
    >li {
      display: flex;
      flex-wrap: wrap;
      margin: 0.3rem 0;
      // border: 0.03rem solid #ddd;
      .thumbnail {
        // flex-basis: 30%;
        // max-width: 30%;
        border: 0.03rem solid #b52f2c;
        img {
          // max-width: 100%;
          width: 2.2rem;
          height: 2.2rem;
          object-fit: cover;
        }
      }
      .title {
        flex: 1;
        padding: 0.25rem 0.5rem;
        font-size: 0.4rem;
        font-weight: bold;
        border: 0.03rem solid #ddd;
        border-left: none;
        display: flex;
        align-items: center;
        .date {
          font-size: 0.354rem;
        }
      }
    }
  }
  .detail {
    .title {
      font-size: 0.4rem;
      text-align: center;
    }
    .content {
      padding: 0.2rem 0.5rem 0.5rem;
      img {
        width: 100%;
      }
      table {
        font-size: 0.25rem;
        font-weight: bold;
        width: 100% !important;
        tr {
          td {
            background: #ececec;
            color: black;
            padding: 0.05rem 0.5rem;
            width: auto !important;
            &:first-child {
              width: 30% !important;
              background: #b52f2c;
              color: white;
            }
            &:last-child {
              border-left: 0.2rem solid white;
            }
          }
        }
      }
    }
  }
}
</style>
