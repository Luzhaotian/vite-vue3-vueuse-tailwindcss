import { downloadRequest } from "@/apis/download.js";

/**
 * @description 下载文件
 * @param {String} url 下载地址
 * @param {Object} data 下载参数
 * @param {String} method 下载方式
 * @param {Function} callback 下载成功回调
 */
export const downloadFile = (url, { method, data }, callback) => {
  downloadRequest(url, data, method).then(data => {
    const blobUrl = window.URL.createObjectURL(data.data);
    const a = document.createElement("a");
    a.download = "文件名字";
    a.href = blobUrl;
    a.click();
    callback();
  });
};
