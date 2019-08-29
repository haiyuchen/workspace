
setTimeout(function () {

  // 获取的数据结构
  var data = {// 本地测试使用
    /**************************************以下属性为接收contract_info.jsp页面传值，且也用于合同预览页面回显*************************************/
    isWaterMark:true,//显示水印
    waterMarkContent:'湘潭出租合同模板水印测试',//水印显示内容
    xzqhdm: '370100',//行政区号代码
    fylx: '02',//房源类型01-住宅；02-非住宅
    cqrxm: '产权人姓名、出租人姓名',//产权人姓名、出租人姓名
    entJ_mzdm: '01',//出租人民族代码
    entJ_mzmc: '汉族',//出租人民族名称
    resp: '出租方代表人身份',//出租方代表人身份
    respName: '出租方代表人名称',//出租方代表人名称
    cresp: '承租方代表人身份',//承租方代表人身份
    crespName: '承租方代表人名称',//承租方代表人名称
    cqrzjlx: '01',//产权人证件类型
    cqrzjhm: '产权人证件号码',//产权人证件号码
    cqrlxdh: '出租人联系电话',//出租人联系电话
    cqrEmail: '出租人电子邮箱',//出租人电子邮箱
    cqrAddr: '出租人通讯地址',//出租人通讯地址
    czfAddr: '出租房所在区域',//出租房所在区域
    jddm: '出租房街道代码',//出租房街道代码
    sqdm: '出租房社区代码',//出租房社区代码
    jdmc: '出租房街道名称',//出租房街道名称
    sqmc: '出租房社区名称',//出租房社区名称
    

    czrxm: '承租人姓名',//承租人姓名
    entE_mzdm: '承租人民族代码',//承租人民族代码
    entE_mzmc: '承租人民族名称',//承租人民族名称
    cnczrzjlx: '承租人证件类型',//承租人证件类型--中文
    czrzjlx: '02',//承租人证件类型--编号
    czrzjhm: '承租人证件号码',//承租人证件号码
    czrlxdh: '承租人联系电话',//承租人联系电话
    czrEmail: '承租人电子邮箱',//承租人电子邮箱
    czrAddr: '承租人通讯地址',//承租人通讯地址

    cnzjjsbz: '租金计算标准',//租金计算标准--中文
    zjjsbz: '01',//租金计算标准--编号
    zjdj: '租金单价',//租金单价
    cnzllx: '租赁类型',//租赁类型--中文
    zllx: '01',//租赁类型--编号
    cnzlyt: '租赁用途',//租赁用途--中文
    zlyt: '01',//租赁用途--编号
    area: '租赁面积',//租赁面积
    cnzjjszq: '租金结算周期',//租金结算周期--中文
    zjjszq: '01',//租金结算周期--编号
    jzr: '交租日',//交租日
    money: '租金金额',//租金金额
    cnyjfs: '押金方式',//押金方式--中文
    yjfs: '01',//押金方式--编号
    deposit: '1500',//押金金额
    cnpayType: '结算方式',//结算方式--中文
    payType: '01',//结算方式--编号
    jfskzh: '出租人收款账号',//出租人收款账号
    jfzhkhh: '出租人账户开户行',//出租人账户开户行
    jfzhhm: '出租人账户户名',//出租人账户户名
    yffkzh: '承租人付款账号',//承租人付款账号
    yfzhkhh: '承租人账户开户行',//承租人账户开户行
    yfzhhm: '承租人账户户名',//承租人账户户名
    cndepositKeep: '押金保管方式',//押金保管方式--中文
    depositKeep: '01',//押金保管方式--编号
    cgzrs: '承租人数',//承租人数
    beginDate: '2000-01-02',//租赁起始日期
    endDate: '2001-01-01',//租赁结束日期
    jfrq: '2000-01-01',//交付日期
    cuzrcdzr: '出租人承担费用，中文值',//出租人承担费用，中文值
    cgzrcdzr: '承租人承担费用，中文值',//承租人承担费用，中文值
    remark: '附加条款',//附加条款

    houseId: '房屋编号',//房屋编号
    fwzl: '房屋坐落',//房屋坐落
    cqzlx: '01',//产权证类型
    cqzbh: '产权证编号',//产权证编号
    contId: '合同id',//合同id
    /*************以上属性为接收contract_info.jsp页面传值，且也用于合同预览页面回显****************************/

    /**************************************以下属性为合同预览页面回显*************************************/
    digitalhLeassorCost: '出租人承担费用，数字值',//出租人承担费用，数字值
    digitalhLesseeCost: '承租人承担费用，数字值',//承租人承担费用，数字值
    osType: '01',//客户端类型
    code: '合同编号',//合同编号
    style: '',//合同模板style标签内的样式内容
    body: '',//合同模板body标签内的内容
    js: '',//合同模板javascript标签内的js内容
    isSign: '',//当前城市是否开放签名功能
    btnCtrl: '02',//控制操作控件
    // 01：出租人从个人中心点击查看，显示按钮：撤消
    // 02：承租人从个人中心点击查看，显示按钮：接受，拒绝，暂不处理
    // 03：出租人从首页进入起草合同，显示按钮，上一步，确认合同信息下一步
    status: '',//合同状态(0-待确认、1-待签署、2-已网签、3-已拒绝)
    cityName: '城市名称',//城市名称
    operateFlag: '',//页面合同操作按钮标示01-暂存合同，02-下一步（contract_info.jsp），
    //03-确认合同，下一步，04-接受合同，05-撤销合同,06-拒绝合同SystemConstants常量类有定义
    contractExtend: '',//合同扩展信息--用于存储、回显出租人在合同预览编辑页面录入的信息。
    lesseeExtend: '',//合同扩展信息--用于存储、回显出租人在合同预览编辑页面录入的信息。

    htsf: '01',//合同身份--即合同类型--01-住宅；02-非住宅
    mzq: '免租期',//免租期
    zyjjfs: '争议解决方式',//争议解决方式

    /***以下为合同主体TenContractEnt信息***/
    //以下为出租人、甲方
    entJrylx: '01',//人员类型
    entJtype: '03',//主体类型(02-承租人、03-出租人)
    entJname: '出租人的姓名',//出租人的姓名
    entJcardType: '01',//证件类型
    entJcardNumber: '证件号码',//证件号码
    entJhuji: '户籍',//户籍
    entJcorner: '户籍所在地',//户籍所在地
    entJphone: '手机号码',//手机号码
    entJaddress: '住所',//住所
    entJproxyObjectId: '被代理人id',//被代理人id
    entJhtlx: '01',//合同类型
    entJwhcd: '文化程度',//文化程度
    entJcityNo: '城市编码',//城市编码
    entJemail: '电子邮箱',//电子邮箱
    entJfddbr: '法定代表人',//法定代表人
    entJresp: '代表人身份',//代表人身份
    entJrespName: '代表人名称',//代表人名称
    entJbirth: '2002-01-01',//出生日期
    entJgender: '性别',//性别
    entJzipCode: '邮编',//邮编
    entJmzdm: '民族代码',//民族代码

    //以下为承租人、乙方
    entYrylx: '01',//人员类型
    entYtype: '02',//主体类型(02-承租人、03-出租人)
    entYname: '承租人姓名',//承租人姓名
    entYcardType: '01',//证件类型
    entYcardNumber: '证件号码',//证件号码
    entYhuji: '户籍',//户籍
    entYcorner: '户籍所在地',//户籍所在地
    entYphone: '手机号码',//手机号码
    entYaddress: '住所',//住所
    entYproxyObjectId: '被代理人id',//被代理人id
    entYhtlx: '01',//合同类型
    entYwhcd: '文化程度',//文化程度
    entYcityNo: '城市编码',//城市编码
    entYemail: '电子邮箱',//电子邮箱
    entYfddbr: '法定代表人',//法定代表人
    entYresp: '代表人身份',//代表人身份
    entYrespName: '代表人名称',//代表人名称
    entYbirth: '2003-01-01',//出生日期
    entYgender: '性别',//性别
    entYzipCode: '邮编',//邮编
    entYmzdm: '民族代码',//民族代码
    /****************************
    *以下字段为映射TenContractHouse类的映射，其中部分字段会与TenContract合同主表的字段的重复，
    *按TenContractHouse字段值为准处理
    ************************/
    xzqhmc: '行政区域名称',//行政区域名称
    mphdm: '门牌号代码',//门牌号代码
    mphmc: '门牌号名称',//门牌号名称
    fhdm: '房号代码',//房号代码
    fhmc: '房号名称',//房号名称
    scjzmj: '实测建筑面积',//实测建筑面积
    scftmj: '实测分摊面积',//实测分摊面积
    sctnmj: '实测套内面积',//实测套内面积
    fwbh: '房屋编号',//房屋编号
    zlfyhym: '租赁房源核验码',//租赁房源核验码
    fwjg: '01',//房屋结构
    gyqk: '共有情况',//共有情况
    fwyt: '01',//房屋用途
    cqmj: '产权面积',//产权面积
    dyzt: '0',//抵押状态
    cfzt: '查封状态',//查封状态
    jcnf: '建成年份',//建成年份
    fwlx: '房屋类型',//房屋类型
    huxing: '户型',//户型
    fwxz: '房屋性质',//房屋性质
    zxcd: '装修程度',//装修程度
    chaoxiang: '朝向',//朝向
    jzlx: '建筑类型',//建筑类型
    jgrq: '竣工日期',//竣工日期
    //-------------------------------------------------------------------------
    sfyydj: '是否异议登记',//是否异议登记
    gyrxx: '共有人信息',//共有人信息
    qxmx: '区（县）名称',//区（县）名称
    xmmc: '项目名称',//项目名称
    louzhuang: '楼幢',//楼幢
    danyuan: '单元',//单元
    sjch: '实际层号',//实际层号
    mych: '名义层号',//名义层号
    huhao: '户号',//户号
    tdyt: '土地用途',//土地用途
    jingdu: '经度',//经度
    weidu: '纬度',//纬度
    tsl: '厅数量',//厅数量
    wssl: '卧室数',//卧室数
    cfsl: '厨房数量',//厨房数量
    wsjsl: '卫生间数量',//卫生间数量
    chFwyt: '转义后的房屋用途',//转义后的房屋用途
    fjid: '公安标准地址ID',//公安标准地址ID
    xz: '公安标准地址详细地址',//公安标准地址详细地址
    contractExtend: {
      //基础文本
      baseText1: '基础文本',
      // 基础输入框
      baseInput1: '基础输入框',
      twoCode1:{ src: './vendor/twoCode.png' },
      // 金额
      money1: { smallMoney: '50', bigMoney: '伍拾元整' },
      // 日期
      date1: { dateStr: '2018-09-10', chsDateStr: '2018 年 09 月 10 日', year: '2018', month: '09', day: '10' },
      // 单选
      radio1: { fillStyle: { false: '', true: '' }, optionKey: '02', optionValue: '02对应的映射中文', otherName: 'other对应的中文（用户填写）' },
      name61: { fillStyle: { false: '', true: '' }, optionKey: 'other', optionValue: '02对应的映射中文', otherName: 'other对应的中文（用户填写）' },
      // 复选
      checkbox1: { fillStyle: { false: '', true: '' }, optionKeyArr: ['02', '03'], optionValueArr: ['02对应的映射中文', '03对应的映射中文'], otherName: 'other对应的中文（用户填写）' },
      // 换行文本
      wordbreakInput1: '换行文本测试 换行文本测试 换行文本测试 换行文本测试 换行文本测试 换行文本测试 换行文本测试 换行文本测试',
      // 表格
      table1: {
        '0-0': '0-0', '0-1': '0-1', '0-2': '0-2', '0-3': '0-3',
        '1-0': '1-0', '1-1': '1-1', '1-2': '1-2', '1-3': '1-3',
        '2-0': '2-0', '2-1': '2-1', '2-2': '2-2', '2-3': '2-3',
        '3-0': '3-0', '3-1': '3-1', '3-2': '3-2', '3-3': '3-3',
      },
      // 单附件图片
      single1: { src: './testImg/chrismaynard_shadowbox2.jpg' },
      // 多附件图片
      add1: [{ src: './testImg/chrismaynard_shadowbox2.jpg' }, { src: './testImg/chrismaynard_shadowbox3.jpg' }],
      multiple1: [{ src: './testImg/chrismaynard_shadowbox2.jpg' }, { src: './testImg/chrismaynard_shadowbox3.jpg' }],
      // 签名
      signature1: { src: './testImg/chrismaynard_shadowbox2.jpg' },
    },
    // 
    lesseeExtend: {},
  }
  data.btnCtrl = '03';// 本地测试使用
  contractInit(data);// 本地测试使用
}, 500)
//url的search读取
function urlSearch() {
  var url = location.search;
  if (url.indexOf('?') != -1) {
    var str = url.substr(1);
    strs = str.split('&');
    var result = {};
    for (var i in strs) {
      var data = strs[i].split('=');
      result[data[0]] = data[1];
    }
    return result;
  } else {
    return null;
  }
}