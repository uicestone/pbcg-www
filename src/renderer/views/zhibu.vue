<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {

    return {
      zhibuList: [],
      selectedDetail: null
    };
  },
  computed: {
  },
  async mounted() {
    handleLoading();
    this.zhibuList = await request.getPosts({
      query: {
        category: "党支部工作室",
        limit: -1,
        order: 'asc'
      }
    });
    this.zhibuList.forEach(zhibu => {
      zhibu.content = zhibu.content.replace(/<li>地址/g,'<li><i class="fa fa-map-marker"></i>地址');
      zhibu.content = zhibu.content.replace(/<li>联系方式/g,'<li><i class="fa fa-phone"></i>联系方式');
      zhibu.content = zhibu.content.replace(/<li>支部书记/g,'<li><i class="fa fa-user"></i>支部书记');
    });
  },
  methods: {
    back() {
      if (this.selectedDetail) {
        return (this.selectedDetail = null);
      }
      this.$router.go(-1);
    }
  }
};
</script>

<template>
  	<body>
		<div class="main page6">
			<div class="header">
				<a  @click.prevent="back" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/icon4.png"/>党支部工作室</span>
			</div>
      <div class="list">
        <ul v-if="!selectedDetail">
          <li v-for="(item, key) in zhibuList" @click="selectedDetail = item" :key="key">
            <span class="thumbnail"><img :src="item.posterUrl"></span>
            <span class="title">
              {{item.title}}
              <p class="date">{{ item.date }}</p>
            </span>
          </li>
        </ul>
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
.page6 {
  .list {
    padding: 1.6rem 0.3rem 0;
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
      .title {
        font-size: 0.45rem;
        color: white;
        background: #ea544e;
        text-align: center;
        padding: 0.15rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .content {
        margin: 0 0.5rem 0.5rem;
        font-size: 0.2rem;
        img {
          border: 0.03rem solid #ea544e;
          width: 100%;
        }
        h2 {
          margin-top: 0.2rem;
          font-size: 0.45rem;
        }
        h3 {
          margin-top: 0.2rem;
          font-size: 0.4rem;
        }
        ul {
          font-size: 0.3rem;
          margin-left: 0.5em;
          li {
            i {
              margin-right: 0.5em;
            }
          }
        }
      }
    }
  }
}
</style>
