$(document).ready(function() {
  $(".winner-announcement").hide();
  $(".restart").hide();

  var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var player1;
  var player2;
  var iteration = 0;
  var round = 0;
  var p1Sign = "O";
  var p2Sign = "X";
  

  //--attribute symbol to player--//
  $("input").click(function() {
    player1 = $(this).val();
    $("input").attr("disabled", true); //prevents to change symbol while playing

    if (player1 === "X") {
      player2 = "O";
      $(".player2").html("AI: O");
    } else {
      player2 = "X";
      $(".player2").html("AI: X");
    }
  });

  
  //--tic tac toe functionality--//
  $("td").click(function() {
    move(this, player1, p1Sign);
  });

  function move(element, player, sign) {
    console.log("element" + element.id);
    if (board[element.id] != "X" && board[element.id] != "O") {
      round++;
      $(element).text(player1); 
      board[element.id] = player;
      console.log(board);

      if (winning(board, player)) {
        $(".winner-announcement")
          .show()
          .text(player + " won!");
        $("td").css("border-color", "#7f756b");
        $(".restart").show();
        $(".yourteam").hide();
        return;
        
      } else if (round > 8) {
        $(".winner-announcement")
          .show()
          .text("TIE!");
        $("td").css("border-color", "#92c19f");
        $(".restart").show();
        $(".yourteam").hide();
        return;
      } else {
        round++;
        var index = minimax(board, player2).index;
        var selector = "#" + index;
        $(selector).text(player2); 
        board[index] = player2;
        console.log(board);
        console.log(index);
        if (winning(board, player2)) {
          $(".winner-announcement")
            .show()
            .text("AI won!");
          $("td").css("border-color", "#ebc860");
          $(".restart").show();
          $(".yourteam").hide();
          return;
          
        } else if (round === 0) {
          $(".winner-announcement")
            .show()
            .text("TIE!");
          $("td").css("border-color", "#92c19f");
          $(".restart").show();
          $(".yourteam").hide();
          return;
        }
      }
    }
  }

  $(".restart").click(function() {
    round = 0;
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $("td").text("");
    $("td").css("border-color", "#1a1a1a");
    $(".winner-announcement").hide();
    $(".restart").hide();
    $(".yourteam").show();
  });

  function minimax(reboard, player) {
    iteration++;
    var array = avail(reboard);
    if (winning(reboard, player1)) {
      return {
        score: -10
      };
    } else if (winning(reboard, player2)) {
      return {
        score: 10
      };
    } else if (array.length === 0) {
      return {
        score: 0
      };
    }

    var moves = [];
    for (var i = 0; i < array.length; i++) {
      var move = {};
      move.index = reboard[array[i]];
      reboard[array[i]] = player;

      if (player == player2) {
        var g = minimax(reboard, player1);
        move.score = g.score;
      } else {
        var g = minimax(reboard, player2);
        move.score = g.score;
      }
      reboard[array[i]] = move.index;
      moves.push(move);
    }

    var bestMove;
    if (player === player2) {
      var bestScore = -50000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 50000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  //available spots
  function avail(reboard) {
    return reboard.filter(s => s != "X" && s != "O");
  }

  // winning combinations
  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }

});
