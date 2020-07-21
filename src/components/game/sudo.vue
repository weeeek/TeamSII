<template>
  <div class="sudo">
    <div class="btnbox">
      <button type="button" class="el-button" :class="{'el-button--primary': hard==3}" @click="change(3)">
        <span>简单</span>
      </button>
      <button type="button" class="el-button" :class="{'el-button--primary': hard==5}" @click="change(5)">
        <span>一般</span>
      </button>
      <button type="button" class="el-button" :class="{'el-button--primary': hard==7}" @click="change(7)">
        <span>困难</span>
      </button>
    </div>
    <div class="tableList"></div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      gridList: [],
      dataList: [],
      numArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      hard: 3, //3代表每一行需要填写3个数字
      isShowAnswer: false
    };
  },
  created() {
    this.createGridList(this.hard); //(3:简单;5:一般;7:困难)
  },
  methods: {
    createGridList(hard) {
      //创建3x3表格
      for (let i = 0; i < 9; i++) {
        this.gridList.push([]);
        for (let j = 0; j < 9; j++) {
          this.gridList[i].push(0);
        }
      }
      this.init1row(hard);
    },
    random1_9Arr(arr) {
      //数组1-9随机打乱
      arr.sort(() => {
        return Math.random() - 0.5;
      });
      return arr;
    },
    init1row(hard) {
      this.gridList[0] = this.random1_9Arr(this.numArr); //第一行赋值
      this.setAllValue(this.gridList, 1, 0, hard); //第二至九行赋值
    },
    setAllValue(arr, row, col, hard) {
      if (col == 9) {
        return this.setAllValue(arr, row + 1, 0, hard);
      }
      if (row == 9) {
        return true;
      }
      for (let i = row; i < 9; i++) {
        for (let j = col; j < 9; j++) {
          if (arr[i][j] != 0) {
            return this.setAllValue(arr, i, j + 1, hard);
          }
          for (let ch = 1; ch <= 9; ch++) {
            if (this.isValidNum(arr, i, j, ch)) {
              arr[i][j] = ch;
              if (this.setAllValue(arr, i, j + 1, hard)) {
                if (row == 8 && col == 8) {
                  this.setDataList(JSON.parse(JSON.stringify(arr)), hard);
                }
                return true;
              } else {
                arr[i][j] = 0;
              }
            }
          }
          return false;
        }
      }
      return false;
    },
    isValidNum(arr, row, col, index) {
      // 判断 gridList[i][j] 是否可以填入index
      for (let i = 0; i < 9; i++) {
        // 判断行是否存在重复
        if (arr[row][i] == index) {
          return false;
        }
        // 判断列是否存在重复
        if (arr[i][col] == index) {
          return false;
        }
        // 判断 3 x 3 方框是否存在重复
        let _row = parseInt(row / 3) * 3 + parseInt(i / 3);
        let _col = parseInt(col / 3) * 3 + (i % 3);
        if (arr[_row][_col] == index) {
          return false;
        }
      }
      return true;
    },
    setDataList(arr, hard) {
      let list = this.random1Or0Arr(hard);
      for (let i = 0; i < arr.length; i++) {
        this.dataList[i] = [];
        for (let j = 0; j < arr[i].length; j++) {
          let random = list[i][j];
          this.dataList[i][j] = {
            disabled: random,
            value: random ? arr[i][j] : ""
          };
        }
      }
    },
    random1Or0Arr(hard) {
      let arr = [];
      for (let i = 0; i < 9; i++) {
        arr.push([]);
        let trueArr = [];
        for (let j = 0; j < 9; j++) {
          if (trueArr.length < hard) {
            arr[i].push(false);
            trueArr.push(1);
          } else {
            arr[i].push(true);
          }
          arr[i].sort(() => {
            return Math.random() > 0.5 ? -1 : 1;
          });
        }
      }
      return arr;
    },
    change(hard) {
      this.hard = hard;
      this.gridList = [];
      this.dataList = [];
      this.createGridList(hard);
    },
    save() {
      let arr = [];
      for (let i = 0; i < 9; i++) {
        arr.push([]);
        for (let j = 0; j < 9; j++) {
          arr[i].push(Number(this.dataList[i][j].value));
        }
      }
      let count = 0;
      for (let i = 0; i < 9; i++) {
        if (arr[i].toString() == this.gridList[i].toString()) {
          count++;
        }
      }
      let msg = "";
      if (this.hard === 3) {
        msg = "模式：简单，";
      } else if (this.hard === 5) {
        msg = "模式：一般，";
      } else if (this.hard === 5) {
        msg = "模式：困难，";
      }
      if (count === 9) {
        this.$message({
          message: msg + "挑战成功",
          type: "success"
        });
      } else {
        this.$message({
          message: msg + "挑战失败",
          type: "error"
        });
      }
    },
    showAnswer() {
      this.isShowAnswer = !this.isShowAnswer;
    }
  }
};
</script>