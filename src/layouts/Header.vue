<template>
  <div class="header">
    <div>首页</div>
    <div>推荐</div>
    <div>分类</div>
    <div>统计</div>
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
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
