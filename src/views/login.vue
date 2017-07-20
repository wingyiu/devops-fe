<style scoped>
.login-page {
	position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background:#eee;
}
.login-panel {
	width: 860px;
	position: relative;
	top: 50%;
	left: 50%;
    padding: 70px 0px;
    background: white;
    margin-top: -319px;
    margin-left: -430px;
    border-radius: 6px;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
}
.login-logo-p {
    text-align: center;
    line-height: 1.1;
    margin-bottom: 20px;
}
.login-form {
    width: 320px;
    margin: 0 auto;
}
.slogan {
    font-size: 14px;
    color: #000;
    line-height: 1.5;
    text-align: center;
}
.old-boss-link {
    font-size: 14px;
    text-align: right;
    padding: 0px 80px;
}

</style>
<template>
	<div class="login-page">
		<div class="login-panel" shadow>
	        <h4 class="login-logo-p">
                <img src="../static/login_logo.png" class="login-logo">
            </h4>
		    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
		        <Form-item prop="user">
		            <Input type="text" v-model="formInline.user" placeholder="账号..." size="large" >
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </Form-item>
		        <Form-item prop="password">
		            <Input type="password" v-model="formInline.password" placeholder="密码..." size="large">
		                <Icon type="ios-locked-outline" slot="prepend"></Icon>
		            </Input>
		        </Form-item>
		        <Form-item>
		            <Button type="primary" @click="handleSubmit('formInline')" long size="large">登录</Button>
		        </Form-item>
		    </Form>
            <p class="slogan">这是一个名利场</p>
            <p class="old-boss-link"><a target="_blank" href="/release/app/index.html">旧版发布系统</a></p>
	    </div>
    </div>
</template>
<script>
	import AccountService from '../services/account';
	import Util from '../libs/util';
    import Config from '../config/config';

    export default {
        data () {
            return {
                formInline: {
                    user: 'wingyiu.li',
                    password: 'to8to123'
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            // let json = this.$localStorage.get(Config.LS_KEY_PROFILE);
            // let user = JSON.parse(json);
            
            if (this.$store.getters.user) {
                //this.$store.commit('setUser', user);
                // 跳到主页
                Util.redirectToIndex();
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	AccountService.login(this.formInline.user, this.formInline.password)
                    		.then((res) => {
                    		this.$Message.success('登录成功!');
                            
                            // TODO 存到localstorage
                            let json = JSON.stringify(res.data);
                            this.$localStorage.set(Config.LS_KEY_PROFILE, json);

                            this.$store.commit('setUser', res.data);
                            
                            // 跳到主页
                    		Util.redirectToIndex();

                    	}).catch((err) => {
                            //this.$Message.error(err.response.data.detail);
                    	});

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
