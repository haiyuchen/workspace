// 政务端的onclick方法，避免报错
function addGou() { };
function uploadData() { };
function addGouAndUploadData() { };

// 单选复选的填充样式
var fillStyle = {
  tick: { false: '&emsp;', true: '\u221A' },//'&emsp;' = ' ';'&#10004;' = '✔';'\u221A' = '✔'
  diamond: { false: '□', true: '■' },
  diamondAndTick: { false: '□', true: '\u221A' },
  tickAndCross: { false: 'X', true: '\u221A' }
}
//水印样式
var mask_style = {
  "overflow": "hidden",
  "font-size": "40px",
  "font-family": "微软雅黑",
  "opacity": 0.15,
  "text-align": "center",
  "color": "#000000",
  "width": "780px",
  "line-height": "60px",
  "height": "60px",
  "top": "1536px",
  "position": "absolute",
  "transform": "rotate(-30deg)",
  "-webkit-transform": "rotate(-30deg)",
  "-moz-transform": "rotate(-30deg)",
  "-ms-transform": "rotate(-30deg)",
  "-o-transform": "rotate(-30deg)"
};
const PDFHeight = 1024;

var instanceMap;// 当前使用的实例集合
var contBasicInstanceMap = {};// 合同基础信息实例集合
var lessorInstanceMap = {};// 出租人编辑信息实例集合
var lesseeInstanceMap = {};// 承租人编辑信息实例集合  
var lessorExtendData;// 出租人保存的编辑数据
var lesseeExtendData;// 承租人保存的编辑数据
var contBasicData;// 合同基础数据


/**
 *打印提交数据
 *
 */
function printData() { // 本地测试使用
  var resultData = {};
  for (var i in instanceMap) {
    resultData[i] = instanceMap[i].getUploadValue();
  }
  console.log(instanceMap);
  console.log(resultData);
}


/** 初始化
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*/
; (function () {
  function fileUploadInit() {
    singleUploadInit({
      // url: path + '/contractController/uploadAttachmentPic',
      url: '/a/file/upload',// 本地测试使用
    }, {
        success: function (data, option) {
          console.log(this);
          // if(data.state){
          if (data.state === '01') {// 本地测试使用
            var $e = $(option.workDom);
            // var src = data.result[0].filePath;
            var src = './testImg/' + data.data[0].fileName;// 本地测试使用
            var $thisForm = $e.closest('form');
            var name = $thisForm.attr('name');

            var targetType = getTargetType(name);
            createInstance(name, targetType);

            instanceMap[name].setImgUrl(src);
          } else {
            //alert(data.msg);
            alert(data.message);// 本地测试使用
          }
        },
      });
    addUploadInit({
      // url: path + '/contractController/uploadAttachmentPic',
      url: '/a/file/upload',// 本地测试使用
    }, {
        success: function (data, option) {
          console.log(this);
          // if(data.state){
          if (data.state === '01') {// 本地测试使用
            var $e = $(option.workDom);
            // var src = data.result[0].filePath;
            var src = './testImg/' + data.data[0].fileName;// 本地测试使用
            var $thisForm = $e.closest('form');
            var name = $thisForm.attr('name');

            var targetType = getTargetType(name);
            createInstance(name, targetType);
            var imgUrlArr = instanceMap[name].imgUrlArr ? instanceMap[name].imgUrlArr : [];
            imgUrlArr.push(src);

            instanceMap[name].setImgUrlArr(imgUrlArr);
          } else {
            //alert(data.msg);
            alert(data.message);// 本地测试使用
          }
        },
        editSuccess: function (data, option) {
          console.log(this);
          // if(data.state){
          if (data.state === '01') {// 本地测试使用
            var $e = $(option.workDom);
            // var src = data.result[0].filePath;
            var src = './testImg/' + data.data[0].fileName;// 本地测试使用
            var $thisForm = $e.closest('form')
            var name = $thisForm.attr('name');
            var index = $('[name=' + name + ']').index($thisForm);

            var targetType = getTargetType(name);
            createInstance(name, targetType);
            var imgUrlArr = instanceMap[name].imgUrlArr ? instanceMap[name].imgUrlArr : [];
            imgUrlArr[index] = src;

            instanceMap[name].setImgUrlArr(imgUrlArr);
          } else {
            //alert(data.msg);
            alert(data.message);// 本地测试使用
          }
        },
        delete: function (option) {
          var $e = $(option.workDom);
          var $thisForm = $e.closest('form');
          var name = $thisForm.attr('name');
          var index = $('[name=' + name + ']').index($thisForm);

          var targetType = getTargetType(name);
          createInstance(name, targetType);
          var imgUrlArr = instanceMap[name].imgUrlArr ? instanceMap[name].imgUrlArr : [];
          imgUrlArr.splice(index, 1);

          instanceMap[name].setImgUrlArr(imgUrlArr);
        },
      });
    multipleUploadInit({
      // url: path + '/contractController/uploadAttachmentPic',
      url: '/a/file/upload',// 本地测试使用
    }, {
        success: function (data, option) {
          console.log(this);
          // if(data.state){
          if (data.state === '01') {// 本地测试使用
            var $e = $(option.workDom);
            var $thisForm = $e.closest('form');
            var name = $thisForm.attr('name');

            var targetType = getTargetType(name);
            createInstance(name, targetType);
            var imgUrlArr = instanceMap[name].imgUrlArr ? instanceMap[name].imgUrlArr : [];
            var imgLength = data.data.length;
            for (var i = 0; i < imgLength; i++) {
              // var src = data.result[i].filePath;
              var src = './testImg/' + data.data[i].fileName;// 本地测试使用
              imgUrlArr.push(src);
            }
            var limit = $e.attr('img-limit');
            if (imgUrlArr.length > limit) {
              imgUrlArr.splice(limit);
              alert('限制' + limit + '张图片！');
            }
            instanceMap[name].setImgUrlArr(imgUrlArr);
          } else {
            //alert(data.msg);
            alert(data.message);// 本地测试使用
          }
        },
        delete: function (option) {
          var $e = $(option.workDom);
          var $thisForm = $e.closest('form');
          var name = $thisForm.attr('name');
          var $thisShowImg = $e.closest('.batch-file-show-img');
          var index = $thisForm.find('.batch-file-show-img').index($thisShowImg);

          var targetType = getTargetType(name);
          createInstance(name, targetType);
          var imgUrlArr = instanceMap[name].imgUrlArr ? instanceMap[name].imgUrlArr : [];
          imgUrlArr.splice(index, 1);

          instanceMap[name].setImgUrlArr(imgUrlArr);
        },
      });
  }

  function styleInit() {
    // 除 非基本合同信息的日期相关的含data-replace属性的输入框 禁止编辑
    $('[data-replace]').attr('readOnly', true);
    // 非基本合同信息的日期相关可编辑
    $('[data-replace="chs-formate"],[data-replace="yyyy"],[data-replace="mm"],[data-replace="dd"]').attr('readOnly', false);
    // 初始化单选复选
    $('[data-radio],[data-checkbox]').each(function () {
      var $this = $(this);
      var name = $this.attr('name');
      var $name = $('[name=' + name + ']');
      // 一个元素组第一个元素的fill-style属性定义填充样式
      var useFillStyle = $name.eq(0).attr('fill-style');
      var styleName = useFillStyle ? useFillStyle : 'tick';
      $this.html(fillStyle[styleName].false);
    })
    // $('[data-checkbox]').each(function () {
    //   var $this = $(this);
    //   var name = $this.attr('name');
    //   var $name = $('[name=' + name + ']');
    //   // 一个多选元素组的第一个元素的checkbox-style属性定义填充样式
    //   var styleName = $name.eq(0).attr('fill-style') ? $name.eq(0).attr('fill-style') : 'tick';
    //   $this.html(fillStyle[styleName].false);
    // })
    // 移动端处理
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      console.log('手机端样式调整');
      // 全局样式调整
      $('.container').css({ 'width': '700px', 'border': 'none', 'padding': 0 });
      $('.no-page,.split,.page').css({ 'width': '700px', 'margin': '0 auto', 'padding': '80px 20px' });
      $('.split,.page').css({ 'height': '1123px' });
      // $('.cont').css({ 'padding': '80px 20px' });
      // 签名部分样式调整
      $('.signature-box').css({ 'transform': 'rotate(90deg)', 'background': '#fff', 'width': '100vh', 'height': '100vw' });
      $('.signature-box>div').css({ 'width': '100%', 'height': '100%', 'margin': '0' });
      var $signatureBox = $('.signature-box');
      $('.signature-box').css({ 'display': 'block' });
      var signatureBoxPos = $signatureBox.position();
      $signatureBox.css({ top: signatureBoxPos.top * -1 + 'px', left: signatureBoxPos.left * -1 + 'px' });
      $('.signature-box').css({ 'display': 'none' });
    };
  };
  function setTableName() {
    // 有name的表格，给表格中没有name的input标签插入name和table-name（name="行-列",table-name="表格的name"）
    $('table[name]').each(function () {
      var $table = $(this);
      var name = $table.attr('name');
      $table.find('tbody tr').each(function (index) {
        $(this).find('td').each(function (tdIndex, td) {
          var $input = $(td).find('input');
          if (!$input.attr('name')) {
            // $input.attr('name', index + '-' + tdIndex);
            // $input.attr('table-name', name);
            $input.attr('table-coordinate', index + '-' + tdIndex);
            $input.attr('name', name);
          }
        })
      })
    });
  };
  //设置默认属性
  function setDefault(originValue,defaultValue,reg){
    console.log(reg.exec(originValue))
    if (reg.exec(originValue) == null || originValue == "") {
      originValue = defaultValue;
    }
    return originValue;
  }
  //设置水印样式
  function setWaterMarkStyle() {
    $('[target-type="waterMark"]').each(function () {
      var $waterMark = $(this);
      var top = parseInt($waterMark.eq(0).attr("top"));
      var color = $waterMark.attr('fontColor');
      var size = $waterMark.attr('fontSize');
      var opacity = $waterMark.attr('opacity');
      var transform = $waterMark.attr('textTransform');
      var numReg = /^[0-9]+.?[0-9]*$/;
      var colorReg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
      var opacityReg = /\b(0(\.\d{1,2})?)|1\b/;
      var transformReg = /^-?1?[0-8]?[0-9](\.[0-9]{1,6})?$/;
//      console.log("top="+top+"----color="+color+"----size="+size+"----opacity="+opacity+"----transform="+transform)
      top = setDefault(top,1.5*PDFHeight,numReg);
      top = top + 400;
      size = setDefault(size,50,numReg);
      color = setDefault(color,"#000000",colorReg);
      opacity = setDefault(opacity,0.15,opacityReg);
      transform = setDefault(transform,-30,transformReg);
      transform = -Math.abs(transform);
      
 //     console.log("top="+top+"----color="+color+"----size="+size+"----opacity="+opacity+"----transform="+transform)
      mask_style["color"] = color;
      mask_style["font-size"] = size+"px";
      mask_style["opacity"] = opacity;
      mask_style["transform"] = "rotate("+ transform +"deg)";
      mask_style["-webkit-transform"] = "rotate("+ transform +"deg)";
      mask_style["-moz-transform"] = "rotate("+ transform +"deg)";
      mask_style["-ms-transform"] = "rotate("+ transform +"deg)";
      mask_style["-o-transform"] = "rotate("+ transform +"deg)";
      $waterMark.find("p").each(function (index) {
        mask_style["top"] = top;
        $(this).css(mask_style);
        top += PDFHeight;
    });
  });
}
  /**
   *将接受到的后台数据反显到页面中
    *
    * @param {*} data  传入的数据
    */
  function dataWriteView(data) {
    for (var i in data) {
      var name = i;
      var value = data[i];
      var targetType = getTargetType(name);
      createInstance(name, targetType);
      switch (targetType) {
        case 'moneyInput':
          if (typeof (value) == 'object' && value.smallMoney) {
            value = value.smallMoney;
          }
          instanceMap[name].setSmallMoney(value);
          break;
        case 'dateInput':
          if (typeof (value) == 'object' && value.dateStr != undefined) {//value为对象，且value.dateStr存在
            value = value.dateStr;
          }else if(typeof (value) == 'object' && value.dateStr == undefined){//value为对象，而且value.dateStr不存在
            value = "";
          }else if(value==null){//基础信息为空时
            value = "";
          }
          instanceMap[name].setDateStr(value);
          break;
        case 'hlscsRadio':
          if (typeof (value) == 'object' && value.optionKey) {
            if (value.otherValue) {
              instanceMap[name].setOtherValue(value.otherValue);
            }
            value = value.optionKey;
          }
          instanceMap[name].setOptionKey(value);
          break;
        case 'specialReadOnlyRadio':
          if (typeof (value) == 'object' && value.optionKey) {
            if (value.otherValue) {
              instanceMap[name].setOtherValue(value.otherValue);
            }
            value = value.optionKey;
          }
          instanceMap[name].setOptionKey(value);
          break;
        case 'hlscsChk':
          var optionKeyArr;
          if (typeof (value) == 'object' && value.optionKeyArr) {
            if (value.otherValue) {
              instanceMap[name].setOtherValue(value.otherValue);
            }
            optionKeyArr = value.optionKeyArr;
          } else {
            value = value ? value : '';
            optionKeyArr = value.split(',');
          }
          instanceMap[name].setOptionKeyArr(optionKeyArr);
          break;
        case 'hlscsTable':
          instanceMap[name].setValueObj(value);
          break;
        case 'singleImgUploader':
          instanceMap[name].setImgUrl(value.src);
          break;
        case 'addImgUploader':
        case 'multipleImgUploader':
          var srcArr = [];
          for (var i in value) {
            srcArr.push(value[i].src);
          }
          instanceMap[name].setImgUrlArr(srcArr);
          break;
        case 'wordbreakInput':
          instanceMap[name].setValue(value);
          break;
        case 'signature':
          instanceMap[name].setImgPath(value.src);
          break;
        case 'waterMark':
          instanceMap[name].setInfo(value,data.isWaterMark);
          break;
        case 'twoCode':
          instanceMap[name].setSrc(value.src);
          break;
        case 'basicText':
          instanceMap[name].setText(value);
          break;
        default:
          instanceMap[name].setValue(value);
          break;
      }
    }
  }
  /**
   *设置用户操作权限
    *
    */
  function setUserPower() {
    var readOnly = function () {
      // 禁止input输入
      $('input').attr('readOnly', true);
      // 禁用图片上传和删除功能
      $('input[type="file"]').attr('type', 'hidden');
      $('.file-delete,.batch-file-close,.batch-file-select').css('display', 'none');
      $('[file-type="add"]').closest('form').css('display', 'none');
    };
    var lesseeEdit = function () {
      // 禁止input输入
      $('input').attr('readOnly', true);
      $('input[data-power="lessee"]').each(function () {
        var name = $(this).attr('name');
        $('[name="' + name + '"]').attr('readOnly', false);
      })//attr('readOnly', true);
      // 禁用图片上传和删除功能
      $imgUpload = $('form[data-power!="lessee"]');
      $imgUpload.find('input[type="file"]').attr('type', 'hidden');
      $imgUpload.find('.file-delete,.batch-file-close,.batch-file-select').css('display', 'none');
      $imgUpload.find('[file-type="add"]').closest('form').css('display', 'none');
    };
    var lessorEdit = function () {
      // 禁止input输入
      $('input[data-power="lessee"]').each(function () {
        var name = $(this).attr('name');
        $('[name="' + name + '"]').attr('readOnly', true);
      })//attr('readOnly', true);
      // 禁用图片上传和删除功能
      $imgUpload = $('form[data-power="lessee"]');
      $imgUpload.find('input[type="file"]').attr('type', 'hidden');
      $imgUpload.find('.file-delete,.batch-file-close,.batch-file-select').css('display', 'none');
      $imgUpload.find('[file-type="add"]').closest('form').css('display', 'none');
    };
    switch (contBasicData.btnCtrl) {
      case '01':// 01：出租人从个人中心点击查看，显示按钮：撤消；内容不可编辑
        $('section:first').append('<div class="btn-step-group"><button class="btn-step" id="cancel">撤消</button></div>');
        readOnly();
        instanceMap = null;
        break;
      case '02':// 02：承租人从个人中心点击查看，显示按钮：接受，拒绝，暂不处理；承租人内容可编辑；基本项不可编辑；
        $('section:first').append('<div class="btn-step-group"><button class="btn-step" id="accept">接受</button><button class="btn-step" id="reject">拒绝</button><button class="btn-step" id="notHandle">暂不处理</button></div>');
        // readOnly();
        lesseeEdit();
        instanceMap = lesseeInstanceMap;
        break;
      case '03':// 03：出租人从首页进入起草合同，显示按钮，上一步，确认合同信息下一步；出租人内容可编辑；基本项不可编辑；
        $('section:first').append('<div class="btn-step-group"><button class="btn-step" id="goback">上一步</button><button class="btn-step" id="confirm">确认合同信息，下一步</button></div>');
        // 合同基本信息的相关input标签禁止输入
        for (var i in contBasicData) {
          var $these = $('[name=' + i + ']');
          if ($these.is('input')) {
            $these.attr('readOnly', true);
          }
        }
        lessorEdit();
        instanceMap = lessorInstanceMap;
        break;
      default:
        readOnly();
        instanceMap = null;
        break;
    }
    contBasicInstanceMap = null;
    lessorInstanceMap = null;
    lesseeInstanceMap = null;
  }
  /**
   *合同模板初始化
    *
    * @param {*} data
    */
  contractInit = function (data) {
    //图片上传初始化
    fileUploadInit();
    //签名初始化
    $('.signature-show img').attr('src', './vendor/signature.png');// 本地测试使用
    initSigrc();
    //样式初始化
    styleInit();
    //设置表格里input标签的name
    setTableName();

    // 数据获取
    // try {
    //     lessorExtendData = data.contractExtend ? JSON.parse(data.contractExtend):{};
    // } catch (error) {
    //     console.log('contractExtend非json格式字符串');
    //     lessorExtendData = {};
    // }
    lessorExtendData = data.contractExtend;// 本地测试使用
    delete data.contractExtend;
    // try {
    //     lesseeExtendData = data.lesseeExtend ? JSON.parse(data.lesseeExtend):{};
    // } catch (error) {
    //     console.log('lesseeExtend非json格式字符串');
    //     lesseeExtendData = {};
    // }
    lesseeExtendData = data.lesseeExtend;// 本地测试使用
    delete data.lesseeExtend;

    contBasicData = data;

    // 承租人编辑的信息
    instanceMap = lesseeInstanceMap;
    dataWriteView(lesseeExtendData);
    // 出租人编辑的信息
    instanceMap = lessorInstanceMap;
    dataWriteView(lessorExtendData);
    // 合同基础信息
    instanceMap = contBasicInstanceMap;
    dataWriteView(contBasicData);
    console.log(contBasicData.jfrq)

    console.log(contBasicInstanceMap);
    console.log(lessorInstanceMap);
    console.log(lesseeInstanceMap);

    //设置用户操作权限
    setUserPower();
    //签名初始化
    // signatureInit();
    //设置水印样式
    setWaterMarkStyle();
  };
})()



  /** 向后台提交操作
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
  */
  ; (function () {
    /**
     *提交操作的ajax接口
     *
     * @param {*} obj
     */
    function handle(obj) {
      $.ajax({
        type: obj.type ? obj.type : 'post',
        url: obj.url ? obj.url : path + '/contractController/updateContract',
        data: obj.data,
        dataType: 'json',
        success: function (data) {
          if (data.state) {
            console.log('保存成功：', data.result);
            if (obj.success) {
              obj.success(data.result);
            }
          } else {
            alert(data.msg);
          }
        },
        error: function (xhr, textStatus) {
          if (xhr == 504) {
            alert('请求超时，请稍后再试。');
          } else {
            alert('连接出错，请稍后再试。');
          }
        }
      });
    }
    /**
     *获取提交后台的数据
     *
     * @returns
     */
    function getUploadData() {
      var resultData = {};
      for (var i in instanceMap) {
        resultData[i] = instanceMap[i].getUploadValue();
      }
      return resultData;
    }
    // 弹框提示
    var alertMessage = {
      cancel: '撤销网签后，网签合同将取消并删除',
      accept: '确定合同信息无误？',
      reject: '拒绝合同并退回给出租方？',
    }
    //"03"-确认合同，下一步,"04"-接受合同,"05"-撤销合同,"06"-拒绝合同
    // 撤消
    $('body').on('click', '#cancel', function () {
      console.log('撤消');
      alertCan(alertMessage.cancel, {
        sure: function () {
          handle({
            type: 'post',
            data: { code: urlSearchJson.code, operateFlag: '05' },
            success: function (data) {
              window.location.href = path + '/personalRent/personalRentList?types=2';
            }
          });
        }
      });
    })
    // 接受
    //接受之前，添加承租人输入信息，
    $('body').on('click', '#accept', function () {
      console.log('接受');
      alertCan(alertMessage.accept, {
        sure: function () {
          handle({
            type: 'post',
            url: path + '/contractController/acceptContract',
            data: { code: urlSearchJson.code, operateFlag: '04', lesseeExtend: JSON.stringify(getUploadData()) },
            success: function (data) {
              window.location.href = path + '/contractController/toAcceptContractSuccess';
            }
          });
        }
      });
    })
    // 拒绝
    $('body').on('click', '#reject', function () {
      console.log('拒绝');
      alertCan(alertMessage.reject, {
        sure: function () {
          handle({
            type: 'post',
            data: { code: urlSearchJson.code, operateFlag: '06' },
            success: function (data) {
              window.location.href = path + '/personalRent/personalRentList?types=2';
            }
          });
        }
      });
    })
    // 暂不处理
    $('body').on('click', '#notHandle', function () {
      console.log('暂不处理');
      window.location.href = path + '/personalRent/personalRentList?types=2';
    })
    // 上一步
    $('body').on('click', '#goback', function () {
      console.log('上一步');
      window.history.go(-1);
    })
    // 确认合同信息下一步
    $('body').on('click', '#confirm', function () {
      console.log('确认合同信息下一步', { code: urlSearchJson.code, operateFlag: '03', contractExtend: instanceMap }, JSON.stringify(getUploadData()));
      handle({
        type: 'post',
        data: { code: urlSearchJson.code, operateFlag: '03', contractExtend: JSON.stringify(getUploadData()) },
        success: function (data) {
          window.location.href = path + '/contractController/sendMessage?id=' + contBasicData.id + '&code=' + urlSearchJson.code + '&sjhm=' + contBasicData.entYphone;
        }
      });
    })
  })();

/** 用户操作，业务相关
 * input输入
 * 图片上传
 * 签名
 * 单选复选
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
*/
; (function () {
  /**
   *检测是否允许编辑当前的内容
   *
   * @param {*} name
   * @returns
   */
  function editPower(name) {
    if (contBasicData.hasOwnProperty(name)) {
      return { state: false, message: '合同基础信息部分内容不可编辑' };
    }
    var power = $('[name="' + name + '"]').eq(0).attr('data-power');
    if (power == 'lessee') {
      // console.log('承租人编辑内容');
      if (contBasicData.btnCtrl == '02') {
        return { state: true, message: '出租人允许编辑' };
      } else {
        return { state: false, message: '出租人不允许编辑' };
      }
    } else {
      // console.log('出租人编辑内容');
      if (contBasicData.btnCtrl == '03') {
        return { state: true, message: '承租人允许编辑' };
      } else {
        return { state: false, message: '承租人不允许编辑' };
      }
    }
  }
  var inputName = 'input[name]';
  var chineseInput = true;// 中文输入标志
  // 中文输入开始
  $('body').on('compositionstart', inputName, function () {
    chineseInput = false;
  })
  // 中文输入结束
  $('body').on('compositionend', inputName, function () {
    chineseInput = true;
  })
  // 有数据写入触发，数据保存到实例中，并进行反显
  $('body').on('input propertychange', inputName, function () {
    var $this = $(this);
    var type = $this.attr('type');
    var name = $this.attr('name');
    // 编辑权限检测
    var power = editPower(name);
    if (!power.state) {
      console.log(power.message);
      return false;
    }
    if (type === undefined || type === 'text') {
      var targetType = getTargetType(name);
      if (targetType == 'dateInput') {
        return false;
      }
      setTimeout(function () {
        if (!chineseInput) return;
        var value = $this.val();
        var posStart = $this.getCursorPosition();// 获取当前光标坐标
        createInstance(name, targetType);

        switch (targetType) {
          case 'moneyInput':
            instanceMap[name].setSmallMoney(value);
            break;
          case 'hlscsRadio':
          case 'hlscsChk':
            instanceMap[name].setOtherValue(value);
            break;
          case 'hlscsTable':
            var valueObj = {};
            valueObj[$this.attr('table-coordinate')] = value;
            // value = valueObj;
            instanceMap[name].setValueObj(valueObj);
            break;
          case 'wordbreakInput':
            // 从同name元素组中，获取当前元素的换行input组下标
            var $inputs = $('[name="' + name + '"]');
            var thisIndex = $inputs.index($this);// 当前元素在同name元素组的位置
            var groupStratIndex = 0;// 当前换行input组的开始元素在同name元素组的位置
            var groupEndIndex = 0;// 当前换行input组的结束元素在同name元素组的位置
            var endIndexStartState = false;// 结束位置获取结束标志
            $inputs.each(function (index, e) {
              var dataInput = $(e).attr('data-input') === '0' ? true : false;
              groupStratIndex = dataInput && index <= thisIndex ? index : groupStratIndex;
              endIndexStartState = dataInput && index > thisIndex ? true : endIndexStartState;
              groupEndIndex = !endIndexStartState && index > groupEndIndex ? index : groupEndIndex;
            });
            // 获取当前元素的换行input组，遍历取值，合并字符串
            var $dataInputs = $inputs.splice(groupStratIndex, groupEndIndex - groupStratIndex + 1);
            value = '';
            var $dataInputsLength = $dataInputs.length;
            for (var i = 0; i < $dataInputsLength; i++) {
              value += $($dataInputs[i]).val();
            }
            instanceMap[name].setValue(value);
            break;
          case 'basicText':
            instanceMap[name].setText(value);
            break;
          default:
            instanceMap[name].setValue(value);
            break;
        }
        $this.setInputCursorPos(posStart, $dataInputs);// 重置光标坐标
      })
    }
  })

  // 点击输入框时重置光标位置
  $('body').on('click', inputName, function () {
    var $this = $(this);
    var type = $(this).attr('type');
    if (type === undefined || type === 'text')
      $this.setInputCursorPos($this.getCursorPosition());
  })

  //单选点击事件
  $('body').on('click', '[data-radio]', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var power = editPower(name);
    if (!power.state) {
      console.log(power.message);
      return false;
    }
    var value = $this.attr('data-radio');
    var targetType = getTargetType(name);
    createInstance(name, targetType);

    instanceMap[name].setOptionKey(value);
    return false;
  })
  // 复选点击事件
  $('body').on('click', '[data-checkbox]', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var power = editPower(name);
    if (!power.state) {
      console.log(power.message);
      return false;
    }
    var value = $this.attr('data-checkbox');
    var targetType = getTargetType(name);
    createInstance(name, targetType);
    instanceMap[name].optionKeyArr = instanceMap[name].optionKeyArr ? instanceMap[name].optionKeyArr : [];
    var activeArr = [];
    $('[name="' + name + '"]').each(function (index, e) {
      var $e = $(e);
      var eValue = $e.attr('data-checkbox');
      if (eValue === value && (instanceMap[name].optionKeyArr.indexOf(eValue) == -1)) activeArr.push(eValue);
      if (eValue !== value && (instanceMap[name].optionKeyArr.indexOf(eValue) != -1)) activeArr.push(eValue);
    })
    instanceMap[name].setOptionKeyArr(activeArr);
    return false;
  })

  // 失去焦点事件
  // 主要处理日期的拆分和组装
  $('body').on('change', inputName, function () {
    var $this = $(this);
    var name = $this.attr('name');
    var power = editPower(name);
    if (!power.state) {
      console.log(power.message);
      return false;
    }
    var value = $this.val();
    var targetType = getTargetType(name);
    
    if (targetType != 'dateInput') {
      return false;
    } else {
      createInstance(name, targetType);
      var dataReplace = $this.attr('data-replace');
      // 当月和日没有值，赋值为 01
      var yyyy = $('input[name=' + name + '][data-replace="yyyy"]:first').val();
      var mm = $('input[name=' + name + '][data-replace="mm"]:first').val();
      var dd = $('input[name=' + name + '][data-replace="dd"]:first').val();

      if((!yyyy && mm && dd) || (yyyy && !mm && dd) || (yyyy && mm && !dd)){
        value = '';
        instanceMap[name].show();
        instanceMap[name].setDateStr(value);
        return;
      }else if(yyyy && !mm && !dd){
        mm = !mm ? '01' : mm;
        dd = !dd ? '01' : dd;
      }
      switch (dataReplace) {
        case 'chs-formate':
          value = value.replace(/ |日/g, '').replace(/年|月/g, '-');// xxxx 年 xx 月 xx 日 -> xxxx-xx-xx
          break;
        case 'yyyy':
          value = value + '-' + mm + '-' + dd;
          break;
        case 'mm':
          if (!yyyy) {
            alert('请先填写年份。');
            instanceMap[name].show();
            return false;
          }
          value = yyyy + '-' + value + '-' + dd;
          break;
        case 'dd':
          if (!yyyy) {
            alert('请先填写年份。');
            instanceMap[name].show();
            return false;
          }
          value = yyyy + '-' + mm + '-' + value;
          break;
      }
    }
    var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
    if(value.length>0){
      if (!value.match(reg)) {
        switch (dataReplace) {
          case 'chs-formate':
            alert('请填写“yyyy年mm月dd日”的日期格式');
            break;
          case 'yyyy':
            alert('请填写合理年份');
            break;
          case 'mm':
            alert('请填写合理月份');
            break;
          case 'dd':
            alert('请填写合理日期');
            break;
          default:
            alert('请填写“yyyy-mm-dd”的日期格式');
        }
        instanceMap[name].show();
        return false;
      }
    }
    instanceMap[name].setDateStr(value);
  })

  // 点击事件
  // 判断显示默认时间还是当前时间
  $('body').on('click', inputName, function () {
    var $this = $(this);
    var name = $this.attr('name');
    var power = editPower(name);
    if (!power.state) {
      console.log(power.message);
      return false;
    }
    var value;
    var dateState = $this.attr("datestate");
    var targetType = getTargetType(name);
    var myDate = new Date();//获取系统当前时间
    if(typeof( dateState) == "undefined" || targetType != 'dateInput'){
       return;  
    }else{
      if ( dateState == 'nowDate'){
        createInstance(name, targetType);
        var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
        var day = myDate.getDate(); 
        month = month <=9 ? '0'+month : month;
        day = day <=9 ? '0'+day : day;
        value = year + '-' + month + '-' + day;
        instanceMap[name].setDateStr(value);
        instanceMap[name].show();
      }
    }
  })

  // 签名触发
  $('body').on('click', '.signature-show', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var power = editPower(name);
    if (!power.state) {
      console.log(power.message);
      return false;
    }
    var targetType = getTargetType(name);
    createInstance(name, targetType);

    instanceMap[name].open();
  })
})()

  /** 光标设置相关
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
  */
  ; (function ($, undefined) {
    /**
     *获取光标坐标
     *
     * @returns
     */
    $.fn.getCursorPosition = function () {
      var el = $(this).get(0);
      var pos = 0;
      if ('selectionStart' in el) {
        pos = el.selectionStart;
      } else if ('selection' in document) {
        el.focus();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart('character', -el.value.length);
        pos = Sel.text.length - SelLength;
      }
      return pos;
    }
    /**
     *设置光标坐标
     *
     * @param {*} pos   设置的光标坐标
     * @returns
     */
    $.fn.setCursorPosition = function (pos) {
      var el = $(this).get(0);
      if ('selectionStart' in el) {
        el.setSelectionRange(pos, pos);
      } else if ('selection' in document) {
        var range = el.createTextRange();
        range.moveStart("character", -el.value.length); //左边界移动到起点
        range.move("character", index); //光标放到index位置
        range.select();
      }
      return pos;
    }
    /**
     *
     *input设置光标位置
     * @param {*} posStart  光标当前位置
     * @param {*} els   一个换行的input元素组（同一个name，从含data-input="0"元素开始，到下一个data-input="0"前，含当前操作的input元素的组）
     */
    $.fn.setInputCursorPos = function (posStart, els) {
      var $this = $(this);
      var name = $this.attr('name');
      var $inputs = $('input[name=' + name + ']');
      var dataLengthLimit = $this.attr('data-length');//数据长度限制dataLength->dataLengthLimit
      var moveNum = posStart;
      var sub = posStart - dataLengthLimit;
      var $els = $(els);
      var elsLength = $els.length;
      // 条件：els有传值，数据长度限制不为空，且光标位置和数据长度限制的差大于0
      // 给下一个input元素设置为focus
      for (; elsLength > 0 && dataLengthLimit !== undefined && sub > 0;) {
        var thisIndex = $els.index($this);//$inputs.index($this);//
        $this = $els.eq(thisIndex + 1);
        $this.focus();
        moveNum = sub;
        dataLengthLimit == $this.attr('data-length');
        sub = sub - dataLengthLimit;
      }
      // 条件：光标坐标为0，且当前input元素非input元素组的第一个
      // 把光标设置在当前input元素的前一个input最后
      if (posStart === 0 && $this.attr('data-input') !== '0') {
        var thisIndex = $inputs.index($this);
        var $previousInput = $inputs.eq(thisIndex - 1);
        var preDataLength = $previousInput.attr('data-length');
        if (preDataLength !== undefined) {
          $this = $previousInput;
          $this.focus();
          moveNum = preDataLength;
        }
      }
      $this.setCursorPosition(moveNum);
    }
  })($);