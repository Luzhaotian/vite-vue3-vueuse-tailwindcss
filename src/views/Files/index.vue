<template>
  <!-- Test wh-full -->
  <div class="wh-full">
    <SearchFormDynamic :form="form" :searchList="searchList" @on-search="onSearch" />
  </div>
</template>

<script setup>
import SearchFormDynamic from "@comp/GlobalComponents/SearchFormDynamic";
import { computed, ref, watch, reactive } from "vue";
import { tryOnBeforeMount } from "@vueuse/core";
// import { useSetOptions } from "@/hooks/useSetOptions.js";
import { useOptionsStore } from "@/stores/options.js";

defineOptions({
  name: "Files"
});
const optionsStore = useOptionsStore();

const form = reactive({
  name: "",
  age: "",
  height: "",
  sex: "",
  birthday: []
});
const searchList = reactive([
  {
    component: "ElInput",
    formItemProps: {
      label: "姓名"
    },
    props: {
      placeholder: "请输入姓名",
      modelName: "name"
    },
    on: {
      input: value => {
        console.log(value);
        if (value.length > 4) {
          form.name = "";
          console.log("长度大于4");
        }
      }
    }
  },
  {
    component: "ElSelect",
    formItemProps: {
      label: "年龄"
    },
    children: computed(() => optionsStore.sex),
    props: {
      placeholder: "请选择年龄",
      modelName: "age"
    },
    on: {
      change: value => {
        console.log("select ==> ", value);
      }
    }
  }
]);

const onSearch = v => {
  console.log(v);
};

tryOnBeforeMount(() => {
  optionsStore.setOptions(`sex`);
});
</script>

<style lang="scss" scoped></style>
