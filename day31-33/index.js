// 这是一种实现思路，渲染表格的方法接受数据参数，但不关注数据怎么来的
let regionSelect = document.querySelector('#region-select');
let tableWarpper = document.querySelector('#table-wrapper');
let productSelect = document.querySelector('#product-select');

let selectedProduct = [];
let selectedRegion = [];

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
checkBoxAction = (event, type) => {
  if (event.target.nodeName.toLowerCase() === 'input') {
    if (event.target.checked) {
      event.target.value !== '全选'
        ? changeOne(type, event, 'add')
        : changeAll(type, 'all');
    } else {
      event.target.value !== '全选'
        ? changeOne(type, event, 'del')
        : changeAll(type, 'clear');
    }
  }
  console.log('region', selectedProduct, selectedRegion);
  // 渲染新的表格
  renderTable();
};

changeAll = (type, operation) => {
  if (operation === 'all') {
    if (type === 'region') {
      selectedRegion = [];
      const inputGroup = regionSelect.querySelectorAll('input');
      inputGroup.forEach(v => {
        v.setAttribute('checked', 'true');
        v.checked = true;
        selectedRegion.push(v.value);
      });
    } else {
      selectedProduct = [];
      const inputGroup = productSelect.querySelectorAll('input');
      inputGroup.forEach(v => {
        v.setAttribute('checked', 'true');
        v.checked = true;
        selectedProduct.push(v.value);
      });
    }
  } else {
    if (type === 'region') {
      selectedRegion = [];
      const inputGroup = regionSelect.querySelectorAll('input');
      inputGroup.forEach(v => {
        v.removeAttribute('checked');
        v.checked = false;
      });
    } else {
      selectedProduct = [];
      const inputGroup = productSelect.querySelectorAll('input');
      inputGroup.forEach(v => {
        v.removeAttribute('checked');
        v.checked = false;
      });
    }
  }
};

changeOne = (type, event, operation) => {
  if (operation === 'add') {
    if (type === 'region') {
      selectedRegion.push(event.target.value);
    } else {
      selectedProduct.push(event.target.value);
    }
  } else {
    if (type === 'region') {
      selectedRegion.splice(selectedRegion.indexOf(event.target.value), 1);
    } else {
      selectedProduct.splice(selectedProduct.indexOf(event.target.value), 1);
    }
  }
};

regionSelect.onclick = event => {
  checkBoxAction(event, 'region');
};
productSelect.onclick = event => {
  checkBoxAction(event, 'product');
};

getData = () => {
  // 遍历数据 向要返回的数据list中添加符合表单所选项的数据
  let data = sourceData.filter(v => {
    if (selectedProduct.length && selectedRegion.length) {
      return (
        selectedRegion.indexOf(v.region) !== -1 &&
        selectedRegion.indexOf(v.product) !== -1
      );
    } else if (selectedProduct.length) {
      return selectedProduct.indexOf(v.product) !== -1;
    } else if (selectedRegion.length) {
      return selectedRegion.indexOf(v.region) !== -1;
    } else {
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
