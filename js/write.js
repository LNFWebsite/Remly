let writeSave;

function Write() {
  let self = this;
  this.start = function() {
    writeSave = setInterval(function() {
      data.save(data.blink());
    }, 5000);
  }
  this.stop = function() {
    clearInterval(writeSave);
  }
  this.count = function() {
    let input = $("#input").html();
    //remove br's in the beginning and end (essentially trim()), but need to check for other html in the way
    input = input.replace(/(^(<([^>]+)>)*(<br>)+|(<br>)+(<([^>]+)>)*$)/ig, "").replace(/(<br>|<\/p>|<\/div>)+/ig, "REMLY_LINE_BREAK");
    input = input.replace(/(<([^>]+)>|\n)/ig, "");//.replace("REMLY_LINE_BREAK", "<br>");
    let words = 0;
    let sent = 0;
    let par = 0;
    if (input !== "") {
      words = input.replace("REMLY_LINE_BREAK", " ").split(/\s+/).filter(Boolean).length;
      sent = input.split(/[^\.\!\?]\.|\!|\?/).filter(Boolean).length - 1;
      par = input.split("REMLY_LINE_BREAK").filter(function(value) {
        value = value.replace(/\s+/ig, "");
        if (value !== "") {
          return true;
        }
        return false;
      }).length;
    }
    $("#wordCount").text(words + " words " + sent + " sentences " + par + " paragraphs");
  }
}
let write = new Write();