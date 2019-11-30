export function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return (arr[2]);
  } else
    return null;
}

// 设置cookie,增加到vue实例方便全局调用
// export function setCookie (c_name, value, expiredays) {
//   let exdate = new Date();
//   exdate.setDate(exdate.getDate() + expiredays);
//   document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// }

export function setCookie(cookieName, value, expiredSeconds) {
  let expiredDate = new Date();
  var newDate = expiredDate.getTime() + expiredSeconds * 1000;
  expiredDate.setDate(new Date(newDate));
  document.cookie = cookieName + "=" + escape(value) + ((expiredSeconds == null) ? "" : ";expires=" + expiredDate.toGMTString()) + ";path=/";
}

export function deleteCookie(name) {
  setCookie(name, "", -1);
  /*let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();*/
}

export function formatStr(str) {
  let arr = [];
  let str1 = str.split("{")[1];
  let str2 = str1.split("}")[0];
  let arr1 = str2.split(",");
  arr1.map(function(val) {
    let obj = {};
    obj.name = val.split(":")[0];
    obj.count = val.split(":")[1];
    obj.name = obj.name.split("\"")[1].split("\"")[0];
    obj.count = obj.count.split("\"")[1].split("\"")[0];
    arr.push(obj);
  });
  return arr;
}





