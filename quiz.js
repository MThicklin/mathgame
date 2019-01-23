/* 1/22 Only thing to add now is animations. */
var lvl = {
 l0: {
  steps: 4, //Numbers inside a grid.
  answLim: 10, //Limit for the problem.
  parts: 2 //How many numbers are in a problem.
 },
 l1: {
  steps: 9,
  answLim: 10,
  parts: 2
 },
 l2: {
  steps: 16,
  answLim: 10,
  parts: 2
 }
};

var heart = {
 size: {
  width: "50px",
  heigth: "50px"
 },
 full: {
  pic: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/349822/heartFull.png"
 },
 half: {
  pic: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/349822/heartHalf.png"
 },
 mt: {
  pic: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/349822/heartMT.png"
 }
};

var chara = {
 slash: {
  pic: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/349822/slash.png",
  width: "50px",
  heigth: "50px"
 },
 hero: {
  mage: {
   math: "*",
   hits:
    "2" /*Hits: amount of strikes a heart can take, if changed here, change in enemhit() / herohit()*/,
   lives: "2" /*Lives is how many hearts are left, 0 is a life*/,
   pic: {
    name: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/349822/mage.png"
   },
   size: {
    width: "200px",
    heigth: "200px"
   }
  },
  figh: {
   math: "+"
  },
  pala: {
   math: "/"
  },
  ninj: {
   math: "-"
  }
 },
 enem: {
  gobl: {
   /*goblin*/
   hits: "2",
   lives: "2",
   pic: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/349822/gobl.png"
  }
 }
};

var numArray = {
 answ: [],
 prob: [],
 rand: []
};
var currLvl = lvl.l0;
var charaArray = [
 chara.hero.mage.math,
 chara.hero.ninj.math,
 chara.hero.pala.math,
 chara.hero.figh.math
];

function startGame() {
 "use strict";
 createGrid();
 hearts();
}

function createGrid() {
 "use strict";
 debugger;
 for (var t = 0; t < currLvl.steps; t++) {
  var box = document.createElement("div");
  box.id = t;
  box.class = box;
  box.addEventListener("click", function() {
   checkAnswer(this.id);
  });
  document.getElementById("gridAreal0").appendChild(box);
 }
 prob();
}

function prob() {
 "use strict";
 numArray.answ.length = 0;
 numArray.prob.length = 0;
 numArray.rand.length = 0; //may need to move this later[1]
 var op = charaArray[Math.floor(Math.random() * charaArray.length)];
 var probNum = 0;
 for (var i = 0; i < currLvl.parts; i++) {
  probNum = Math.round(Math.random() * currLvl.answLim + 1);
  numArray.prob.push(probNum);
 }
 document.getElementById("probArea").innerHTML =
  numArray.prob[0] + op + numArray.prob[1];
 random(op);
}

function random(op) {
 "use strict";
 var answNum = 0;
 var deciNum = 0;
 var answMin = numArray.answ[0] - currLvl.answLim;
 var answMax = numArray.answ[0] + currLvl.answLim;
 var fullAnswer = eval(numArray.prob[0] + op + numArray.prob[1]);
 for (var i = 0; i < currLvl.steps; i++) {
  if (op != chara.hero.pala.math) {
   answNum = Math.round(Math.random() * currLvl.answLim + 1);
   numArray.rand.splice(i, 1, answNum);
   numArray.answ.push(fullAnswer);
  } else {
   deciNum = Math.floor(Math.random() * (1000 - currLvl.answLim) + 100) / 100;
   numArray.rand.splice(i, 1, deciNum);
   var answer = fullAnswer.toFixed(2);
   numArray.answ.push(answer);
  }
  document.getElementById(i).innerHTML = numArray.rand[i];
 }
 answ();
}

function answ(op) {
 "use strict";
 var answ = Math.floor(Math.random() * numArray.rand.length);
 console.log("answ, answ: ", numArray);
 numArray.rand.splice([answ], 1, numArray.answ[0]);
 document.getElementById(answ).innerHTML = numArray.rand[answ];
}

function hearts() {
 "use strict";
 for (var n = 0; n <= chara.hero.mage.lives; n += 1) {
  var heroLife = document.createElement("img");
  heroLife.src = heart.full.pic;
  heroLife.style.width = heart.size.width;
  heroLife.style.height = heart.size.height;
  heroLife.id = "hHeart" + n;
  document.getElementById("hero_box").appendChild(heroLife);
 }

 for (var h = 0; h <= chara.enem.gobl.lives; h += 1) {
  var enemLife = document.createElement("img");
  enemLife.src = heart.full.pic;
  enemLife.style.width = heart.size.width;
  enemLife.style.height = heart.size.height;
  enemLife.id = "eHeart" + h;
  document.getElementById("enem_box").appendChild(enemLife);
 }
}

function checkAnswer(id) {
 "use strict";
 console.log("checkAnsw, numArray: ", numArray);
 var AnswId = document.getElementById(id).innerHTML;
 console.log("checkAnsw, AnswId: ", AnswId);
 if (numArray.answ[0] != AnswId) {
  enemHit();
  return;
 } else {
  heroHit();
  return;
 }
}

function heroHit() {
 "use strict";
 chara.enem.gobl.hits--;

 if (chara.enem.gobl.lives === 0 && chara.enem.gobl.hits === 0) {
  alert("You Win!");
  location.reload(); /*Exit code for return to stage to be added*/
 } else if (chara.enem.gobl.hits === 1) {
  document.getElementById("eHeart" + chara.enem.gobl.lives).src =
   heart.half.pic;
  numArray.length = 0;
  console.log("heroHit, elseif, numArray: ", numArray);
  prob();
  return chara.enem.gobl.hits;
 } else if (chara.enem.gobl.hits === 0) {
  document.getElementById("eHeart" + chara.enem.gobl.lives).src = heart.mt.pic;
  chara.enem.gobl.lives--;
  chara.enem.gobl.hits = 2;
  numArray.length = 0;
  console.log("heroHit, 2nd elseif, numArray: ", numArray);
  prob();
  return chara.enem.gobl.hits;
 } else if (chara.enem.gobl.lives >= 1) {
  document.getElementById("eHeart" + chara.enem.gobl.lives).src = heart.mt.pic;
  document.getElementById("enem_hit_box").id = "nearDeath";
  chara.enem.gobl.lives--;
  chara.enem.gobl.hits = 2;
  numArray.length = 0;
  console.log("heroHit, 3rd else if, numArray: ", numArray);
  prob();
  return chara.enem.gobl.hits && chara.enem.gobl.lives;
 } else {
  return;
 }
}

function enemHit() {
 "use strict";
 chara.hero.mage.hits--;

 if (chara.hero.mage.lives === 0 && chara.hero.mage.hits === 0) {
  alert("You Lose!");
  location.reload(); /*Exit code for return to stage to be added*/
 } else if (chara.hero.mage.hits === 1) {
  document.getElementById("hHeart" + chara.hero.mage.lives).src =
   heart.half.pic;
  return chara.hero.mage.hits;
 } else if (chara.hero.mage.hits === 0) {
  document.getElementById("hHeart" + chara.hero.mage.lives).src = heart.mt.pic;
  chara.hero.mage.lives--;
  chara.hero.mage.hits = 2;
  return chara.hero.mage.hits && chara.hero.mage.lives;
 } else if (chara.hero.mage.lives >= 1) {
  document.getElementById("hHeart" + chara.hero.mage.lives).src = heart.mt.pic;
  document.getElementById("hero_hit_box").id = "nearDeath";
  chara.hero.mage.lives--;
  chara.hero.mage.hits = 2;
  prob();
  return chara.hero.mage.hits && chara.hero.mage.lives;
 } else {
  return;
 }
}
