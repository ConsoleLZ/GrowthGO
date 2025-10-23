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
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}
</style>
