<template>
  <Header>
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
    </div>
    <CardListComp :cardListData="filterData" />
  </Header>
</template>

<script>
import { tags, mainData } from "@/data.js";
import CardListComp from "@/components/CardList.vue";

export default {
  components: {
    CardListComp,
  },
  data() {
    return {
      title: tags[this.$route.params.tag],
    };
  },
  computed: {
    filterData() {
      if (this.$route.params.tag == "all") {
        return mainData;
      }
    },
  },
};
</script>
