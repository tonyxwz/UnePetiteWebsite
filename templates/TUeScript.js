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
    });
    
    $('li.sub').click(function(){
        $(this).find('ul.child').toggle();
    });
    if (bGenerateCat)
    {
        catalogueGen();
    }
});

function catalogueGen(){
    var h2s = document.querySelectorAll("div#docContent h2");
    htmlList = [];
    for(var i = 0; i<h2s.length;i++){
        console.log(h2s[i].id);
    }
}
/*</script>
</html>*/