<template>
  <div class="header">
    <div class="item">首页</div>
    <div class="item">推荐</div>
    <div class="item">分类</div>
    <div class="item">统计</div>
  </div>
</template>

<static-query>
query {
  metadata {
    title
  }
}
</static-query>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 55px;
  font-weight: 500;
  font-size: 16px;
  cursor: default;
  background-color: #fff;
  position: relative;
}

.header > .item {
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
  position: relative;
  padding: 15px 0;
  cursor: pointer;
}

/* 下划线动画 - 核心部分 */
.header > .item::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 0;
  height: 2px;
  background-color: #238DF7;
  /* 从中心展开 */
  transform: translateX(-50%);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.header > .item:hover {
  color: #238DF7;
}

.header > .item:hover::after {
  width: 80%;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>