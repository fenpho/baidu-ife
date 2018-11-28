// CheckBox容器, CheckBox选项的参数对象或者数组
function GenerateCheckBox(id, arr) {
  // 生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
  // 遍历参数对象
  const inputGroup = arr.map(v =>  {
    // 生成各个子选项checkbox的html，给一个自定义属性表示为子选项
    return `<label><input type="checkbox" name="${id}" value="${v.value}" class="select-all">${v.text}</label>`
})
 
  // 容器innerHTML = 生成好的html集合
  const wrapBox = document.querySelector(id)
  wrapBox.innerHTML = inputGroup;

  // 给容器做一个事件委托
  wrapBox.onclick = function(e) {
      // if 是checkbox
      if(e.target)
          // 读取自定义属性
          // if 全选
          if()
              // 做全选对应的逻辑
          else
              // 做子选项对应的逻辑
  }
}

// 对象或数组自己根据喜好实现均可
生成一组CheckBox(容器1, [{
  value: 1,
  text: "XXXX"
}, {
  value: 2,
  text: "YYYY"
}]);

生成一组CheckBox(容器2, [{
  value: 1,
  text: "AAAA"
}, {
  value: 2,
  text: "BBBB"
}]);

// 生成一组CheckBox({
//    1: "XXXX",
//    2: "YYYY"
// });