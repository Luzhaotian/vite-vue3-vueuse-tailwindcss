module.exports = {
  // 指定每行的最大长度
  printWidth: 100,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 在语句末尾使用分号(true有，false没有)
  semi: true,
  // 使用单引号代替双引号(true单双引号，false双引号)
  singleQuote: false,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: "none",
  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  bracketSpacing: true,
  //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号 ,always：不省略括号
  arrowParens: "avoid",
  // 可选值"<lf|crlf|cr|auto>"，默认lf
  // "lf" - 仅换行 (\n)，在 Linux 和 macOS 以及 git repos 中很常见
  // "crlf" - 回车 + 换行字符 (\r\n)，在 Windows 上很常见
  // "cr" - 仅回车字符 (\r)，很少使用
  // "auto" - 维护现有的行结尾（一个文件中的混合值通过查看第一行之后使用的内容来规范化）
  endOfLine: "auto",
  // 在 JSX 中使用单引号而不是双引号。false 双引号 true 单引号
  jsxSingleQuote: false,
  // 将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）。
  bracketSameLine: false,
  // 将多行 JSX 元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。
  jsxBracketSameLine: false,
  // 指定 HTML、Vue、Angular 和 Handlebars 的全局空白敏感度。  可选值  <css|strict|ignore> ，默认 css
  // "css" - 遵守 CSS display 属性的默认值。对于与 strict 相同处理的 Handlebars。
  // "strict" - 所有标签周围的空白（或缺少空白）被认为是重要的。
  // "ignore" - 所有标签周围的空格（或缺少空格）被认为是无关紧要的。
  htmlWhitespaceSensitivity: "ignore"
};
