<script setup>
import {
  reactive,
  // getCurrentInstance,
  ref
} from "vue";
import { useLoadingStore } from "@/stores/loading.js";
// import { isFunction, isArray } from "lodash";

// const { ctx } = getCurrentInstance();
defineOptions({
  name: "SearchFormDynamic"
});

const formSearchRef = ref();

const props = defineProps({
  /**
   * 绑定对象
   */
  form: {
    type: Object,
    default: () => {}
  },
  /**
   * 搜索列表
   */
  searchList: {
    type: Array,
    default: () => []
  },
  /**
   * 是否显示操作按钮
   */
  isActions: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示重置按钮
   */
  isResetBtn: {
    type: Boolean,
    default: true
  },
  /**
   * 搜索按钮 loading 结合列表 loading 使用
   */
  // searchLoading: {
  //   type: Boolean,
  //   default: false
  // },
  /**
   * 搜索表单规则
   */
  rulesForm: {
    type: Object,
    default: () => {}
  },
  /**
   * 搜索栏 label 宽度
   */
  formLabelWidth: [String, Number]
});

const emits = defineEmits(["on-search", "on-reset"]);

const rulesForm = props?.rulesForm ?? {};
const labelWidth = props?.formLabelWidth ?? "auto";
const propForm = props?.form ?? {};
const loadingStore = useLoadingStore();

const formInline = reactive(propForm);
const rules = reactive(rulesForm);
const width = ref(labelWidth);

const gutter = 20;
const span = 6;

/**
 * 查询
 */
const onSubmit = async formEl => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // console.log("submit!");
      emits("on-search", formInline);
    } else {
      console.log("error submit!", fields);
    }
  });
};

/**
 *
 * 重置
 * @param {ref} formEl
 */
const onReset = formEl => {
  formEl.resetFields();
  console.log(formInline);
  emits("on-reset", formInline);
};
</script>

<template>
  <!-- 
    body border-radius: 0.125rem;
    body-class="rounded-sm"  
  -->
  <el-card class="mb-3">
    <el-form
      :inline="true"
      :model="formInline"
      class="search-form-inline"
      ref="formSearchRef"
      v-if="searchList?.length > 0"
      :rules="rules"
    >
      <el-row :gutter="gutter">
        <template v-for="(item, index) in searchList" :key="index">
          <el-col :span="span">
            <el-form-item
              v-bind="item.formItemProps"
              :style="{ width: '100%', ...item.formItemStyle }"
              :prop="item.modelName"
            >
              <component
                :is="item.component"
                v-model="formInline[item.modelName]"
                v-bind="item.props"
                v-on="item.on ?? {}"
              >
                <template v-if="item.component === 'ElSelect'">
                  <component
                    is="ElOption"
                    v-bind="item.OptionsProps"
                    v-on="item.OptionsOn ?? {}"
                    v-for="({ label, value }, key) in item.children"
                    :key="key"
                    :label="label"
                    :value="value"
                  />
                </template>
              </component>
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="6" style="display: flex; width: 100%; margin-left: auto" v-if="isActions">
          <div style="margin-left: auto">
            <!-- :loading="searchLoading" -->
            <el-button
              type="primary"
              :loading="loadingStore.loading"
              @click="onSubmit(formSearchRef)"
            >
              {{ $t("common.search") }}
            </el-button>
            <el-button v-if="isResetBtn" type="primary" @click="onReset(formSearchRef)">
              {{ $t("common.reset") }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
/**
 * 搜索栏 label 宽度
 * 使用 label-width 会有警告
 * 所以采用 Vue3 的动态 CSS
 */
.search-form-inline :deep(.el-form-item__label) {
  width: v-bind(width);
}
</style>
