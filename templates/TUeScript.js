/*<html>
<script>*/
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
    });
    
    $('li.sub').click(function(){
        $(this).find('ul.child').toggle();
        $(this).siblings().find('ul.child').hide();
    });
    if (bGenerateCat)
    {
        catalogueGen();
    }
});

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
    $("#docJump").html(htmlList.join(""));
    $('#docJump').toggle();
}

function setTOCWidth(){
    var divtoc = document.querySelector("#docJump");
    divtoc.style.width = divtoc.parentNode.clientWidth - 10;
}

function idFromTxt(txt,el){
    var elid = txt.replace(/\s+/g, '');
    el.id = elid;
    return elid;
}
/*</script>
</html>*/