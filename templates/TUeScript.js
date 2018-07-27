/*<html>
<script>*/
var toc;
var footer;

$(document).ready(function(){
    $('#mobile-btn').click(function(){
        var display = $('.mobile-menu-list').css('display');
        if(display == "none"){
            $('.mobile-menu-list').css('display', 'flex');
            $('.normal-menu').css('border-radius', '5px 5px 0px 0px');
        }else{
            $('.mobile-menu-list').css('display', 'none');
            $('.normal-menu').css('border-radius', '5px 5px 5px 5px');
        }
    });

    $(window).resize(function(){
        $('.mobile-menu-list').css('display', 'none');
        $('.normal-menu').css('border-radius', '5px 5px 5px 5px');
        setTOCWidth();
        // setMenuWidth();
    });
    
    $('li.sub').click(function(){
        $(this).find('ul.child').toggle();
        $(this).siblings().find('ul.child').hide();
    });
    if (bGenerateCat)
    {
        catalogueGen();
    }
    toc = document.getElementById('toc-container');
    footer = document.getElementById('footer-container');
    // setMenuWidth();
    window.addEventListener('scroll', onScrollHandler);
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
    divtoc.style.width = divtoc.parentNode.clientWidth - 10;
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

/*</script>
</html>*/