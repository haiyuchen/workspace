; (function () {
  // 初始化数据
  var singleData = {
    url: '',//'/a/file/upload',
    imgLimitSize: 5242880,
    imgStyle: ["jpg", "jpeg", "gif", "png"],
  }
  /**
   *图片上传方法
   *
   */
  function singleUploadMethod(fnObj) {
    // 新建类
    // 单张
    function SingleImgUpload(instanceData) {
      var data = singleData;
      ImgUpload.call(this, {// 传参到父类，且与父类共享作用域
        url: data.url,// 后台接口
        imgLimitSize: data.imgLimitSize,// 图片大小限制
        imgStyle: data.imgStyle,// 图片类型限制
        workDom: instanceData.workDom// 当前操作的dom
      });
      // 把传入的src(图片路径)回显到页面
      this.showImg = function (src) {
        $(this.workDom).siblings('img').attr('src', src);
      };
      // 回调函数的作用域
      this.option = {
        workDom: this.workDom,
        showImg: this.showImg,
      }
    }
    // 继承ImgUpload方法
    inheritPrototype(SingleImgUpload, ImgUpload);
    // 图片上传成功后的回调方法
    SingleImgUpload.prototype.success = fnObj.success;

    // 单图片上传方法
    $('body').off('change', 'input[file-type="single"]');
    $('body').on('change', 'input[file-type="single"]', function () {
      var singleUpload = new SingleImgUpload({ workDom: this });
      singleUpload.upload();
      singleUpload = null;
    })
  }
  /**
   *fileUpload初始化
   *
   * @param {*} data  初始化参数
   */
  singleUploadInit = function (data, fnObj) {
    $.extend(singleData, data);
    singleUploadMethod(fnObj);
  }
})()