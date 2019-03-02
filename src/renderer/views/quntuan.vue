<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      intro: {},
      eventList: [],
      selectedEvent: null,
      currentPlayIndex: -1,
      currentTag: 1,
      flowText: [
        "正衣冠，列队有序进入宣誓厅（室）；",
        "主持人宣布仪式开始，奏唱《中华人民共和国国歌》；",
        "观看誓词教育宣传片《看齐》；",
        "主持人介绍领誓人，并简要介绍其先进事迹；",
        "领誓人带领全体党员面向党旗宣誓（有条件的，参加宣誓的党员在“宣誓人”环节依次报名）；",
        "领誓人致共勉词，与全体党员共勉；",
        "奏《国际歌》；",
        "主持人宣布仪式结束。"
      ]
    };
  },
  computed: {
    currentPlayer(){
      return this.$refs.audio;
    }
  },
  async mounted() {
    handleLoading();
    this.intro = await request.getPost('群团概念');
    this.eventList = await request.getPosts({
      query: {
        category: "群团活动",
        limit: 3
      }
    });
  },
  methods: {
    back() {
      if (this.selectedEvent) {
        this.selectedEvent = null;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<template>
    <body>
    <div class="main page-quntuan" >
      <img src="~@/assets/images/banner-quntuan.png" width="100%">
      <div class="header">
        <a  @click="back" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
      </div>
      <div class="content">
        <div class="middle">
            <div class="tab-bar">
              <div :class="{curr: currentTag == 1}"  @click="currentTag =1">
                <p><i class="fa fa-file-text-o" aria-hidden="true"></i><font>群团概念</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
              <div :class="{curr: currentTag == 3}"  @click="currentTag =3" >
                <p><i class="fa fa-image" aria-hidden="true"></i><font>活动照片</font></p>
                <img src="~@/assets/images/line.jpg">
              </div>
            </div>
            
            <div class="list-box">
              <div class="lists">
                <div v-if="currentTag == 1" class="chunk chunk1" v-html="intro.content"></div>
                <ul v-if="currentTag == 3 && !selectedEvent"  class="chunk chunk3">
                  <li v-for="(item, index) in eventList" @click="selectedEvent=item">
                    <span class="thumbnail"><img :src="item.posterUrl"></span>
                    <span class="title">
                      {{item.title}}
                      <p class="date">{{ item.date }}</p>
                    </span>
                  </li>
                </ul>
                <div class="pop" v-if="selectedEvent">
                  <div v-html="selectedEvent.content"></div>
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
.page-quntuan {
  .chunk1 {
    padding: 0.15rem 0.5rem;
    dl {
      display: flex;
      flex-wrap: wrap;
      >* {
        margin: 0.15rem 0;
      }
      dt {
        flex-basis: 20%;
        display: flex;
        img {
          width: 1.4rem;
          object-fit: contain;
        }
        border-right: 0.05rem solid #da5e2d;
      }
      dd {
        flex-basis: 80%;
        padding: 0 0.5rem;
        h1 {
          font-size: 0.50rem;
          margin-bottom: 0.1rem;
          color: #da5e2d;
        }
        p {
          font-size: 0.25rem;
          font-weight: bold;
          text-indent: 2em;
        }
      }
    }
  }
  .chunk3 {
    padding: 0 0.3rem;
    li {
      display: flex;
      flex-wrap: wrap;
      margin: 0.3rem 0;
      border: 0.03rem solid #ddd;
      .thumbnail {
        flex-basis: 30%;
        max-width: 30%;
        img {
          max-width: 100%;
        }
      }
      .title {
        flex-basis: 70%;
        padding: 0.25rem 0.5rem;
        font-size: 0.4rem;
        font-weight: bold;
        .date {
          font-size: 0.354rem;
        }
      }
    }
  }
  .pop {
    padding: 0.5rem;
    img {
      width: 100%;
    }
  }
}
        
</style>


