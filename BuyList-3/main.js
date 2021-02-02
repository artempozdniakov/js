/* eslint-env jquery */
var free_id=4;

function add_good(){
    var copy_good = $('.bl-main').find('.bl-good-ex').clone();
    var copy_lgood = $('.bl-left-bought').find('.left-good').clone();
    var copy_bgood = $('.bl-left-bought').find('.bought-good').clone();
    if ($(".finder").val() != ''){    
        copy_good.find('.bl-good-name').text($(".finder").val());
        copy_good.find('.bl-good-amount').text(1);
        copy_good.find('.bl-good-minus').css('opacity', 0.4);
        copy_good.find('.bl-good-minus').attr("disabled", false);
        copy_good.find('.id').text(free_id);
        copy_lgood.find('.id').text(free_id);
        copy_lgood.find('.left-good-name').text($(".finder").val());
        copy_lgood.find('.left-good-amount').text(1);
        copy_bgood.find('.id').text(free_id);
        copy_bgood.find('.left-good-name').text($(".finder").val());
        copy_bgood.find('.bought-good-amount').text(1);
        $(".bl-main").append("<div class='bl-good' id='"+free_id+"bl-good'>"+copy_good.html()+"</div>");
        $(".bl-left-goods").append("<span class='left-good' id='"+free_id+"left-good' style='margin-right: 5px'>"+copy_lgood.html()+"</div>");
        $(".bl-bought-goods").append("<span class='bought-good' id='"+free_id+"bought-good' style='display: none; margin-right: 5px'>"+copy_bgood.html()+"</div>");
    }
    $(".finder").val("");
    $(".finder").focus();
    free_id = free_id + 1;
}

function minus(obj){
    var loc_id = $(obj).parent().parent().find('.id').text();
    var amount = $('#'+loc_id+'bought-good').find('.bought-good-amount').text();
    if (parseInt(amount)>1){      
        $(obj).css('opacity', 1);
        $(obj).css('disabled',false);
        $('#'+loc_id+'left-good').find('.left-good-amount').html(parseInt(amount)-1);
        $('#'+loc_id+'bought-good').find('.bought-good-amount').html(parseInt(amount)-1);
        $(obj).parent().parent().find('.bl-good-amount').text(parseInt(amount)-1);
    }
    if(parseInt(amount)==2){
        $(obj).css('opacity', 0.5);
        $(obj).css('disabled',true);
    }
    
}

function plus(obj){
    var m_b = $(obj).parent().find(".bl-good-minus"); 
    var loc_id = $(obj).parent().parent().find('.id').text();
    var amount = $('#'+loc_id+'bought-good').find('.bought-good-amount').text();
    
    if(parseInt(amount)==1){
        $(m_b).css("opacity", 1);
        $(m_b).css("disabled", false);   
    }
    
    $('#'+loc_id+'left-good').find('.left-good-amount').html(parseInt(amount)+1);
    $('#'+loc_id+'bought-good').find('.bought-good-amount').html(parseInt(amount)+1);
    $(obj).parent().parent().find('.bl-good-amount').text(parseInt(amount)+1);
}

function buy_good(obj){
    var loc_id = $(obj).parent().parent().find('.id').text();
    var is_bought = $(obj).parent().parent().find('.is_bought').text();
    if(parseInt(is_bought)<1){
        $('#'+loc_id+'left-good').css('display', 'none');
        $('#'+loc_id+'bought-good').css('display', 'inline-block');
        $(obj).parent().parent().find('.bl-good-name').css("text-decoration", "line-through");
        $(obj).parent().parent().find('.bl-good-minus').css("display", "none");
        $(obj).parent().parent().find('.bl-good-plus').css("display", "none");
        $(obj).parent().parent().find('.bl-good-del').css("display", "none");
        $(obj).attr('data-tooltip', 'Товар не куплено');
        $(obj).text("Не куплено");
        $(obj).parent().parent().find('.is_bought').text(1);
    }
    else{
        $('#'+loc_id+'left-good').css('display', 'inline-block');
        $('#'+loc_id+'bought-good').css('display', 'none');
        $(obj).parent().parent().find('.bl-good-name').css("text-decoration", "none");
        $(obj).parent().parent().find('.bl-good-minus').css("display", "inline-block");
        $(obj).parent().parent().find('.bl-good-plus').css("display", "inline-block");
        $(obj).parent().parent().find('.bl-good-del').css("display", "inline-block");
        $(obj).attr('data-tooltip', 'Товар куплено');
        $(obj).text("Куплено");
        $(obj).parent().parent().find('.is_bought').text(0);
    }
    
}

function del_good(obj){
    var loc_id = $(obj).parent().parent().find('.id').text();
    $(obj).parent().parent().remove();
    $('#'+loc_id+'left-good').remove();
    $('#'+loc_id+'bought-good').remove();
}

document.addEventListener("keyup", function(event) {
	if (event.code === 'Enter' && ($(".finder").val()) !== "") {
		add_good();
	}
});