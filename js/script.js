//script.js

/*syntax of jquery 
$(selector).member

$(document).ready(function(){
    //code goes here
});

but jQuery has a short hand version for document ready event,which is as follows:

$(function(){
    code goes here;
});
*/

$(function(){
    
//    alert("hello");
//    $("#box").hide();
//    $(".thing").fadeOut(1000);
    $("h1").css("color","blue");
    $("button").click(function(){
        $("#box").fadeOut(1000);
    });
    
    /*************************************
        jquery selectors******************
        **********************************/
    
//    Grouping selectors
//    $("h2,h3,h4").css("border","solid 1px red");

    
//    Id Selector
//    $("div#container").css("border","solid 1px red");
    
//    Class Selector
//    $("p.lead").css("border","solid 1px red");
    
//    Descedent Selector
//    $("div em").css("border","solid 1px red");
    
//    Child Selector
//    $("div>p").css("border","solid 1px red");
    
//    Psuedo-selectors - select first Element
//    $("li:last").css("border","solid 1px red");
    
//    Psuedo selector to select all even paragraphs(id starts with 0)
//    $("p:even").css("border","solid 1px red");
    
//    jQuery Selector to select all headings
//    $(":header").css("border","solid 1px red");
    
//    jQuery contains Selector
    $("div:contains('love')").css("border","solid 1px red");
    
    /******************************************
            jQuery EVENTS
    ****************************************/
    
    $("#box").click(function(){
        alert("You just clicked me!"); 
    });
    
    $("input[type='text']").blur(function(){
        //this should acts as selector
        if($(this).val() == ""){
            $(this).css("border","solid 1px red");
            
        }
    });
    
    $("input[type='text']").keydown(function(){
        if($(this).val()!==""){
            $(this).css("border","solid 1px green");
            $("#box").text("Thanks for that mate!");
        }
    });
    
    $("#box").hover(function(){
        $(this).text("u hovered in!");
        
    },function(){
        $(this).text("u hovered out!");
    });
    
    /**************************************
                jQuery CHAINING
    ****************************************/
    
    $(".notification-bar").delay(2000).slideDown().delay(2000).slideUp(5000);
  
    /**********css.html****************/
    $("#circle2").css({
         'display': 'inline-block',
        'background': '#8a8',
        'color': 'white',
        'text-align': 'center',
       'line-height': '140px',
        'width': '140px',
        'height': '140px',
        'margin': '40px',
    }).addClass('circleShape');
    
    $("#name").blur(function(){
        if($(this).val() == "")
            $(this).addClass('danger');
    });
    
    
    /***********************************************hide-show.html********************/
    
    $('h1').hide();
    $('.hidden').show();
    $("div.hidden").fadeIn(8000);
    
    $("#box1").click(function(){
        $(this).fadeTo(3000,0.25,function(){
            $(this).slideUp();
        });
    });
    
    $(".hidden").slideDown();
    
    $("button").click(function(){
        $("#box1").slideToggle();
    });
    
    
    /****************************************
                jQuery Animate
    ***************************************/
    
    $("#left").click(function(){
       $(".box").animate({
           left: "-=40px",
           fontSize: "+=2x",
       }); 
    });
     $("#right").click(function(){
       $(".box").animate({
           left: "+=40px",
           fontSize: "-=2x",
       }); 
    });
     $("#up").click(function(){
       $(".box").animate({
           top: "-=40px",
           opacity: "+=0.1",
       }); 
    });
     $("#down").click(function(){
       $(".box").animate({
           top: "+=40px",
           opacity: "-=0.1",
       }); 
    });
    
    /***************************************************racer game*******************/
    
    $("#go").click(function(){
        function checkIfComplete(){
            if(isComplete==false){
                isComplete=true;
            }else{
                place="Second";
            }
        }
        //set the flag to false imdicating the race has yet not completed
        var isComplete = false;
        
        //setting by default position as first
        var place="first";
        
        //bring car1's width
        var car1Width = $("#car1").width();
        
        //bring car2's width
        var car2Width = $("#car2").width();
        
        //bringing racetrack width
        var raceTrack1Width = $(window).width() - car1Width;
        var raceTrack2Width = $(window).width() - car2Width;
        
        //generate random timing
        var raceTime1 = Math.floor(1 + Math.random() * 5000);
        var raceTime2 = Math.floor(1 + Math.random() * 5000);
        
        $("#car1").animate({
            //move car 1
            left : raceTrack1Width
        },raceTime1,function(){
            checkIfComplete();
            $("#raceInfo1 span").text('Finished in '+ place +' place and clocked in at '+raceTime1+'milliseconds');
            
        });

         $("#car2").animate({
        //move car 2
        left : raceTrack2Width
        },raceTime2,function(){
            checkIfComplete();
            $("#raceInfo2 span").text('Finished in '+ place +' place and clocked in at '+raceTime2+'milliseconds');
            
        });
        
        $("#reset").click(function(){
            $(".car").css("left","0");
            $(".raceInfo span").text("");
        });
        
    });
  
});