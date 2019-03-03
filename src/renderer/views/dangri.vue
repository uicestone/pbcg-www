<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      },
      dangriList: [],
      dangriPage: 1,
      dangriTotalPages: 1,
      selectedDetail: null
    };
  },
  computed: {
  },
  async mounted() {
    handleLoading();
    this.getDangriList(true);
  },
  methods: {
    back() {
      if (this.selectedDetail) {
        return (this.selectedDetail = null);
      }
      this.$router.go(-1);
    },
    async getDangriList(getTotalPages = false) {
      this.dangriList = await request.getPosts({
        query: {
          category: "主题党日",
          limit: 5,
          page: this.dangriPage
        },
        options: {
          cacheable: !getTotalPages
        }
      });

      if (getTotalPages) {
        this.dangriTotalPages = this.dangriList._totalPages;
      }
    },
    nextDangriPage() {
      if (this.dangriPage >= this.dangriTotalPages) return;
      this.dangriPage++;
      this.getDangriList();
    },
    prevDangriPage() {
      if (this.dangriPage <= 1) return;
      this.dangriPage--;
      this.getDangriList();
    }
  }
};
</script>

<template>
  	<body>
		<div class="main page8">
      <img src="~@/assets/images/banner-dangri.png" width="100%">
			<div class="header">
				<a  @click="back" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<img src="">
			</div>
			<div class="list">
				<ul v-if="!selectedDetail">
					<li v-for="(item, key) in dangriList" @click="selectedDetail = item" :key="key">
            <span class="thumbnail"><img :src="item.posterUrl"></span>
            <span class="title">
              {{item.title}}
              <p class="date">{{ item.date }}</p>
            </span>
					</li>
				</ul>
        <div class="lb-page" v-if="!selectedDetail">
          <ul>
            <li :class="{disabled:dangriPage<=1}"><img src="~@/assets/images/index/left-arrow.png" @click="prevDangriPage()"/></li>
              <li v-for="index in dangriTotalPages" :class="{active: dangriPage === index}" :key="index"><span></span></li>                   
            <li :class="{disabled:dangriPage>=dangriTotalPages}"><img src="~@/assets/images/index/right-arrow.png" @click="nextDangriPage()"/></li>
          </ul>
        </div>
        <div class="pop" v-if="selectedDetail">
          <div class="title">{{selectedDetail.title}}</div>
          <div class="content" v-html="selectedDetail.content"></div>
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
.page8 {
  .list {
    padding: 0 0.3rem;
    >ul>li {
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
    .pop {
      margin: 0.3rem 0;
      border: 0.05rem solid #de7341;
      .title {
        text-align: center;
        font-size: 0.42rem;
        font-weight: bold;
        margin: 0.2rem 0;
      }
      .content {
        margin: 0 0.5rem 0.5rem;
        img {
          border-style: none;
          display: inline-block;
          border: 0.05rem solid #de7341;
          margin: 0.08rem !important;
          height: 3rem;
          width: 4.36rem;
        }
      }
    }
  }
}
</style>