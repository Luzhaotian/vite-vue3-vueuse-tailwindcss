/**
 * 设置 Option 的数据
 * 采用 Some 方法是为了不需要遍历所有数据，只需要找到匹配的即可完成
 * @param {string} type 需要添加的 Select Options 的 value
 * @param {array} list searchList 搜索栏 List
 * @param {array} data 需要添加的 Select Options 的 children 注意：data 数据格式为 { value: '', label: '' }
 */
export const useSetOptions = ({ type, list, data }) => {
  list.some(element => {
    if (element.value === type) {
      element.children = data;
    }
  });
};
