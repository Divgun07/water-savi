var play, about, how, next, home
var gameState = "waitstate"
var dropsGroup, drops, player, playerimg,tap1,tap2,tap3,tap4,monster
var watercollected = 180

function preload() {
    bgwait = loadImage("images/SplashOut.gif")
    dropimg = loadImage("images/waterdrop.png")
    bglevel1img=loadImage("images/bglevell1.gif")
    popupimghow = loadImage("images/popup2.png")
    popupimgabout = loadImage("images/popup1.png")
    playerimg = loadImage("images/character.png")
    closetap = loadImage("images/closeTap.png")
    runningTap = loadImage("images/runningTap.gif") 
    cloud1img = loadImage("images/cloud1img.png")
    cloud2img = loadImage("images/cloud2img.png")
    playerflipimg = loadImage("images/playerflip.png")
    bglevel2 = loadImage("images/bglevel2.jpg")
    monsterimg1=loadImage("images/moster1.gif")
}


function setup() {
    createCanvas(windowWidth, windowHeight)

    play = createImg("images/play2.png")
    play.position(23, height - 180)
    play.size(150, 150)

    about = createImg("images/info.png")
    about.position(30, height / 3.7)
    about.size(150, 130)

    how = createImg("images/how.png")
    how.position(28, height / 2)
    how.size(140, 130)

    next = createImg("images/next.png")
    next.position(200, 100)
    next.size(170, 150)

    home = createImg("images/home2.png")
    home.position(width - 110, height - 110)
    home.size(100, 100)
    home.hide()

    infopop1 = createSprite(width / 2, height / 2)
    infopop1.visible = false
    infopop1.addImage(popupimgabout)
    infopop1.scale = 1.65

    infopop2 = createSprite(width / 2, height / 2)
    infopop2.visible = false
    infopop2.addImage(popupimghow)
    infopop2.scale = 1.65

    invisibleground = createSprite(width / 2, height - 15, width, 10)
    invisibleground.visible = false

    player = createSprite(70, height - 80, 50, 50)
    player.visible = false
    player.addImage(playerimg)
    player.scale = .25
    player.debug = true
    //player.setCollider("circle", (player.width) / 2.5, -95, 65)



    //level 2 sprites
    tap1=createSprite(300,100)
    tap1.addImage(runningTap)
    tap1.scale=0.5

    tap2 = createSprite(500, 100)
    tap2.addImage(runningTap)
    tap2.scale=.5

    tap3 = createSprite(700, 100)
    tap3.addImage(runningTap)
    tap3.scale=.5

    tap4= createSprite(900, 100)
    tap4.addImage(runningTap)
    tap4.scale=.5
    
    monster= createSprite(900, 100)
    monster.addImage(monsterimg1)
    monster.scale=.25
    monster.velocityX=-8
    monster.visible=false


    tap1.visible=false
            tap2.visible=false
            tap3.visible=false
            tap4.visible=false

    dropsGroup = new Group()
    tapsGroup = new Group()
    cloudsGroup = new Group()
}

function draw() {

    if (gameState === "waitstate") {
        background(bgwait)
        home.hide()
        play.show()
        about.show()
        how.show()
        next.hide()
        infopop1.visible = false
        infopop2.visible = false
        player.visible = false
      //  watercollected = 0

    }

    //play button functioning

    if (play.mousePressed(() => {
        gameState = "playLevel1"

    }))



        if (gameState === "playLevel1") {
            background(bglevel1img)

            home.show()
            play.hide()
            about.hide()
            how.hide()
            next.hide()
            Level1()
            player.visible = true
            if (keyDown("RIGHT_ARROW")) {
                player.x = player.x + 5
              //  player.setCollider("circle", (player.width) / 2.5, -95, 65)

                player.addImage(playerimg)
            }
            if (keyDown("LEFT_ARROW")) {
                player.x = player.x - 5
                //player.setCollider("circle",(player.width)-(player.width)/10,-95,65)

                player.addImage(playerflipimg)

            }
            //fill(0)
            // text("watercollect: "+watercollected,50,50)

            image(playerimg, 5, 40, 40, 40);
            fill("white");
            rect(50, 50, 185, 20);
            fill("aqua");
            rect(50, 50, watercollected, 20);

            if (player.x >= width) {
                player.x = 50
            }
            if (player.x <= 0) {
                player.x = width - 100
            }

            for (i = 0; i < dropsGroup.length; i++) {
                if (dropsGroup.get(i).isTouching(player)) {
                    dropsGroup.get(i).visible = false
                    watercollected += 5

                    dropsGroup.get(i).destroy()

                    fill("red")
                    text("touched", width / 2, height / 2)
                }
            }


            if(watercollected>=185){
                gameState="playLevel2"
                dropsGroup.destroyEach()
                cloudsGroup.destroyEach()
            }

        }


        if(gameState==="playLevel2"){
            background(bglevel2)

            monster.visible=true
monster.velocityX=-2
            tap1.visible=true
            tap2.visible=true
            tap3.visible=true
            tap4.visible=true


         
    if(mousePressedOver(tap1)){
        tap1.addImage(closetap)
    }
      
    if(mousePressedOver(tap2)){
        tap2.addImage(closetap)
    }

          
    if(mousePressedOver(tap3)){
        tap3.addImage(closetap)
    }

          
    if(mousePressedOver(tap4)){
        tap4.addImage(closetap)
    }




        }

    if (about.mousePressed(() => {
        gameState = "aboutstate"
        infopop1.visible = true
        how.hide()
        next.hide()

    }))

        if (how.mousePressed(() => {
            gameState = "howstate"
            infopop2.visible = true
            about.hide()
            next.hide()
            home.show()
            play.hide()
            how.hide()
        }))

            if (home.mousePressed(() => {
                gameState = "waitstate"


            }))


                if (gameState === "aboutstate") {
                    // background(180)
                    home.show()
                    play.hide()
                    about.hide()
                    player.visible = false

                }


    drawSprites()

}



// LEVEL 1
function Level1() {

    if (frameCount % 60 === 0) {
        drops = createSprite(width, 20)
        drops.y = Math.round(random(10, 40))
        drops.x = Math.round(random(width, 20))

        drops.velocityX = -2
        drops.velocityY = Math.round(random(2, 6))
        drops.addImage(dropimg)
        drops.scale = .05


        dropsGroup.add(drops)


        y2 = Math.round(random(height / 8, height / 3.5))
        cloud = createSprite(width, y2)
        cloud.x = drops.x
        cloud.velocityX =4

        rand = Math.round(random(1, 2))
        switch (rand) {
            case 1: cloud.addImage(cloud1img)
                break;

            case 2: cloud.addImage(cloud2img)
                break;

            default: break;
        }
        cloud.scale = .5
        cloudsGroup.add(cloud)


    }

}


// LEVEL 2



function Level2() {


    //if (frameCount % 60 === 0) {
        tap1=createSprite(300,100)
        tap1.addImage(runningTap)
        tap1.scale=0.5

        tap2 = createSprite(500, 100)
        tap2.addImage(runningTap)
        tap2.scale=.5

        tap3 = createSprite(700, 100)
        tap3.addImage(runningTap)
        tap3.scale=.5

        tap4= createSprite(900, 100)
        tap4.addImage(runningTap)
        tap4.scale=.5
        
        monster= createSprite(width, 100)
        monster.addImage(monsterimg1)
        //monster.scale=.25
        //monster.velocityX=-8
monster.visible=false
        
        
        player.visible=false


     

  //  }

    if(mousePressedOver(tap1)){
        tap1.addImage(closetap)
        console.log("closed")
    }

}

