import { @Vigilant, @ButtonProperty, @SwitchProperty, @SelectorProperty, @SliderProperty, @TextProperty, @ColorProperty, Color } from "../Vigilance/index"

@Vigilant("PaulAddons/config", "PaulAddons Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Gui", "Stats"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&aPaulAddons &bv${JSON.parse(FileLib.read("PaulAddons", "metadata.json")).version}` + 
        `\n&aBy &bMikecraft1224` + 
        `\n&aUsing &bColeweight` +
        `\n&aBy &bNinjune`)
    }    
    // CAT General
    // SUBCAT Discord
    @ButtonProperty({
        name: "Join Ninjunes discord!",
        description: "Click to copy Ninjunes discord link to clipboard.",
        category: "General",
        subcategory: "Discord",
        placeholder: "Copy"
    })
    joinDiscord() {
        ChatLib.command("ct copy https://discord.gg/yj4P4FqHPA", true);
    }
    // CAT Gui
    // SUBCAT Coin Tracker
    @SwitchProperty({
        name: "Coin Tracker",
        description: "Enables the Coin tracker. \nReplaces Coin Tracker from Coleweight.",
        subcategory: "Coin Tracker",
        category: "Gui"
    })
    coinTracker = false;

    @SwitchProperty({
        name: "Force NPC",
        description: "Forces NPC price for the coin tracker.",
        subcategory: "Coin Tracker",
        category: "Gui"
    })
    forceNPC = false;

    @SwitchProperty({
        name: "Force Sell Offer",
        description: "Forces Sell Offer price for the coin tracker. (overrides Force NPC)",
        subcategory: "Coin Tracker",
        category: "Gui"
    })
    forceSellOffer = false;

    @SwitchProperty({
        name: "Live update prices",
        description: "Live updates the prices of the coin tracker depending on the bazaar.",
        subcategory: "Coin Tracker",
        category: "Gui"
    })
    livePrices = true;

    @SelectorProperty({
        name: "Rarity to sell",
        description: "Sets the rarity of gemstone to sell.",
        subcategory: "Coin Tracker",
        category: "Gui",
        options: ["Flawed", "Fine", "Flawless"]
    })
    rarityToSell = 0;

    @ButtonProperty({
        name: "Change Coin Tracker Position",
        description: "Move the location of the coin tracker.",
        subcategory: "Coin Tracker",
        category: "Gui",
        placeholder: "Open"
    })
    moveCoinTrackerLocation() {
        ChatLib.command("pa move coin", true);
    }
    // CAT Stats
    // SUBCAT Stats
    @SwitchProperty({
        name: "Gemstone mining stats",
        description: "Shows gemstone mining speed/fortune on player profile. Also shows tick that you're mining at. (set block below, hover over Professional and Fortunate in you HotM tree to load)\nReplaces Gemstone mining stats from Coleweight.\n&cWarning: The next shown tick might not be reachable!",
        subcategory: "Stats",
        category: "Stats"
    })
    gemstoneMiningStats = true;

    @SelectorProperty({
        name: "Tick speed block",
        description: "Sets the tick speed block on player profile.",
        subcategory: "Stats",
        category: "Stats",
        options: ["Green Mithril", "Blue Mithril", "Ruby", "Normal gemstone (jade, amethyst, etc)", "Topaz/Opal", "Jasper"]
    })
    tickSpeedBlock = 3;
}

export default new Settings()