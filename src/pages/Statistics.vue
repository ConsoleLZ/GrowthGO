<template>
  <Header>
    <div class="section-header">
      <h2 class="section-title">统计</h2>
      <p class="section-subtitle">勉强看一看站点数据信息吧</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic
            :value="tagLength-1"
            title="分类总数"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="男女比">
            <template slot="formatter">
              456/2
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
            group-separator=","
            :precision="2"
            decimal-separator="."
            :value="value1"
            :title="title"
          >
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
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
import { tags } from "@/data.js";

export default {
  data() {
    return {
      tagLength: Object.keys(tags).length
    };
  },
};
</script>
<style>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>
