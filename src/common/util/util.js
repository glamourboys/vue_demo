/* *
 * 解析网址字符串
 * @example ?id=123&a=user
 * @return Object {id:123,a:user}
 */
export function urlParse() {
  let url = window.location.search;
  let urlObj = {};
  let reg = /[?&][^?&]+=[^?&]+/g; // 暂时不理解
  let arr = url.match(reg);
  /* ['?id=123','&a=user'] */
  if (arr) {
    arr.forEach((v, i) => {
      let tempArr = v.substring(1).split('=');
      let key = tempArr[0];
      let value = tempArr[1];
      urlObj[key] = value;
    });
  }
  return urlObj;
};

export function urlParseOne() {
  var sHref = window.location.href;
  var args = sHref.split('?');
  if (args[0] === sHref) {
    return "";
  }
  var arr = args[1].split('&');
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var arg = arr[i].split('=');
    obj[arg[0]] = arg[1];
  }
  return obj;
};

export function saveTotal(id, key, value) {
  // eslint-disable-next-line no-undef
  let seller = localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  // eslint-disable-next-line no-undef
  localStorage.__seller__ = JSON.stringify(seller);
};

export function loadLocalTotal(id, key, def = false) {
  // eslint-disable-next-line no-undef
  let seller = localStorage.__seller__;
  if (!seller) { // 判断有无内容
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let cur = seller[key];
  return cur || def;
}
