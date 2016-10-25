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

function Animation(toAnimate,animationClass)
{
  if(IsElementInView(toAnimate))
  {
      $(toAnimate).addClass(animationClass);
  }
  else
  {
      $(toAnimate).removeClass(animationClass);
  }
}

function IsElementInView(toAnimate)
{
  //var jsonObj = [];
  var isInView = false;
  var animationElements = $(toAnimate).children('img');  
  var parent = new Node();
  var container = $(toAnimate).parent();
  parent.name = "parent";
  parent.id = $(toAnimate).attr('id');
  parent.class = $(toAnimate).attr('class');  
  parent.offsetTop = $(container).offset().top;
  var currentOffset = window.pageYOffset;
  parent.scroll = currentOffset;
  if(currentOffset < parent.offsetTop)
  {
    parent.bottomPos = parent.offsetTop + $(container).height()/2;
    currentOffset += parent.offsetTop/4;
  }
  if(currentOffset > parent.bottomPos)
  {
    parent.bottomPos = parent.offsetTop - $(container).height()/2;
    currentOffset -= parent.offsetTop/4;
  }
  if(currentOffset >= parent.offsetTop && currentOffset <= parent.bottomPos)
  {
      parent.isInView = true;
   //   jsonObj.push({"parent" : parent});
      isInView = true;
  }
 // var storage = WriteToLocalStorage(jsonObj);
 // var obj = ReadFromLocalStorage(storage);
 // ParseJSON(obj);
  return isInView;
}
  //expand objects, arrays console of chrome :D:D:D
  //$$('.console-view-object-properties-section').forEach(e => e._section._objectTreeElement.expandRecursively())
function GenerateHTML(container,tag)
{
    var parent = $(container);
    var slides = [];
    for (var j = 1; j <= 4; j++ )
    {
       var slide = document.createElement('div');
       if(j % 2 == 0)
       {
          $(slide).attr('class','front_h'); 
       }
       else
       {
          $(slide).attr('class','back_h');
       }
       slides.push(slide);
    }
    var l = 0;
    for (var i = 1; i < 23; i++ ) 
    {   
        var child = document.createElement(tag);
        $(child).attr('class','certs');
        $(child).attr('src',"./images/certificates/"+ i +".jpg");
        if($(slides[l]).children().length <= 3 )
        {
          $(slides[l]).append(child);
        }
        else
        {
          $(parent).append(slides[l]);
          l++;
        }  
    }
    console.log(slides);
}

//For Testing purposes//
function WriteToLocalStorage(obj)
{
  if(typeof(localStorage) !== undefined)
  {
   var myStorage = localStorage.setItem('myStorage', JSON.stringify(obj));
  }
  else
  {
   console.log("Browser doesnt support localStorage");
  } 
   return myStorage;
}

function ReadFromLocalStorage(myStorage)
{
  if(myStorage != undefined)
  {  
    var obj = JSON.parse(myStorage.getItem('myStorage'));   
  }
  else
  {
    var obj = JSON.parse(localStorage.getItem('myStorage'));
  }
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
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
    {
          document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
