const EVENT_SHOW = 'show'
const EVENT_HIDE = 'hide'

export default {
  data() {
    return {
      visible: false,
      title: ["优惠信息", "商家公告", "其他"]
    }
  },
  methods: {
    show() {
      this.visible = true
      this.$emit(EVENT_SHOW);
    },
    hide() {
      this.visible = false
      this.$emit(EVENT_HIDE)
    }
  }
}
