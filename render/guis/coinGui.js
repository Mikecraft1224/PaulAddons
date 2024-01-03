import { registerGui } from "../../guiManager"
import settings from "../../settings"
import { addCommas, secondsToMessage } from "../../util/helperFunctions"
import { BaseGui } from "../BaseGui"
import request from "../../../requestV2"
// some code from soopy's version

let money = 0
let moneyPerHour = 0

let gemstonesMined = {}

let startTime = -1
let lastMined = -1

let gemstoneCostsBuyOffer = {}
let gemstoneCostsSellOffer = {}


const coinGui = new BaseGui(["coinGui", "coin", "money", "cointracker"], () => {
    if((!coinGui.isOpen() && !settings.coinTracker) || startTime <= 0)
        return

    const bazaarText = `Bazaar\n&aAs &b${settings.rarityToSell === 0 ? "Flawed" : settings.rarityToSell === 1 ? "Fine" : "Flawless"} &ain &b${settings.forceSellOffer ? "Sell" : "Buy"} Offer`
    return `&aSelling to &b${settings.forceNPC ? "NPC" : bazaarText}\n&a$/hr: &b$${addCommas(moneyPerHour)}\n&a$ made: &b$${addCommas(Math.floor(money))}&b\n&aUptime: &b${secondsToMessage((Date.now()-startTime)/1000)}`
}, resetVars)
registerGui(coinGui)


register("chat", (gem, amount, event) => { 
    gem = gem.toUpperCase()
    if (gemstonesMined[gem] === undefined) {
        gemstonesMined[gem] = 0
    }
    gemstonesMined[gem] += parseInt(amount)
    lastMined = Date.now()

    if(startTime === 0) return
    if(startTime === -1) {
        request({
            url: `https://api.hypixel.net/skyblock/bazaar`,
            json: true
        })
        .then(res => {
            Object.keys(res.products).forEach(id => {
                if(id.startsWith("FLAWED_") || id.startsWith("FINE_") || id.startsWith("FLAWLESS_")) {
                    gemstoneCostsSellOffer[id] = res.products[id].quick_status.buyPrice
                    gemstoneCostsBuyOffer[id] = res.products[id].quick_status.sellPrice
                }
            })
            startTime = Date.now()
        })
        .catch(err => {
            if(settings.debug)
                console.log("Coin tracker: " + err)
        })
        return
    }

    // Go through every mined gemstone and calculate the money made
    money = 0
    Object.keys(gemstonesMined).forEach(id => {
        let amount = gemstonesMined[id]
        let gemID = ""
        let divisor = 1
        switch(settings.rarityToSell) {
            case 0:
                gemID = `FLAWED_${id}_GEM`
                break
            case 1:
                gemID = `FINE_${id}_GEM`
                divisor = 80
                break
            case 2:
                gemID = `FLAWLESS_${id}_GEM`
                divisor = 6400
                break
        }
        
        if (settings.forceNPC) {
            money += 240 * amount
        } else {
            let cost = settings.forceSellOffer ? gemstoneCostsSellOffer[gemID] : gemstoneCostsBuyOffer[gemID]
            money += cost * amount / divisor
        }
    })
    moneyPerHour = Math.floor(money / ((Date.now() - startTime) / (1000 * 60 * 60)))
}).setChatCriteria(/&r&d&lPRISTINE! &r&fYou found &r&a. &r&aFlawed (.+) Gemstone &r&8x(\d+)&r&f!&r/g)

register("step", () => {
    if (lastMined && Date.now() - lastMined > 2 * 60000) {
        resetVars()
    }
}).setFps(1)

register("step", () => {
    if(!settings.coinTracker || !settings.livePrices || startTime <= 0) return

    request({
        url: `https://api.hypixel.net/skyblock/bazaar`,
        json: true
    })
    .then(res => {
        Object.keys(res.products).forEach(id => {
            if(id.startsWith("FLAWED_") || id.startsWith("FINE_") || id.startsWith("FLAWLESS_")) {
                gemstoneCostsSellOffer[id] = res.products[id].quick_status.buyPrice
                gemstoneCostsBuyOffer[id] = res.products[id].quick_status.sellPrice
            }
        })
        ChatLib.chat("&2[PA] &bFetched live prices!")
    })
    .catch(err => {
        if(settings.debug)
            console.log("Coin tracker: " + err)
    })
}).setDelay(60 * 5)


function resetVars()
{
    money = 0
    moneyPerHour = 0
    gemstonesMined = {}
    startTime = -1
    lastMined = -1
}