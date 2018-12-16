let selectedProduct = [];
let selectedRegion = [];

// 对象或数组自己根据喜好实现均可
// 生成一组CheckBox
GenerateCheckBox('product-radio-wrapper', [
  {
    value: '手机',
    text: '手机'
  },
  {
    value: '笔记本',
    text: '笔记本'
  },
  {
    value: '智能音箱',
    text: '智能音箱'
  }
]);

// 生成一组CheckBox
GenerateCheckBox('region-radio-wrapper', [
  {
    value: '华东',
    text: '华东'
  },
  {
    value: '华南',
    text: '华南'
  },
  {
    value: '华北',
    text: '华北'
  }
]);