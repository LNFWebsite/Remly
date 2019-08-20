let dataBuffer = JSON.stringify(null);

function Data() {
  let self = this;
  this.blink = function() {
    let background = $("#save").css("background");
    $("#save").css("background", "lime");
    setTimeout(function() {
      $("#save").css("background", background);
    }, 300);
  }
  this.save = function(callback = function() {}) {
    let data = {};
    data["title"] = $("#title").html();
    data["body"] = $("#input").html();
    if (dataBuffer !== JSON.stringify(data)) {
      //stop pass-by-reference technique https://stackoverflow.com/a/29096222
      dataBuffer = JSON.stringify(data);

      for (each in data) {
        data[each] = encodeURIComponent(data[each]);
      }

      if (data["body"].length > 1 && data["body"] !== "%3Cbr%3E") {
        data = JSON.stringify(data);
        data = window.btoa(data);
        window.location.hash = data;
      }
      else {
        window.location.hash = "";
      }
      $("#save").attr("data-clipboard-text", window.location.href);
      callback();
    }
  }
  this.load = function(callback = function() {}) {
    let data = window.location.hash.substr(1);
    if (data !== "") {
      try {
        data = window.atob(data);
        data = JSON.parse(data);
        for (each in data) {
          data[each] = decodeURIComponent(data[each]);
        }
        $("title").html(data["title"].replace("<br>", ""));
        $("#title").html(data["title"]);
        $("#input").html(data["body"]);
        callback();
      } catch (e) {
        alert("Sorry, but something happened to the saved data. Please contact me with the URL you have now, sorry about this inconvenience.\n\nerr: " + e);
      }
    }
  }
}
let data = new Data();