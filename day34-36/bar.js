const data = {
  product: '手机',
  region: '华东',
  sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
};

function drawHistogram({ maxHeight }) {
  // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
  let height = 350;
  let width = 550;
  let vertical = 320;
  let horizontal = 520;
  // 定义好每一个柱子的宽度及柱子的间隔宽度
  let pillarWidth = 28; // 实际宽度30px，2px的边框
  let pillarSpace = 10; // 实际宽度12px，2px的边框
  // 定义好柱子颜色，轴的颜色
  let pillarColor = '#01AAED';
  let axesColor = 'black';
  // 拿到柱状图中的最大值Max
  let maxPillar = maxHeight;
  // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
  // 用最大的高度的值撑满纵轴，后续值乘以该比例即可的相应比例高度
  let scale = (vertical - 60) / maxPillar;
  // 绘制横轴及纵轴
  let svgArea = `<svg
  width=${width}
  height=${height}
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  id="histogram"
>
<!-- 竖轴 -->
 <line
    x1="20"
    x2="20"
    y1="20"
    y2="320"
    stroke=${axesColor}
    fill="transparent"
    stroke-width="1"
  />
  <!-- 小箭头 -->
  <line
  x1="10"
  x2="20"
  y1="30"
  y2="20"
  stroke=${axesColor}
  fill="transparent"
  stroke-width="1"
  />
  <line
     x1="30"
     x2="20"
     y1="30"
     y2="20"
     stroke="green"
     fill="transparent"
     stroke-width="1"
   />
   <!-- 横轴 -->
   <line
    x1="20"
    x2="520"
    y1="320"
    y2="320"
    stroke=${axesColor}
    fill="transparent"
    stroke-width="1"
  />
  <!-- 小箭头 -->
  <line
  x1="510"
  x2="520"
  y1="310"
  y2="320"
  stroke=${axesColor}
  fill="transparent"
  stroke-width="1"
  />
  <line
     x1="510"
     x2="520"
     y1="330"
     y2="320"
     stroke=${axesColor}
     fill="transparent"
     stroke-width="1"
   />
</svg>`;

  // 遍历数据
  const pillar = data.sale.map((v, index) => {
    // 计算将要绘制柱子的高度和位置
    let pillarHeight = v * scale;
    console.log(pillarHeight, v);
    let leftPosition = 20 + pillarSpace * (index + 1) + index * pillarWidth;
    // 绘制每一个柱子
    return `<rect x=${leftPosition} y=${320 - pillarHeight} width=${pillarWidth} height=${pillarHeight} stroke="#1E9FFF" fill=${pillarColor} stroke-width="1" />`;
  });

  document.getElementById('histogramWrap').innerHTML = svgArea;
  document.getElementById('histogram').innerHTML += pillar;
}

drawHistogram({ maxHeight: 270 });
