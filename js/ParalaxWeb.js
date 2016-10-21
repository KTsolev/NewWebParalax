function ClickHandler()
{
     $("nav a").click(function(e)
     {
        e.preventDefault();
        var slideId = e.currentTarget.id;
        var menuHeight = $("nav").height();
        var elementOffsetTop = (($("#" + slideId + "_slide").offset().top) - (menuHeight + menuHeight/4));
        $("html, body").animate({
            scrollTop: elementOffsetTop,            
            duration: "slow",
            easing: "easin"
        });
    });
}
function CheckIfInView(toAnimate)
{
  var animationElements = $(toAnimate);
  var Swindow = $(window);
  var windowHeight = $(Swindow).height();
  var windowTopPosition = $("html, body").scrollTop();
  var windowBottomPosition = (windowTopPosition + windowHeight);
  console.log("running!");
  console.log(windowTopPosition);
  $.each($(animationElements), function()
  {
    //console.clear();
    var element = $(this);
    var elementHeight = element.height();
    var elementTopPosition = element.offset().top;
    var currentOffsetTop = Math.abs(windowHeight - elementTopPosition);
    var elementBottomPosition = (elementTopPosition + elementHeight);
    //console.log("elementTopPosition: "+elementTopPosition);
    //console.log("elementBottomPosition: "+elementBottomPosition);
    //console.log("windowTopPosition: "+windowTopPosition);
    //console.log("currentOffsetTop: "+currentOffsetTop);

    //check to see if this current container is within viewport
    if ((elementBottomPosition >= currentOffsetTop) && (elementTopPosition <= currentOffsetTop))
    {
      element.addClass('in-view');
    }
    else
    {
      element.removeClass('in-view');
    }
  });
}	