import PogObject from "PogData"
import settings from "../settings"

let PogData = new PogObject("PaulAddons", {
    "professional": 0,
    "fortunate": 0,
    "jungle_amulet": true,
    "coinGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    }
}, "config/data.json")

const PREFIX = "&2[PA] "
export default constants = {
    PREFIX: PREFIX,
    INVALIDARGS: `${PREFIX}&cInvalid arguments. '/pa help' for more information.`,
    VERSION: (JSON.parse(FileLib.read("PaulAddons", "metadata.json"))).version,
    data: PogData,
    settings,
}