<template>
  <!-- Test wh-full -->
  <div class="wh-full">
    <SearchForm :form="form" :searchList="searchList" @on-search="onSearch" />
    <Table :table-column="tableColumn" :table-data="tableData" />
  </div>
</template>

<script setup>
import Table from "@/components/GlobalComponents/Table";
import SearchForm from "@/components/GlobalComponents/SearchForm";
import { computed, ref, watch, reactive } from "vue";
import { tryOnBeforeMount } from "@vueuse/core";
// import { useSetOptions } from "@/hooks/useSetOptions.js";
import { useOptionsStore } from "@/stores/options.js";

defineOptions({
  name: "User"
});

const optionsStore = useOptionsStore();
const form = reactive({
  name: "",
  age: "",
  height: "",
  sex: "",
  birthday: []
});
const tableColumn = [
  {
    label: "名字",
    prop: "name"
  },
  {
    label: "年龄",
    prop: "age"
  },
  {
    label: "身高",
    prop: "height"
  },
  {
    label: "性别",
    prop: "sex"
  },
  {
    label: "生日",
    prop: "birthday"
  }
];

const tableData = ref([
  {
    name: "Jane Doe",
    age: 25,
    height: 165,
    sex: "女",
    birthday: "02-15"
  },
  {
    name: "Jim Green",
    age: 30,
    height: 180,
    sex: "男",
    birthday: "03-10"
  },
  {
    name: "Joe Black",
    age: 22,
    height: 170,
    sex: "不详",
    birthday: "04-20"
  },
  {
    name: "Alice Blue",
    age: 28,
    height: 168,
    sex: "女",
    birthday: "05-25"
  },
  {
    name: "Bob Red",
    age: 35,
    height: 182,
    sex: "不详",
    birthday: "06-10"
  },
  {
    name: "Charlie Yellow",
    age: 29,
    height: 175,
    sex: "男",
    birthday: "07-20"
  },
  {
    name: "David Green",
    age: 24,
    height: 178,
    sex: "不详",
    birthday: "08-15"
  },
  {
    name: "Eva Brown",
    age: 31,
    height: 168,
    sex: "女",
    birthday: "09-10"
  },
  {
    name: "Frank Black",
    age: 27,
    height: 180,
    sex: "男",
    birthday: "10-20"
  }
]);

const searchList = [
  {
    label: "姓名",
    value: "name",
    type: "input",
    placeholder: "请输入姓名",
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
    label: "年龄",
    value: "age",
    type: "input",
    placeholder: "请输入年龄"
  },
  {
    label: "身高",
    value: "height",
    type: "input",
    placeholder: "请输入身高"
  },
  {
    label: "性别",
    value: "sex",
    type: "select",
    placeholder: "请输入性别",
    children: optionsStore.getOptions(`sex`)
  },
  {
    label: "生日",
    value: "birthday",
    type: "picker",
    placeholder: "请选择生日",
    pickerType: "daterange"
  }
];

const onSearch = v => {
  console.log(v);
};

tryOnBeforeMount(() => {});
</script>

<style lang="scss" scoped></style>
