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