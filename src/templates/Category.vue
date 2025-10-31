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
