data.load();

$("#input").on("input", function() {
  if (cookie.get("mode") !== "write") {
    mem.load($("#input").text());
    data.save();
  }
  else {
    write.count();
  }
  //let msg = new SpeechSynthesisUtterance($("#input").text());
  //window.speechSynthesis.speak(msg);
});

new ClipboardJS("#save");
$("#save").attr("data-clipboard-text", window.location.href);

/* $(window).on("hashchange", function() {
  data.load();
}); */