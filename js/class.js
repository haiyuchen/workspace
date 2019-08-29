/**
 *判断实例是否存在，没有则创建实例
 *
 * @param {*} name  实例key值
 */
function createInstance(name, targetType) {
  if (!instanceMap[name]) {
    switch (targetType) {
      case 'moneyInput':
        instanceMap[name] = new MoneyInput(name);
        break;
      case 'dateInput':
        instanceMap[name] = new DateInput(name);
        break;
      case 'wordbreakInput':
        instanceMap[name] = new WordbreakInput(name);
        break;
      case 'hlscsRadio':
        var $name = $('[name=' + name + ']');
        // 一个单选元素组的第一个元素的fill-style属性定义填充样式
        var styleName = $name.eq(0).attr('fill-style') ? $name.eq(0).attr('fill-style') : 'tick';
        var useStyle = fillStyle[styleName];
        var dataReplace = $('[name="' + name + '"][data-replace]').attr('data-replace');
        instanceMap[name] = new HlscsRadio(name, useStyle, agreed[dataReplace]);
        break;
      case 'specialReadOnlyRadio':
        var $name = $('[name=' + name + ']');
        // 一个单选元素组的第一个元素的fill-style属性定义填充样式
        var styleName = $name.eq(0).attr('fill-style') ? $name.eq(0).attr('fill-style') : 'tick';
        var useStyle = fillStyle[styleName];
        var dataReplace = $('[name="' + name + '"][data-replace]').attr('data-replace');
        instanceMap[name] = new SpecialReadOnlyRadio(name, useStyle, agreed[dataReplace]);
        break;
      case 'hlscsChk':
        var $name = $('[name=' + name + ']');
        // 一个复选元素组的第一个元素的fill-style属性定义填充样式
        var styleName = $name.eq(0).attr('fill-style') ? $name.eq(0).attr('fill-style') : 'tick';
        var useStyle = fillStyle[styleName];
        var dataReplace = $('[name="' + name + '"][data-replace]').attr('data-replace');
        instanceMap[name] = new HlscsChk(name, useStyle, agreed[dataReplace]);
        break;
      case 'hlscsTable':
        instanceMap[name] = new HlscsTable(name);
        break;
      case 'addImgUploader':
        var $name = $('[name=' + name + ']').last().clone();
        $name.find('.file-progress, .loading').css("display", "none");
        $name.find('.progress-bar').css('width', '0%');
        $name.find('input').val('');
        instanceMap[name] = new AddImgUploader(name, $name);
        break;
      case 'singleImgUploader':
        instanceMap[name] = new SingleImgUploader(name);
        break;
      case 'multipleImgUploader':
        instanceMap[name] = new MultipleImgUploader(name);
        break;
      case 'signature':
        var initdata = {
          // url: path + '/contractController/uploadSignPic',
          url: '/a/file/uploadBase64',// 本地测试使用
          targetName: name,
          // imgPath : '../imgs/signature.png', //为空则使用默认图片
          // imgPath : './testImg/pen.png', //为空则使用默认图片
          callback: function (data) {
            // if (data.state == true) {
            if (data.state === '01') {// 本地测试使用
              // var imgUrl = data.result.filePath;
              var imgUrl = '../testImg/' + data.data.fileName;// 本地测试使用
              // var name = this.targetName;
              // instanceMap[name].setImgPath(imgUrl);
              return imgUrl;
            } else {
              alert(data.msg);
            }
          },
        }
        instanceMap[name] = new sigrc(initdata);
        break;
      case 'waterMark':
        //设置水印样式
        var $name = $('[name=' + name + ']');
        var windowHeight = $(".container").height();
        var top = parseInt($name.eq(0).attr("top"));console.log(top)
        var num = 0;
        var reg=/^[0-9]+.?[0-9]*$/;
        if (reg.exec(top) == null || top == "") {//为空时，或者输入值不是数字，则采用默认值
          top = 1.5*PDFHeight;
        }
        top = top + 400;
        console.log("windowHeight="+windowHeight+"top="+top)
        for(var i = top;i < windowHeight;i += PDFHeight){
          num ++;
          console.log(i)
        }
        instanceMap[name] = new WaterMark(name,num);
        break;
      case 'twoCode':
        var $name = $('[name=' + name + ']');
        var imgSize = $name.eq(0).attr("imgSize");
        instanceMap[name] = new TwoCode(name,imgSize);
        break;
      case 'basicText':
        var $name = $('[name=' + name + ']');
        instanceMap[name] = new BasicText(name);
        break;
      default:
        instanceMap[name] = new BasicInput(name);
        break;
    }
  }
}
/**
 *获取组件的类型
 *
 * @param {*} name  实例key值
 * return 返回组件类型
 */
function getTargetType(name) {
  // var targetType = 'basicInput';
  var targetType = $('[name="' + name + '"]').eq(0).attr('target-type');
  switch (targetType) {
    case 'moneyInput':
      targetType = 'moneyInput';
      break;
    case 'dateInput':
      targetType = 'dateInput';
      break;
    case 'wordbreakInput':
      targetType = 'wordbreakInput';
      break;
    case 'radio':
      targetType = 'hlscsRadio';
      break;
    case 'specialReadOnlyRadio':
      targetType = 'specialReadOnlyRadio';
      break;
    case 'checkbox':
      targetType = 'hlscsChk';
      break;
    case 'table':
      targetType = 'hlscsTable';
      break;
    case 'addImgUploader':
      targetType = 'addImgUploader';
      break;
    case 'singleImgUploader':
      targetType = 'singleImgUploader';
      break;
    case 'multipleImgUploader':
      targetType = 'multipleImgUploader';
      break;
    case 'signature':
      targetType = 'signature';
      break;
    case 'waterMark':
      targetType = 'waterMark';
      break;
    case 'twoCode':
      targetType = 'twoCode';
      break;
    case 'basicText':
      targetType = 'basicText';
      break;
    default:
      targetType = 'basicInput';
      break;
  }
  return targetType;
}
/**
 * 基础input
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
function BasicInput(name) {
  this.domId = name;// input标签的name属性
  this.value;// 实例的值，字符串
}
// 传入value参数，调用show()方法
BasicInput.prototype.setValue = function (value) {
  this.value = value;
  this.show();
};
// 上传后台的数据结构
BasicInput.prototype.getUploadValue = function () {
  return this.value;
}
// 把实例中的值回显到页面
BasicInput.prototype.show = function () {
  $('[name="' + this.domId + '"]').val(this.value);
}


/**
 * 基础文本span
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
function BasicText(name) {
  this.domId = name;// input标签的name属性
  this.text;// 实例的值，字符串
}
// 传入value参数，调用show()方法
BasicText.prototype.setText = function (text) {
  this.text = text;
  this.show();
};
// 上传后台的数据结构
BasicText.prototype.getUploadValue = function () {
  return this.text;
}
// 把实例中的值回显到页面
BasicText.prototype.show = function () {
  $('[name="' + this.domId + '"]').text(this.text);
}



/****金额大小写input
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
function MoneyInput(name) {
  this.domId = name;// input标签的name属性
  this.smallMoney;// 小写金额
  this.bigMoney;// 大写金额
}
// 传入smallMoney参数，并设置bigMoney，最后调用show()方法
MoneyInput.prototype.setSmallMoney = function (smallMoney) {
  this.smallMoney = smallMoney;
  this.bigMoney = this.getBigMoney(this.smallMoney);
  this.show();
};
// 上传后台的数据结构
MoneyInput.prototype.getUploadValue = function () {//
  return {
    smallMoney: this.smallMoney,
    bigMoney: this.bigMoney
  };
}
// 把实例中的值回显到页面
MoneyInput.prototype.show = function () {
  var that = this;
  $('[name="' + this.domId + '"]').each(function () {
    var $this = $(this);
    var dataReplace = $this.attr('data-replace');
    switch (dataReplace) {
      case 'chineseMoney':
        $this.val(that.bigMoney);
        break;
      default:
        $this.val(that.smallMoney);
        break;
    }
  })
}
/**
 *金额小写转大写
 *
 * @param {*} money  小写金额
 * @returns
 */
MoneyInput.prototype.getBigMoney = function (money) {
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  var cnIntUnits = new Array('', '万', '亿', '兆');
  var cnDecUnits = new Array('角', '分', '毫', '厘');
  var cnInteger = '整';
  var cnIntLast = '元';
  var maxNum = 999999999999999.9999;
  var integerNum;
  var decimalNum;
  var chineseStr = '';
  var parts;
  if (money == '') { return ''; }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '******';
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  money = money.toString();
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(integerNum, 10) > 0) {
    var zeroCount = 0;
    var IntLen = integerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = integerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  if (decimalNum != '') {
    var decLen = decimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}
/**日期input
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
function DateInput(name) {
  this.domId = name;// input标签的name属性
  this.dateStr;// yyyy-mm-dd格式的日期
  this.chsDateStr;// yyyy 年 mm 月 dd 日格式的日期
  this.year;// 年：yyyy
  this.month;// 月：mm
  this.day;// 日：dd
}
// 传入dateStr参数，并设置chsDateStr、year、month、day，最后调用show()方法
DateInput.prototype.setDateStr = function (dateStr) {
  console.log(dateStr)
  var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
  if(dateStr.length>0){
    if (!dateStr.match(reg)) {
      // $('body').eq(0).focus();
      alert('日期格式错误');
      this.show();
      return false;
    }
  }
  this.dateStr = dateStr;
  this.chsDateStr = this.formatdate('', dateStr);
  this.year = this.formatdate('yyyy', dateStr);
  this.month = this.formatdate('mm', dateStr);
  this.day = this.formatdate('dd', dateStr);
  this.show();
};
// 上传后台的数据结构
DateInput.prototype.getUploadValue = function () {
  return {
    dateStr: this.dateStr,
    chsDateStr: this.chsDateStr,
    year: this.year,
    month: this.month,
    day: this.day,
  };
};
// 把实例中的值回显到页面
DateInput.prototype.show = function () {
  var that = this;
  $('[name="' + this.domId + '"]').each(function () {
    var $this = $(this);
    var dataReplace = $this.attr('data-replace');
    switch (dataReplace) {
      case 'chs-formate':
        $this.val(that.chsDateStr);
        break;
      case 'yyyy':
        $this.val(that.year);
        break;
      case 'mm':
        $this.val(that.month);
        break;
      case 'dd':
        $this.val(that.day);
        break;
      default:
        $this.val(that.dateStr);
        break;
    }
  })
}
/**
*日期转换、截取
*
* @param {*} pattern  '':yyyy-mm-dd -> yyyy 年 mm 月 dd 日；'yyyy'：yyyy-mm-dd -> yyyy；'mm'：yyyy-mm-dd -> mm；'dd'：yyyy-mm-dd -> dd；
* @param {*} date  日期
* @returns
*/
DateInput.prototype.formatdate = function (pattern, date) {
  if (date) {
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    if (parseInt(m) < 9) {
      m = '0' + (m + 1);
    } else {
      m = parseInt(m) + 1;
    }
    if (parseInt(d) < 10) {
      d = '0' + d;
    }
    if (pattern) {
      if ('yyyy' == pattern) {
        return y;
      } else if ('mm' == pattern) {
        return m;
      } else if ('dd' == pattern) {
        return d;
      } else {
        return '';
      }
    } else {
      return y + ' 年 ' + m + ' 月 ' + d + ' 日';
    }
  } else {
    return '';
  }
}
/**单选
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @param {*} name 
 * @param {*} fillStyle 填充样式
 * @param {*} agreedData 约定数据
 */
function HlscsRadio(name, fillStyle, agreedData) {
  this.domId = name;// 
  this.agreedData = agreedData;// 约定数据
  this.fillStyle = fillStyle;// 填充样式
  this.optionKey;// 选项值
  this.optionValue;// 选项值对应的中文（约定数据）
  this.otherValue;// 选项值为other对应的中文（用户自填）
};
// 传入optionKey，设置optionValue，optionKey为“other”时设置otherValue，调用show方法
HlscsRadio.prototype.setOptionKey = function (optionKey) {
  this.optionKey = optionKey;
  // var dataReplace = $('[name="' + this.domId + '"][data-replace]').attr('data-replace');
  if (this.agreedData)
    this.optionValue = this.agreedData.getName(optionKey);
  if (this.optionKey != 'other')
    this.otherValue = '';
  this.show();
};
// 传入otherValue，设置optionKey为“other”，调用show方法
HlscsRadio.prototype.setOtherValue = function (otherValue) {
  this.otherValue = otherValue;
  // if (!this.optionKey)
  this.optionKey = 'other';
  this.show();
};
// 上传后台的数据结构
HlscsRadio.prototype.getUploadValue = function () {
  return {
    fillStyle: this.fillStyle,
    optionKey: this.optionKey,
    optionValue: this.optionValue,
    otherValue: this.otherValue
  };
};
// 把实例中的值回显到页面
HlscsRadio.prototype.show = function () {
  var that = this;
  $('[name="' + this.domId + '"]').each(function () {
    var $this = $(this);
    var dataReplace = $this.attr('data-replace');
    var radioInput = $this.attr('radio-input');
    if (dataReplace) {
      $this.val(that.optionValue);
    } else if (radioInput == 'otherValue') {
      $this.val(that.otherValue);
    } else {
      var dataRadio = $this.attr('data-radio');
      // 选中状态判断
      // 选项值为“other”的是否选中状态判断
      var otherState = (dataRadio == 'other' && $('[name=' + that.domId + '][data-radio=' + that.optionKey + ']').length === 0);
      if (dataRadio == that.optionKey || otherState) {
        // 数组含要对比的数据
        $this.html(that.fillStyle['true']);
      } else {
        $this.html(that.fillStyle['false']);
      }
    }
  })
};

/**仅用来显示的单选
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @param {*} name 
 * @param {*} fillStyle 填充样式
 * @param {*} agreedData 约定数据
 */
function SpecialReadOnlyRadio(name, fillStyle, agreedData) {
  this.domId = name;// 
  this.agreedData = agreedData;// 约定数据
  this.fillStyle = fillStyle;// 填充样式
  this.optionKey;// 选项值
  this.optionValue// 选项值对应的中文（约定数据）
};
// 传入optionKey，设置optionValue，调用show方法
SpecialReadOnlyRadio.prototype.setOptionKey = function (optionKey) {
  this.optionKey = optionKey;
  if (this.agreedData)
    this.optionValue = this.agreedData.getName(optionKey);
  this.show();
};
// 上传后台的数据结构，因无需上传，设置为null
SpecialReadOnlyRadio.prototype.getUploadValue = function () {
  return null;
};
// 把实例中的值回显到页面
SpecialReadOnlyRadio.prototype.show = function () {
  var that = this;
  var containOptionsState = false;// 含有optionKey值选项的判断状态
  $('[name="' + this.domId + '"]').each(function () {
    var $this = $(this);
    var dataRadio = $this.attr('data-radio');
    dataRadio = dataRadio ? dataRadio : '';
    // data-radio设定值可为 01 或 01,02 或 other 等，切割成数值
    var arrDataRadioType = dataRadio.split(',');
    if (arrDataRadioType.indexOf(that.optionKey) != -1) {
      $this.html(that.fillStyle['true']);
      containOptionsState = true;
    } else {
      $this.html(that.fillStyle['false']);
    }
  })
  if (!containOptionsState) {
    $('[name=' + that.domId + '][data-radio="other"]').html(that.fillStyle['true']);
    $('input[data-replace]').val(that.optionValue);
  }
};

/**多选
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @param {*} name 
 * @param {*} fillStyle 填充样式
 * @param {*} agreedData 约定数据
 */
function HlscsChk(name, fillStyle, agreedData) {
  this.domId = name;
  this.agreedData = agreedData;// 约定数据
  this.fillStyle = fillStyle;// 填充样式
  this.optionKeyArr;// 选项值（数组）
  this.optionValueArr;// 选项值对应的中文（数组）（约定数据）
  this.otherValue;// 选项值为other对应的中文（用户自填）
};
// 传入optionKeyArr，设置optionValueArr，optionKeyArr含有'other'值时，把otherValue插入optionValueArr，调用show方法
HlscsChk.prototype.setOptionKeyArr = function (optionKeyArr) {
  this.optionKeyArr = optionKeyArr;
  if (this.agreedData) {
    var nameArr = [];
    for (var i in optionKeyArr) {
      nameArr[i] = this.agreedData.getName(optionKeyArr[i]);
      if (optionKeyArr[i] == 'other' && this.otherValue) {
        nameArr[i] = this.otherValue;
      }
    }
    this.optionValueArr = nameArr;
  }
  this.show();
};
// 传入otherValue，调用setOptionKeyArr方法
HlscsChk.prototype.setOtherValue = function (otherValue) {
  this.otherValue = otherValue;
  this.setOptionKeyArr(this.optionKeyArr);
  // this.show();
};
// 上传后台的数据结构
HlscsChk.prototype.getUploadValue = function () {
  return {
    fillStyle: this.fillStyle,
    optionKeyArr: this.optionKeyArr,
    optionValueArr: this.optionValueArr,
    otherValue: this.otherValue
  };
};
// 把实例中的值回显到页面
HlscsChk.prototype.show = function () {
  var that = this;
  $('[name="' + this.domId + '"]').each(function () {
    var $this = $(this);
    var dataReplace = $this.attr('data-replace');
    var checkInput = $this.attr('check-input');
    // 若data-checkbox设定值为checkbox，optionKey转换成name
    if (dataReplace) {
      var optionValueArr = that.optionValueArr ? that.optionValueArr : [];
      $this.val(optionValueArr.toString());
    } else if (checkInput == 'otherValue') {
      $this.val(that.otherValue);
    } else {
      var dataCheckbox = $this.attr('data-checkbox');
      var optionKeyArr = that.optionKeyArr ? that.optionKeyArr : [];
      // 选中状态判断
      if (optionKeyArr.indexOf(dataCheckbox) !== -1) {
        $this.html(that.fillStyle['true']);// setCheckboxStyle($this, true);
      } else {
        $this.html(that.fillStyle['false']);// setCheckboxStyle($this, false);
      }
    }
  })
};


/**换行文本
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
 * @param {*} name 
 */
function WordbreakInput(name) {
  this.domId = name;// input标签的name属性
  this.value;// 实例的值，字符串
};
// 传入value参数，调用show()方法
WordbreakInput.prototype.setValue = function (value) {
  this.value = value;
  this.show();
};
// 上传后台的数据结构
WordbreakInput.prototype.getUploadValue = function () {
  return this.value;
};
// 把实例中的值回显到页面
WordbreakInput.prototype.show = function () {
  var that = this;
  var remainingValue = that.value;// 被截取后，剩下的值
  $('[name="' + this.domId + '"]').each(function () {
    var $this = $(this);
    // 遇到data-input设置为0的input元素，重置要进行截取处理的字符串
    if ($this.attr('data-input') === '0') {
      remainingValue = that.value;
    }
    // 根据data-length设置的长度截取字符串长度，并赋值
    var length = $this.attr('data-length') || remainingValue.length;
    remainingValue = remainingValue ? remainingValue : '';// 避免接受到null数据时候，.slice方法报错
    var showValue = remainingValue.slice(0, length);// 当前标签反显的值
    remainingValue = remainingValue.slice(length);
    $this.val(showValue);
  })
};



/**表格
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
 * @param {*} name 
 */
function HlscsTable(name) {
  this.domId = name;// 
  this.valueObj;// 表格数据(json格式:{'0-0':'text1','0-1':'text2'})
};
// 传入valueObj，替换或添加进原有的valueObj中，调用show方法
HlscsTable.prototype.setValueObj = function (valueObj) {
  this.valueObj = this.valueObj ? this.valueObj : {};
  for (var i in valueObj) {
    this.valueObj[i] = valueObj[i];
  }
  this.show(valueObj);
};
// 上传后台的数据结构
HlscsTable.prototype.getUploadValue = function () {
  return this.valueObj;
};
// 把实例中的值回显到页面
HlscsTable.prototype.show = function (valueObj) {
  // var that = this;
  // 直接遍历写入对应table下的input中
  // var tableValue = writeData[name];
  var writeValueObj = valueObj ? valueObj : this.valueObj;
  var $table = $('[name="' + this.domId + '"]');
  for (var i in writeValueObj) {
    $table.find('input[table-coordinate=' + i + ']').val(this.valueObj[i]);
  }
};


/**单图片上传
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
 * @param {*} name 
 */
function SingleImgUploader(name) {
  this.domId = name;
  this.imgUrl;// 图片路径
};
// 传入imgUrl，调用show方法
SingleImgUploader.prototype.setImgUrl = function (imgUrl) {
  this.imgUrl = imgUrl;
  this.show();
};
// 上传后台的数据结构
SingleImgUploader.prototype.getUploadValue = function () {
  return { src: this.imgUrl };
};
// 把实例中的值回显到页面
SingleImgUploader.prototype.show = function () {
  // var src = path + this.imgUrl.replace('home/ap/nas', 'imgs');// 工程使用
  var src = this.imgUrl;
  $('[name="' + this.domId + '"]').find('img').attr('src', src);
};



/**单图片上传、添加
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
 * @param {*} name 
 * @param {*} cloneForm 克隆的原始form标签内容
 */
function AddImgUploader(name, cloneForm) {
  this.domId = name;
  this.cloneForm = cloneForm;// 克隆原始的组件中form标签的内容
  this.imgUrlArr;// 图片链接（数组）
};
// 传入imgUrlArr，调用show方法
AddImgUploader.prototype.setImgUrlArr = function (imgUrlArr) {
  this.imgUrlArr = imgUrlArr;
  this.show();
};
// 上传后台的数据结构 [{src:url},{src:url}]
AddImgUploader.prototype.getUploadValue = function () {
  var arr = [];
  for (var i in this.imgUrlArr) {
    arr.push({ src: this.imgUrlArr[i] });
  }
  return arr;
};
// 把实例中的值回显到页面
AddImgUploader.prototype.show = function () {
  var that = this;
  var $forms = $('[name="' + this.domId + '"]');
  var $formParent = $forms.first().parent();
  var imgUrlArrLength = that.imgUrlArr.length;
  var formNum = imgUrlArrLength + 1;
  $formParent.html('');
  for (var i = 0; i < formNum; i++) {
    var $addHtml = that.cloneForm.clone();
    if (that.imgUrlArr[i]) {
      // var src = path + that.imgUrlArr[i].replace('home/ap/nas', 'imgs');// 工程使用
      var src = that.imgUrlArr[i];
      $addHtml.find('img').attr('src', src);
      $addHtml.find('input').attr('file-type', 'addEdit');
      $addHtml.find('.file-delete').css('display', 'block');
    }
    $formParent.append($addHtml);
  }
};




/**多图片上传
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
 * @param {*} name 
 */
function MultipleImgUploader(name) {
  this.domId = name;
  this.imgUrlArr;// 图片链接（数组）
};
// 传入imgUrlArr，调用show方法
MultipleImgUploader.prototype.setImgUrlArr = function (imgUrlArr) {
  this.imgUrlArr = imgUrlArr;
  this.show();
};
// 上传后台的数据结构
MultipleImgUploader.prototype.getUploadValue = function () {
  var arr = [];
  for (var i in this.imgUrlArr) {
    arr.push({ src: this.imgUrlArr[i] });
  }
  return arr;
};
// 把实例中的值回显到页面
MultipleImgUploader.prototype.show = function () {
  var $form = $('[name="' + this.domId + '"]');
  var $imgSelect = $form.find('.batch-file-select');
  var imgStyle = $imgSelect.attr('style');
  $form.find('.batch-file-show-img').remove();
  var valueLength = this.imgUrlArr.length;
  var html = '';
  for (var i = 0; i < valueLength; i++) {
    // var src = path + this.imgUrlArr[i].replace('home/ap/nas', 'imgs');// 工程使用
    var src = this.imgUrlArr[i];
    html += '<div class="batch-file-show-img" style="' + imgStyle + '">'
      + '<i class="batch-file-close">&#10006;</i>'
      + '<img src="' + src + '">'
      + '</div>';
  }
  $imgSelect.before(html);
};







/**水印
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
 * @param {*} name 
 * @param {*} fillStyle 填充样式
 */
function WaterMark(name,num) {
  this.domId = name;
  this.text;
  this.num = num;
  this.isWaterMark = true;
//  this.fillStyle = fillStyle;// 填充样式
};
// 传入text水印内容，调用show方法
WaterMark.prototype.setInfo = function (text,isWaterMark) {
  this.text = text;
  this.isWaterMark = isWaterMark;
  this.show();
};
// 上传后台的数据结构
WaterMark.prototype.getUploadValue = function () {
  return this.text;
};
// 把实例中的值回显到页面
WaterMark.prototype.show = function () {
  if(this.isWaterMark){
    var $div = $('[name="' + this.domId + '"]');
    var html = '';
    for(var i = 0;i<this.num;i++){
      html += '<p class="waterMark'
        + i +'">'
        + this.text
        + '</p>';
    }
    $div.append(html);
  }
};






/**二维码
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
 * @param {*} name 
 */
function TwoCode(name,imgSize) {
  this.domId = name;
  this.src;
  this.code;
  this.imgSize = imgSize;
};
// 传入text水印内容，调用show方法
TwoCode.prototype.setSrc = function (src,code) {
  this.code = code;
  this.src = src + "?code=" + this.code + "&imgSize=" + this.imgSize;
  this.show();
};
// 上传后台的数据结构
TwoCode.prototype.getUploadValue = function () {
  return {
    src: this.src,
    code: this.code,
    imgSize: this.imgSize
  };
};
// 把实例中的值回显到页面
TwoCode.prototype.show = function () {
  var $div = $('[name="' + this.domId + '"]');
  var html = '';
  html = '<img class="twocodeImg" src="'+ this.src +'" />'
  $div.append(html);
};