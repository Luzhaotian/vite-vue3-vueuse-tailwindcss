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
    // TODO 目前一直存在问题，待修复，目前解决办法是通过 useSetOptions 循环查找赋值进去
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

// console.log(optionsStore.getOptions(`sex`), "optionsStore.getOptions(`sex`)");

// const mySearchList = computed(
//   () => searchList,
//   v => {
//     console.log(v, "v");
//     return v;
//   }
// );

watch(
  () => searchList,
  v => {
    console.log(v, "v");
    return v;
  },
  {
    deep: true,
    immediate: true
  }
);

const onSearch = v => {
  console.log(v);
};

// const getOptionsData = () => {
//   // 延时器模拟接口
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         code: 200,
//         data: [
//           {
//             label: "男",
//             value: "1"
//           },
//           {
//             label: "女",
//             value: "2"
//           }
//         ]
//       });
//     }, 500);
//   }).then(() => {
//     /**
//      * 目前的解决方案 但是这不是我想要的 但是当时使用的时候项目紧急 临时处理
//      * type 是的 searchList 里的 value
//      * list 是 searchList
//      * data 是接口返回的数据 需要接口数据的值转一下 {label: string, value: string}[]
//      */
//     useSetOptions({
//     	type: "sex", // 绑定的 type
//     	list: searchList, // 绑定的 list
//     	data: data.data, // 接口返回的数据
//     });
//   });
// };

// const getOptionsData = () => {
//   // optionsStore
// };

tryOnBeforeMount(() => {
  // getOptionsData();
});
</script>

<style lang="scss" scoped></style>
