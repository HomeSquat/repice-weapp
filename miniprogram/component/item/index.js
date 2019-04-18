// component/item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {
        img: "",
        title: "",
        des: "什么都没写！",
        user: {
          avatar: "",
          name: ""
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    description: ''
  },
  lifetimes: {
    attached() {
      const itemTemp = []
      if (this.data.itemData.des.length > 60) {
        this.setData({
          description: this.data.itemData.des.substr(0, 60) + "..."
        })
      } else {
        this.setData({
          description: this.data.itemData.des
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})