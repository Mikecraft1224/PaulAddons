const File = Java.type("java.io.File")

/**
 * Adds commas to the number.
 * @param {Number} num
 * @returns
 */
export function addCommas(num) {
    try {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } catch (error) {
        return 0
    }
}

/**
 * Capitalizes the first letter of every word in a sentence.
 * @param {String} sentence
 * @returns String
 */
export function capitalizeFirst(sentence)
{
    if(sentence == undefined) return sentence
    let words = sentence.split(" "),
     capitalized = words.map(word => {
        return word[0].toUpperCase() + word.slice(1)
    })

    return capitalized.join(" ")
}

/**
 * Converts seconds to a standard message.
 * @param {Number} seconds
 * @returns String
 */
export function secondsToMessage(seconds)
{
    let hour = Math.floor(seconds/60/60)
    if(hour < 1)
        return `${Math.floor(seconds/60)}m ${Math.floor(seconds%60)}s`
    else
        return `${hour}h ${Math.floor(seconds/60) - hour*60}m`
}