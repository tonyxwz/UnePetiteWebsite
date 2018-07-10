/*<html>
<script>*/
$(document).ready(function(){
    $('#mobile-btn').click(function(){
        var display = $('#mobile-menu').css('display');
        if(display == "none"){
            $('#mobile-menu').css('display', 'flex');
        }else{
            $('#mobile-menu').css('display', 'none')
        }
    });
    var showul = false;
    $(document).ready(function(){
        $('li.sub').click(
        function(){
            $(this).find('ul.child').toggle();
        });
    });
})
/*</script>
</html>*/