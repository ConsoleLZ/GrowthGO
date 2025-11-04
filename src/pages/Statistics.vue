<template>
  <Header>
    <div class="section-header">
      <h2 class="section-title">统计</h2>
      <p class="section-subtitle">勉强看一看站点数据信息吧</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic :value="allLength" title="收录总数"></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic :value="tagLength - 1" title="分类总数"></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="本站访问量">
            <template #formatter>
              <span v-loading="isLoadingVisit" element-loading-spinner="el-icon-loading" style="left: -8px;" id="busuanzi_value_site_pv"></span>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic :value="like ? 521 : 520" title="Feedback">
            <template slot="suffix">
              <span @click="like = !like" class="like">
                <i
                  class="el-icon-star-on"
                  style="color:red"
                  v-show="!!like"
                ></i>
                <i class="el-icon-star-off" v-show="!like"></i>
              </span>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </Header>
</template>

<script>
import { tags, mainData } from "@/data.js";

export default {
  data() {
    return {
      tagLength: Object.keys(tags).length,
      allLength: mainData.length,
      isLoadingVisit: true
    };
  },
  mounted(){
    // 创建 script 元素
    const script = document.createElement('script')
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
    script.async = true

    // 监听脚本加载完成事件
    script.onload = () => {
      this.isLoadingVisit = false
    }

    document.head.appendChild(script)
  }
};
</script>
<style>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>
