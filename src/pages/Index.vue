<template>
  <Header>
    <div class="site-info">
      <div class="avatar"></div>
      <div class="title">{{ $static.metadata.title }}</div>
      <div class="sub-title">{{ $static.metadata.subTitle }}</div>
    </div>
  </Header>
</template>

<static-query>
query {
  metadata {
    title,
    subTitle
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: "首页",
  },
};
</script>

<style scoped>
.site-info {
  width: 100%;
  height: 25rem;
}
.avatar {
  --size: 10rem;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: #000000;
}
</style>
