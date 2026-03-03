<style scoped></style>

<template>
  <div>
    <canvas ref="myDraw"></canvas>
  </div>
</template>

<script setup lang="ts">
import kaplay from 'kaplay'
import { onMounted, ref, useTemplateRef } from 'vue'

const myDrawRef = useTemplateRef('myDraw')
const totalWidth = ref(800)
const totalHeight = ref(500)
const wallSize = ref(32)
const speed = 200

defineProps<{
  msg: string
}>()

onMounted(() => {
  console.log(`the component is now mounted.`)
  const ctx = kaplay({
    background: [135, 206, 235],
    width: totalWidth.value,
    height: totalHeight.value,
    scale: 1,
    canvas: myDrawRef.value,
    debug: true,
  })
  // loading sprites
  ctx.loadSprite('tux', 'tux_idle.png')
  ctx.loadSprite('cool_cat', 'cat_sprites.png', {
    sliceX: 8,
    sliceY: 5,
    anims: {
      // Row 1: Idle
      idle: {
        from: 0,
        to: 7,
        loop: true,
        speed: 5, // A slow, lazy blink
      },
      // Row 2: Walk
      walk: {
        from: 8,
        to: 15,
        loop: true,
        speed: 10,
      },
      // Row 3: Jump sequence
      jump: {
        from: 16,
        to: 23,
        loop: false, // Don't loop the jump motion
        speed: 12,
      },
      // Row 4: Hello Facing forward, waving right arm hello
      hello: {
        from: 24,
        to: 31,
        loop: false,
        speed: 8,
      },
      // Row 5: Happy (frames 32 to 35)
      happy: {
        from: 32,
        to: 39,
        loop: true,
        speed: 4, // Very slow droop
      },
    },
  })
  ctx.scene('world', () => {
    const floor = ctx.add([
      ctx.rect(totalWidth.value, wallSize.value, { radius: 2 }), // Carré rouge
      ctx.pos(0, totalHeight.value - wallSize.value),
      ctx.area(),
      ctx.body({ isStatic: true }),
      ctx.color(10, 250, 0),
    ])
    ctx.add([
      ctx.rect(32, wallSize.value, { radius: 2 }), // small red wall
      ctx.pos(200, totalHeight.value - 2 * wallSize.value),
      ctx.area(),
      ctx.body({ isStatic: true }),
      ctx.color(181, 0, 0),
    ])

    const player = ctx.add([
      ctx.sprite('tux'),
      ctx.pos(80, 240),
      ctx.area(),
      ctx.body(), // Physique auto
    ])

    const cool_cat = ctx.add([
      'cool_cat',  // adding a tag
      ctx.sprite('cool_cat'),
      ctx.pos(ctx.center()),
      ctx.scale(0.25),
      ctx.area(),
      ctx.body(), // Physique auto
    ])
    cool_cat.play('idle')

    ctx.setGravity(160)
    ctx.onKeyPress(['up', 'space'], () => player.jump(120))
    ctx.onKeyDown('left', () => {
      player.move(-speed, 0)
      player.flipX = true
      cool_cat.flipX = false
    })
    ctx.onKeyDown('right', () => {
      player.move(speed, 0)
      player.flipX = false
      cool_cat.flipX = true
    })

    // Collision
    player.onCollide('cool_cat', () => {
      ctx.shake(10)
      cool_cat.flipX = true
      cool_cat.play('hello')
      player.destroy()
    })
  })

  ctx.go('world')
})
</script>
