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

const emits = defineEmits(["on-pagination-change"]);

const tpaCurrentPage = props?.tablePaginationArg?.currentPage ?? 1;
const tpaPageSize = props?.tablePaginationArg?.pageSize ?? 10;

const myTableData = ref([]);
const currentPage = ref(tpaCurrentPage);
const pageSize = ref(tpaPageSize);
const downloadLoading = ref(false);

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

/**
 * 根据字符数分配相应的宽度
 * @param {object} TableColumn Item object
 */
const setColumnWidth = (o) => {
	const { label, sortable } = o;
	// 24 是设置 sortable 上下小三角的宽度
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

/**
 * 处理数据为空的情况的排序
 * prop 必须有值
 * @param {object} row
 * @param {number} index
 * @param {string} prop
 */
const sortBy = (row, index, prop) => {
	if (row[prop] === null) {
		return "";
	}

	return row[prop] ? row[prop] : -1;
};

/**
 * TODO 待完善
 */
const downloadClick = () => {
	const { url, data, method } = props?.downloadObject;
	downloadLoading.value = true;
	downloadFile(
		url,
		{
			data,
			method,
		},
		() => {
			downloadLoading.value = false;
		}
	);
};
</script>

<template>
	<!-- 
		最外层增加根标签 div
		Vue3 虽然支持不使用根标签，但是会影响 scoped 的穿透样式，所以增加根标签
	-->
	<div>
		<!-- :highlight-current-row="highlightCurrentRow" -->
		<el-table
			ref="ElTableRef"
			v-bind="$attrs"
			v-loading="tableLoading"
			style="width: 100%"
			:data="myTableData"
			:border="$attrs.border ?? true"
			:stripe="stripe">
			<template
				v-for="(c, k) in myTableColumn"
				:key="`col_${k}`">
				<el-table-column
					v-if="c.type === 'selection'"
					type="selection" />
				<el-table-column
					:class-name="c.className ?? ''"
					:sortable="c.sortable ?? true"
					:label="c.label"
					:show-overflow-tooltip="c.showOverflowTooltip ?? true"
					:prop="c.slot ? '' : c.prop"
					:min-width="c.width || setColumnWidth(c)"
					:formatter="c.formatter || null"
					:fixed="c.fixed"
					:sort-method="c.sortMethod ? c.sortMethod : null"
					:sort-by="
						c.sortMethod
							? undefined
							: c.sortBy
							? c.sortBy
							: (row, index) => sortBy(row, index, c.prop)
					">
					<template
						v-if="c.slot"
						#default="scoped">
						<slot
							:name="c.slot"
							:tableSlotColum="c"
							:tableRow="scoped.row" />
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
			v-show="isPaginationBox || tablePaginationArg?.total > 0">
			<div>
				<!-- 分页器左侧插槽 -->
				<slot name="paginationLeft" />

				<!-- 下载按钮 -->
				<el-button
					v-if="isDownload && downloadObject?.url"
					:icon="Download"
					circle
					@click="downloadClick" />
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
				v-model:size="pageSize" />
		</div>
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
