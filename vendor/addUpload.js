; (function () {
  // 初始化数据
  var addData = {
    url: '/a/file/upload',
    imgLimitSize: 5242880,
    imgStyle: ["jpg", "jpeg", "gif", "png"],
  }
  /**
   *图片上传方法
   *
   */
  function addUploadMethod(fnObj) {
    // 新建类
    // 单张、自增
    function AddImgUpload(instanceData) {
      var data = addData;
      ImgUpload.call(this, {// 传参到父类，且与父类共享作用域
        url: data.url,// 后台接口
        imgLimitSize: data.imgLimitSize,// 图片大小限制
        imgStyle: data.imgStyle,// 图片类型限制
        workDom: instanceData.workDom// 当前操作的dom
      });
      this.cloneForm = instanceData.cloneForm;
      // 把传入的src(图片路径)回显到页面，并增加一个上传控件
      this.showImg = function (src) {
        var $input = $(this.workDom);
        var $fileUploadGroup = $input.closest('.file-upload-group');
        $fileUploadGroup.append(this.cloneForm);
        $fileUploadGroup.find('input[name="file"]').val('');
        $input.siblings('img').attr('src', src);
        $input.siblings('.file-delete').css('display', 'block');
        $input.attr('file-type', 'addEdit');
      }
      // 回调函数的作用域
      this.option = {
        workDom: this.workDom,
        showImg: this.showImg,
        cloneForm: this.cloneForm,
      }
    }
    inheritPrototype(AddImgUpload, ImgUpload);
    // 图片上传成功后的回调方法
    AddImgUpload.prototype.success = fnObj.success;
    // 单张、自增、编辑
    function AddEditImgUpload(instanceData) {
      var data = addData;
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
    inheritPrototype(AddEditImgUpload, ImgUpload);
    // 图片上传成功后的回调方法
    AddEditImgUpload.prototype.success = fnObj.editSuccess;
    // 删除图片的操作方法
    AddEditImgUpload.prototype.delete = function () {
      var $thisForm = $(this.workDom).closest('form');
      $thisForm.remove();
    };
    if(fnObj.delete){
      AddEditImgUpload.prototype.delete = fnObj.delete;
    }

    // 单文件组的移除
    $('body').off('click', '.file-delete');
    $('body').on('click', '.file-delete', function () {
      var addEdit = new AddEditImgUpload({ workDom: this });
      addEdit.delete.call(addEdit.option, addEdit.option);
      return false;
    })
    // 单图片上传组的添加方法
    $('body').off('change', 'input[file-type="add"]');
    $('body').on('change', 'input[file-type="add"]', function () {

      var $this = $(this);

      // 限制数量
      var $fileUploadGroup = $this.closest('.file-upload-group');
      var groupLength = $fileUploadGroup.find('input[name="file"]').length;
      var $thisForm = $this.closest('form');
      var limit = jsonStrToJson($thisForm.attr('imgUpload-style')).limit;
      if (groupLength > limit) {
        alert('限制' + limit + '张图片！');
        return false;
      }

      var fileUploadHtml = $this.closest('form').clone(true);
      var addUpload = new AddImgUpload({ workDom: this, cloneForm: fileUploadHtml });
      addUpload.upload();
      addUpload = null;
    })
    // 单图片上传组的编辑方法
    $('body').off('change', 'input[file-type="addEdit"]');
    $('body').on('change', 'input[file-type="addEdit"]', function () {
      var addEditUpload = new AddEditImgUpload({ workDom: this });
      addEditUpload.upload();
      addEditUpload = null;
    })
  }
  /**
   *fileUpload初始化
   *
   * @param {*} initData  初始化参数
   */
  addUploadInit = function (data, fnObj) {
    $.extend(addData, data);
    addUploadMethod(fnObj);
  }
})()