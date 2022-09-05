export default function renderScreen(screen, game, requestAnimationFrame) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const bombId in game.state.bombs) {
        const bomb = game.state.bombs[bombId]
        context.fillStyle = 'red'
        context.fillRect(bomb.x, bomb.y, 1, 1)
    }

    for (const blockId in game.state.map.blocks){
        const block = game.state.map.blocks[blockId]
        context.fillStyle = 'gray'
        context.fillRect(block.x, block.y, 1, 1)
    }

    for (const explosionId in game.state.explosions){
        const explosion = game.state.explosions[explosionId]
        context.fillStyle = 'yellow'
        context.fillRect(explosion.centerX, explosion.centerY, 1, 1)

        for(let i = 1; i <= explosion.size; i++){
            context.fillRect(explosion.centerX+i, explosion.centerY, 1, 1)
            context.fillRect(explosion.centerX, explosion.centerY+i, 1, 1)
            context.fillRect(explosion.centerX-i, explosion.centerY, 1, 1)
            context.fillRect(explosion.centerX, explosion.centerY-i, 1, 1)
        }
    }

    requestAnimationFrame(()=>{
        renderScreen(screen, game, requestAnimationFrame)
    })
}