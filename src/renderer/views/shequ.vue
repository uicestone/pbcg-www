<script>
import { handleLoading } from "../utils/utils";
import * as request from "../utils/request";

export default {
  data() {
    return {
      currentSelect: -1,
      dataList: []
    };
  },
  computed: {
    currentSelectData() {
      return this.dataList[this.currentSelect] || {};
    }
  },
  async mounted() {
    handleLoading();
    this.dataList = await request.getPosts({
      query: {
        category: "社区党校",
        limit: 12,
        order: 'asc'
      }
    });
  }
};
</script>

<template>
  	<body>
		<div class="main page7">
			<div class="header">
				<img src="~@/assets/images/shequ.png"/>
				<a @click ="$router.go(-1)" class="back"><i class="fa fa-chevron-left"></i> 返回</a>
			</div>
			<div class="list">
				<div class="list-text">
					<ul>
						<li :class="{first: index == currentSelect}" v-for="(item,index) in dataList"   :key="index" @click="currentSelect = index">{{item.title}}</li>
					</ul>
				</div>
			</div>
			<div class="pop" v-if="currentSelect > -1">
				<span class="back" @click="currentSelect = -1"><i class="fa fa-chevron-left" aria-hidden="true"></i><font>返回</font></span>
				<div class="content">
					<div class="textDiv" v-html="currentSelectData.content"></div>
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


<style>
</style>
