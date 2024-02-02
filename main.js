import kaboom from "kaboom"

// initialize context
kaboom()

// load assets
loadSprite("player", "sprites/player.png",{
  sliceX: 3,
  sliceY: 3,
  anims: {
    idle: {
      from: 0,
      to: 1,
       loop: true,
      speed: 1.5,
    },
    runRight: {
      from: 2,
      to: 3,
       loop: true,
      speed: 8,
    },
    runLeft: {
      from: 4,
      to: 5,
       loop: true,
      speed: 8,
    },
    jumpRight: {
      from: 6,
      to: 6,
    },
    jumpLeft: {
      from: 7,
      to: 7,
    },
  }
})
loadSprite("spike", "sprites/spike.png")
loadSprite("grass", "sprites/grass.png")
loadSprite("prize", "sprites/jumpy.png")
loadSprite("apple", "sprites/apple.png")
loadSprite("portal", "sprites/door.png")
loadSprite("coin", "sprites/coin.png")
loadSprite("menu", "sprites/menu.png")
loadSprite("intro", "sprites/intro.png")
loadSprite("losescreen", "sprites/deathScreen.png")
loadSprite("PencilFeet", "sprites/PencilFeet.png")
loadSprite("grasslandBackground", "sprites/grasslandsBackground.png")
loadSprite("oceanBackground", "sprites/oceanBackground.png")
loadSprite("cloudBackground", "sprites/cloudBackground.png")
loadSprite("stone", "/sprites/stone.png")
loadSprite("dirt", "/sprites/dirt.png")
loadSprite("diamond", "/sprites/diamond.png")
loadSound("mainMenuMusic", "sounds/mainMenuMusic.mp3", {
  loop: true,
})
loadSound("coin", "sounds/score.mp3")
loadSound("powerup", "sounds/powerup.mp3")
loadSound("blip", "sounds/blip.mp3")
loadSound("hit", "sounds/hit.mp3")
loadSound("portal", "sounds/portal.mp3")

// define some constants
const JUMP_FORCE = 1320
const MOVE_SPEED = 480
const FALL_DEATH = 2400
var lives = 3
var coins = 0
var diamonds = 0

const mainMenuMusic = play("mainMenuMusic",{
  loop: true
})
  
const LEVELS = [
  [
    "                          *       ",
    "                          $       ",
    "                          $       ",
    "                          $       ",
    "                          $    %  ",
    "           $$         =   $    *  ",
    "         ====         0   $    *  ",
    "                      0   $  =====",
    "               =      0           ",
    "       ^^      0 >    0   @       ",
    "===============0======0====       ",
  ],
  [
    "                             %",
    "     $    $    $    $     $  *",
    "     $    $    $    $     *  *",
    "                           ",
    "                             =",
    "                           ",
    "                           ",
    "                           ",
    "    ^>^^^^>^^^^>^^^^>^^^^^@",
    "===========================",
  ],
  [
    "                                                                    ",
    "                                                                    ",
    "                              $                                     ",
    "                                                                    ",
    "                                                                    ",
    "                    $            $  $$                              ",
    "                            $           $                           ",
    "                  $                                                 ",
    "            $                     $       $                $        ",
    "                      $           ===                               ",
    "         $       $                0f0      $                $       ",
    "              $       ===>  ^     0f0                               ",
    "                      000   =     0f0       $        *       $      ",
    "               $      000===0     0f0                               ",
    "                      0fffff0     0f0        $                @           ",
    "              ^>^     0fffff0     0f0       ======= >^       ===          ",
    "               =      0fffff0     0f0       0fffff0  =       0f0          ",
    "               0      0fffff0     0f0       0fffff0==0       0f0               % ",
    "   ^^^^>^^^^^^^0^^^^^^0fffff0^^^^^0f0^^^^^^^0ffffffff0^^^^^^^0f0^^^             ",
    "===============0======0fffff0=====0f0=======0ffffffff0=======0f0====      **    @",
    "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff=============",
  ],
  [
    "                                                                   0",
    "                                                                   0",
    "                                                                   0",
    "                                                                   0",
    "               $$$                                $                0",
    "               $$$%                                               @0",
    "               $*$                             $            =======0",
    "               $$$ s          $$                     =      0ffffff0",
    "               sssss    $$                           0      0ffffff0",
    "                                           $$ =      0      0ffffff0",
    "                                  ==       $  0      0      0ffffff0",
    "        =                   =     00          0      0      0      0",
    "             $    $   =     0     00       =  0      0      0      0",
    "                      0     0     00       0  0      0             0",
    "               ====   0     0     00       0  0      0        * *  0",
    "               0ff0   0     0     00       0  0      0         #  @0",
    "             ^^0ff0^^^0^^^^^0^^^^^00^^^^^^^0^^0^^^^^^0^^^^^^00000000",
    "===============0ff0===0=====0=====00=======0==0======0======00000000",
  ],
  [
    "                                $                  $$$$$$$$$$$$$$$$$$%",
    "             $                   $                 $$$$$$$$$$$$$$$$$$*",
    "            $ $              =                     $$$$$$$$$$$$$$$$$$$",
    "                             0                     ===================",
    "                             0     $                                 0",
    "                     $    ===0         $  $                          0",
    "    $    =      $         0ff0                                       0",
    "   $     0                0ff0             =                         0",
    "      == 0         =      0ff0     ===     0                         0",
    "      00 0      ===0     =0ff0     0f0     0                         0",
    "    ^^00^0^^^^^^0000^^^^^0fff0^^^^^0f0^^^^^0^^^     >         ss    @0",
    "======00=0======0000=====0fff0=====0f0=====0=========================0",
    ],
  [
    "                                                                   =",
    "                                                                   0",
    "                                                                   0",
    "                                                                   0",
    "                                                                   0",
    "                                                                   0",
    "                                                       %           0",
    "                      =                                *           0",
    "       >   ss     ^^^^0                     ^^                     0",
    "======================0==============       =======================0",
    "s                                             sqqqqs               s",
    "s$$$$$$$          *       *            ^^^     ssqqs               s",
    "s$$%$$$$                             sssssss     ss    sssss       s",
    "s$$$$$$$s   s   s   s   s   s   s >  sqqqqqqs        ^sqqqqs       s",
    "s@$$$$$$s^^^s^^^s^^^s^^^s^^^s^^^s^^  sqqqqqqqss^     sqqqqqs      @s",
    "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    ],
  [
    "   %                                                                s",
    "                                                                    s",
    "                                                                    s",
    "   s                                                                s",
    "                          $                                        @s",
    "                         $ $                             ssssssssssss",
    "                                                 sss                           ",
    "                                  $              sqs                           ",
    "                                      ss  s      sqs                           ",
    "                    sss         >     ss> s      sqs                           ",
    "                    sqs      ssss     sqsss      sqs                        %  ",
    "     s      >ss     sqs      sqqs     sqqqs      sqs                           ",
    "s^^^ss^^^^^^sqs^^^^^sqs^^^^^^sqqs^^^^^sqqqs^^^^^^sqs^^^^^    ***              @",
    "ssssssssssssqqqsssssqqqssssssqqqqsssssqqqqqssssssqqqsssssssssssssssssssssssssss",
    ],
  [ "                                                                               ",
    "                                                                               ",
    "                                                                               ",
    "                                                                               ",
    "                                                                               ",
    "                                                        $                  0   ",
    "                           ===        $               $                    0   ",
    "         $   $     $       0f0        $              $                   = 0 =$",
    "        $     $   $        0f0                            00000000        =0= $",
    "                        ===0f0                    *                        0  $",
    "   ^^===^^^^^^^===^^^^^^0ffff0^^^^^^^====^^^^^^^sssss^^^^^^^^^^^^^^^^^^^^^^ @  ",
    "=====000=======000======0ffff0=======0000======sssssss=========================",
    "                                                                               ",
    "                                                                               ",
    "                                                                               ",
    "                                                                               ",
    "                                                                         $$$$$$",
    "                                                                         @**$#$",
    "                                                                         ======",
  ],
  [
    "                                                                            $%$",
    "              $                                               $             $$$",
    "             $                                               s              *$*",
    "                 $                                           s $            sss",
    "           =                                            =    s    ^>^          ",
    "          =0        $     $                             0    s  $  ^           ",
    "         =f0             $   $                    =     0    s                 ",
    "        =ff0          $       ====                0     0    s   $             ",
    "       =fff0> ^^^^^^  ==      0ff0      *    =    0     0    s                @",
    "=======fffff==========ff====  0ff0     sss   0    0     0    s    =============",
  ]]
// coin = $, end = @, spike = ^, grass = =, PencilFeet = >, block = %, apple = #, stone = s, dirt = 0
// define what each symbol means in the level graph
const levelConf = {
  // grid size
  width: 64,
  height: 64,
  // define each object as a list of components
  "=": () => [
    sprite("grass"),
    area(),
    solid(),
    origin("bot"),
  ],
  "$": () => [
    sprite("coin"),
    area(),
    pos(0, -9),
    origin("bot"),
    "coin",
  ],
  "%": () => [
    sprite("prize"),
    area(),
    solid(),
    origin("bot"),
    "prize",
  ],
  "^": () => [
    sprite("spike"),
    area(),
    solid(),
    origin("bot"),
    "danger",
  ],
  "#": () => [
    sprite("apple"),
    area(),
    origin("bot"),
    body(),
    "apple",
  ],
  ">": () => [
    sprite("PencilFeet"),
    width(16),
    height(16),
    area(),
    origin("bot"),
    body(),
    patrol(),
    "enemy",
  ],
  "@": () => [
    sprite("portal"),
    area(),
    origin("bot"),
    pos(),
    "portal",
  ],
  // Stone with collision
  "s": () => [
    sprite("stone"),
    area(),
    solid(),
    origin("bot")
  ],
  // Stone without collision
  "q": () => [
    sprite("stone"),
    area(),
    origin("bot"),
  ],
  // Dirt with collision
  "0": () => [
    sprite("dirt"),
    area(),
    solid(),
    origin("bot")
  ],
      // Dirt without collision
  "f": () => [
    sprite("dirt"),
    area(),
    origin("bot")
  ],
  "*": () => [
    sprite("diamond"),
    area(),
    pos(0, -9),
    origin("bot"),
    "diamond",
  ],
}

// custom component controlling enemy patrol movement
function patrol(speed = 60, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area",],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isLeft() || col.isRight()) {
          dir = -dir
        }
      })
    },
    update() {
      this.move(speed * dir, 0)
    },
  }
}

// Starts the game
scene("game", ({} = { levelId: randi(0, 9)}) => {
  
  function chooseBackground(){
    var backgroundChoice = randi(1, 4)
    if (backgroundChoice == 1){
      return "grasslandBackground"
    }
    if (backgroundChoice == 2){
      return "oceanBackground"
    }
    if (backgroundChoice == 3){
      return "cloudBackground"
    }
  }


  
  // Adds background
  add([
    sprite(chooseBackground()),
    area(),
    // places in middle
    pos(0, 0),
    // Makes sure it does not move
    fixed(),
    // Ensures background is full screen
    scale(width()/1920, height()/1080)
  ])

  gravity(3200)

  // add level to scene
  const level = addLevel(LEVELS[randi(0, 9) ?? 0], levelConf)

  // define player object
  const player = add([
    sprite("player", {

    }),
    pos(0, 0),
    area(),
    scale(0.5),
    // makes it fall to gravity and jumpable
    body(),
    origin("bot"),

  ])
  
  // action() runs every frame
  player.onUpdate(() => {
    //Checks if player should die
    if (lives == 0) {
      go("lose")
    }
    // center camera to player
    camPos(player.pos)
    // check fall death
    if (player.pos.y >= FALL_DEATH) {
      lives = lives - 1
      play("hit")
      go("game", sameLevel = true)
      console.log(lives)
      if (lives == 0) {
        go("lose")
      }
    }
    //Plays animations for player
    if (!player.isGrounded()){
      if(isKeyDown("d") || isKeyDown("right")){
        player.play("jumpRight")
        player.stop()
      }
      if(isKeyDown("a") || isKeyDown("left")){
        player.play("jumpLeft")
        player.stop()
      }
    }
    if (player.isGrounded()){
      if(isKeyDown("a") || isKeyDown("left")){
        if (player.curAnim() !== "runLeft"){
          player.play("runLeft",)
        }
      }
      if(isKeyDown("d") || isKeyDown("right")){
        if (player.curAnim() !== "runRight"){
          player.play("runRight",)
        }
      }
      if (!isKeyDown("a") && !isKeyDown("d") && !isKeyDown("left") && !isKeyDown("right")){
        if (player.curAnim() !== "idle"){
          player.play("idle")
        }
      }
    }
  })

  // Ends the current level and starts the between scene
  player.onCollide("portal", () => {
    play("portal")
    go("between", {
    })
  })

// Damages player and destroys spikes if touching spikes
player.onGround((t) => {
  if (t.is("danger")) {
     destroy(t)
    player.jump(JUMP_FORCE * 1.5)
    lives = lives - 1
    livesLabel.text = "Lives:" + lives
    play("hit")
    if (lives == 0) {
      go("lose")
    }
  }
})

// Damages player and destorys enemy if running into enemy
  player.onGround((l) => {
    if (l.is("enemy")) {
      player.jump(JUMP_FORCE * 1.5)
      destroy(l)
      play("powerup")
    }
  })

  player.onCollide("enemy", (e, col) => {
    // if it's not from the top, lose health and destroy enemy
    if (!col.isBottom()) {
        lives = lives - 1
        livesLabel.text = "Lives:" + lives
        play("hit")
        player.jump(JUMP_FORCE * 1.5)
      destroy(e)
        if (lives <= 0) {
          go("lose")
        console.log(lives)
      }
    }
  })

  let hasApple = false

  // grow an apple if player's head bumps into an obj with "prize" tag
  player.onHeadbutt((obj) => {
    if (obj.is("prize") && !hasApple) {
      const apple = level.spawn("#", obj.gridPos.sub(0, 1))
      destroy(obj)
      apple.jump()
      hasApple = true
      play("blip")
    }
  })

  // destroys apple if player collides with it
  player.onCollide("apple", (a) => {
    destroy(a)
    // adds lives
    lives = lives + 1
    livesLabel.text = "Lives:" + lives
    hasApple = false
    play("powerup")
  })

  // raises the pitch of the coin collect sound when you collect another coin
  let coinPitch = 0
  onUpdate(() => {
    if (coinPitch > 0) {
      coinPitch = Math.max(0, coinPitch - dt() * 100)
    }
  })

  // collects a coin when you run into it
  player.onCollide("coin", (c) => {
    destroy(c)
    play("coin", {
      detune: coinPitch,
    })
    coins += 1
    if (coins == 100) {
      lives = lives + 1
      livesLabel.text = "Lives:" + lives
      coins = 0
      coinsLabel.text = "Coins:" + coins
    }
    coinPitch += 100
    coinsLabel.text = "Coins:" + coins
  })

  // collects a diamond when you run into it
player.onCollide("diamond", (d) => {
  destroy(d)
  play("coin", {
    detune: coinPitch,
  })
  diamonds += 1
  diamondLabel.text = "Diamonds:" + diamonds
})
  
  // Shows how many coins the player has
  const coinsLabel = add([
    text("Coins:" + coins, {size: 40}),
    pos(24, 24),
    fixed(),
  ])
  
  // Shows how many lives the player has
  const livesLabel = add([
    text("Lives:"+ lives,{size: 40}),
    pos(width() - 190, 24),
    fixed(),
  ])
  
  // Shows how many diamonds the player has
  const diamondLabel = add([
    text("Diamonds:" + diamonds, {size: 40}),
    pos(24, 64),
    fixed(),
  ])
  
  // jump with space
  onKeyPress("space", () => {
    // these 2 functions are provided by body() component
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
    }
  })

  // jump with up
  onKeyPress("up", () => {
    // these 2 functions are provided by body() component
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
       player.play("jumpRight")
    }
  })

  // jump with w
  onKeyPress("w", () => {
    // these 2 functions are provided by body() component
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
      player.play("jumpRight")
    }
  })

  // move left with left, ensures that "a" is not being pressed
  onKeyDown("left", () => { 
    if (!isKeyDown("a")){
       player.move(-MOVE_SPEED, 0)
    }
  })

  //moves left with "a"
  onKeyDown("a", () => {
       player.move(-MOVE_SPEED, 0)
  })

  // moves right with right, makes sure that "d" is not being pressed
  onKeyDown("right", () => {
    if (!isKeyDown("d")){
      player.move(MOVE_SPEED, 0)
    }
  })

  // moves right with "d"
  onKeyDown("d", () => {
      player.move(MOVE_SPEED, 0)
  })
  // makes the player fall faster when holding "down"
  onKeyPress("down", () => {
    player.weight = 3
  })
  // makes the player fall faster when holding "s"
  onKeyPress("s", () => {
    player.weight = 3
  })

  // increases weight with "down"
  onKeyRelease("down", () => {
    player.weight = 1
  })

  // increases weight with "s", weight does not stack if the player is pressing both down and s
  onKeyRelease("s", () => {
    player.weight = 1
  })
  // make the game fullscreen when "f" is pressed
  onKeyPress("f", () => {
    fullscreen(!fullscreen())
  })

})

// Lose screen
scene("lose", () => {
  add([
    sprite("losescreen"),
    scale(width()/1920, height()/1080),
     console.log("lose: " + diamonds),
  ])
  add([
    text("Diamonds:" + diamonds, {size: 40}),
    pos(24, 24),
    fixed(),
  ])
  onKeyPress("enter", () => go("menu"),
            coins = 0)
})

// Main menu scene
scene("menu", () => {
  add([
    sprite("menu"),
    area(),
    solid(),
    scale(width()/1920, height()/1080),
  ])
  add([
    text("<Enter>", {size: width()/20}),
    pos(width()/2.5, height()/ 1.15)
  ])
  mainMenuMusic.play()
 onKeyPress("enter", () => go("intro"))
  diamonds = 0
  lives = 3
  console.log("menu: " + coins)
})
go("menu")

// Scene right before the game starts with a backstory
scene("intro", () => {
  mainMenuMusic.stop()
  add([
    sprite("intro"),
    area(),
    solid(),
    scale(width() / 1920, height()/ 1080)
  ])
  
  add([
    text("Run as fast as you can, you'll never escape my fun house!", {size: width()/40}),
    pos(width()/11, height()/1.5),
    fixed(),
  ])
  add([
    text("<Enter>", {size: width()/20}),
    pos(width()/2.5, height()/ 1.15)
  ])
  console.log("intro: " + coins)
  onKeyPress("enter", () => go("game", 
                      {coins: 0}))
})

// Returns a random dialogue
function betweenDialogue() {
  // MAKE SURE THE RANDI FUNCTION IS SET TO 1 HIGHER THAN THE AMOUNT OF DIALOGUE CHOICES.
  // makes random taunting in between levels
  var dialogue = randi(1, 10)
  if (dialogue == 1){
    return "The meaning of life is death"
  }
  if (dialogue == 2){
    return "You will not survive!"
  }  
  if (dialogue == 3){
    return "Mwahahahaha"
  }
  if (dialogue == 4){
    return "Dodge this!"
  }
  if (dialogue == 5){
    return "Fish fear me buddy"
  }
  if (dialogue == 6){
  return "My art will end you!"
  }
  if (dialogue == 7){
    return "I'm the true food critic!"
  }
  if (dialogue == 8){
    return "Your demise is near!"
  }
  if (dialogue == 9){
    return "I'm gonna eat you!"
  }
}

// Makes a scene between each level
scene("between", () => {
  add([
    sprite("intro"),
    scale(width() / 1920, height() / 1080),
    area(),
    solid(),
  ])
  add([
    text(betweenDialogue(), {size: width()/ 20}),
    pos(width()/11, height()/1.5)
  ])
  console.log(coins)
  onKeyPress("enter",() => go("game", {coins: coins}) )
})