<template>
  <Header>
    <div class="site-info">
      <div class="avatar" :style="'background-image: url(' + $static.metadata.avatar + ')'"></div>
      <div class="title">{{ $static.metadata.title }}</div>
      <div class="sub-title">{{ $static.metadata.subTitle }}</div>
    </div>
  </Header>
</template>

<static-query>
query {
  metadata {
    title,
    subTitle,
    avatar
  }
}
</static-query>

<script>
export default {
  metaInfo: {
    title: "首页",
  }
};
</script>

<style scoped>
.site-info {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 70px 0;
}

.avatar {
  --size: 10rem;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-repeat: no-repeat;
  background-size: 80%;
  background-position: center center;
}

.title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 20px;
}

.sub-title {
  font-size: 14px;
  text-align: center;
  margin: 0 20px;
}
</style>
