$(function () {
    
    var playing = false; /*if user starts palying,make playing=true.*/
    var current = "X";
    var clicking=false;
    $("#startreset").click(function(){
        current="X";
        if(playing==false){
            playing=true;
            clicking=true;
            $("#gameover").hide();
            $(this).text("Reset");
              //this keeps X or O which is printed when user clicks on some div 
   
            for (i = 1; i <= 9; i++) {
                $("#box" + i).click(function () {

                    if ($(this).text() == "" && clicking==true) {
                        $(this).text(current);
                        //                alert($(this).text());
                        checkMatrices(giveBlockNo($(this).attr('id')), current);
                        if (current == "X")
                            current = "O";
                        else
                            current = "X";
                    }
                });
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

});
