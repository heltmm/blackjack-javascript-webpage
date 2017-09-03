
var suits = ['C', 'S', 'H', 'D'];
var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
var card_size = [72, 96];

//card Object
function Card(suit, rank){
  this.suit = suit;
  this.rank = rank;
}
//draws a specific card from cards image of all cards treating it like an array as it selects each card based on index of suits and ranks
Card.prototype.drawCard = function(card){
  ctx.drawImage(img, (card_size[0] * ranks.indexOf(this.rank)), (card_size[1] * suits.indexOf(this.suit)) , card_size[0], card_size[1], x_start, y_start, card_size[0], card_size[1])
}
//hand object
function Hand(user) {
  this.hand = [];
  this.value = 0;
  this.hasAce = false;
  this.user = user;
}
//adds a card to the hand
Hand.prototype.addCard = function(card){
  this.hand.push(card)
}
//gets value of hand including logic for aces
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
Hand.prototype.drawHand = function(){
  x_start = 0;
  if (this.user === "Player"){
    y_start = 304;
  }else if (this.user === "Dealer"){
    y_start = 0;
  }
  for(var i = 0; i < this.hand.length; i ++){
    this.hand[i].drawCard();
    x_start += 80;
  }
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
//removes the top card from the deck and returns it
Deck.prototype.deal = function(){
  return this.deck.pop(0);
}
//game logic
//resets variables and starts a new game
function newGame(){
  inPlay = false;
  money = 100;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText('Chips:',600,50);
  ctx.fillText('$' + money,600,80);
}

function deal(bet){
  if(!inPlay){
    inPlay = true;
    currentBet = bet
    money -= currentBet;
    deck = new Deck();
    playerHand = new Hand("Player");
    dealerHand = new Hand("Dealer");
    console.log(currentBet)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText('Chips:',600,50);
    ctx.fillText('$' + money,600,80);
    ctx.fillText('Bet:',600,300);
    ctx.fillText('$' + currentBet,600,330);
    deck.shuffle();

    hit(playerHand);
    hit(playerHand);
    hit(dealerHand);
    hit(dealerHand);
  }
}
function hit(hand){
  if(inPlay){
    if(hand.value < 21){
      hand.addCard(deck.deal())
      hand.getValue();
      hand.drawHand();
      if(hand.value > 21){
        ctx.fillText(hand.user + " Busted",canvas.width/2, canvas.height/2);
        inPlay = false;
      }
    }
  }
}
function stand(){
  if(inPlay){
    inPlay = false;
    while(dealerHand.getValue() < 17){
      dealerHand.addCard(deck.deal())
      dealerHand.drawHand()
    }if (dealerHand.value === 21){
      ctx.fillText("Dealer Wins",canvas.width/2, canvas.height/2);
    }else if (dealerHand.value > 21){
      ctx.fillText("Dealer Busted",canvas.width/2, canvas.height/2);
      money += (2*currentBet)
      ctx.fillText('+ $' +(2* currentBet) ,600,110)
    }else if (playerHand.value > dealerHand.value){
      ctx.fillText("Player Wins",canvas.width/2, canvas.height/2);
      money += (2*currentBet)
      ctx.fillText('+ $' +(2* currentBet) ,600,110)
    }else if (playerHand.value < dealerHand.value|| playerHand.value === dealerHand.value){
      ctx.fillText("Dealer Wins",canvas.width/2, canvas.height/2);
    }
  }
}


//front end
$(document).ready(function(){
  //creates basic gui to modify canvas
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  img = document.getElementById("cards");
  money = 100;
  ctx.font = "30px Arial";
  ctx.fillText('Chips:',600,50);
  ctx.fillText('$' + money,600,80);


  $("#newGameButton").click(function(){
    newGame();
  });
  $("#hitButton").click(function(){
    hit(playerHand);
  });
  $("#standButton").click(function(){
    stand();
  });
  $("#bet5").click(function(){
    deal(5);
  });
  $("#bet10").click(function(){
    deal(10);
  });
  $("#bet20").click(function(){
    deal(20);
  });
});
