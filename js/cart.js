$(() => {
  //把本地数据从本地存储中读取出来
  let jsonStr = localStorage.getItem('shopCarData');
  //判断jsonstr是否为null,如果不是null，就需要生成商品列表

  let arr;
  if (jsonStr !== null) {
    arr = JSON.parse(jsonStr);
    let html = "";
    arr.forEach(e => {
      html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.number * e.price}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div> `
    });
    //把html结构放入div里面
    $('.item-list').html(html); 
    //把空的提示隐藏
    $('.empty-tip').hide();
    //把表头和总计显示出来
    $('.cart-header').removeClass('hidden');
    $('.total-of').removeClass('hidden')
  }
  //计算总数量和总价
  function totalNumberAndPrice() {
    let totalCount = 0;
    let totalPrice = 0;
    $(".item-list input[type = checkbox]:checked").each((i, e) => {
      let id = parseInt($(e).parents('.item').attr('data-id'));
      arr.forEach(e => {
        if (id === e.pID) {
          totalCount += e.number;
          totalPrice += e.number * e.price;
        }
      })
    });
    $('.selected').text(totalCount);
    $('.total-money').text(totalPrice);

  }
  totalNumberAndPrice();
  //实现全选和全不选
  $('.pick-all').on('click', function () {
    //获取当前全选框的状态
    let status = $(this).prop('checked');
    //设置每一个商品的状态和全选一样
    $('.item-ck').prop('checked', status);
    //同步上下两个全选
    $('.pick-all').prop('checked', status);
    //重新计算总数和总价
    totalNumberAndPrice();
  })
  //因为所有商品信息都是动态生成的，所以必须用委托的方法获得全选
  $('.item-ck').on('click', function () {
    let isAll = $('.item-ck').length === $('.item-ck:checked').length;
    $('.pick-all').prop('checked', isAll);
    totalNumberAndPrice();
  })



  //用委托的方式实现加减
  let oldVal;
  $('.item-list').on('click','.add',function(){
    let oldVal =parseInt($(this).siblings('input').val());
    oldval++;
  })
  if(oldVal>1){
    $(this).siblings('.reduce').removeClass('disabled');
  }
  //把值设置回input
  $(this).siblings('input').val(oldVal);
  //更新本地存储数据，更新
  //判断依据是点击按钮对应商品的id
  let id = parseInt($(this).parents('.item').attr('data-id'));
  let obj = arr.find(e=>{
    return e.pId ===id;
  });
  //更新对应的数据
  obj.number = oldVal;
  //还要覆盖原来的本地数据
   jsonStr = JSON.stringify(arr);
  localStorage.setItem('shopCartData',jsonStr);
  //重新计算总数和总价
  totalNumberAndPrice();
  $(this).parents('.item').find('.computed').text(obj.price*obj.number);
  //还要把对应的商品

})