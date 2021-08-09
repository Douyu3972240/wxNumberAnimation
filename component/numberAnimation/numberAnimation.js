Component({
  /**
   * 组件的属性列表
   */
  properties: {
    duration: {
      // 动画持续时间
      type: String,
      value: "1s"
    },
    mainStyle: {
      // 整个外框的css
      type: String,
      value: ""
    },
    numberSizeUnit: {
      // 数字大小的单位
      type: String,
      value: "rpx"
    },
    numberSize: {
      // 数字大小
      type: Number,
      value: 60
    },
    numberBoxSizeUnit: {
      // 数字大小的单位
      type: String,
      value: "rpx"
    },
    numberBoxSize: {
      // 每一个数字框的样式，是对应到数字
      type: Number,
      value: 120
    },
    columnStyle: {
      // 每一个数字框的样式，是一列的样式
      type: String,
      value: ""
    },
    numberStyle: {
      // 数字的样式
      type: String,
      value: ""
    },
    number: {
      type: Number,
      value: 0
    }
  },
  lifetimes: {
    created() {
      // 在组件实例刚刚被创建时执行	
    },
    attached() {
      // 在组件实例进入页面节点树时执行	
    },
    ready() {
      // 在组件在视图层布局完成后执行	
    },
    moved() {
      // 在组件实例被移动到节点树另一个位置时执行	
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行	
    },
    error() {
      // 每当组件方法抛出错误时执行	
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    viewData: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    numberAnimation() {
      // 根据数字生成界面需要的数据格式

      const number = this.data.number.toString()
      const viewData = []
      const numberColumn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

      for (let i = 0; i < number.length; i++) {
        viewData.push({
          countNumber: number[i],
          key: number[i],
          numberColumn: [],
          animationTop: 0
        })
        if (number[i] == 0) {
          for (let y in numberColumn) {
            viewData[i].numberColumn.push(y)
          }
        } else
        if (number.length > 1) {
          // 如果数字位数大于1，也就是超过两位数的时候
          let countNumber = 1
          for (let k = 0; k < viewData[i].countNumber; k++) {
            for (let y in numberColumn) {
              viewData[i].numberColumn.push(y)
            }
          }
        } else {
          for (let y in numberColumn) {
            viewData[i].numberColumn.push(y)
          }
        }
      }
      let _this = this
      _this.setData({
        viewData: this.fixColumn(viewData, number)
        // viewData
      })

      setTimeout(() => {
        let animationTop = 0
        for (let i = 0; i < _this.data.viewData.length; i++) {
          // 这里是设置一定时间后出现一个动画效果
          if ((_this.data.viewData[i].numberColumn.length - 10) > 0) {
            animationTop = ((_this.data.viewData[i].numberColumn.length - 10) + _this.data.viewData[i].key * 1) / _this.data.viewData[i].numberColumn.length * 100
          } else {
            animationTop = _this.data.viewData[i].key * 1 / _this.data.viewData[i].numberColumn.length * 100
          }
          _this.data.viewData[i].animationTop = animationTop
        }
        _this.setData({
          viewData
        })
      }, 100);
    },
    fixColumn(arr, number) {
      // 把每一列的数数量都往右移动一格
      const defaultColumn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      let nextColumn = null
      for (let i = 0; i < arr.length; i++) {
        if (i == 0) {
          if (arr[i + 1]) {
            nextColumn = arr[i].numberColumn.concat(defaultColumn)
            arr[i].numberColumn = defaultColumn
          }
        } else {
          let temp = null
          if (arr[i].countNumber == 0) {
            for (let k = 0; k < parseInt(number / 10); k++) {
              for (let m in defaultColumn) {
                arr[i].numberColumn.push(m)
              }
            }
            temp = arr[i].numberColumn
          } else {
            temp = arr[i].numberColumn
          }
          arr[i].numberColumn = nextColumn
          nextColumn = temp
        }
      }
      console.log(arr)
      return arr
    }
  }
})