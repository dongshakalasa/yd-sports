import Vue from 'vue'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is: (fieldBags) => `${fieldBags}必须与密码相同`
    },
    attributes:{
        account:'邮箱',
        code:'验证码',
        password:'密码',
        password1:'确认密码'
    }
})