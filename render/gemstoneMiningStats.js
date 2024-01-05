import settings from "../settings"
import constants from "../util/constants"
import { addCommas } from "../util/helperFunctions"
import { findTick, findStrength } from "../commands/calculate/tick"
const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")

let hotmData = JSON.parse(FileLib.read("PaulAddons", "data/hotm.json")).data
let professionalFormula = hotmData.filter((perk) => (perk.nameStringed == "Professional"))[0].rewardFormula
let fortunateFormula = hotmData.filter((perk) => (perk.nameStringed == "Fortunate"))[0].rewardFormula

register("itemTooltip", (lore, item) => { // this is so bad 💀
    if(!settings.gemstoneMiningStats || item.getLore() == undefined || item.getLore()[0] == undefined || !item.getLore()[0].startsWith("§o§aYour SkyBlock Profile")) return
    const list = new NBTTagList(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore")),
     tempList = []

    for(let elementIndex = 0; elementIndex < list.getTagCount(); elementIndex++)
    {
        tempList.push(list.getStringTagAt(elementIndex))
    }

    for(let elementIndex = 0; elementIndex < list.getTagCount(); elementIndex++)
    {
        let element = list.getStringTagAt(elementIndex)
        if(element.startsWith(" §6⸕ Mining Speed §f") && !tempList[elementIndex + 1].includes("§6⸕ Block Tick §f")) {
            let miningSpeed = parseInt(element.replace(" §6⸕ Mining Speed §f", "").replace("§", "").replace(",", "")),
             professionalSpeed = miningSpeed + eval(professionalFormula.replace("Level", constants.data.professional)),
             miningSpeedText = `${element} §6(§b${addCommas(professionalSpeed)}§6)`,
             tick
            
            // Mining Speed
            if(professionalSpeed > miningSpeed + 50)
                list.set(elementIndex, new NBTTagString(miningSpeedText))
            else
                list.set(elementIndex, new NBTTagString(element))

            // Block Tick
            if(professionalSpeed > miningSpeed + 50 && settings.tickSpeedBlock > 1) // may need to change if add tick blocks (good programming real)
                tick = findTick(professionalSpeed, settings.tickSpeedBlock)
            else
                tick = findTick(miningSpeed, settings.tickSpeedBlock)
            let nextColor = settings.tickSpeedBlock > 1 ? "§b" : "§f",
             nextText
            
            if(tick.currentBlockTick <= 4 && settings.tickSpeedBlock > 1) {
                nextText = ` §6Softcap`
            } else if(tick.currentBlockTick <= 4) {
                nextText = ` §6(§fInstant ${addCommas(findStrength(settings.tickSpeedBlock)*60)}§6)`
            } else {
                nextText = ` §6(§f${Math.round(tick.currentBlockTick)-1} ${nextColor}${addCommas(Math.ceil(tick.nextBlockSpeed))}§6)`
            }

            let tickText = ` §6⸕ Block Tick §f${Math.round(tick.currentBlockTick)} ${nextText}`
            list.set(elementIndex + 1, new NBTTagString(tickText)) // 1 new added

            for(let i = elementIndex + 2; i < list.getTagCount(); i++)
            {
                list.set(i, new NBTTagString(tempList[i - 1]))
            }
        }
        if (element == ` §6☘ Mining Fortune §f${element.replace(" §6☘ Mining Fortune §f", "").replace("§", "")}` && (constants.data.jungle_amulet || constants.data.fortunate > 0)) {
            let replacedFortune = parseInt(element.replace(" §6☘ Mining Fortune §f", "").replace("§", "").replace(",", ""))

            if(constants.data.jungle_amulet)
                replacedFortune += 10
            if(constants.data.fortunate > 0)
                replacedFortune += eval(fortunateFormula.replace("Level", constants.data.fortunate))

            let miningFortuneText = `${element} §6(§b${addCommas(replacedFortune)}§6)`
            list.set(elementIndex, new NBTTagString(miningFortuneText))
        }
    }
})

register("step", () => {
    let inventoryName = Player?.getContainer()?.getName()?.toString()
    if(inventoryName == undefined) return
    if(inventoryName.includes("Accessory Bag ")) {
        for (i = 0; i < Player.getContainer().getSize(); i++) {
            let extraAttributes = Player.getContainer().getStackInSlot(i)?.getNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes")
            if (extraAttributes?.getString("id") === "JUNGLE_AMULET")
            {
                constants.data.jungle_amulet = true
                constants.data.save()
            }
        }
    }
}).setFps(2)


register("itemTooltip", (lore, item) => {
    if (!Player?.getContainer()?.getName()?.toString().includes("Heart of the Mountain") || item.getLore() == undefined || item.getLore()[0] == undefined) return
    // || !settings.gemstoneMiningStats
    if(item.getLore()[0].includes("§aFortunate") || item.getLore()[0].includes("§eFortunate")) {
        constants.data.fortunate = parseInt(item.getLore()[1].split("Level ")[1].split(" ")[0].split("§")[0])
    } else if (item.getLore()[0].includes("§aProfessional") || item.getLore()[0].includes("§eProfessional")) {
        constants.data.professional = parseInt(item.getLore()[1].split("Level ")[1].split(" ")[0].split("§")[0])
    } else return
    constants.data.save()
})