function Node(){
   this.id = '';
   this.class = '';
   this.bottomPos = 0;
   this.offsetTop = 0;
   this.scroll = 0;
   this.name = '';
   this.isInView = false;
}

Node.prototype.ToString = function()
{
  return "name: " + this.name + " id: " + this.id + " class:" + this.class + " bottomPos: " + this.bottomPos + " offsetTop: " + this.offsetTop + " scroll: " + this.scroll + " isInView: " + this.isInView;
}

function ClickHandler()
{
     $("nav a").click(function(e)
     {
        e.preventDefault();

        var slideId = e.currentTarget.id;
        var menuHeight = $("nav").bottomPos();
        var elementOffsetTop = (($("#" + slideId + "_slide").offset().top) - (menuHeight + menuHeight/4));

        $("html, body").animate({
            scrollTop: elementOffsetTop,
            duration: "slow",
            easing: "easin"
        });
    });
}

function Animation(toAnimate)
{
  var jsonObj = [];
  var animationElements = $(toAnimate).children('img');  
  var parent = new Node();
  var container = $(toAnimate);
  var menuHeight = $("nav").height();
  parent.name = "parent";
  parent.id = $(container).attr('id');
  parent.class = $(container).attr('class');  
  parent.offsetTop = $(container).offset().top;
  parent.bottomPos = parent.offsetTop + $(container).height();
  var currentOffset = window.pageYOffset;
  parent.scroll = currentOffset;

  if(currentOffset >= (parent.offsetTop + menuHeight) && currentOffset <= parent.bottomPos)
  {
      parent.isInView = true;
      jsonObj.push({"parent" : parent});
      for (var i = 0; i < animationElements.length; i++) 
      {
          var child = new Node();
          var element = animationElements[i];
          child.name = 'child';
          child.id = $(element).attr('id');
          child.class = $(element).attr('class');
          child.offsetTop = $(element).offset().top;
          child.bottomPos = (child.offsetTop + $(element).height());
          child.scroll = currentOffset;

          //check to see if this current container is within viewport
          if (currentOffset >= (child.offsetTop + menuHeight) && currentOffset <= parent.bottomPos)
          {
            child.isInView = true;
           // $("."+child.class).addClass(".rotate");
            $("."+child.class).animate({
                opacity : 1,
                step: 0.1,
                duration: 3000,
                complete: function(){console.log("complete anim1");}
            });
            //console.log("."+child.class);
          }
          /*else
          {
            $("."+child.class).removeClass(".rotate"); 
          } */      
          jsonObj.push({"child" : child});
      }
      var storage = WriteToLocalStorage(jsonObj);
      var obj = ReadFromLocalStorage(storage);
      ParseJSON(obj);
  }
  //expand objects, arrays console of chrome :D:D:D
  //$$('.console-view-object-properties-section').forEach(e => e._section._objectTreeElement.expandRecursively())
}
//Animations//
$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};

function Animation1(name,d)
{
    console.log(name);
    var obj = $(name);
    for (var i = obj.length - 1; i >= 0; i--) {
      $(obj[i]).animateRotate(d,{
        step: 15,
        easin: 'easin',
        duration:1000,
        complete: function(){console.log("complete anim2");}
  });
    }
}
//For Testing purposes//
function WriteToLocalStorage(obj)
{
  if(typeof(localStorage)!== undefined)
   var myStorage = localStorage.setItem('myStorage', JSON.stringify(obj));
 else console.log("Browser doesnt support localStorage");
   return myStorage;
}

function ReadFromLocalStorage(myStorage)
{
  if(myStorage != undefined)
  var obj = JSON.parse(myStorage.getItem('myStorage'));   
else
  var obj = JSON.parse(localStorage.getItem('myStorage'));
  return obj;
}

function ParseJSON(json)
{
   $(json).each(function()
   {

        var obj = new Node(); 

        if(this["parent"] != undefined)
        {
            obj.name = this["parent"]["name"];
            obj.id = this["parent"]["id"];
            obj.class = this["parent"]["class"];
            obj.bottomPos = this["parent"]["bottomPos"];
            obj.offsetTop = this["parent"]["offsetTop"];
            obj.scroll = this["parent"]["scroll"];
            obj.isInView = this["parent"]["isInView"];
        }
        if(this["child"] != undefined)
        {
            obj.name = this["child"]["name"];
            obj.id = this["child"]["id"];
            obj.class = this["child"]["class"];
            obj.bottomPos = this["child"]["bottomPos"];
            obj.offsetTop = this["child"]["offsetTop"];
            obj.scroll = this["child"]["scroll"];
            obj.isInView = this["child"]["isInView"];
        }
       console.log(obj.ToString());
  });
}

function LoadCssFileDynamically(filename, filetype)
{
    if (filetype=="css")
    { 
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}
