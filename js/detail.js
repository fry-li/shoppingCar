$(() => {
    let id = parseInt(location.search.substring(4));

    //遍历数组，找到相对应页面id的的data数组数据
    let obj = phoneData.find(e => {
        return e.pID === id;
    })
    // 设置修改页面对应信息
    $('.sku-name').text(obj.name);
    $('.summary-price em').text('￥' + obj.price);
    $('.preview-img>img').attr('src', obj.imgSrc);

    //实现加减按钮事件
    // 获取元素
    let chooseNumber = $('.choose-number');
    let addBtn = $('.add');
    let reduceBtn = $('.reduce');

    addBtn.on('click', function () {
        let old = parseInt(chooseNumber.val());
        old++;
        if (old > 1) {
            reduceBtn.removeClass('disabled');
        }
        chooseNumber.val(old);
    })
    reduceBtn.on('click', function () {
        let old = parseInt(chooseNumber.val());
        if (old === 1) {
            return;

        }
        old--;
        if (old === 1) {
            reduceBtn.addClass('disabled');
        }

        chooseNumber.val(old)
    })
    //------------------------------------------------
    //点击加入购物车功能
    $('.addshopcar').on('click', function () {
        let number = parseInt($('.choose-number').val());
        //读取旧数据
        let jsonStr = localStorage.getItem('shopCarData');
        let arr;
        //判断是否有数据
        if (jsonStr === null) {
            arr = [];
        } else {
            arr = JSON.parse(jsonStr);
        }

        let isExit = arr.find(e => {
            return e.pID === id;
        });
        if (isExit !== undefined) {
            isExit.number += number;

        } else {
            let good = {
                pID: obj.pID,
                name: obj.name,
                price: obj.price,
                imgSrc: obj.imgSrc,
                number: number
            }
            arr.push(good);
        }
        //把数组变成json格式的字符串，存储按到localstorage里面
        jsonStr = JSON.stringify(arr);
        localStorage.setItem('shopCarData', jsonStr);
        //点击之后直接跳转到购物车页面进行结算
        location.href = 'cart.html';
    })
})