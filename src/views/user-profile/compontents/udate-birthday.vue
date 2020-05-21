<template>
  <div class="update-birthday">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
// import dayjs from '@/utlis/dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '修改中...',
        forbidClick: true
      })
      //   const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      const date = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
      await updateUserProfile({
        birthday: date
      })
      this.$emit('input', date)
      this.$toast.success('修改成功')
      //   关闭弹层
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
