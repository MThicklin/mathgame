function startGame() {
  "use strict";

  hearts();

  createGrid();

  random();
}

var lvl = {
  l0: {
    gridX: 2,
    gridY: 2,
    steps: 4,
    max: 1,
    parts:2
  },
  l1: {
    gridX: 3,
    gridY: 3,
    steps: 9,
    max: 10,
    parts:2
  },
  l2: {
    gridX: 4,
    gridY: 4,
    steps: 16,
    max: 50,
    parts:2
  },
  l3: {
    gridX: 5,
    gridY: 5,
    steps: 25,
    max: 100,
    parts:2
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
      hits: "2" /*Hits is how many strikes a heart can take, if changed here, change in enemhit() / herohit()*/,
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

var numArray = [];
var currLvl = lvl.l0;
var charaArray = [
  chara.hero.mage.math,
  chara.hero.ninj.math,
  chara.hero.pala.math,
  chara.hero.figh.math
];
var answer = "";

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
    enemLife.id = "eHeart" + n;
    document.getElementById("enem_box").appendChild(enemLife);
  }
}

function createGrid() {
  "use strict";
  for (var t=0;t<currLvl.steps;t++){
    var answBox = document.createElement("div");
        answBox.className = "box box-a";
        answBox.id = t;
        answBox.addEventListener("click", function(){ checkAnswer(this.id); });
    document.getElementById("gridArea").appendChild(answBox);
  }
}

function random() {
  "use strict";
    for (var i = 0; i < currLvl.steps; i++) {
    var answEntry = Math.round(Math.random() * currLvl.max) + 1;
    numArray.push(answEntry);
    document.getElementById(i).innerHTML = numArray[i];
  }

prob();
}

function prob() {
  "use strict";
  for (var i=0;i <= currLvl.parts; i++){
   var probNum = Math.round(Math.random() * currLvl.max)+1;
    numArray.push(probNum);
  }

  var op = charaArray[Math.floor(Math.random() * charaArray.length)];
  var problem = numArray[numArray.length-2] + op + numArray[numArray.length-1];
  var randAnsw = numArray[Math.floor(Math.random() * numArray.length)];
  
  numArray.splice(randAnsw, 1, eval(problem));
  
  var probDisp = document.createTextNode(problem);
  document.getElementById("probArea").appendChild(probDisp);
    
  console.log("prob, randAnsw: ", randAnsw);
  console.log("prob, opArray: ", charaArray);
  console.log("prob, problem: ", problem);
  console.log("prob, answer: ", answer);
  console.log("prob, numArray: ", numArray);
  return numArray,answer;
}

function checkAnswer(id) {
  "use strict";

  var AnswId = numArray[id];
  
  if (answer != answId) {
    console.log("wrong! id: ",id);
    enemHit();
    return;
  } else {
    console.log("right! id: ",id);
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
    document.getElementById("eHeart" + chara.enem.gobl.lives).src = chara.hHalf;
    numArray.length = 0;
    console.log("heroHit, elseif, numArray: ", numArray);
    random();
    return chara.enem.gobl.hits;
  } else if (chara.enem.gobl.hits === 0) {
    document.getElementById("eHeart" + chara.enem.gobl.lives).src = chara.hMT;
    chara.enem.gobl.lives--;
    chara.enem.gobl.hits = 2;
    numArray.length = 0;
    console.log("heroHit, 2nd elseif, numArray: ", numArray);
    random();
    return chara.enem.gobl.hits;
  } else if (chara.enem.gobl.lives >= 1) {
    document.getElementById("eHeart" + chara.enem.gobl.lives).src = chara.hMT;
    document.getElementById("enem_hit_box").id = "nearDeath";
    chara.enem.gobl.lives--;
    chara.enem.gobl.hits = 2;
    numArray.length = 0;
    console.log("heroHit, 3rd else if, numArray: ", numArray);
    random();
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
    document.getElementById("hHeart" + chara.hero.mage.lives).src = chara.hHalf;
    return chara.hero.mage.hits;
  } else if (chara.hero.mage.hits === 0) {
    document.getElementById("hHeart" + chara.hero.mage.lives).src = chara.hMT;
    chara.hero.mage.lives--;
    chara.hero.mage.hits = 2;
    return chara.hero.mage.hits && chara.hero.mage.lives;
  } else if (chara.hero.mage.lives >= 1) {
    document.getElementById("hHeart" + chara.hero.mage.lives).src = chara.hMT;
    document.getElementById("hero_hit_box").id = "nearDeath";
    chara.hero.mage.lives--;
    chara.hero.mage.hits = 2;
    random();
    return chara.hero.mage.hits && chara.hero.mage.lives;
  } else {
    return;
  }
}