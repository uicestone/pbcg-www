<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      intro: {},
      currentSelectPeople: -1,
      zichanList: [],
      selectedZichan: null,
      zoujinList: [],
      selectedZoujin: null,
      musicList: [],
      currentPlayIndex: -1,
      currentTag: 1
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
  async mounted() {
    handleLoading();
    this.intro = await request.getPost('收购初衷');
    this.zichanList = await request.getPosts({
      query: {
        category: "资产展示",
        limit: 3
      }
    });
    this.zoujinList = await request.getPosts({
      query: {
        category: "走近资产",
        limit: 3
      }
    });
  },
  methods: {
    playAudio(index) {
      if (index == this.currentPlayIndex && !this.currentPlayer.paused) {
        this.currentPlayer.pause();
        return;
      }
      this.currentPlayIndex = index;
      let data = this.musicList[index];
      this.currentPlayer.src = data.url;
      this.currentPlayer.play();
    }
  }
};
</script>

<template>
    <body>
    <div class="main page-zichan" >
      <img src="~@/assets/images/banner-zichan.png" width="100%">
      <div class="header">
        <a  @click="$router.go(-1)" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
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
                  <div v-if="selectedZichan" class="detail">
                    <h2 class="title">{{ selectedZichan.title }}</h2>
                    <div class="content" v-html="selectedZichan.content"></div>
                  </div>    
                </div>
                <div v-if="currentTag == 3"  class="chunk chunk3">
                  <ul v-if="!selectedZoujin" class="post-list">
                    <li v-for="(item, key) in zichanList" @click="selectedZoujin = item" :key="key">
                      <span class="thumbnail"><img :src="item.posterUrl"></span>
                      <span class="title">
                        {{item.title}}
                        <p class="date">{{ item.date }}</p>
                      </span>
                    </li>
                  </ul>
                  <div v-if="selectedZoujin" class="detail">
                    <h2 class="title">{{ selectedZoujin.title }}</h2>
                    <div class="content" v-html="selectedZoujin.content"></div>
                  </div>    
                </div>
              </div>
            </div>
          </div>
      </div>
            
            
      <div class="pop" v-if="currentSelectPeople > -1">
        <span class="back" @click="currentSelectPeople = -1" ><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
            <div class="hint">
            <div class="userIfor">
              <img :src="currentSelectPeopleData.posterUrl">
              <div>
                <p class="nameBox">
                  <font class="name">
                    {{currentSelectPeopleData.title}}
                  </font>
                    <!-- /<font class="sex">女</font> --> -->
                  </p>
                <p class="post" v-html="currentSelectPeopleData.content"></p>
              </div>
            </div>
            <!-- <p class="infor">义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲义勇军进行曲</p> -->
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
        width: 100%;
        tr {
          td {
            background: #ececec;
            color: black;
            padding: 0.05rem 0.5rem;
            &:first-child {
              width: 30%;
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
