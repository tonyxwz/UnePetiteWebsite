$(document).ready(function(){
  var offsetTop = 65;
  // set container height so that "sticky" functions
  $('.toc-column').height($('.docs').height());

  $(window).resize(function(){
    if ($(window).width() < 992) {
      $('.toc-column').css("height", "100%");
    } else {
      $('.toc-column').height($('.docs').height());
    }
  });
  
  // smooth scrolling
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
    }, 300);
  });

  generateTOC({'id':'tableOfContent', 'src': '.docs section'});
});

function topFunction() {
  $('html, body').animate({scrollTop: 0}, 300);
}

function generateTOC(options){
  var sections = document.querySelectorAll(options['src']);
  var liList = new Array();
  for (var i = 0; i<sections.length;i++) {
    var s = sections[i];
    var h2 = s.querySelector('h2');
    var id = idFromTxt(h2,i);
    liList.push("<li><a href=\"#"+ id +"\">"+ h2.innerHTML +"</a><ul>");

    var h3s = s.querySelectorAll('h3');
    for (var j = 0; j < h3s.length; j++) {
      var h3 = h3s[j];
      var id = idFromTxt(h3, j);
      liList.push("<li><a href=\"#"+ id +"\">"+ h3.innerHTML +"</a></li>")
    } 
    liList.push("</ul></li>");
  }
  liList.push("</ul>\n");
  document.getElementById(options['id']).innerHTML = liList.join("");
}

// test ?,! etc
function idFromTxt(el, n){
  var elid = el.innerHTML.replace(/[^\w]/g, '') + n;
  el.id = elid;
  return elid;
}

// extend jQuery
(function($){

}(jQuery));