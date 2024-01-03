import { registerCommand } from "../commandManager"
import settings from "../settings"


registerCommand({
    aliases: ["settings", "config"],
    description: "Opens settings.",
    options: "",
    category: "settings",
    execute: (args) => {
        settings.openGUI()
    }
})