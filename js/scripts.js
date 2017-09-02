

var values = {'A':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'T':10, 'J':10, 'Q':10, 'K':10}


//card Object
function Card(suit, rank){
  this.suit = suit;
  this.rank = rank;
}
//hand object
function Hand(){
  this.hand = [];
}
Hand.prototype.addCard = function(card){
  this.hand.push(card)
}

//Deck object of cards
function Deck() {
  this.deck = [];
  var suits = ['C', 'S', 'H', 'D'];
  var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
  for(var i = 0; i<suits.length; i++ ){
    for(var j = 0; j<ranks.length; j++){
      this.deck.push(new Card(suits[i],ranks[j]))
    }
  }
}
//Randomize deck using Durstenfield shuffle algorithm
Deck.prototype.shuffle = function() {
  for (var i = this.deck.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
  }
  return this.deck;
}
Deck.prototype.deal = function(){
  return this.deck.pop(0);
}


function newGame(){
  deck = new Deck();
  deck.shuffle();
  playerHand = new Hand();
  dealerHand = new Hand();
}

//front end
$(document).ready(function(){
  $("#newGameButton").click(function(){
    newGame();
  });
  $("#hitButton").click(function(){
    playerHand.addCard(deck.deal())
    console.log(playerHand)
  });
  $("#standButton").click(function(){

  });
});
