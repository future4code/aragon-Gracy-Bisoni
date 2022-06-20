const convertTemperature = (temperatureInCelsius, unitToConvert) => {

    let unit = unitToConvert.toUpperCase();

    let convertedTemperature = unit === "K"? (temperatureInCelsius + 273.15)
    : ((temperatureInCelsius * 9/5) + 32)
    
    if (unit === "K" && typeof temperatureInCelsius === "number"){
        return `${temperatureInCelsius}° é equivalente a ${convertedTemperature}K`
    } else if (unit === "F" && typeof temperatureInCelsius === "number"){ 
        return `${temperatureInCelsius}° é equivalente a ${convertedTemperature}°F`
    } else return `Erro! Parâmetro inválido. A função deve receber um número e uma string "K" ou "F" para conversão.`


}

console.log(convertTemperature(20,"K"))
console.log(convertTemperature(20,"F"))
console.log(convertTemperature(200,"k"))
console.log(convertTemperature(20, "r"))
console.log(convertTemperature("dez","F"))


