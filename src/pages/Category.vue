<template>
  <Header>
    <CardListComp :cardListData="cardData">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="tagsSelect" @change="handleCheckedTagChange">
        <el-checkbox
          v-for="tag in Object.keys(tagsOptions)"
          :label="tag"
          :key="tag"
          >{{ tagsOptions[tag] }}</el-checkbox
        >
      </el-checkbox-group>
    </CardListComp>
  </Header>
</template>

<script>
import { tags } from "@/data.mjs";
import { mainData } from "@/data.mjs";
import CardListComp from "@/components/CardList.vue";

export default {
  components: {
    CardListComp,
  },
  data() {
    return {
      checkAll: true,
      tagsSelect: Object.keys(tags),
      tagsOptions: tags,
      isIndeterminate: false,
      cardData: mainData,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.tagsSelect = val ? Object.keys(tags) : [];
      this.isIndeterminate = false;
    },
    handleCheckedTagChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === Object.keys(this.tagsOptions).length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < Object.keys(this.tagsOptions).length;
    },
  },
};
</script>
