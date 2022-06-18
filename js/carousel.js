// 轮播图特效
// 日期：2022-6-18
// 姓名：C
(function () {
    // 得到元素
    var carousel_list = document.getElementById('carousel_list');
    var left_btn = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var circle_ol = document.getElementById('circle_ol');
    var circle_lis = circle_ol.getElementsByTagName('li');
    var banner=document.getElementById('banner');

    // 克隆第一张li
    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    // 上树
    carousel_list.appendChild(clone_li);

    // 当前正在显示的图片序号，从0开始
    var idx = 0;

    // 节流锁
    var lock=true;

    // 右按钮事件
    right_btn.onclick = right_btnhandler;
    function right_btnhandler() {
        // 判断节流锁的状态,如果是关闭的,那就什么都不做
        if(!lock)return;
        // 关锁
        lock=false;

        // 加上过渡
        carousel_list.style.transition = 'transform .5s ease 0s'
        idx++;
        carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
        if (idx > 4) {
            setTimeout(function () {
                // 去掉过渡
                carousel_list.style.transition = 'none';
                // 删除transform属性
                carousel_list.style.transform = 'none';
                // 全局图片序号变为0
                idx = 0;
            }, 500);
        }

        // 设置小圆点
        setCircle();

        // 开锁,动画结束之后开锁
        setTimeout(function(){
            lock=true;
        },500);
    }
    // 左按钮事件
    left_btn.onclick = function () {
        // 判断节流锁的状态,如果是关闭的,那就什么都不做
        if(!lock)return;
        // 关锁
        lock=false;

        // 左按钮先写if语句，而不是idx--；
        if (idx == 0) {
            // 瞬间拉动到最后
            carousel_list.style.transition = 'none';
            // 拉到最后(瞬间移动)
            carousel_list.style.transform = 'translateX(' + -16.66 * 5 + '%)';
            // 改变idx的值
            idx = 4;
            // 小技巧，延时0毫秒非常有用，可以让刚才的瞬间发生之后，再把过渡加上
            setTimeout(function () {
                // 加上过渡
                carousel_list.style.transition = 'transform .5s ease 0s';
                // 动画
                carousel_list.style.transform = 'translateX(' + -16.66 * 4 + '%)';
            }, 0);
        } else {
            idx--;
            // 
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';

        }

        // 设置小圆点
        setCircle();

        // 开锁,动画结束之后开锁
        setTimeout(function(){
            lock=true;
        },500);
    }


    function setCircle() {
        // 遍历，遍历0,1,2,3,4.每遍历一个就比较一下
        for (var i = 0; i <= 4; i++) {
            // 这里的%5很巧妙,5%5=0,其余是本身,
            if (i == idx % 5) {
                circle_lis[i].className = 'current';
            } else {
                circle_lis[i].className = '';
            }

        }
    }

    // 事件委托,小圆点的监听
    circle_ol.onclick = function (e) {
        if (e.target.tagName.toLowerCase() == 'li') {
            // 得到li身上的data-n属性,就是n
            var n = Number(e.target.getAttribute('data-n'));

            // 改变idx
            idx = n;

            // 拉动
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';
            // 调动小圆点函数
            setCircle();
        }
    }

    // 定时器,自动轮播
    var timer=setInterval(right_btnhandler,2000);
    // 鼠标进入自动轮播暂停
    banner.onmouseenter=function(){
        clearInterval(timer);
    }
    // 鼠标离开
    banner.onmouseleave=function(){
        // 设表先关
        clearInterval(timer);
        // 这里不要加var
        timer=setInterval(right_btnhandler,2000);
    }
})();
