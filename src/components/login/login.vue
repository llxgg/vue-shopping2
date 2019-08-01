<template>
    <div class="login">

      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="100px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 登录：
    submitForm() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          this.axios({
            method: 'post',
            url: 'login',
            data: {
              username: this.loginForm.username,
              password: this.loginForm.password,
            },
          }).then((res) => {
            console.log(res);
            const { data, meta: { status, msg } } = res.data;
            if (status === 200) {
              // 保存token 到 sessionStorage
              sessionStorage.setItem('token', data.token);
              // 登录成功
              this.$message.success(msg);
              // 跳转到首页：
              this.$router.push({ name: 'home' });
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },

    // 重置表单
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background-color: rgb(0, 0, 36);
  display: flex;
  justify-content: center;
  align-items: center;

  .demo-ruleForm {
    background-color: #fff;
    padding:30px;
    width: 400px;
    border-radius: 10px;
  }
}
</style>
