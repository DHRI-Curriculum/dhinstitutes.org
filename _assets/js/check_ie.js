var isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isIE) {
  var ie_div = document.createElement("div");
  ie_div.innerHTML = "<div class=\"col p-1 mb-3\">Warning: You are using Internet Explorer, which is not entirely supported by our website. Why not try a different browser?</div>";
  ie_div.setAttribute("id", "ie-warning");
  ie_div.setAttribute("class", "text-center bg-warning row");
  document.body.appendChild(ie_div);
}