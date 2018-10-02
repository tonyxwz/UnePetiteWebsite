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
  $(window).scroll(setTOCColumn);
  
  // smooth scrolling
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
    }, 300);
  });

  generateTOC({'id':'tableOfContent', 'src': '.docs section'});
  // load json, pass to insertExplanation()
  insertExplanation();
});

document.addEventListener("DOMContentLoaded", function(){
  setTOCColumn();
});

function setTOCColumn(){
  if ($(window).width() < 992) {
    $('.toc-column').css("height", "100%");
  } else {
    $('.toc-column').height($('.docs').height());
    // console.log($('.toc-column').height());
    // console.log($('.docs').height());
  }
}

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
  var toc = document.getElementById(options['id']);
  if (toc){
    toc.innerHTML = liList.join("");
  }
}

// test ?,! etc
function idFromTxt(el, n){
  var elid = el.innerHTML.replace(/[^\w]/g, '') + n;
  el.id = elid;
  return elid;
}

function insertExplanation(exp){
  // insert click-to-elaborate events
  var sp = document.getElementsByClassName("klk2elaborate");
  var i;

  for(i=0;i<sp.length;i++){
      sp[i].addEventListener('click', function(){
        var id = this.textContent.replace(/[^\w]/g, '');
        var bq = document.getElementById(id);
        bq.classList.toggle('disappear')
      });
  }
}

function openFigureModal(e){
  // console.log(e);
  var hdurl = e.querySelector('img').getAttribute('data-hdurl');
  var modal = document.getElementById('imageModal');
  modal.style.display = "block";

  var img = modal.querySelector('img');
  img.src = hdurl;

  var html = document.querySelector('html');
  html.style.overflow = 'hidden';
  var closeBtn = modal.querySelector('.closeModal');
  closeBtn.onclick = function(){
    modal.style.display = 'none';
    html.style.overflow = 'auto';
  }

}

// extend jQuery
(function($){

}(jQuery));