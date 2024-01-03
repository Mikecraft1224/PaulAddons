import { registerCommand } from "../commandManager"
import { capitalizeFirst } from "../util/helperFunctions"
import helpCommands from "../commandManager"


registerCommand({
    aliases: ["help"],
    description: "This.",
    options: "",
    showInHelp: false,
    execute: (args) => {
        ChatLib.chat(ChatLib.getCenteredText("&b--------------[ &a&lPaulAddons &b]--------------"))
        ChatLib.chat(ChatLib.getCenteredText("&7(Hover over command to see usage.)"))

        // remove empty categories
        Object.keys(helpCommands).forEach(key => {
            if(helpCommands[key].length == 0)
                delete helpCommands[key]
        })

        Object.keys(helpCommands).forEach(key => {
            ChatLib.chat(ChatLib.getCenteredText("&a&l" + capitalizeFirst(key)))
            helpCommands[key].forEach(command => {
                helpCommand(command.name, command.description, command.options)
            })
        })
        ChatLib.chat(ChatLib.getCenteredText("&b--------------------------------------------"))
    },
})


/**
Chats a chat message with specified parameters.
@param {string} command - Command
@param {string} desc - Description
@param {string} usage - Usage
*/
export function helpCommand(command, desc, usage)
{
    ChatLib.chat(new TextComponent(`&a◆ /pa ${command} => &b${desc}`).setHoverValue(`${"/pa " + command + " " + usage}`))
}

