<template>
  <div style="position: relative; min-height: 100vh;">
    <div class="header" :class="{ 'has-background': showHeaderBackground }">
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
          style="display: flex; align-items: center; gap: 3px; color: #000; font-size: 14px; cursor: pointer; font-weight: 400;"
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
    <div class="g-menu">
      <img src="@/assets/icon/menu.png" width="24px" alt="">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { tags } from "@/data.js";

export default {
  data() {
    return {
      tagsData: [],
      showHeaderBackground: false
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 网站初始化
    init(){
      console.log(document.documentElement.clientWidth)
    },
    onGoCategory(tag){
      location.href = `/category/${tag}`
    },
    handleScroll() {
      this.showHeaderBackground = window.scrollY > 0;
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
  position: sticky;
  top: 0;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.header.has-background {
  background-color: #fff;
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

.header > .item::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 0;
  height: 2px;
  background-color: #238df7;
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
  display: none;
}

.g-menu {
  --size: 36px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #d4dbef;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 8px;
  right: 10px;
  z-index: 9999;
}
</style>