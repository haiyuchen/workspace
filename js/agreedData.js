// 约定数据
function Agreed(data) {
    this.data = data;
}
// 返回code
// name 约定数据的name值
Agreed.prototype.getCode = function (name) {
    var result = '';
    this.data.forEach(function (item) {
        if (item.name === name) {
            result = item.code;
        }
    })
    return result;
}
// 返回name
// code 约定数据的code值
Agreed.prototype.getName = function (code) {
    var result = '';
    this.data.forEach(function (item) {
        if (item.code === code)
            result = item.name;
    })
    return result;
}

var agreed = {};
//房源类型
agreed.houseType = new Agreed(
    [
        { code: '01', name: '住宅' },
        { code: '02', name: '非住宅' },
    ]
);
//证件类型
agreed.cardType = new Agreed(
    [
        { code: '01', name: '身份证' },
        { code: '02', name: '港澳台身份证' },
        { code: '03', name: '护照' },
        { code: '04', name: '户口簿' },
        { code: '05', name: '军官证（士兵证）' },
        { code: '06', name: '组织机构代码' },
        { code: '07', name: '营业执照' },
        { code: '08', name: '统一社会信用代码' },
    ]
)
//租金计算标准
agreed.rentalStandardType = new Agreed(
    [
        { code: '01', name: '按建筑面积计收' },
        { code: '02', name: '整体计收' },
    ]
)
//租赁类型
agreed.rentalType = new Agreed(
    [
        { code: '01', name: '整租' },
        { code: '02', name: '分租' },
    ]
)
//租赁用途
agreed.rentalUse = new Agreed(
    [
        { code: '01', name: '居住' },
        { code: '02', name: '商业' },
        { code: '03', name: '办公' },
        { code: '99', name: '其他' },
    ]
)
//租金结算周期
agreed.rentClearingCycle = new Agreed(
    [
        { code: '01', name: '月付' },
        { code: '02', name: '季付' },
        { code: '03', name: '半年付' },
        { code: '04', name: '年付' },
        { code: '99', name: '其他' },
    ]
)
//押金方式
agreed.depositType = new Agreed(
    [
        { code: '01', name: '押二付三' },
        { code: '02', name: '押一付三' },
        { code: '03', name: '押二付一' },
        { code: '04', name: '免押金' },
        { code: '05', name: '押一付一' },
        { code: '99', name: '其他' },
    ]
)
//付款方式
agreed.payment = new Agreed(
    [
        { code: '01', name: '转账结算' },
        { code: '02', name: '现金结算' },
    ]
);
//押金保管方式
agreed.depositMode = new Agreed(
    [
        { code: '01', name: '自行保管' },
        { code: '02', name: '第三方平台保管' },
        { code: '03', name: '监管保管' },
    ]
)
//建筑结构
agreed.houseStructure = new Agreed(
    [
        { code: '01', name: '钢结构' },
        { code: '02', name: '钢、钢筋混凝土结构' },
        { code: '03', name: '钢筋混凝土结构' },
        { code: '04', name: '混合结构' },
        { code: '05', name: '砖木结构' },
        { code: '99', name: '其他' },
    ]
)
//共有情况
agreed.booleanType = new Agreed(
    [
        { code: '0', name: '否' },
        { code: '1', name: '是' }
    ]
)
//房屋用途
agreed.houseUse = new Agreed(
    [
        { code: '01', name: '成套住宅' },
        { code: '02', name: '非成套住宅' },
        { code: '03', name: '集体宿舍' },
        { code: '04', name: '工业' },
        { code: '05', name: '公共设施' },
        { code: '06', name: '铁路' },
        { code: '07', name: '民航' },
        { code: '08', name: '航运' },
        { code: '09', name: '公共运输' },
        { code: '10', name: '仓储' },
        { code: '11', name: '商业服务' },
        { code: '12', name: '经营' },
        { code: '13', name: '旅游' },
        { code: '14', name: '金融保险' },
        { code: '15', name: '电讯信息' },
        { code: '16', name: '教育' },
        { code: '17', name: '医疗卫生' },
        { code: '18', name: '科研' },
        { code: '19', name: '文化' },
        { code: '20', name: '新闻' },
        { code: '21', name: '娱乐' },
        { code: '22', name: '园林绿化' },
        { code: '23', name: '体育' },
        { code: '24', name: '办公' },
        { code: '25', name: '军事' },
        { code: '99', name: '其他' }
    ]
)




//性别
agreed.sex = new Agreed(
    [
        { code: '01', name: '男' },
        { code: '02', name: '女' }
    ]
)
//人员类型
agreed.identityType = new Agreed(
    [
        { code: '01', name: '产权人' },
        { code: '02', name: '承租人' },
        { code: '03', name: '出租人' },
        { code: '04', name: '实际使用人' },
        { code: '05', name: '产权共有人' },
        { code: '99', name: '其他' },
    ]
)