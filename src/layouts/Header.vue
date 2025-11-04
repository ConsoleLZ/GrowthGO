<template>
  <div style="position: relative;min-height: 100vh;">
    <div class="header">
      <g-link to="/" class="item">
        <img src="@/assets/icon/home-black.svg" width="18px" alt="" />
        <div>首页</div>
      </g-link>
      <g-link to="/recommend/" class="item">
        <img src="@/assets/icon/thumbs-up-black.svg" width="18px" alt="" />
        <div>推荐</div>
      </g-link>
      <el-dropdown placement="bottom">
        <div
          style="display: flex;align-items: center;gap: 3px;color: #000;font-size: 14px;cursor: pointer;font-weight: 400;"
        >
          <img src="@/assets/icon/application-two-black.svg" width="18px" alt="" />
          <div>分类</div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <div class="dropdown">
            <el-dropdown-item style="text-align: center;" v-for="item in tagsData" :key="item.key"
              ><div @click="onGoCategory(item.key)">{{ item.value }}</div></el-dropdown-item
            >
          </div>
        </el-dropdown-menu>
      </el-dropdown>
      <g-link to="/statistics" class="item">
        <img src="@/assets/icon/chart-pie-one-black.svg" width="18px" alt="" />
        <div>统计</div>
      </g-link>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { tags } from "@/data.js";

export default {
  data() {
    return {
      tagsData: []
    }
  },
  created() {
    Object.keys(tags).forEach((key) => {
      this.tagsData.push({
        key,
        value: tags[key],
      });
    });
  },
  methods: {
    onGoCategory(tag){
      location.href = `/category/${tag}`
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 55px;
  font-weight: 500;
  font-size: 16px;
  cursor: default;
  position: relative;
}

.header > .item {
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  padding: 15px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
}

/* 下划线动画 - 核心部分 */
.header > .item::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 0;
  height: 2px;
  background-color: #238df7;
  /* 从中心展开 */
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.header > .item:hover::after {
  width: 80%;
}

.dropdown {
  width: 160px;
  max-height: 360px;
  overflow: auto;
}

.dropdown::-webkit-scrollbar {
  width: 4px; /* 垂直滚动条宽度 */
}

.dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.dropdown::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.dropdown::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #F0F0F0;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
}

a {
  /* 移除下划线 */
  text-decoration: none;
  color: inherit;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  font-size: 12px;
  color: #303133;
}
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #000;
}

.section-subtitle {
  font-size: 16px;
  color: #303133;
}
</style>
