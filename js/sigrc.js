sigrc = function (initData) {
    //图片上传的url
    this.url = initData.url;
    //反显签名的标签ID
    this.targetName = initData.targetName;
    //图片的路径
    this.imgPath = initData.imgPath;
    //图片反显回调函数
    this.callback = initData.callback;
    //签名模态框点击确定上传图片
    function confirm() {
        console.log($('#signature').jSignature('getData', 'native'));
        //获取签名笔画数，如果为0，证明没有签名
        var imgdata_length = $('#signature').jSignature('getData', 'native').length;
        if (imgdata_length == 0) {
            alert('签名不能为空');
            return false;
        }
        //获取签名图片内容
        var imgdata = $('#signature').jSignature("getData", "image");

        // 创建loading对象
        var uploading = new LoadingGif();
        var that = this;
        //图片保存至后台
        $.ajax({
            type: 'post',
            url: this.url,
            data: { fileBase64: "data:" + imgdata[0] + "," + imgdata[1] },
            dataType: 'json',
            beforeSend: function () {
                uploading.timer();// loading样式显示
            },
            success: function (data) {// 获取后台返回路径反显
                var path = that.callback(data)
                if (that.setImgPath(path)) {
                    // that.show(that.imgPath);
                    cancle();
                }
                
                var targetSignature = this.targetName;
                var targetDateInput = $("[name = '"+targetSignature+"']").attr("target-obj");
                var targetDateObj = $("[name = '"+targetDateInput+"']");
                console.log(targetDateObj)
                setNowTime(targetDateObj);
            },
            complete: function () {
                uploading.status = true;// loading样式隐藏
            },
            error: function (xhr, textStatus) {
                if (xhr == 504) {
                    alert('请求超时，请稍后再试。');
                } else {
                    alert('连接出错，请稍后再试。');
                }
            }
        });
        return false;
    }
    //签名模态框点击取消
    function cancle() {
        unbindClick();
        $('#signature').jSignature('reset');
        $('.signature-box').css('display', 'none');
        $('html,body').css('overflow', 'visible');

        return false;
    }
    //签名模态框点击清空
    function clean() {
        $('#signature').jSignature('reset');
        return false;
    }
    //设置当前时间
    function setNowTime(targetDateObj){
        var name = targetDateObj.attr('name');
        var value;
        var dateState = targetDateObj.attr("dateState");
        var targetType = getTargetType(name);
        var myDate = new Date();//获取系统当前时间
        if(typeof( dateState) == "undefined" || targetType != 'dateInput'){
        return;  
        }else{
        if (!instanceMap[name] && dateState == 'nowDate'){
                createInstance(name, targetType);
                value = myDate.toLocaleDateString();
                value = value.replace(/\//g,'-');
                instanceMap[name].setDateStr(value);
            }
        }
    }
    // function setImgPath(path) {
    //     if (!path) {
    //         alert('数据解析出错!');
    //         return false;
    //     }
    //     this.imgPath = path;
    //     return true;
    // }
    //绑定方法
    this.bindClick = function () {
        $("#signature-sure").on('click', confirm.bind(this));
        $("#signature-reset").on('click', clean.bind(this));
        $("#signature-cancel").on('click', cancle.bind(this));
    }
    //解绑方法
    function unbindClick() {
        $("#signature-sure").attr('onclick', '').unbind('click');;
        $("#signature-reset").attr('onclick', '').unbind('click');;
        $("#signature-cancel").attr('onclick', '').unbind('click');;
    }
}

//打开签名组件面板
sigrc.prototype.open = function () {
    $('.signature-box').css({ 'display': 'block' });
    $('#signature').jSignature('reset');
    $('html,body').css('overflow', 'hidden');
    //绑定click事件
    this.bindClick();
    //$("#signature-sure").on('click', this.confirm);
    //$("#signature-reset").on('click', this.clean);
    //$("#signature-cancel").on('click', this.cancle);
    //直接返回，避免事件冒泡
    return false;
}
//图片显示到对应框内
sigrc.prototype.show = function () {
    if (!this.imgPath) {
        return false;
    }
    var $writeImg = $('[name=' + this.targetName + ']').find('img');
    // var src = path + this.imgPath.replace('home/ap/nas/HLGSSFILES/upload', 'imgs');// 工程使用
    var src = this.imgPath;
    $writeImg.attr('src', src);
    $writeImg.css('background-color', 'transparent');
    return true;
}
//设置实例中的图片链接
sigrc.prototype.setImgPath = function (path) {
    this.imgPath = path;
    this.show();
    return true;
}
//上传后台的数据格式
sigrc.prototype.getUploadValue = function () {
    return { src: this.imgPath };
}
function LoadingGif() {
    // 图片上传状态标志位
    this.status = false;
    var that = this;
    // 定时判断结束标志位是否为true，关闭loading样式
    that.timer = function () {
        $('.signature-box > .loading').css("display", "block");
        setTimeout(function () {
            if (that.status) {
                $('.signature-box > .loading').css("display", "none");
            } else {
                that.timer();
            }
        }, 50)
    }
}
// })
// 
function initSigrc() {
    //判断界面中是否已有.signature-box样式
    if ($(".signature-box").length > 0) {
        //alert('页面中已有signature-box样式标签，无法进行初始化。');
        return false;
    }
    var appendhtml = "<div class='signature-box'>\
                        <div> \
                            <div class='loading'></div>\
                            <div id='signature'></div>\
                            <div class='signature-button'>\
                                <button id='signature-sure'>确定</button><button id='signature-reset'>清空</button><button id='signature-cancel'>取消</button>\
                            </div>\
                        </div>\
                    </div>";
    $("body").prepend(appendhtml);
    //手机端样式调整
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        console.log('手机端样式调整');
        $('.signature-box').css({ 'transform': 'rotate(90deg)', 'background': '#fff', 'width': '100vh', 'height': '100vw' });
        $('.signature-box>div').css({ 'width': '100%', 'height': '100%', 'margin': '0' });
        var signatureBoxPos = $('.signature-box').position();
        $('.signature-box').css({ top: signatureBoxPos.top * -1 + 'px', left: signatureBoxPos.left * -1 + 'px' });
        $('.signature-box').css({ 'display': 'none' });
    };
    //初始化签名画板
    $('.signature-box').css({ 'display': 'block' });
    $('#signature').jSignature({ 'UndoButton': true, 'height': '100%', 'width': '100%' });
    //清空签名
    $('#signature').jSignature('reset');
    $('.signature-box').css({ 'display': 'none', 'z-index': 100 });
    return true;
}
