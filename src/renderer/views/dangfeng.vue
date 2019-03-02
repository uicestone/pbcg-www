<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      dangfengList: [],
      selectedDetail: null,
      highLighted: null
    };
  },
  computed: {
  },
  async mounted() {
    handleLoading();
    this.dangfengList = await request.getPosts({
      query: {
        category: "党风廉政",
        limit: -1,
        order: 'asc'
      }
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
		<div class="main page-dangfeng">
			<div class="header">
				<a  @click.prevent="back" class="fl back"><i class="fa fa-chevron-left"></i> 返回</a>
				<span><img src="~@/assets/images/index/lianzheng.png"/>党风廉政</span>
			</div>
      <div class="list">
        <ul v-if="!selectedDetail">
          <li v-for="(item, key) in dangfengList" @click="selectedDetail = item; highLighted = item.id" :key="key" :class="{active:item.id==highLighted}">
            {{item.title}}
          </li>
        </ul>
        <div class="pop" v-if="selectedDetail">
          <!-- <div class="title">{{selectedDetail.title}}</div> -->
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
.page-dangfeng {
  .header {
    height: 1.6rem;
    background: #e70417;
    line-height: 1.6rem;
    color: #fff;
    font-size: 0.57rem;
    text-align: center;
    padding: 0 0.5rem;
    position: fixed;
    top: 0;
    width: 100%;
    a {
      font-size: 0.4rem;
      color: #fff;
      position: absolute;
      left: 0.5rem; top: 0;
      i {
        font-size: 0.5rem;
        top: 0.05rem;
        position: relative;
      }
    }
    img {
      display: inline-block;
      width: 0.7rem;
      position: relative;
      vertical-align: middle;
      margin-right: 0.2rem;
    }
  }

  .list {
    padding: 1.6rem 0.3rem 0;
    >ul>li {
      margin: 0.3rem 0;
      padding: 0.35rem 0.5rem;
      font-size: 0.43rem;
      font-weight: bold;
      text-align: center;
      background: #d4d5d0;
      &.active {
        color: white;
        background: #e70417;
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
        font-size: 0.4rem;
        line-height: 1.5;
        img {
          border: 0.03rem solid #ea544e;
          width: 100%;
        }
        h1,h2,h3,h4,h5,h6 {
          font-size: 0.5rem;
          margin-bottom: 0.2rem;
        }
        ul {
          margin-left: 1em;
        }
      }
    }
  }
}
</style>
