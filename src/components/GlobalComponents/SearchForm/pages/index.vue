<script setup>
import {
  reactive,
  // getCurrentInstance,
  ref,
} from "vue";
// import { isFunction, isArray } from "lodash";

// const { ctx } = getCurrentInstance();

const formSearchRef = ref();

const props = defineProps({
  /**
   * 搜索列表
   */
  searchLIst: {
    type: Array,
    default: () => [],
  },
  /**
   * 是否显示操作按钮
   */
  isActions: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示重置按钮
   */
  isResetBtn: {
    type: Boolean,
    default: true,
  },
  /**
   * 搜索按钮 loading 结合列表 loading 使用
   */
  searchLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * 搜索表单规则
   */
  rulesForm: {
    type: Object,
    default: () => {},
  },
  /**
   * 搜索栏 label 宽度
   * 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。
   * 设置 auto 的时候有一个警告
   * ElementPlusError: [ElForm] unexpected width 0
   * TODO 待解决
   */
  // formLabelWidth: {
  //   type: [String, Number],
  //   default: "auto",
  // },
});

const emits = defineEmits(["on-search", "on-reset"]);

const formInline = reactive({});
const rules = reactive(props.rulesForm);

const gutter = 20;
const span = 6;

/**
 * 查询
 */
const onSubmit = async (formEl) => {
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
 * 重置
 * @param {ref} formEl
 */
const onReset = (formEl) => {
  formEl.resetFields();
  console.log(formInline);
  emits("on-reset", formInline);
};
</script>

<template>
  <!-- 
    body border-radius: 0.125rem;
    body-class="rounded-sm"  
    label 宽度
    :label-width="formLabelWidth"
  -->
  <el-card class="mb-3">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      ref="formSearchRef"
      v-if="searchLIst?.length > 0"
      :rules="rules"
    >
      <el-row :gutter="gutter">
        <template v-for="(item, index) in searchLIst" :key="index">
          <el-col :span="span">
            <el-form-item
              :label="item.label"
              :style="{ width: '100%', ...item.formItemStyle }"
              :prop="item.value"
            >
              <!-- input -->
              <el-input
                v-if="item.type === 'input'"
                :style="{ width: '100%', ...item.inputStyle }"
                v-model.trim="formInline[item.value]"
                :clearable="item.clearable ?? true"
                :class="item.class"
                :placeholder="item.placeholder"
                :minlength="item.minlength ?? 0"
              />
              <!-- select -->
              <el-select
                v-else-if="item.type === 'select'"
                :style="{ width: '100%', ...item.selectStyle }"
                v-model="formInline[item.value]"
                :placeholder="item.placeholder"
                :clearable="item.clearable ?? true"
                :class="item.class"
                :filterable="item.filterable ?? false"
              >
                <el-option
                  v-for="({ value, label }, key) in item.children"
                  :key="key"
                  :value="value"
                  :label="label"
                />
              </el-select>
              <!-- datepicker -->
              <el-date-picker
                v-else-if="item.type === 'picker'"
                :style="{ width: '100%', ...item.pickerStyle }"
                v-model="formInline[item.value]"
                :type="item.pickerType ?? 'date'"
                :placeholder="item.placeholder ?? ''"
                :start-placeholder="
                  item.pickerType === 'daterange' ? $t('common.startDate') : ''
                "
                :end-placeholder="
                  item.pickerType === 'daterange' ? $t('common.endDate') : ''
                "
                :range-separator="
                  item.pickerType === 'daterange' ? $t('common.dateTo') : ''
                "
                :clearable="item.clearable ?? true"
                :class="item.class"
                :value-format="item.valueFormat ?? 'YYYY-MM-DD'"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col
          :span="6"
          style="width: 100%; display: flex; margin-left: auto"
          v-if="isActions"
        >
          <div style="margin-left: auto">
            <el-button
              type="primary"
              :loading="searchLoading"
              @click="onSubmit(formSearchRef)"
              >{{ $t("common.search") }}</el-button
            >
            <el-button
              v-if="isResetBtn"
              type="primary"
              @click="onReset(formSearchRef)"
              >{{ $t("common.reset") }}</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
