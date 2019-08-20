function Mem() {
  let self = this;
  this.load = function(data) {
    let sep = "REMLY_SEPARATOR";
    let input = data;
    let output = "";

    //that|than|which|when|because|in|since|so|though|and
    
    //Copulas
    let keywords = "am|is|are|was|were|be|being|been|have|has|had|do|does|did|shall|will|should|would|may|might|must|can|could";
    //Prepositions
    keywords += "|about|above|across|against|among|around|at|after|before|beside|behind|between|beyond|by|down|during|into|for|from|in|except|near|of|off|to|over|past|throughout|through|towards|on|up|without|until|with|under";
    //Dependent Clauses
    //keywords += "|after|in order|unless|although|insofar as|until|as|in that|when|as far as|lest|whenever|as soon as|no matter how|where|as if|now that|wherever|as though|once|whether|because|provided|while|before|since|why|even if|so that|even though|supposing|how|than|if|that|inasmuch as|though|in case|till";

    input = input.replace(new RegExp("([^\\d])(?:\\.|\\!|\\?)([^\\d])", "ig"), "$1" + sep + "$2").split(sep);

    for (let i = 0; i < input.length; i++) {
      if (input[i] !== "") {
        input[i] = input[i].trim();
        input[i] = input[i].replace(new RegExp("([^\\d])(?:\\,)(a-z|\\s)", "ig"), "$1" + sep + "$2").replace(new RegExp("(?:\\s)(" + keywords + ")(?:\\s)", "ig"), sep + "$1 ").split(sep);

        output += "<tr>";

        for (let x = 0; x < input[i].length; x++) {
          let val = input[i][x].trim();
          if (val !== "") {
            if (val.split(" ").length <= 1 && input[i][x + 1] !== undefined) {
              input[i][x + 1] = val + " " + input[i][x + 1];
            }
            else {
              output += "<td>" + val + "</td>";
            }
          }
        }

        output += "</tr>";
      }
    }
    $("#memTable").html(output);

    $("#input a").attr("contenteditable", "false").attr("target", "_blank");
    //console.log(input);
    //console.log(output);
  }
}
let mem = new Mem();
