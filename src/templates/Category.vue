<template>
  <Header>
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
    </div>
  </Header>
</template>

<script>
import { tags } from "@/data.js";

export default {
  data() {
    return {
      title: tags[this.$route.params.tag],
    };
  },
};
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #fff;
}
</style>
