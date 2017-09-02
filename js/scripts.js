var suits = ['C', 'S', 'H', 'D'];
var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
var card_size = [72, 96];
//card Object
function Card(suit, rank){
  this.suit = suit;
  this.rank = rank;
}
Card.prototype.drawCard = function(card){
  ctx.drawImage(img, (card_size[0] * ranks.indexOf(this.rank)), (card_size[1] * suits.indexOf(this.suit)) , card_size[0], card_size[1], 50, 50, card_size[0], card_size[1])
  // ctx.drawImage(img, 0, 0, card_size[0], card_size[1], 50, 50, card_size[0], card_size[1])
  console.log(ranks[this.rank])
}
// card_size = [72, 96]
// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

//hand object
function Hand(){
  this.hand = [];
  this.value = 0;
  this.hasAce = false;
}
Hand.prototype.addCard = function(card){
  this.hand.push(card)
}
Hand.prototype.getValue = function(){
  var values = {'A':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, 'T':10, 'J':10, 'Q':10, 'K':10}
  this.value = 0;

  for(var i =0; i<this.hand.length; i ++){
    this.value += values[this.hand[i].rank]
    if(this.hand[i].rank === 'A'){
      this.hasAce = true;
    }
  }if(this.value <=11 && this.hasAce === true){
    this.value += 10;
  }return this.value;
}

//Deck object of cards
function Deck() {
  this.deck = [];
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
  testCard = new Card('D', 'A')
  testCard.drawCard();
  console.log(ranks.indexOf('A'))
}

//front end
$(document).ready(function(){
  //creat basic gui to display cards
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  img = document.getElementById("cards");
  ctx.drawImage(img, 0, 0, card_size[0], card_size[1], 50, 50, card_size[0], card_size[1])
  // ctx.drawImage(img,10,10);


  $("#newGameButton").click(function(){
    newGame();
    testCard = new Card('D', 'A')
    testCard.drawCard();
    console.log(playerHand.value)
  });
  $("#hitButton").click(function(){
    if(playerHand.value < 21){
      playerHand.addCard(deck.deal())
      playerHand.getValue();
      console.log(playerHand)
      console.log(playerHand.value)
    }
  });
  $("#standButton").click(function(){

  });
});
