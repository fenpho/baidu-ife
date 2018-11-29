let tableWarpper = document.querySelector('#table-wrapper');

let selectedProduct = [];
let selectedRegion = [];

// CheckBox容器, CheckBox选项的参数对象或者数组
function GenerateCheckBox(id, arr) {
  // 生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
  const checkAll = `<label><input type="checkbox" name="select-all" value="全选" checkbox-type="select-all" class="select-all">全选</label>`;
  // 遍历参数对象
  const inputGroup = arr.map(v => {
    // 生成各个子选项checkbox的html，给一个自定义属性表示为子选项
    return `<label><input type="checkbox" name="${id}" value="${
      v.value
    }" checkbox-type="select-one" class="select-one">${v.text}</label>`;
  });

  // 容器innerHTML = 生成好的html集合
  const wrapBox = document.querySelector(`#${id}`);
  wrapBox.innerHTML = checkAll + inputGroup.join('');

  // 给容器做一个事件委托
  wrapBox.onclick = function(e) {
    // if 是checkbox
    if (e.target.type === 'checkbox') {
      // 读取自定义属性
      // if 全选
      if (e.target.getAttribute('checkbox-type') === 'select-all') {
        // 做全选对应的逻辑
        if (e.target.checked) {
          const inputGroup = wrapBox.querySelectorAll('input.select-one');
          inputGroup.forEach(v => {
            v.setAttribute('checked', 'true');
            v.checked = true;
          });
        } else {
          const inputGroup = wrapBox.querySelectorAll('input.select-one');
          inputGroup.forEach(v => {
            v.removeAttribute('checked');
            v.checked = false;
          });
        }
      } else {
        // 做子选项对应的逻辑
        if (e.target.checked) {
          const inputGroup = wrapBox.querySelectorAll('input.select-one');
          var isAllChecked = true;
          for (var i = 0; i < inputGroup.length; i++) {
            if (!inputGroup[i].checked) {
              isAllChecked = false;
            }
          }
          if (isAllChecked) {
            const inputGroup = wrapBox.querySelector('input.select-all');
            inputGroup.checked = true;
          }
        } else {
          const inputGroup = wrapBox.querySelectorAll('input.select-one');
          var isAllChecked = true;
          for (var i = 0; i < inputGroup.length; i++) {
            if (!inputGroup[i].checked) {
              isAllChecked = false;
            }
          }
          if (!isAllChecked) {
            const inputGroup = wrapBox.querySelector('input.select-all');
            inputGroup.checked = false;
          }
        }
      }
      renderTable();
    }
  };
}

// 对象或数组自己根据喜好实现均可
// 生成一组CheckBox
GenerateCheckBox('region-radio-wrapper', [
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
GenerateCheckBox('product-radio-wrapper', [
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

// 获取数据
getData = () => {
  // 遍历原始数据
  const selectedHtml = document.querySelectorAll('input.select-one');
  const selectedData = [];
  selectedHtml.forEach(v => {
    if (v.checked) {
      selectedData.push(v.value);
    }
  });
  let data = sourceData.filter(v => {
    // 判断是否在商品维度 或者 地区维度的选中范围内 {
    // 添加到返回数据list中
    if (
      selectedData.toString().indexOf(v.product) !== -1 ||
      selectedData.toString().indexOf(v.region) !== -1
    ) {
      return v;
    }
  });
  // 返回数据
  return data;
};

renderTable = () => {
  tableWarpper.innerHTML = '';

  // 根据表单选项获取数据
  const data = getData();
  if (!data.length) {
    return;
  }

  let tableHeader = `<thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead>`;
  let tableContent = data
    .map(
      v =>
        `<tr><td>${v.product}</td><td>${v.region}</td>${v.sale
          .map(item => `<td>${item}</td>`)
          .join('')}</tr>`
    )
    .join('');
  // 渲染表格
  tableWarpper.innerHTML += `<table border="1">${tableHeader}<tbody>${tableContent}</tbody></table>`;
};

renderTable();
