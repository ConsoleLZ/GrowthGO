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

    <div
      style="width: 100vw;display: flex;justify-content: center;align-items: center;margin-top: 30px;"
    >
      <div class="charts">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
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
import Chart from "chart.js";

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
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
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
  width: 500px;
  height: 420px;
}
</style>
