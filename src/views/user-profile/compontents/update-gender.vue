<template>
  <div class="update-gender">
      <van-picker
        :default-index="defaultIndex"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        @change="onGenderChange"
      />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
    //   console.log(picker, value, index)
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$emit('input', this.defaultIndex)
      this.$toast.success('修改成功')
      //   关闭弹层
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
