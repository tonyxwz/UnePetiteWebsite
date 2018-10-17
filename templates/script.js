/*<html>
<script>*/
var toc;
var footer;

$(document).ready(function(){
    $('#mobile-btn').click(function(){
        var display = $('.mobile-menu-list').css('display');
        if(display == "none"){
            $('.mobile-menu-list').css('display', 'flex');
        }else{
            $('.mobile-menu-list').css('display', 'none');
        }
    });

    $(window).resize(function(){
        $('.mobile-menu-list').css('display', 'none');
        setTOCWidth();
        // setMenuWidth();
    });
    
    $('li.sub').click(function(){
        $(this).find('ul.child').toggle();
        $(this).siblings().find('ul.child').hide();
    });
    toc = document.getElementById('toc-container');
    footer = document.getElementById('footer-container');
    // setMenuWidth();
    window.addEventListener('scroll', onScrollHandler);
    insertExplanation();
    if (bGenerateCat)
    {
        catalogueGen();
    }
});

function setMenuWidth(){
    var width1 = $(".nav-bar").width();
    var width2 = $(".logo-a").width();
    console.log(width1);
    console.log(width2);
    var menus = $(".dropdown");
    //console.log(menus);
    var w = (width1 - width2 -100) / menus.length;
    console.log(w);
    $(".dropdown").width(w);
    // $.each(menus, function(idx,val){
    //     val.width(w);
    // });
}

function catalogueGen(){
    var sections = document.querySelectorAll("div#docContent div.sect");
    htmlList = ["<ul>\n"];
    for(var i =0;i<sections.length;i++){
        sect = sections[i];

        // select h2 within section
        var h2 = sect.querySelector('h2');
        h2txt = h2.innerHTML;
        h2id = idFromTxt(h2txt,h2);
        htmlList.push("<li>\n");
        htmlList.push("<a href=#"+h2id+">"+h2txt+"</a>\n");

        // select h3s
        htmlList.push("<ul>\n");
        h3s = sect.querySelectorAll('h3');
        for(var j = 0;j<h3s.length;j++){
            var h3 = h3s[j];
            h3txt = h3.innerHTML;
            h3id = idFromTxt(h3txt,h3);
            htmlList.push("<li><a href=#"+h3id+">"+h3txt+"</a></li>");
        }
        htmlList.push("</ul>\n");
        htmlList.push("</li>\n");
    }
    htmlList.push("</ul>\n");
    
    // set width of toc
    setTOCWidth();
    $("#toc-container").html(htmlList.join(""));
    $('#toc-container').toggle();
}

function setTOCWidth(){
    var divtoc = document.querySelector("#toc-container");
    divtoc.style.width = (divtoc.parentNode.clientWidth - 10).toString() + 'px';
}

function idFromTxt(txt,el){
    var elid = txt.replace(/\s+/g, '');
    el.id = elid;
    return elid;
}

// make toc smooth with scrolling
function onScrollHandler(){
    var maxScroll = document.documentElement.offsetHeight -
        toc.offsetHeight - footer.offsetHeight - 100;
    var currentScroll = document.scrollingElement.scrollTop;

    
    if (currentScroll >= maxScroll) {
        toc.classList.add('abs-toc');
        toc.classList.remove('fixed-toc');
    } else {
        toc.classList.add('fixed-toc');
        toc.classList.remove('abs-toc');
    }
}

function insertExplanation(){
    // insert click-to-elaborate events
    var sp = document.getElementsByClassName("klk2elaborate");
    var i;

    for(i=0;i<sp.length;i++){
        sp[i].addEventListener('click', onElaborateHandler);
        console.log(sp[i]);
    }
}

function onElaborateHandler(e){
    if (this.parentNode.nextElementSibling.style.display === "block") {
        this.parentNode.nextElementSibling.style.display = "none";
    } else {
        this.parentNode.nextElementSibling.style.display = "block";
    }
    
}
function randomColorHex(){
    var hexList = ["#E4FFEB",
                   "#E1E8D2",
                   "#FFFDF3",
                   "#E8DCD2",
                   "#FFE1DF"];
    return hex;
}
/*</script>
</html>*/


//   document.addEventListener("DOMContentLoaded", function() {

//   });
(function ( $ ) {
    var offsetTop = 65;
    $.fn.LongPageNavigation = function( options ) {
  
      // This is the easiest way to have default options.
      var settings = $.extend({
        // These are the defaults.
        longPageNavigationPosition:"" ,// Give Class Name Where Long Navigation Append.
      }, options );
  
      // Append Loop
      if(settings.longPageNavigationPosition=="")
      {
        $(this).before('<div class="longPageNavigationDiv"><ul></ul></div>');
      }
      else
      {
        $('.'+settings.longPageNavigationPosition).append('<div class="longPageNavigationDiv"><ul></ul></div>');
      }
  
      $(this).children('h2').each(function(index){
        var getMenuName = $(this).text();
        $(this).attr('id','LongNavigation-'+index);
    
        $('.longPageNavigationDiv ul').append('<li><a href="#LongNavigation-'+index+'">'+ getMenuName +'</a></li>');
        // Smooth Scroll 
      });
        
      // Smooth Navigation   
        
      $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
  
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - offsetTop
        }, 500);
      });
        
    // Smooth Navigation END
  
    };
  
  }( jQuery ));
  
  $(document).ready(function() {
    $( ".docs" ).LongPageNavigation({
      longPageNavigationPosition: "toc-wrapper" // Give Class Name where you want to show this Navigation in Page
    });
  });
  
  function generateTOC(options) {
    var sections = document.querySelectorAll(".")
  }