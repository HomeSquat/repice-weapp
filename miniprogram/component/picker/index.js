// component/picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    data: {
      type: Array,
      value: [
        {
          type: 1,
          label: '川菜'
        },
        {
          type: 2,
          label: '浙菜'
        },
        {
          type: 3,
          label: '鲁菜'
        },
        {
          type: 4,
          label: '粤菜'
        },
        {
          type: 5,
          label: '苏菜'
        },
        {
          type: 6,
          label: '湘菜'
        },
        {
          type: 7,
          label: '徽菜'
        },
        {
          type: 8,
          label: '闽菜'
        },
        {
          type: 9,
          label: '西餐'
        }
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 关闭
     */
    handleCloseClick(){
      this.triggerEvent('close', {})
    },
    handleConfirmClick(){
      let type = this.data.data[this.data.index].type
      let label = this.data.data[this.data.index].label
      this.triggerEvent('confirm', {
        type,
        label
      })
    },
    changeType(e){
      this.setData({
        index: e.detail.value
      })
    }
  }
})
