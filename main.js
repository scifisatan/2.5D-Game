import { GameLoop } from './src/GameLoop'
import { resources } from './src/Resource'
import { Sprite } from './src/Sprite'
import { Vector2 } from './src/Vector2'
import { DOWN, Input, LEFT, RIGHT, UP } from './src/Input'
import './style.css'
import { gridCells, isSpaceFree } from './src/helpers/grid'
import { moveTorwards } from './src/helpers/moveTowards'
import { walls } from './src/levels/level1'
import { Animations } from './src/Animations'
import { FrameIndexPattern } from './src/FrameIndexPattern'
import { STAND_UP, STAND_DOWN, STAND_RIGHT, STAND_LEFT, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './src/objects/heroAnimations'

const canvas = document.querySelector('#game-canvas')

const ctx = canvas.getContext('2d')

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
 
})

const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),

})

const hero = new Sprite({
  resource: resources.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(5)),
  animations:new Animations(
    {
      walkLeft: new FrameIndexPattern(WALK_LEFT),
      walkUp : new FrameIndexPattern(WALK_UP),
      walkDown : new FrameIndexPattern(WALK_DOWN),
      walkRight : new FrameIndexPattern(WALK_RIGHT),
      standLeft : new FrameIndexPattern(STAND_LEFT),
      standUp: new FrameIndexPattern(STAND_UP),
      standDown: new FrameIndexPattern(STAND_DOWN),
      standRight: new FrameIndexPattern(STAND_RIGHT)
    }
  )
})

const heroDestinationPosition = hero.position.duplicate();
let heroFacing = DOWN;

const shadowSprite = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
})

const input = new Input()

const update = (delta) => {


  const distance =  moveTorwards(hero, heroDestinationPosition,1)

  const hasArrived = distance <= 1;

  if(hasArrived){
    tryMove()
  }
  
  hero.step(delta)

}


const tryMove = () => {
  const direction = input.direction
  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;
  const gridSize = 16
  

  if (!direction) {
    if (heroFacing === UP) {
      hero.animations.play('standUp')
    }
    if (heroFacing === DOWN) {
      hero.animations.play('standDown')
    }
    if (heroFacing === LEFT) {
      hero.animations.play('standLeft')
    }
    if (heroFacing === RIGHT) {
      hero.animations.play('standRight')
    }
    return
  }

  switch (direction) {
    case UP:
      nextY -= gridSize
      hero.animations.play('walkUp')
      break
    case DOWN:
      nextY += gridSize
      hero.animations.play('walkDown')
      break
    case LEFT:
      nextX -= gridSize
      hero.animations.play('walkLeft')
      break
    case RIGHT:
      nextX+= gridSize
      hero.animations.play('walkRight')
      break
  }


  heroFacing = direction ?? heroFacing;
  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  
  }
  

}


const draw = () => {
  skySprite.drawImage(ctx, 0, 0)
  groundSprite.drawImage(ctx, 0, 0)

  const heroOffset = new Vector2(-8, -21)
  const heroPosX = hero.position.x + heroOffset.x
  const heroPosY = hero.position.y+ heroOffset.y

  shadowSprite.drawImage(ctx, heroPosX, heroPosY)
  hero.drawImage(ctx, heroPosX, heroPosY)
}



const gameLoop= new GameLoop(update, draw)
gameLoop.start()