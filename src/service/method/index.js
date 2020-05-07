/************************************将数字搞成带逗号的那种*********************************************/
function autoComma(number) {
  // let number = parseInt(numb)
  if (number) {
    let newNum = ''//中间变量
    let arr = []
    let arr1 = []
    let num = ''//最终结果
    let isDecimal = false//是不是小数
    let decimal = 0//小数点所在位置
    let decimalNum = ''//小数点和以后的数据
    let negative = false//是不是负数
    // 判断百万级别或者上亿级别
    let thousand = false
    let Billion = false

    if ((number >= 10000 || number <= -10000) && (number < 100000000 && number > -100000000)) {
      thousand = true
      number = number / 10000
    }
    if (number >= 100000000 || number <= -100000000) {
      thousand = false
      Billion = true
      number = number / 100000000
    }

    if (number < 0) {
      number = Math.abs(number)
      negative = true
    }
    let numStr = JSON.stringify(number)
    // 如果传入的是小数，逗号的添加位置和整数是有区别滴
    for (let i = 0; i < numStr.length; i++) {
      if (numStr[i] === '.') {
        isDecimal = true
        decimal = i
        decimalNum = numStr.slice(decimal, numStr.length)
        // 保留两位小数
        if (decimalNum.length > 2) {
          decimalNum = decimalNum.slice(0, 3)
        }
        numStr = numStr.slice(0, decimal)
      }
    }
    for (let i = 0; i < numStr.length; i++) {
      arr.push(numStr[numStr.length - i - 1])
    }
    for (let i = 0; i < arr.length; i++) {
      if ((i + 1) % 3 === 0 && (i + 1) !== 0 && i + 1 < arr.length) {
        newNum += arr[i]
        newNum = newNum + ','
      } else {
        newNum += arr[i]
      }
    }
    for (let i = 0; i < newNum.length; i++) {
      arr1.push(newNum[newNum.length - i - 1])
    }
    for (let i = 0; i < arr1.length; i++) {
      num += arr1[i]
    }
    if (isDecimal) {
      if (negative) {
        // num = '-' + num + decimalNum
        // return num
        if (thousand) {
          num = '-' + num + decimalNum + '万'
          return num
        } else if (Billion) {
          num = '-' + num + decimalNum + '亿'
          return num
        } else {
          num = '-' + num + decimalNum
          return num
        }
      } else {
        // num = num + decimalNum
        // return num
        if (thousand) {
          num = num + decimalNum + '万'
          return num
        } else if (Billion) {
          num = num + decimalNum + '亿'
          return num
        } else {
          num = num + decimalNum
          return num
        }
      }

    } else {
      if (negative) {
        // num = '-' + num
        // return num
        if (thousand) {
          num = '-' + num + '万'
          return num
        } else if (Billion) {
          num = '-' + num + '亿'
          return num
        } else {
          num = '-' + num
          return num
        }
      } else {
        if (thousand) {
          num = num + '万'
          return num
        } else if (Billion) {
          num = num + '亿'
          return num
        } else {
          return num
        }
      }

    }
  } else {
    return 0
  }

}
/************************************获取当前日期*********************************************/
function getDate(string) {
  var myDate = new Date();
  if (string === 'month') {
    return myDate.getMonth() + 1        //获取当前月份(0-11,0代表1月)
  } else if (string === 'year') {
    return myDate.getFullYear()         //获取完整的年份(4位,1970-????)
  } else if (string === 'date') {
    return (myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate())
  } else if (string === 'day') {
    return myDate.getDate();        //获取当前日(1-31)
  } else if (string === 'hour') {
    return myDate.getHours();       //获取当前小时数(0-23)
  } else if (string === 'timeStamp') {
    return parseInt(myDate.getTime() / 1000)
  }
  myDate.getYear();        //获取当前年份(2位)



  myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
  myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)

  myDate.getMinutes();     //获取当前分钟数(0-59)
  myDate.getSeconds();     //获取当前秒数(0-59)
  myDate.getMilliseconds();    //获取当前毫秒数(0-999)
  myDate.toLocaleDateString();     //获取当前日期
  var mytime = myDate.toLocaleTimeString();     //获取当前时间
  myDate.toLocaleString();
}

/************************************时间戳转化为日期*********************************************/
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function toDate(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  if (number === 0) {
    return 0
  } else {
    var date = new Date(number * 1000);
  }
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
function formatNumberStatus(n) {
  n = n.toString()
  return n
}
/************************************获取当前日期*********************************************/

const method = {
  autoComma,//将数字加逗号
  getDate,//获取当前日期，根据传入参数不同返回月份或年份
  toDate,//将10位时间戳转化为日期，传入Y-M-D
}

export {
  method
}