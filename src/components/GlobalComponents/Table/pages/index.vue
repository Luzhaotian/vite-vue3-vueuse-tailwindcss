<script setup>
import {
  ref,
  watch,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  onUpdated,
} from "vue";
import Pagination from "@/components/GlobalComponents/Pagination";
import { Download } from "@element-plus/icons-vue";
import { downloadFile } from "@/libs/downloadFile";

const currentPage = ref(1);
const pageSize = ref(10);

const props = defineProps({
  /**
   * 下载对象
   */
  downloadObject: {
    type: Object,
    default: () => {},
  },
  /**
   * 是否需要下载按钮
   */
  isDownload: {
    type: Boolean,
    default: true,
  },
  /**
   * 设置 el-tooltip__popper 如果设置为 true 默认为 800px
   * 也可以设置指定宽度字符串px 或者数字
   */
  // setTooltipPopperWidth: {
  //   type: [Boolean, String, Number],
  //   default: true,
  // },
  /**
   * 表头
   */
  tableColumn: {
    type: Array,
    default: () => [],
    require: true,
  },
  /**
   * 表格数据
   */
  tableData: {
    type: Array,
    default: () => [],
    require: true,
  },
  // 表体高度
  // tableHeight: {
  //   type: Number,
  //   default: 500,
  // },
  // notTableIndeterminacyHeightJoin: {
  //   type: Number,
  //   default: 500,
  // },
  /**
   * 表格loading
   */
  tableLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * 分页器参数
   */
  tablePaginationArg: {
    type: Object,
    default: () => {},
  },
  // 是否需要点击单选
  // 启用 tableCurrentChange 事件才会触发
  // highlightCurrentRow: {
  //   type: Boolean,
  //   default: false,
  // },
  /**
   * 是否需要斑马线
   */
  stripe: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否展示分页器， 默认是按照 total > 0 来判断
   */
  isPaginationBox: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits([
  // "table-handle-size-change",
  // "table-handle-current-change",
  // 'table-current-change'
  "on-pagination-change",
]);

const myTableData = ref([]);
// const myTableHeight = ref(500);

/**
 * 监听数据
 */
watch(
  () => props.tableData,
  (val) => {
    myTableData.value = val;
  },
  { immediate: true, deep: true }
);

/**
 * 监听表头
 */
const myTableColumn = computed(() => {
  return props.tableColumn;
});

/**
 * 单页数据改变
 * @param {number} v
 */
const handleSizeChange = (v) => {
  pageSize.value = v;
  emits("on-pagination-change", {
    label: "pageSize",
    value: v,
  });
};

/**
 * 页数数据改变
 * @param {number} v
 */
const handleCurrentChange = (v) => {
  currentPage.value = v;
  emits("on-pagination-change", {
    label: "pageNo",
    value: v,
  });
};
// 单选数据触发函数
// const tableCurrentChange = (v) => {
//   emits('table-current-change', v)
// }

/**
 * 默认为 True
 * @param {boolean} v
 */
const columnDefault = (v) => {
  return !(v === false);
};

/**
 * 根据字符数分配相应的宽度
 * @param {object} TableColumn Item object
 */
const setColumnWidth = (o) => {
  const { label, sortable } = o;
  const sortableWidth = sortable === undefined ? 24 : 0;
  let columnWidth = 20 + sortableWidth;
  for (let char of label) {
    if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
      columnWidth += 8;
    } else if (char >= "\u4e00" && char <= "\u9fa5") {
      columnWidth += 14;
    } else if (char === " ") {
      columnWidth += 14;
    } else {
      columnWidth += 14;
    }
  }
  if (columnWidth < 100) {
    columnWidth = 100;
  }
  return columnWidth + "px";
};

const downloadClick = () => {
  // console.log('downloadClick');
  downloadFile();
};
</script>

<template>
  <!-- :highlight-current-row="highlightCurrentRow" -->
  <el-table
    ref="ElTableRef"
    v-bind="$attrs"
    v-loading="tableLoading"
    style="width: 100%"
    :data="myTableData"
    :border="columnDefault($attrs.border)"
    :stripe="stripe"
  >
    <template v-for="(c, k) in myTableColumn" :key="`col_${k}`">
      <el-table-column v-if="c.type === 'selection'" type="selection" />
      <el-table-column
        :sortable="columnDefault(c.sortable)"
        :label="c.label"
        :show-overflow-tooltip="columnDefault(c.showOverflowTooltip)"
        :prop="c.slot ? '' : c.prop"
        :min-width="c.width || setColumnWidth(c)"
        :sort-by="c.sortBy"
        :formatter="c.formatter || null"
      >
        <template v-if="c.slot" #default="scoped">
          <slot :name="c.slot" :tableSlotColum="c" :tableRow="scoped.row" />
        </template>
      </el-table-column>
    </template>

    <!-- 无内容插槽 -->
    <template #empty>
      <slot name="myTableEmpty" />
    </template>
  </el-table>
  <div
    ref="paginationBox"
    class="pagination-box"
    v-show="isPaginationBox || tablePaginationArg?.total > 0"
  >
    <div>
      <!-- 分页器左侧插槽 -->
      <slot name="paginationLeft" />

      <!-- 下载按钮 -->
      <el-button
        v-if="isDownload && downloadObject?.url"
        :icon="Download"
        circle
        @click="downloadClick"
      />
    </div>
    <!-- 分页器 -->
    <Pagination
      :class="{ 'ml-3': isDownload && downloadObject?.url }"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="tablePaginationArg?.pageSizes ?? [10, 20, 30, 50, 100]"
      :layout="
        tablePaginationArg?.layout ?? 'total, sizes, prev, pager, next, jumper'
      "
      :total="tablePaginationArg?.total ?? 0"
      v-model:page="currentPage"
      v-model:size="pageSize"
    />
  </div>
</template>

<style scoped>
.pagination-box {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  /* padding-top: 10px; */
  padding: 10px 10px 10px 0;
}
</style>
