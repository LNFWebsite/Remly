let Cookie = function() {
  this.set = function(key, value) {
    document.cookie = key + "=" + value;
  }
  this.get = function(key) {
    let regex = new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$","ig");
    return document.cookie.replace(regex, "$1");
  }
  this.del = function(key) {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
let cookie = new Cookie;

if (cookie.get("style") !== "") {
  toggle.style(cookie.get("style"));
}
if (cookie.get("mode") === "write") {
  toggle.write(true);
}
else {
  mem.load($("#input").text());
}