// 这是一种实现思路，渲染表格的方法接受数据参数，但不关注数据怎么来的
let regionSelect = document.querySelector('#region-select');
let tableWarpper = document.querySelector('#table-wrapper');
let productSelect = document.querySelector('#product-select');

let selectedProduct = '';
let selectedRegion = '';

// regionSelect.onchange = () => {
//   // 渲染新的表格(根据select选项获取数据)
//   renderTable(getData());
// };

// getData = () => {
//   // dosomething
//   let data = sourceData.filter(v => v.region === regionSelect.value);
//   // 返回数据
//   return data;
// };

// renderTable = data => {
//   tableWarpper.innerHTML = '';
//   if (!data.length) {
//     return;
//   }
//   // 输出表头：商品、地区、1月、2月、…… 12月
//   let tableHeader = `<thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead>`;
//   // 遍历数据 输出每一行的表格HTML内容
//   let tableContent = data
//     .map(
//       v =>
//         `<tr><td>${v.product}</td><td>${v.region}</td>${v.sale
//           .map(item => `<td>${item}</td>`)
//           .join('')}</tr>`
//     )
//     .join('');
//   // 把生成的HTML内容赋给table-wrapper
//   tableWarpper.innerHTML += `<table border="1">${tableHeader}<tbody>${tableContent}</tbody></table>`;
// };

// 这是另外一种实现思路，表单变化时通知表格进行渲染，但不关注他用什么数据渲染
regionSelect.onchange = () => {
  if (regionSelect.value) {
    selectedRegion = regionSelect.value
    selectedRegion === '请选择区域' ? selectedRegion = '' : null;
  }
  // 渲染新的表格
  renderTable();
};
productSelect.onclick = (event) => {
  if (event.target.nodeName.toLowerCase()  === 'label') {
    selectedProduct = event.target.textContent;
    selectedProduct === '全部' ? selectedProduct = '' : null;
  }
  // selectedProduct = this.find
  // 渲染新的表格
  renderTable();
};

getData = () => {
  // 遍历数据 向要返回的数据list中添加符合表单所选项的数据
  let data = sourceData.filter(v => {
    if (selectedProduct && selectedRegion) {
      return v.region === selectedRegion && v.product === selectedProduct;
    } else if (selectedRegion) {
      return v.region === selectedRegion;
    } else if (selectedProduct) {
      return v.product === selectedProduct;
    } else {
      return v;
    }
  });
  // 返回数据
  return data;
}

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
}

renderTable();
