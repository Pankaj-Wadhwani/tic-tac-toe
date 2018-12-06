$(function () {
    var players=1;
    var playing = false; /*if user starts palying,make playing=true.*/
    var current = "X";
    var lastPositionOf_O;
    var clicking=false;
    var countClicks=0;
    $("#numplayer").click(function(){
        players=1;
//        alert(players);
        
        
    });
    $("#numplayer2").click(function(){
        players=2;
//        alert(players);
        
    });
    
    $("#startreset").click(function(){
        current="X";
        if(playing==false){
            playing=true;
            clicking=true;
            $("#gameover").hide();
            $(this).text("Reset");
              //this keeps X or O which is printed when user clicks on some div 
            if(players==2){
                for (i = 1; i <= 9; i++) {
                    $("#box" + i).click(function () {

                        if ($(this).text() == "" && clicking==true) {
                            $(this).text(current);
//                                            alert($(this).text());
                            checkMatrices(giveBlockNo($(this).attr('id')), current);
                            if (current == "X")
                                current = "O";
                            else
                                current = "X";
                        }
                    });
                }
            }else{/*else will work if there is one player*/  /* this part is not coded*/
                
                for (i = 1; i <= 9; i++) {
                    $("#box" + i).click(function () {

                        if ($(this).text() == "" && clicking==true) {
                            $(this).text("X");
                            countClicks++;
//                                            alert($(this).text());
                            checkMatrices(giveBlockNo($(this).attr('id')), current);
//                            alert("tp");
                            if (current == "X")
                                current = "O";
                            else
                                current = "X";
                            if(clicking && countClicks<5){
                                
                                placeCurrent("O",giveBlockNo($(this).attr('id')));
                            }
                           
                        }
                    });
                }
            }
            
            
        }
        else{
//           resetGame();
            
            location.reload(true);
        }
        
    });
    /***************************************************************
            packIndex stores which pack(pack[i]+1) should be checked.
            when 1st box is clicked packIndex[0] is called
            and from packIndex[0],pack[1-1],pack[4-1],pack[7-1] is called
    *************************************************************/
            
    var packIndex = ["147", "15", "168", "24", "2578", "26", "348", "35", "367"]


    /***************************************************************
    pack stores which boxes(ex : #box1) should be checked
    *************************************************************/
    var pack = ["123", "456", "789", "147", "258", "369", "159", "357"];

  function giveBlockNo(id) {
                return id.charAt(id.length - 1);
  }

    
    function checkMatrices(blockNo, checkChar) {
        for (i = 0; i < packIndex[blockNo - 1].length; i++) {
            var pointer = packIndex[blockNo - 1].charAt(i) - 1;
            var count = 0;

             if(checkChar == $("#box" + pack[pointer].charAt(0)).text() &&
                  checkChar == $("#box" + pack[pointer].charAt(1)).text() &&
                  checkChar == $("#box" + pack[pointer].charAt(2)).text()){
                $("#gameover").html("<p>Game Over<br/>"+checkChar + " won</p>").show();

                clicking=false;
                break;
            }

        }
    }
    function placeCurrent(curr, blockNo) {
        var flag=false;
//        alert(blockNo+"block");
        if (countClicks < 2) {
            placeRandomly(curr, blockNo);
            flag=true;
        }else if(countClicks>2){
            /*to make O win*/
//            alert("else if");
            var i=0;
            for (i = 0; i < packIndex[lastPositionOf_O - 1].length; i++) {
                var pointer = packIndex[lastPositionOf_O - 1].charAt(i) - 1;
                var count = 0;
                var temp;
//                alert("#box" + pack[pointer].charAt(0));
                if (pack[pointer].charAt(0)==lastPositionOf_O || "O" == $("#box" + pack[pointer].charAt(0)).text())
                    count++;
                else
                    temp = "#box" + pack[pointer].charAt(0);
//                alert("#box" + pack[pointer].charAt(1));
                if (pack[pointer].charAt(1)==lastPositionOf_O || "O" == $("#box" + pack[pointer].charAt(1)).text())
                    count++;
                else
                    temp = "#box" + pack[pointer].charAt(1);
//                alert("#box" + pack[pointer].charAt(2));
                if (pack[pointer].charAt(2)==lastPositionOf_O || "O" == $("#box" + pack[pointer].charAt(2)).text()) {
                    count++;
                } else
                    temp = "#box" + pack[pointer].charAt(2);
//                alert("count="+count);
                if (count > 1 && $(temp).text()==""){
                    flag=true;
                    $(temp).text("O");
                    $("#gameover").html("<p>Game Over<br/>O won</p>").show();
                    clicking=false;
                    break;
                }

            }
            
        } 
        if(!flag) {
            /*to stop X from winnig*/
//            alert("flag="+flag);
            var i=0;
            for (i = 0; i < packIndex[blockNo - 1].length; i++) {
                var pointer = packIndex[blockNo - 1].charAt(i) - 1;
//                alert(pointer+" pointer");
                var count = 0;
                var temp;
//                alert("#box" + pack[pointer].charAt(0));
                if (pack[pointer].charAt(0)==blockNo || "X" == $("#box" + pack[pointer].charAt(0)).text())
                    count++;
                else
                    temp = "#box" + pack[pointer].charAt(0);
//                alert("#box" + pack[pointer].charAt(1));
                if (pack[pointer].charAt(1)==blockNo || "X" == $("#box" + pack[pointer].charAt(1)).text())
                    count++;
                else
                    temp = "#box" + pack[pointer].charAt(1);
//                alert("#box" + pack[pointer].charAt(2));
                if (pack[pointer].charAt(2)==blockNo || "X" == $("#box" + pack[pointer].charAt(2)).text()) {
                    count++;
                } else
                    temp = "#box" + pack[pointer].charAt(2);
//                alert("count="+count);
                if (count > 1 && $(temp).text()==""){
                    
                    $(temp).text("O");
                    lastPositionOf_O=giveBlockNo(temp);
                    checkMatrices(giveBlockNo(temp), "O");
                    if (current == "X")
                        current = "O";
                    else
                        current = "X";
                    break;
                }

            }
            if(i == packIndex[blockNo - 1].length){
//                alert("if---"+curr);
                placeRandomly(curr,blockNo);
                
            }
        }
    }
    function placeRandomly(curr,blockNo){
        temp = Math.floor(Math.random() * 8) + 1;
            //        alert(temp+" temp");
            while ($("#box" + temp).text() != "") {
                //            alert(temp);
                temp = Math.floor(Math.random() * 8) + 1;
            }
//            alert("pr"+curr);
            lastPositionOf_O=temp;
            $("#box" + temp).text(curr);
            checkMatrices(temp, curr);

            if (current == "X")
                current = "O";
            else
                current = "X";
    }
    
});
