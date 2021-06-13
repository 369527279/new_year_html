var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
    return (m >> n) & 1;
}
function e2c() {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getYear();
    if (tmp < 1900) {
        tmp += 1900;
    }
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 40;

    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0; ; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true; break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}

function GetcDateString() {
    var tmp = "";
    tmp += tgString.charAt((cYear - 4) % 10);
    tmp += dzString.charAt((cYear - 4) % 12);
    tmp += "(";
    tmp += sx.charAt((cYear - 4) % 12);
    tmp += ")年 ";
    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {
        tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
    //solarYear = solarYear<1900?(1900+solarYear):solarYear;
    if (solarYear < 1921 || solarYear > 2040) {
        return "";
    } else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        e2c(solarYear, solarMonth, solarDay);
        return GetcDateString();
    }
}


//所有节假日
function getjiejiari(mm,ri) {
    // let mm = 6;
    // let ri = 12;
    if(mm<10){
        mm="0"+mm;
    }
    if(ri<10){
        ri="0"+ri;
    }
    let mr=mm+"-"+ri;

    let mp = {
        "01-01": { "holiday": true, "name": "元旦", "wage": 3, "date": "2021-01-01" },
        "01-02": { "holiday": true, "name": "元旦", "wage": 2, "date": "2021-01-02" },
        "01-03": { "holiday": true, "name": "元旦", "wage": 2, "date": "2021-01-03" },
        "02-07": {
            "holiday": false, "name": "春节前调休",
            "after": false, "wage": 1, "target": "春节", "date": "2021-02-07"
        },
        "02-11": { "holiday": true, "name": "除夕", "wage": 2, "date": "2021-02-11" },
        "02-12": { "holiday": true, "name": "初一", "wage": 3, "date": "2021-02-12" },
        "02-13": { "holiday": true, "name": "初二", "wage": 3, "date": "2021-02-13" },
        "02-14": { "holiday": true, "name": "初三", "wage": 3, "date": "2021-02-14" },
        "02-15": { "holiday": true, "name": "初四", "wage": 2, "date": "2021-02-15" },
        "02-16": { "holiday": true, "name": "初五", "wage": 2, "date": "2021-02-16" },
        "02-17": { "holiday": true, "name": "初六", "wage": 2, "date": "2021-02-17" },
        "02-20": {
            "holiday": false, "name": "春节后调休", "after": true,
            "wage": 1, "target": "春节", "date": "2021-02-20"
        },
        "04-03": { "holiday": true, "name": "清明节", "wage": 2, "date": "2021-04-03" },
        "04-04": { "holiday": true, "name": "清明节", "wage": 3, "date": "2021-04-04" },
        "04-05": { "holiday": true, "name": "清明节", "wage": 2, "date": "2021-04-05" },
        "04-25": {
            "holiday": false, "name": "劳动节前调休", "after": false, "wage": 1,
            "target": "劳动节", "date": "2021-04-25"
        },
        "05-01": {
            "holiday": true, "name": "劳动节",
            "wage": 3, "date": "2021-05-01"
        },
        "05-02": { "holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-02" },
        "05-03": { "holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-03" },
        "05-04": { "holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-04" },
        "05-05": { "holiday": true, "name": "劳动节", "wage": 2, "date": "2021-05-05" },
        "05-08": {
            "holiday": false, "name": "劳动节后调休", "after": true, "wage": 1,
            "target": "劳动节", "date": "2021-05-08"
        },
        "06-12": {
            "holiday": true, "name": "端午节", "wage": 2, "date": "2021-06-12",
            "rest": 1
        },
        "06-13": { "holiday": true, "name": "端午节", "wage": 2, "date": "2021-06-13", "rest": 1 },
        "06-14": { "holiday": true, "name": "端午节", "wage": 3, "date": "2021-06-14", "rest": 1 },
        "09-18": {
            "holiday": false, "after": false, "name": "中秋节前调休", "wage": 1, "target":
                "中秋节", "date": "2021-09-18"
        },
        "09-19": { "holiday": true, "name": "中秋节", "wage": 2, "date": "2021-09-19" },
        "09-20": { "holiday": true, "name": "中秋节", "wage": 2, "date": "2021-09-20" },
        "09-21": { "holiday": true, "name": "中秋节", "wage": 3, "date": "2021-09-21" },
        "09-26": {
            "holiday": false, "after": false, "name": "国庆节前调休", "wage": 1,
            "target": "国庆节", "date": "2021-09-26"
        },
        "10-01": { "holiday": true, "name": "国庆节", "wage": 3, "date": "2021-10-01" },
        "10-02": { "holiday": true, "name": "国庆节", "wage": 3, "date": "2021-10-02" },
        "10-03": { "holiday": true, "name": "国庆节", "wage": 3, "date": "2021-10-03" },
        "10-04": { "holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-04" },
        "10-05": { "holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-05" },
        "10-06": { "holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-06" },
        "10-07": { "holiday": true, "name": "国庆节", "wage": 2, "date": "2021-10-07" },
        "10-09": {
            "holiday": false, "name": "国庆节后调休", "after": true, "wage": 1,
            "target": "国庆节", "date": "2021-10-09"
        }
    };

    for (var item in mp) { 
        if(item==mr){
           let str= mp[item];
           console.log(str);
           return str['name']
        }
    }
    return '';

}

//end 是除夕 2022-01-30 00:00:00
function dateDifference( end) { 
    // //比较2个日期 
    // console.log(start + ",," + end);
    // var stime = new Date(start).getTime();
    var stime = new Date().getTime();
    console.log(end.replace(/-/g, "/"));
    var etime = new Date(end.replace(/-/g, "/")).getTime();
    var usedTime = etime - stime; //两个时间戳相差的毫秒数
  
    var days = Math.floor(usedTime / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));

    var miao= (Math.abs(etime - stime)/1000)%60;//秒
    miao=Math.ceil(miao);
 

    if (days == 0 && hours == 0) {
      return minutes + "分"+miao+'秒';
    }
    if (days == 0) {
      return hours + "时" + minutes + "分"+miao+'秒';
    }
    var time = days + "天" + hours + "时" + minutes + "分"+miao+'&nbsp;秒';
    // var time = days;
    return time;
  }

  console.log(dateDifference('2022-01-30 00:00:00'));
