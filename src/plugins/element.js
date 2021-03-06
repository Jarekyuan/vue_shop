import Vue from 'vue'

import {
    Button,
    Form,
    FormItem,
    Input,
    Message
}
from 'element-ui'


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message //挂载到原型，使用this