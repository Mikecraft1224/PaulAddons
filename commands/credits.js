import { registerCommand } from "../commandManager"
import constants from "../util/constants"
const PREFIX = constants.PREFIX


registerCommand({
    aliases: ["credits"],
    description: "Credits.",
    options: "",
    category: "miscellaneous",
    execute: (args) => {
        ChatLib.chat(`${PREFIX}&bCW was made by NinOnCubed (ninjune).`)
        ChatLib.chat(`${PREFIX}&bThis version was edited by Mikecraft1224`)
    }
})