let Toggle = function() {
  this.save = function() {
    let saveTitle = $("#save").text();
    $("#save").text("Session copied!");
    setTimeout(function() {
      $("#save").text(saveTitle);
    }, 2000);
  }
  this.style = function(which) {
    $("select#style").val(which);
    if (which !== "light") {
      $("head").append("<link id=\"style\" rel=\"stylesheet\" href=\"css/" + which + ".css\" type=\"text/css\" />");
      cookie.set("style", which);
    }
    else {
      $("link#style").remove();
      cookie.del("style");
    }
    /**
    if (which) {
      $("#dark-mode").text("Light mode");
      $("head").append("<link id=\"dark\" rel=\"stylesheet\" href=\"dark.css\" type=\"text/css\" />");
      cookie.set("dark", "true");
    }
    else {
      $("#dark-mode").text("Dark mode");
      $("#dark").remove();
      cookie.del("dark");
    }
    **/
  }
  this.write = function(which = null) {
    if (which === null) {
      which = true;
      if (cookie.get("mode") === "write") {
        which = false;
      }
    }
    if (which) {
      $("#write-mode").text("Memorize");
      cookie.set("mode", "write");
      $("#memTable").empty();
      $(".write").css("display", "initial");
      write.start();
      write.count();
    }
    else {
      $("#write-mode").text("Write");
      cookie.del("mode");
      mem.load($("#input").text());
      $(".write").css("display", "none");
      $("#wordCount").empty();
      write.stop();
    }
  }
  this.undo = function() {
    window.history.back();
    data.load();
    write.count();
  }
  this.redo = function() {
    window.history.forward();
    data.load();
    write.count();
  }
  this.bold = function() {
    document.execCommand('bold',false,null);
  }
  this.italics = function() {
    document.execCommand('italic',false,null);
  }
  this.underline = function() {
    document.execCommand('underline',false,null);
  }
}
let toggle = new Toggle();

$("#save").on("click", function() {
  toggle.save();
});
$("#style").on("change", function() {
  toggle.style($(this).val());
});
$("#write-mode").on("click", function() {
  toggle.write();
});
$("#undo").on("click", function() {
  toggle.undo();
});
$("#redo").on("click", function() {
  toggle.redo();
});
$("#bold").on("click", function() {
  toggle.bold();
});
$("#italics").on("click", function() {
  toggle.italics();
});
$("#underline").on("click", function() {
  toggle.underline();
});