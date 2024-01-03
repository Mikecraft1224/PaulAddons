export function findHotmObject(hotmName)
{
    let hotmData = JSON.parse(FileLib.read("PaulAddons", "data/hotm.json")).data

    for(let i = 0; i < hotmData.length; i++)
    {
        if(hotmData[i].names.includes(hotmName.toLowerCase()))
            return hotmData[i]
    }
}