//用于验证姓名英文或者中文
const reg_name = '^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d]+$';
//手机号码
const mobilephone = '^1\d{10}$';

export default {
    reg_name,
    mobilephone
}