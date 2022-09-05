export default function renderScreen(screen, game, requestAnimationFrame) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.bombs) {
        const fruit = game.state.bombs[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    requestAnimationFrame(()=>{
        renderScreen(screen, game, requestAnimationFrame)
    })
}