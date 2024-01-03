import settings from "../settings"
import constants from "../util/constants"
import { addCommas } from "../util/helperFunctions"
import { findTick } from "../commands/calculate/tick"
const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")


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
        if(element !== ` §6⸕ Mining Speed §f${element.replace(" §6⸕ Mining Speed §f", "").replace("§", "")}` || constants.data.professional == 0)
        {
            if(element !== ` §6☘ Mining Fortune §f${element.replace(" §6☘ Mining Fortune §f", "").replace("§", "")}` || (constants.data.jungle_amulet == false && constants.data.fortunate == 0))
                continue

            let miningFortune = element.replace(" §6☘ Mining Fortune §f", "").replace("§", ""),
            replacedFortune

            if(constants.data.jungle_amulet && constants.data.fortunate > 0)
                replacedFortune = parseInt(miningFortune.toString().replace(",", "")) + 10 + 5*constants.data.fortunate
            else if(constants.data.jungle_amulet)
                replacedFortune = parseInt(miningFortune.toString().replace(",", "")) + 10
            else
                replacedFortune = parseInt(miningFortune.toString().replace(",", "")) + 5*constants.data.fortunate

            let miningFortuneText = `${element} §6(§b${addCommas(replacedFortune)}§6)`

            list.set(elementIndex, new NBTTagString(miningFortuneText))
            continue
        }
        let miningSpeed = parseInt(element.replace(" §6⸕ Mining Speed §f", "").replace("§", "").replace(",", "")),
         professionalSpeed = miningSpeed + Math.floor(50+(constants.data.professional*5)),
         miningSpeedText = `${element} §6(§b${addCommas(professionalSpeed)}§6)`,
         tick

        if(professionalSpeed > 50 && settings.tickSpeedBlock > 1) // may need to change if add tick blocks (good programming real)
            tick = findTick(professionalSpeed, settings.tickSpeedBlock).currentBlockTick
        else
            tick = findTick(miningSpeed, settings.tickSpeedBlock).currentBlockTick

        list.set(elementIndex, new NBTTagString(miningSpeedText))
        list.set(elementIndex + 1, new NBTTagString(` §6⸕ Block Tick §f${Math.round(tick)}`)) // 1 new added
        for(let i = elementIndex + 2; i < list.getTagCount(); i++)
        {
            list.set(i, new NBTTagString(tempList[i - 1]))
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
    if(item.getLore()[0].includes("Fortunate")) {
        constants.data.fortunate = parseInt(item.getLore()[1].split("Level ")[1].split(" ")[0].split("§")[0])
    } else if (item.getLore()[0].includes("Professional")) {
        constants.data.professional = parseInt(item.getLore()[1].split("Level ")[1].split(" ")[0].split("§")[0])
    } else return
    constants.data.save()
})