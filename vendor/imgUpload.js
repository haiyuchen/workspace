
/**
 *方法继承
 *
 * @param {*} classChild  子类
 * @param {*} classParent  父类
 */
function inheritPrototype(classChild, classParent) {
  var prototype = Object(classParent.prototype);
  prototype.constructor = classChild;
  $.extend(classChild.prototype, prototype);
  // classChild.prototype = prototype;
}
/**
 *获取定义信息
 *
 */
var jsonStrToJson = function (jsonStr) {
  var obj;
  try {
    obj = JSON.parse(jsonStr);
  } catch (error) {
    obj = {};
  }
  return obj;
};
(function () {
  /**
   *进度条的样式控制
   *
   * @param {*} e  正在上传操作的元素
   * @param {*} ancestralStr  祖辈元素的
   */
  function ProgressBar(e, ancestralStr) {
    this.status = false;// 结束标志位
    this.$progress = e.closest(ancestralStr).find('.file-progress');
    this.$progressBar = this.$progress.find('.progress-bar');
    this.nowWidth = 0;
    var that = this;
    that.timer = function () {
      that.$progress.css("display", "block");
      setTimeout(function () {
        if (that.nowWidth < 80) {
          that.nowWidth += 3;
          that.$progressBar.css('width', that.nowWidth + '%');
          that.timer();
        } else if (that.status && that.nowWidth < 100) {
          that.nowWidth += 6;
          that.$progressBar.css('width', that.nowWidth + '%');
          that.timer();
        } else if (!that.status && that.nowWidth < 100) {
          that.timer();
        } else {
          // console.log('finish', that.nowWidth);
          that.$progress.css("display", "none");
          that.$progressBar.css('width', '0%');
        }
      }, 10)
    }
  }
  /**
   *加载中的样式控制
   *
   * @param {*} e  正在上传操作的元素
   */
  function LoadingGif(e, ancestralStr) {
    this.status = false;// 结束标志位
    this.$loading = e.closest(ancestralStr).find('.loading');
    var that = this;
    that.timer = function () {
      that.$loading.css("display", "block");
      setTimeout(function () {
        if (that.status) {
          that.$loading.css("display", "none");
        } else {
          that.timer();
        }
      }, 50)
    }
  }
  /**
   *文件大小校验
   *
   * @param {*} file  传入的单个文件
   * @returns
   */
  function sizeLimitCheck(file, fileLimitSize) {
    var fileSize = file.size;
    if (fileSize > fileLimitSize) {
      return false;
    }
    return true;
  }
  /**
   *图片格式判断
   *
   * @param {*} file
   * @returns
   */
  function imgStyleCheck(file, fileStyle) {
    var fileName = file.name;
    var suffixArr = fileName.split('.');
    var suffix = suffixArr[suffixArr.length - 1];
    if (fileStyle.indexOf(suffix) == -1) {
      return false;
    }
    return true;
  }
  /**
   *文件上传的定义类
   *
   * @param {*} instanceData  新建类的参数
   */
  ImgUpload = function (instanceData) {
    // console.log('ImgUpload', instanceData);
    this.url = instanceData.url;// 后端接口链接
    this.imgLimitSize = instanceData.imgLimitSize;// 图片大小限制
    this.imgStyle = instanceData.imgStyle;// 图片类型限制
    this.workDom = instanceData.workDom;// 当前操作的对象
  }
  // form表单上传图片
  ImgUpload.prototype.upload = function () {
    // 文件信息校验
    var checkResult = this.imgCheck(this.workDom, this.imgLimitSize, this.imgStyle);
    if (!checkResult.state) {
      alert(checkResult.message);
      return false;
    }
    var $e = $(this.workDom);
    // 选择进度条还是圈圈
    var uploading = this.loadingStyle($e, 'form');

    var that = this;
    var ajax_option = {
      url: that.url,
      type: 'post',
      dataType: "json",
      beforeSubmit: function () {
        uploading.timer();
      },
      success: function (data) {
        that.success.call(that.option, data, that.option);
      },
      complete: function () {
        // console.log("complete");
        $e.val('');
        uploading.status = true;
        uploading = null;
      },
      error: function (xhr) {
        if (xhr == 504) {
          alert('请求超时，请稍后再试。');
        } else {
          alert('连接出错，请稍后再试。');
        }
      }
    };
    $e.closest('form').ajaxSubmit(ajax_option);
  }

  /**
   *图片格式、大小校验
   *
   * @param {*} e  保存着图片路径的元素
   * @returns
   */
  ImgUpload.prototype.imgCheck = function (e, imgLimitSize, imgStyle) {
    var imgStyleMes = '：图片格式错误！仅支持 ' + imgStyle.toString() + '！';
    var imgLimitSizeMes = '：图片大小超出限制,不得超过' + imgLimitSize / 1024 + 'KB（5MB），请重新选择！';

    var result = { state: false, message: '' }

    var length = e.files.length;
    if (e.value == null && length <= 0) {
      result.message = "未选择文件";
      return result;
    }
    for (var i = 0; i < length; i++) {
      var file = e.files[i];
      var fileName = file.name;

      if (!imgStyleCheck(file, imgStyle)) {
        result.message = fileName + imgStyleMes;
        return result
      }
      if (!sizeLimitCheck(file, imgLimitSize)) {
        result.message = fileName + imgLimitSizeMes;
        return result
      }
    }
    result.state = true;
    return result;
  }
  // 设置显示“上传中”的样式，$e:workDom的jquery格式，ancestralStr:祖辈元素的搜索字符
  ImgUpload.prototype.loadingStyle = function ($e, ancestralStr) {
    // 选择进度条还是圈圈
    var uploading;
    var $eParent = $e.parent().parent();
    if ($eParent.find('.progress').length > 0) {
      uploading = new ProgressBar($e, ancestralStr);
    } else if ($eParent.find('.loading').length > 0) {
      uploading = new LoadingGif($e, ancestralStr);
    } else {
      $eParent.append('<div class="loading"></div>');
      uploading = new LoadingGif($e, ancestralStr);
    }
    return uploading;
  }
})()