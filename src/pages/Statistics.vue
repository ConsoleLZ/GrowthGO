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
              <span
                v-loading="isLoadingVisit"
                element-loading-spinner="el-icon-loading"
                style="left: -8px;"
                id="busuanzi_value_site_pv"
              ></span>
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

    <div class="charts">
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
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
import * as echarts from "echarts";

export default {
  data() {
    return {
      tagLength: Object.keys(tags).length,
      allLength: mainData.length,
      isLoadingVisit: true,
      runtimeText: "0秒",
      timer: null,
    };
  },
  methods: {
    // 不蒜子脚本加载
    loadBusuanzi() {
      this.isLoadingVisit = true;
      const script = document.createElement("script");
      script.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
      script.async = true;

      script.onload = () => {
        this.isLoadingVisit = false;
      };

      document.head.appendChild(script);
    },
    // 本站运行时间的计算
    calculateOnlineTime() {
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
    // 生成统计饼图
    createCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        series: [
          {
            type: "pie",
            data: [
              {
                value: 335,
                name: "直接访问",
              },
              {
                value: 234,
                name: "联盟广告",
              },
              {
                value: 1548,
                name: "搜索引擎",
              },
              {
                value: 2,
                name: "213",
              },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.loadBusuanzi();
    this.calculateOnlineTime();
    this.createCharts();
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.charts {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
