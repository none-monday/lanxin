// 获取导航
const headerEl = document.querySelector("header");
// 返回顶部按钮
const scrollToTop = document.querySelector(".scrollToTop");
// 控制头部导航固定定位
window.addEventListener('scroll', () => {
  let height = headerEl.getBoundingClientRect().height;
  if(window.scrollY - height > 700) {
    if(!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  // 控制返回顶部按钮
  if(window.pageYOffset > 800) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
})

// 轮播初始化
const glide = new Glide(".glide");
// 获取轮播标题
const captionsEl = document.querySelectorAll('.slide-caption');
// 加载轮播动画
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, {start: 300}),
    translateY: [anime.stagger([40, 10]), 0]
  });
});

// 轮播进行前，把标题透明度设置为0，还原
glide.on("run.before", () => {
  document.querySelectorAll('.slide-caption > *').forEach(el => {
    el.style.opacity = 0;
  });
});

glide.mount();

/* 成功案例区域 */
// 按钮划入变色
const btns = document.querySelectorAll(".filter-btn");
for(let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("mouseenter", function() {
    btns.forEach(el => {
      el.classList.remove('active')
    });
    this.classList.add("active")
  })
}
// 按钮筛选功能
const filterBtns = document.querySelector(".filter-btns")
filterBtns.addEventListener("click", e => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if(filterOption) {
    document.querySelectorAll("filter-btn.active").forEach(btn => btn.classList.remove("active"));
    target.classList.add("active");
    isotope.arrange({filter:filterOption})
  }
})

// 初始化isotope布局
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item"
});

/* 定义通用配置项 */
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom"
};

// 控制元素滚动时出现(interval表示轮流出现)
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });

const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
  beforeReveal() {
    anime({
      targets: ".data-piece .num",
      innerHTML: el => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo"
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
  }
});

// 数据区域背景视差效果设置
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;

  if(bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
  }
})

// 锚点链接跳转滚动效果
const scroll = new SmoothScroll("nav a[href*='#'], .scrollToTop a[href*='#']", {
  header: "header",
  offset: 80
});

document.addEventListener("scrollStart", () => {
  if(headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
})

// 点击探索更多按钮跳转到关于我们区域
const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector('#about-us'));
  })
})

// 折叠按钮点击事件处理
const bugerEl = document.querySelector(".burger");
bugerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
})