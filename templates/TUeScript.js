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

    $(document).ready(function(){
        $('li.sub').hover(
        function(){
            $(this).find('ul.child').show();
        },
        function(){
            $(this).find('ul.child').hide();
        });
    });
})
/*</script>
</html>*/