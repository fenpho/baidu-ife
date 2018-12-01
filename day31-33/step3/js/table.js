let tableWarpper = document.querySelector('#table-wrapper');

// 获取数据
getData = () => {
  const data = {};
  // 遍历原始数据
  const selectedHtmlForProduct = document.querySelectorAll(
    '#product-radio-wrapper input.select-one'
  );
  const selectedHtmlForRegion = document.querySelectorAll(
    '#region-radio-wrapper input.select-one'
  );
  const selectedDataForProduct = [];
  const selectedDataForRegion = [];
  selectedHtmlForProduct.forEach(v => {
    if (v.checked) {
      selectedDataForProduct.push(v.value);
    }
  });
  selectedHtmlForRegion.forEach(v => {
    if (v.checked) {
      selectedDataForRegion.push(v.value);
    }
  });

  data.data = sourceData.filter(v => {
    // 判断是否在商品维度 或者 地区维度的选中范围内 {
    // 添加到返回数据list中
    if (selectedDataForProduct.length && selectedDataForRegion.length) {
      return (
        selectedDataForProduct.toString().indexOf(v.product) !== -1 &&
        selectedDataForRegion.toString().indexOf(v.region) !== -1
      );
    } else if (selectedDataForProduct.length) {
      return selectedDataForProduct.toString().indexOf(v.product) !== -1;
    } else if (selectedDataForRegion.length) {
      return selectedDataForRegion.toString().indexOf(v.region) !== -1;
    } else {
      return false;
    }
  });

  data.selectedDataForProduct = selectedDataForProduct;
  data.selectedDataForRegion = selectedDataForRegion;
  // 返回数据
  return data;
};

renderTable = () => {
  tableWarpper.innerHTML = '';
  let tableHeader = '';
  let tableContent = '';

  // 根据表单选项获取数据
  const data = getData();
  if (!data.data.length) {
    return;
  }

  if (
    data.selectedDataForProduct.length === 1 &&
    (data.selectedDataForRegion.length > 1 ||
      data.selectedDataForRegion.length === 0)
  ) {
    tableHeader = `<thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead>`;
    tableContent = data.data
      .map(
        (v, index) =>
          `<tr>${
            index === 0
              ? `<td rowspan=${data.selectedDataForRegion.length}>${
                  v.product
                }</td>`
              : ''
          }<td>${v.region}</td>${v.sale
            .map(item => `<td>${item}</td>`)
            .join('')}</tr>`
      )
      .join('');
  } else if (
    (data.selectedDataForProduct.length > 1 ||
      data.selectedDataForProduct.length === 0) &&
    data.selectedDataForRegion.length === 1
  ) {
    tableHeader = `<thead><tr><th>地区</th><th>商品</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead>`;
    tableContent = data.data
      .map(
        (v, index) =>
          `<tr>${
            index === 0
              ? `<td rowspan=${data.selectedDataForProduct.length}>${
                  v.region
                }</td>`
              : ''
          }<td>${v.product}</td>${v.sale
            .map(item => `<td>${item}</td>`)
            .join('')}</tr>`
      )
      .join('');
  } else if (
    data.selectedDataForProduct.length > 1 &&
    data.selectedDataForRegion.length > 1
  ) {
    tableHeader = `<thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead>`;
    tableContent = data.data
      .map(
        (v, index) =>
          `<tr>${
            v.product !== data.data[index - 1 >= 0 ? index - 1 : 0].product ||
            index === 0
              ? `<td rowspan=${data.selectedDataForRegion.length}>${
                  v.product
                }</td>`
              : ''
          }<td>${v.region}</td>${v.sale
            .map(item => `<td>${item}</td>`)
            .join('')}</tr>`
      )
      .join('');
  } else {
    tableHeader = `<thead><tr><th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th><th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th></tr></thead>`;
    if (data.selectedDataForRegion.length === 0) {
      tableContent = data.data
        .map(
          (v, index) =>
            `<tr>${
              index % 3 === 0
                ? `<td rowspan=3>${data.selectedDataForProduct[index / 3]}</td>`
                : ''
            }<td>${v.region}</td>${v.sale
              .map(item => `<td>${item}</td>`)
              .join('')}</tr>`
        )
        .join('');
    } else if (data.selectedDataForProduct.length === 0) {
      tableContent = data.data
        .map(
          (v, index) =>
            `<tr>${
              index % 3 === 0
                ? `<td rowspan=3>${data.selectedDataForRegion[index / 3]}</td>`
                : ''
            }<td>${v.product}</td>${v.sale
              .map(item => `<td>${item}</td>`)
              .join('')}</tr>`
        )
        .join('');
    } else {
      tableContent = data.data
        .map(
          v =>
            `<tr><td>${v.product}</td><td>${v.region}</td>${v.sale
              .map(item => `<td>${item}</td>`)
              .join('')}</tr>`
        )
        .join('');
    }
  }

  // 渲染表格
  tableWarpper.innerHTML += `<table border="1">${tableHeader}<tbody>${tableContent}</tbody></table>`;
};

renderTable();
