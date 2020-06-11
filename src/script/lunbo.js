class Lb {
    constructor(options) {
        this.lbBox = document.getElementById(options.id);
        this.lbItems = this.lbBox.querySelectorAll('.lb-item');
        this.lbSigns = this.lbBox.querySelectorAll('.lb-sign li');
        this.lbCtrlL = this.lbBox.querySelectorAll('.lb-ctrl')[0];
        this.lbCtrlR = this.lbBox.querySelectorAll('.lb-ctrl')[1];
        this.lunbo = document.querySelector('.lunbo')
        this.qieactive = document.querySelector('.qieactive')

        // 当前图片索引
        this.curIndex = 0;
        // 轮播盒内图片数量
        this.numItems = this.lbItems.length;

        // 是否可以滑动
        this.status = true;

        // 轮播速度
        this.speed = options.speed || 600;
        // 等待延时
        this.delay = options.delay || 3000;

        // 轮播方向
        this.direction = options.direction || 'left';

        // 是否监听键盘事件
        this.moniterKeyEvent = options.moniterKeyEvent || false;
        // 是否监听屏幕滑动事件
        this.moniterTouchEvent = options.moniterTouchEvent || false;

        this.handleEvents();
        this.setTransition();
    }

    // 开始轮播
    start() {
        const event = {
            srcElement: this.direction == 'left' ? this.lbCtrlR : this.lbCtrlL
        };
        const clickCtrl = this.clickCtrl.bind(this);

        // 每隔一段时间模拟点击控件
        this.interval = setInterval(clickCtrl, this.delay, event);
    }

    // 暂停轮播
    pause() {
        clearInterval(this.interval);
    }

    /**
     * 设置轮播图片的过渡属性
     * 在文件头内增加一个样式标签
     * 标签内包含轮播图的过渡属性
     */
    setTransition() {
        const styleElement = document.createElement('style');
        document.head.appendChild(styleElement);
        const styleRule = `.lb-item {transition: left ${this.speed}ms ease-in-out}`
        styleElement.sheet.insertRule(styleRule, 0);
    }

    // 处理点击控件事件
    clickCtrl(event) {
        if (!this.status) return;
        this.status = false;
        if (event.srcElement == this.lbCtrlR) {
            var fromIndex = this.curIndex,
                toIndex = (this.curIndex + 1) % this.numItems,
                direction = 'left';
        } else {
            var fromIndex = this.curIndex;
            toIndex = (this.curIndex + this.numItems - 1) % this.numItems,
                direction = 'right';
        }
        this.slide(fromIndex, toIndex, direction);
        this.curIndex = toIndex;
        // console.log(this.curIndex)
        this.yanse(this.curIndex)
    }
    yanse() {
            switch (this.curIndex) {
                case 0:
                    this.lunbo.style.background = "#F17868";
                    this.qieactive.style.background = "#F17868";
                    break;
                case 1:
                    this.lunbo.style.background = "#237C7A"
                    this.qieactive.style.background = "#237C7A";
                    break;
                case 2:
                    this.lunbo.style.background = "#4682FD"
                    this.qieactive.style.background = "#4682FD";
                    break;
                case 3:
                    this.lunbo.style.background = "#6E2CA5"
                    this.qieactive.style.background = "#6E2CA5";
                    break;
                case 4:
                    this.lunbo.style.background = "#ED9E9E"
                    this.qieactive.style.background = "#ED9E9E";
                    break;
            }
        }
        // 处理点击标志事件
    clickSign(event) {
        if (!this.status) return;
        this.status = false;
        const fromIndex = this.curIndex;
        const toIndex = parseInt(event.srcElement.getAttribute('slide-to'));
        const direction = fromIndex < toIndex ? 'left' : 'right';
        this.slide(fromIndex, toIndex, direction);
        this.curIndex = toIndex;
        this.yanse(this.curIndex)
    }


    // 处理键盘按下事件
    keyDown(event) {
        if (event && event.keyCode == 37) {
            this.lbCtrlL.click();
        } else if (event && event.keyCode == 39) {
            this.lbCtrlR.click();
        }
    }

    // 处理各类事件
    handleEvents() {
        // 鼠标移动到轮播盒上时继续轮播
        this.lbBox.addEventListener('mouseleave', this.start.bind(this));
        // 鼠标从轮播盒上移开时暂停轮播
        this.lbBox.addEventListener('mouseover', this.pause.bind(this));

        // 点击左侧控件向右滑动图片
        this.lbCtrlL.addEventListener('click', this.clickCtrl.bind(this));
        // 点击右侧控件向左滑动图片
        this.lbCtrlR.addEventListener('click', this.clickCtrl.bind(this));

        // 点击轮播标志后滑动到对应的图片
        for (let i = 0; i < this.lbSigns.length; i++) {
            this.lbSigns[i].setAttribute('slide-to', i);
            this.lbSigns[i].addEventListener('click', this.clickSign.bind(this));
        }

        // 监听键盘事件
        if (this.moniterKeyEvent) {
            document.addEventListener('keydown', this.keyDown.bind(this));
        }
    }

    /**
     * 滑动图片
     * @param {number} fromIndex
     * @param {number} toIndex 
     * @param {string} direction
     */
    slide(fromIndex, toIndex, direction) {
        if (direction == 'left') {
            this.lbItems[toIndex].className = "lb-item next";
            var fromClass = 'lb-item active left',
                toClass = 'lb-item next left';
        } else {
            this.lbItems[toIndex].className = "lb-item prev";
            var fromClass = 'lb-item active right',
                toClass = 'lb-item prev right';
        }
        this.lbSigns[fromIndex].className = "";
        this.lbSigns[toIndex].className = "active";

        setTimeout((() => {
            this.lbItems[fromIndex].className = fromClass;
            this.lbItems[toIndex].className = toClass;
        }).bind(this), 50);

        setTimeout((() => {
            this.lbItems[fromIndex].className = 'lb-item';
            this.lbItems[toIndex].className = 'lb-item active';
            this.status = true; // 设置为可以滑动
        }).bind(this), this.speed + 50);
    }
}