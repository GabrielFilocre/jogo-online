export default function createGame() {
    const state = {
        players: {},
        bombs: {},
        explosions: {},
        screen: {
            width: 10,
            height: 10
        },
        map: {
            blocks: {}
        }
    }

    function createMap() {
        const blockId = 'block1'

        state.map.blocks[blockId] = {
            x: 0,
            y: 0
        }
    }

    function removeBlock(command) {
        const blockId = command.blockId
        console.log(state.map.blocks[blockId])

        delete state.map.blocks[blockId]
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            power: 1

        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addBomb(command) {
        const bombId = command.bombId
        const bombX = command.bombX
        const bombY = command.bombY
        const bombTimer = command.timer

        state.bombs[bombId] = {
            x: bombX,
            y: bombY,
            timer: bombTimer
        }
    }

    function reduceBombTime(command) {
        const bombId = command.bombId

        state.bombs[bombId].timer--
    }

    function removeBomb(command) {
        const bombId = command.bombId

        delete state.bombs[bombId]
    }

    function addExplosion(command) {
        const explosionId = command.explosionId
        const explosionCenterX = command.explosionCenterX
        const explosionCenterY = command.explosionCenterY
        const explosionSize = command.explosionSize

        state.explosions[explosionId] = {
            centerX: explosionCenterX,
            centerY: explosionCenterY,
            size: explosionSize
        }
        console.log(state)
    }

    function removeExplosion(command) {
        const explosionId = command.explosionId

        delete state.explosions[explosionId]
    }

    function playerCommands(command) {

        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
                    return
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y = player.y + 1
                    return
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x = player.x + 1
                    return
                }
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                    return
                }
            },
            b(player) {
                addBomb({
                    bombId: "bomba1",
                    bombX: player.x,
                    bombY: player.y,
                    timer: 3
                })
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]
        if (player && moveFunction) {
            moveFunction(player)
        }

    }

    function checkForExplosionCollision(explosionId) {
        const explosion = state.explosions[explosionId]
        for (let i = 0; i <= explosion.size; i++) {
            for (const blockId in state.map.blocks) {
                const block = state.map.blocks[blockId]
                if (explosion.centerX + i === block.x && explosion.centerY === block.y) {
                    removeBlock({
                        blockId
                    })
                }
                if (explosion.centerX - i === block.x && explosion.centerY === block.y) {
                    removeBlock({
                        blockId
                    })
                }
                if (explosion.centerY + i === block.y && explosion.centerX === block.x) {
                    removeBlock({
                        blockId
                    })
                }
                if (explosion.centerY - i === block.y && explosion.centerX === block.x) {
                    removeBlock({
                        blockId
                    })
                }
            }
        }
    }

    function checkForBombExplosion(playerId) {
        const player = state.players[playerId]
        for (const bombId in state.bombs) {
            const bomb = state.bombs[bombId]
            if (bomb.timer === 0) {
                removeBomb({
                    bombId: bombId
                })
                addExplosion({
                    explosionId: 'explosion1',
                    explosionCenterX: bomb.x,
                    explosionCenterY: bomb.y,
                    explosionSize: player.power
                })
                checkForExplosionCollision('explosion1')
                setTimeout(() => {
                    removeExplosion({
                        explosionId: 'explosion1'
                    })
                }, 1000)
            } else {
                console.log(bomb.timer)
                reduceBombTime({
                    bombId: bombId
                })
            }
        }
    }

    setInterval(() => {
        checkForBombExplosion('player1')
    }, 1000)

    createMap()

    return {
        addPlayer,
        removePlayer,
        playerCommands,
        addBomb,
        removeBomb,
        state
    }
}