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
          <el-statistic title="本站运行时间">
            <template #formatter>
              <span>{{ runtimeText }}</span>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </Header>
</template>

<static-query>
query {
  metadata {
    onlineTime
  }
}
</static-query>

<script>
import { tags, mainData } from "@/data.js";

export default {
  data() {
    return {
      tagLength: Object.keys(tags).length,
      allLength: mainData.length,
      isLoadingVisit: true,
      runtimeText: '0秒',
      timer: null
    };
  },
  mounted() {
    this.isLoadingVisit = true
    const script = document.createElement('script');
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;

    script.onload = () => {
      this.isLoadingVisit = false;
    };

    document.head.appendChild(script);

    const startTime = new Date(this.$static.metadata.onlineTime).getTime();

    const updateRuntime = () => {
      const now = new Date().getTime();
      const diff = now - startTime;

      if (diff < 0) {
        this.runtimeText = "尚未开始";
        return;
      }

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 60000) % 60;
      const hours = Math.floor(diff / 3600000) % 24;
      const days = Math.floor(diff / 86400000);

      this.runtimeText = `${days}天${hours}小时${minutes}分钟${seconds}秒`;
    };

    updateRuntime();
    this.timer = setInterval(updateRuntime, 1000);
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>