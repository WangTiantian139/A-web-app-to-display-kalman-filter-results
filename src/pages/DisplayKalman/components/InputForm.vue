<template>
  <v-card id="input-form" outlined>
    <v-card-title class="pb-2">输入参数</v-card-title>

    <v-form ref="form" v-model="valid" class="px-4 pb-5">
      <info>待测物体模型参数</info>

      <v-select
        label="模型"
        v-model="ruleForm.paras.module.name"
        :items="options"
        :rules="[v => !!v || '请选择']"
        required
      >
      </v-select>

      <v-text-field
        v-model="ruleForm.paras.module.a0"
        :rules="aRules"
        label="a0"
        required
      ></v-text-field>

      <v-text-field
        v-model="ruleForm.paras.module.a1"
        :rules="aRules"
        label="a1"
        required
        :disabled="ruleForm.paras.module.name === 'sin'"
      ></v-text-field>

      <v-text-field
        v-model="ruleForm.paras.module.a2"
        :rules="aRules"
        label="a2"
        required
        :disabled="!(ruleForm.paras.module.name === '2order')"
      ></v-text-field>

      <v-text-field
        v-model="ruleForm.paras.module.w"
        :rules="aRules"
        label="w"
        required
        :disabled="!(ruleForm.paras.module.name === 'sin')"
      ></v-text-field>

      <v-text-field
        v-model="ruleForm.paras.module.as"
        :rules="aRules"
        label="as"
        required
        :disabled="!(ruleForm.paras.module.name === 'sin')"
      ></v-text-field>

      <info>卡尔曼滤波参数</info>

      <v-text-field
        v-model="ruleForm.paras.Q"
        :rules="aRules"
        label="Q"
        required
      ></v-text-field>

      <v-text-field
        v-model="ruleForm.paras.R"
        :rules="aRules"
        label="R"
        required
      ></v-text-field>

      <info>最小二乘/滑动平均参数</info>

      <v-select
        label="窗长"
        v-model="ruleForm.paras.ls_wlen"
        :items="lswlenopts"
        :rules="[v => !!v || '请选择']"
        required
      ></v-select>

      <v-btn
        color="success"
        :disabled="!valid"
        class="mr-4"
        @click="submitForm"
      >
        更新图表
      </v-btn>
    </v-form>
  </v-card>
</template>

<style>
info {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 16px 0 0;
  text-align: left;
  font-weight: lighter;
}
.el-form-item__label {
  text-align: left;
}
</style>

<script>
export default {
  name: "input-form",
  data() {
    return {
      valid: false,
      aRules: [v => !!v || "请填入一个数", v => !isNaN(v) || "填入值必须是数"],
      options: [
        {
          value: "1order",
          text: "一阶斜面"
        },
        {
          value: "2order",
          text: "二阶曲面"
        },
        {
          value: "sin",
          text: "高阶曲面（sin）"
        }
      ],
      lswlenopts: ["4", "9", "16", "25", "36", "49", "64"],
      ruleForm: {
        paras: {
          module: {
            name: "1order",
            a0: "1",
            a1: "0.02",
            a2: "0.0003",
            w: "1",
            as: "2"
          },
          Q: "100",
          R: "0.01",
          noise: "0.1",
          ls_wlen: "36"
        }
      }
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        this.$emit("update-inputitem", this.ruleForm);
      } else {
        alert("更新失败，请检查输入!!");
        console.log("error submit!!");
        return false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
