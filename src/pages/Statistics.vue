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
                style="left: -8px; position: relative;"
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
      <canvas id="myChart" width="1000" height="400"></canvas>
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
      chartInstance: null, // 存储 ECharts 实例
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

      script.onerror = () => {
        this.isLoadingVisit = false;
        console.warn("不蒜子服务加载失败");
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
      const chartDom = document.getElementById("myChart");
      if (!chartDom) return;

      // 初始化 ECharts 实例
      this.chartInstance = echarts.init(chartDom);

      // 统计标签数量
      const tagCount = {};
      mainData.forEach((item) => {
        item.tags.forEach((tag) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      });

      const chartData = Object.keys(tagCount).map((name) => ({
        value: tagCount[name],
        name: name,
      }));

      // 设置图表选项
      this.chartInstance.setOption({
        series: [
          {
            type: "pie",
            label: {
              show: true,
              formatter: "{b}: {c}",
              fontSize: 14,
              fontWeight: "bold",
              overflow: "break",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
              smooth: 0.3,
            },
            data: chartData,
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
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
    // 销毁 ECharts 实例
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
};
</script>

<style scoped>
.charts {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
</style>