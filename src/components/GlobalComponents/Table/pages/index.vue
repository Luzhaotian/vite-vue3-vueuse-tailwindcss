<script setup>
defineOptions({
  name: "TableComponent"
});

import { ref, watch, computed } from "vue";
import Pagination from "@/components/GlobalComponents/Pagination";
import { Download } from "@element-plus/icons-vue";
import { downloadFile } from "@/libs/downloadFile";
import { useLoadingStore } from "@/stores/loading.js";
import { tryOnMounted } from "@vueuse/core";

/**
 * 组件属性定义
 * @typedef {Object} Props
 * @property {Object} [downloadObject] - 下载配置对象
 * @property {boolean} [isDownload=true] - 是否显示下载按钮
 * @property {Array} tableColumn - 表格列配置
 * @property {Array} tableData - 表格数据
 * @property {Object} [tablePaginationArg] - 分页参数配置
 * @property {boolean} [stripe=false] - 是否显示斑马纹
 * @property {boolean} [isPaginationBox=false] - 是否显示分页容器
 */
const props = defineProps({
  downloadObject: {
    default: () => ({})
  },
  isDownload: {
    default: true
  },
  tableColumn: {
    required: true,
    default: () => []
  },
  tableData: {
    required: true,
    default: () => []
  },
  tablePaginationArg: {
    default: () => ({
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50, 100],
      layout: "total, sizes, prev, pager, next, jumper",
      total: 0
    })
  },
  stripe: {
    default: false
  },
  isPaginationBox: {
    default: false
  }
});

/**
 * 定义组件事件
 * @typedef {(event: 'on-pagination-change', payload: {label: string, value: any}) => void} Emits
 */
const emits = defineEmits(["on-pagination-change"]);
const loadingStore = useLoadingStore();

// 优化响应式声明方式
const myTableData = ref([]);
const currentPage = ref(props.tablePaginationArg?.currentPage ?? 1);
const pageSize = ref(props.tablePaginationArg?.pageSize ?? 10);
const downloadLoading = ref(false);

// 使用computed代替watch来处理tableData
const tableDataComputed = computed(() => props.tableData);
watch(
  tableDataComputed,
  val => {
    myTableData.value = val;
  },
  { immediate: true }
);

// 优化分页参数监听
watch(
  () => [props.tablePaginationArg?.currentPage, props.tablePaginationArg?.pageSize],
  ([newCurrentPage, newPageSize]) => {
    if (newCurrentPage !== undefined) currentPage.value = newCurrentPage;
    if (newPageSize !== undefined) pageSize.value = newPageSize;
  },
  { immediate: true }
);

const myTableColumn = computed(() => props.tableColumn);

// 优化列宽计算函数
const calculateColumnWidth = char => {
  if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) return 8;
  if (char >= "\u4e00" && char <= "\u9fa5") return 14;
  if (char === " ") return 14;
  return 14;
};

const setColumnWidth = column => {
  const { label, sortable } = column;
  const sortableWidth = sortable === undefined ? 24 : 0;
  const baseWidth = 20 + sortableWidth;

  const calculatedWidth = label
    .split("")
    .reduce((width, char) => width + calculateColumnWidth(char), baseWidth);

  return `${Math.max(calculatedWidth, 100)}px`;
};

const sortBy = (row, index, prop) => {
  if (!prop || row[prop] === null) return "";
  return row[prop] ?? -1;
};

const downloadClick = async () => {
  const { url, data, method } = props.downloadObject ?? {};
  if (!url) return;

  downloadLoading.value = true;
  try {
    await downloadFile(url, { data, method });
  } finally {
    downloadLoading.value = false;
  }
};

const handleSizeChange = size => {
  pageSize.value = size;
  emits("on-pagination-change", { label: "pageSize", value: size });
};

const handleCurrentChange = page => {
  currentPage.value = page;
  emits("on-pagination-change", { label: "pageNo", value: page });
};

tryOnMounted(() => {});
</script>

<template>
  <div>
    <el-table
      v-bind="$attrs"
      v-loading="loadingStore.loading"
      :data="myTableData"
      :border="$attrs.border ?? true"
      :stripe="stripe"
      style="width: 100%"
    >
      <template v-for="(value, key) in $slots" :key="key" #[key]="scope">
        <slot :name="key" v-bind="scope" />
      </template>

      <template v-for="(column, index) in myTableColumn" :key="`col_${index}`">
        <el-table-column v-if="column.type === 'selection'" type="selection" />
        <el-table-column
          v-else
          :class-name="column.className"
          :sortable="column.sortable ?? true"
          :label="column.label"
          :show-overflow-tooltip="column.showOverflowTooltip ?? true"
          :prop="column.slot ? '' : column.prop"
          :min-width="column.width || setColumnWidth(column)"
          :formatter="column.formatter"
          :fixed="column.fixed"
          :sort-method="column.sortMethod"
          :sort-by="
            column.sortMethod
              ? undefined
              : column.sortBy || ((row, index) => sortBy(row, index, column.prop))
          "
        >
          <template v-if="column.slot" #default="scoped">
            <slot :name="column.slot" :tableSlotColum="column" :tableRow="scoped.row" />
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div
      class="pagination-box flex-ec py-3"
      v-show="isPaginationBox || tablePaginationArg?.total > 0"
    >
      <div>
        <slot name="paginationLeft" />
        <el-button
          v-if="isDownload && downloadObject?.url"
          :icon="Download"
          circle
          :loading="downloadLoading"
          @click="downloadClick"
        />
      </div>

      <Pagination
        :class="{ 'ml-3': isDownload && downloadObject?.url }"
        :page-sizes="tablePaginationArg?.pageSizes"
        :layout="tablePaginationArg?.layout"
        :total="tablePaginationArg?.total"
        v-model:page="currentPage"
        v-model:size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
