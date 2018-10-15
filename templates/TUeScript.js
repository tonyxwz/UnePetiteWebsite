$(document).ready(function(){
  var offsetTop = 65;
  // set container height so that "sticky" functions
  $('.toc-column').height($('.docs').height());
  
  $(window).resize(setTOCColumn);
  $(window).scroll(setTOCColumn);
  
  // smooth scrolling
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
    }, 300);
  });
  // 
  if(document.getElementsByClassName('activeTab').length == 0) {
    generateTOC({'id':'#tableOfContent', 'src': '.docs section'});
  }

  // load json, pass to insertExplanation()
  // insertExplanation();
});

document.addEventListener("DOMContentLoaded", function(){
  setTOCColumn();
});

function setTOCColumn(){
  var tocColumn, docs;
  if(document.getElementsByClassName('activeTab').length == 0) {
    tocColumn = $('.toc-column');
    docs = $('.docs');
  } else {
    tocColumn = $('.activeTab .toc-column');
    docs = $('.activeTab .docs');
  }
  if ($(window).width() < 992) {
    tocColumn.css("height", "100%");
  } else {
    tocColumn.height(docs.height());
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
    if(h2){var id = idFromTxt(h2,i);}
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
  var toc = document.querySelector(options['id']);
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

function showMore(e){
  // insert click-to-elaborate events
  var sp = document.getElementById(e.target.dataset.target);
  sp.classList.toggle('disappear');
  setTOCColumn();
}

function openFigureModal(e){
  var hdurl = e.querySelector('img').getAttribute('data-hdurl');
  if (!hdurl) {
    hdurl = e.querySelector('img').src;
  }
  var modal = document.getElementById('imageModal');
  modal.style.display = "block";

  var img = modal.querySelector('img');
  img.src = hdurl;

  var caption = e.parentElement.querySelector(".figureCaption").innerHTML;
  modal.querySelector(".modalCaption").innerHTML = caption;

  var html = document.querySelector('html');
  html.style.overflow = 'hidden';
  var closeBtn = modal.querySelector('.closeFigure');
  closeBtn.onclick = function(){
    modal.style.display = 'none';
    html.style.overflow = 'auto';
  };
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      html.style.overflow = 'auto';
    }
  });
}
function openWideFigureModal(e){
  // console.log(e);
  var hdurl = e.querySelector('img').getAttribute('data-hdurl');
  if (!hdurl) {
    console.log("Why");
    hdurl = e.querySelector('img').src;
  }
  var modal = document.getElementById('wideImageModal');
  modal.style.display = "block";

  var img = modal.querySelector('img');
  img.src = hdurl;
  var caption = e.parentElement.querySelector(".figureCaption").innerHTML;
  modal.querySelector(".modalCaption").innerHTML = caption;

  var html = document.querySelector('html');
  html.style.overflow = 'hidden';
  var closeBtn = modal.querySelector('.closeFigure');
  closeBtn.onclick = function(){
    modal.style.display = 'none';
    html.style.overflow = 'auto';
  };
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      html.style.overflow = 'auto';
    }
  });
}

function openModal(e){
  var targetID = e.getAttribute('data-target');
  // console.log(targetID);
  var modal = document.querySelector(targetID);
  if (modal != null){
    modal.style.display = "block";

    var html = document.querySelector('html');
    html.style.overflow = 'hidden';

    var closeBtn = modal.querySelector('.closeModal');
    closeBtn.addEventListener('click', function(){
      modal.style.display = 'none';
      html.style.overflow = 'auto';
    });
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        html.style.overflow = 'auto';
      }
    });
  }
}

function linksInModal(e){
  console.log(e.target);
  console.log(e.target.dataset.parentModal);
  var modal = document.getElementById(e.target.dataset.parentModal);
  var html = document.querySelector('html');
  modal.style.display="none";
  html.style.overflow="auto";
}

function changeHPTabs(e){
  // e.preventDefault();
  let tabID = e.dataset.target;
  $(".activeTab").toggleClass("activeTab");
  $(tabID).toggleClass("activeTab");
  $(".activeBtn").toggleClass("activeBtn");
  e.classList.toggle("activeBtn");
  generateTOC({'id':'.activeTab #tableOfContent', 'src': '.activeTab .docs section'});

  if ($(window).width() < 992) {
    $('.activeTab .toc-column').css("height", "100%");
  } else {
    $('.activeTab .toc-column').height($('.activeTab .docs').height());
  }
}

// photo slides
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].classList.add('active');
}

// extend jQuery
(function($){

}(jQuery));