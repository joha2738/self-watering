function Pumpetid (talværdi: number) {
    pins.digitalWritePin(DigitalPin.P9, 1)
    basic.pause(talværdi)
    pins.digitalWritePin(DigitalPin.P9, 0)
}
function Servo (talværdi: number) {
    if (talværdi <= 90) {
        pins.servoWritePin(AnalogPin.P8, talværdi)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        basic.pause(1000)
    } else if (talværdi > 90) {
        pins.servoWritePin(AnalogPin.P8, talværdi)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        basic.pause(1000)
    } else {
    	
    }
}
pins.servoWritePin(AnalogPin.P8, 89)
let fugtmåler = smarthome.ReadSoilHumidity(AnalogPin.P1)
basic.pause(1000)
basic.forever(function () {
	
})
loops.everyInterval(3600000, function () {
    fugtmåler = smarthome.ReadSoilHumidity(AnalogPin.P1)
    basic.showNumber(fugtmåler)
    basic.pause(1000)
    if (fugtmåler < 65) {
        basic.showIcon(IconNames.Sad)
        Servo(60)
        Pumpetid(2000)
        basic.pause(500)
        Servo(130)
        Pumpetid(2000)
        basic.pause(500)
        Servo(89)
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.Happy)
    }
})
