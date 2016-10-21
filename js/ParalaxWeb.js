function ClickHandler()
{
     $("nav a").click(function(e)
     {
        e.preventDefault();
        var slideId = e.currentTarget.id;
        var elementOffsetTop = $("#" + slideId + "_slide").offset().top;
        var window_height = $(window).height();        
        console.log(elementOffsetTop);
        $("html, body").animate({
            scrollTop: elementOffsetTop
        }, 800);
    });
}
function CheckIfInView()
{
  var animation_elements = $('.subslide');
  var Swindow = $(window);
  var window_height = $(Swindow).height();
  var window_top_position = $(Swindow).scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($(animation_elements), function()
  {
    //console.clear();
    var element = $(this);
    var element_height = element.height();
    var element_top_position = element.offset().top;
    var currentOffsetTop = Math.abs(window_height - element_top_position);
    var element_bottom_position = (element_top_position + element_height);
    //console.log("element_top_position: "+element_top_position);
    //console.log("element_bottom_position: "+element_bottom_position);
    //console.log("window_top_position: "+window_top_position);
    //console.log("currentOffsetTop: "+currentOffsetTop);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= currentOffsetTop) && (element_top_position <= currentOffsetTop))
    {
      element.addClass('in-view');
    }
    else
    {
      element.removeClass('in-view');
    }
  });
}	