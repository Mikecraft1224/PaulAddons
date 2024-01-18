import settings from "../settings"

let notified = false
let lastX = null
let lastZ = null

register("step", () => {
    if (!settings.endOfFarmPing) return

    let x =Player.getX(),
        z =Player.getZ()

    if (settings.useXCoordinate) {
        if (lastX == null) {
            lastX = x
            return
        }

        let direction = x - lastX

        if (x >= settings.xCoordinate) {
            if (direction > 0) {
                if (!notified) {
                    Client.showTitle("§cEnd of farm", "", 0, 40, 0)
                    notified = true
                }
                World.playSound("note.pling", 100, 1)
            } else {
                notified = false
            }
        } else if (x <= -settings.xCoordinate) {
            if (direction < 0) {
                if (!notified) {
                    Client.showTitle("§cEnd of farm", "", 0, 40, 0)
                    notified = true
                }
                World.playSound("note.pling", 100, 1)
            } else {
                notified = false
            }
        } else {
            notified = false
        }

        lastX = x
    } else if (settings.useZCoordinate) {
        if (lastZ == null) {
            lastZ = z
            return
        }
        
        let direction = z - lastZ

        if (z >= settings.zCoordinate) {
            console.log(direction)
            if (direction > 0) {
                if (!notified) {
                    Client.showTitle("§cEnd of farm", "", 0, 40, 0)
                    notified = true
                }
                World.playSound("note.pling", 100, 1)
            } else {
                notified = false
            }
        } else if (z <= -settings.zCoordinate) {
            if (direction < 0) {
                if (!notified) {
                    Client.showTitle("§cEnd of farm", "", 0, 40, 0)
                    notified = true
                }
                World.playSound("note.pling", 100, 1)
            } else {
                notified = false
            }
        } else {
            notified = false
        }

        lastZ = z
    }
}).setFps(4)