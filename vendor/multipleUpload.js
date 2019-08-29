; (function () {
  // 初始化数据
  var multipleData = {
    url: '/a/file/upload',
    imgLimitSize: 5242880,
    imgStyle: ["jpg", "jpeg", "gif", "png"],
  }
  /**
   *图片上传组件的属性控制
   *
   */
  var propertySetting = function () {
    // console.log($('input[file-type="multiple"]'),$('input[file-type="multiple"]').length);
    $('input[file-type="multiple"]').each(function (index, e) {
      var $e = $(e);
      var $form = $e.closest('form');
      var fileUploadStyle = jsonStrToJson($form.attr('imgUpload-style'));

      var style = { limit: 9, widthNum: 3, heightNum: 3 };
      $.extend(style, fileUploadStyle);
      style.limit = style.limit < style.widthNum * style.heightNum ? style.limit : style.widthNum * style.heightNum;
      childWidth = 'calc(100% / ' + style.widthNum + ' - 10px)';
      childHeight = 'calc(100% / ' + style.heightNum + ' - 10px)';
      $form.find('.batch-file-show-img,.batch-file-select').css({ width: childWidth, height: childHeight });
      $e.attr('img-limit', style.limit);
      $e.attr('multiple', true);
    })
  }
  /**
   *图片上传方法
   *
   */
  var multipleUploadMethod = function (fnObj) {
    // 新建类
    // 多张
    function MultipleImgUpload(instanceData) {
      var data = multipleData;
      ImgUpload.call(this, {// 传参到父类，且与父类共享作用域
        url: data.url,// 后台接口
        imgLimitSize: data.imgLimitSize,// 图片大小限制
        imgStyle: data.imgStyle,// 图片类型限制
        workDom: instanceData.workDom// 当前操作的dom
      });
      // 把传入的srcArr(图片路径数组)回显到页面
      this.showImg = function (srcArr) {
        var $e = $(this.workDom);
        var $thisForm = $e.closest('form');
        var imgStyle = $e.closest('.batch-file-select').attr('style');
        var length = $thisForm.find('.batch-file-show-img').length;
        var limit = $e.attr('img-limit');
        var imgLength = srcArr.length;
        var html = '';
        for (var i = 0; i < imgLength; i++) {
          if (length + i < limit) {
            html += '<div class="batch-file-show-img" style="' + imgStyle + '">\
              <i class="batch-file-close">&#10006;</i>\
              <img src="' + srcArr[i] + '">\
              </div>';
          } else {
            $e.parent().before(html);
            alert('限制' + limit + '张图片！');
            return false;
          }
        }
        $e.parent().before(html);
      }
      // 回调函数的作用域
      this.option = {
        workDom: this.workDom,
        showImg: this.showImg,
      }
    }
    inheritPrototype(MultipleImgUpload, ImgUpload);
    // 图片上传成功后的回调方法
    MultipleImgUpload.prototype.success = fnObj.success;
    // 图片删除方法
    MultipleImgUpload.prototype.delete = function () {
      var $thisShowImg = $(this.workDom).closest('.batch-file-show-img');
      $thisShowImg.remove();
      return false;
    };
    if (fnObj.delete) {
      MultipleImgUpload.prototype.delete = fnObj.delete;
    }

    // 批量文件的移除
    $('body').off('click', '.batch-file-close');
    $('body').on('click', '.batch-file-close', function () {
      var multiple = new MultipleImgUpload({ workDom: this });
      multiple.delete.call(multiple.option, multiple.option);
      return false;
    })
    // 多图片上传方法
    $('body').off('change', 'input[file-type="multiple"]');
    $('body').on('change', 'input[file-type="multiple"]', function () {
      var $this = $(this);
      // 限制数量
      var $thisForm = $this.closest('form');
      var groupLength = $thisForm.find('.batch-file-show-img').length;
      var limit = $this.attr('img-limit');
      if (groupLength >= limit) {
        alert('限制' + limit + '张图片！');
        return false;
      }

      var multipleUpload = new MultipleImgUpload({ workDom: this });
      multipleUpload.upload();
      multipleUpload = null;
    })
  }
  /**
   *fileUpload初始化
   *
   * @param {*} initData  初始化参数
   */
  multipleUploadInit = function (data, fnObj) {
    $.extend(multipleData, data);
    propertySetting();
    multipleUploadMethod(fnObj);
  }
})()