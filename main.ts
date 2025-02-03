serial.onDataReceived("\n", function on_data_received() {
    
    readVal = serial.readString()
    led.stopAnimation()
    basic.clearScreen()
    led.setBrightness(222)
    RecievedTime = input.runningTime()
})
let ElapsedTime = 0
let RecievedTime = 0
let readVal = ""
serial.setBaudRate(BaudRate.BaudRate115200)
readVal = "INIT"
let JPchar = images.createImage(`
    # # # # #
    . . . . #
    . # . # .
    . # . . .
    # . . . .
    `)
basic.forever(function on_forever() {
    
    if (readVal.includes("EN")) {
        basic.showString("A")
    } else if (readVal.includes("JA")) {
        JPchar.showImage(0)
    } else if (readVal == "INIT") {
        basic.showString("Activating")
        basic.clearScreen()
    } else {
        basic.showString(readVal)
    }
    
    if (input.logoIsPressed() || readVal.includes("SL")) {
        basic.showString("Sleeping")
        basic.clearScreen()
        power.lowPowerRequest()
        power.fullPowerOn(FullPowerSource.A)
        readVal = "INIT"
    }
    
    ElapsedTime = input.runningTime()
    if (ElapsedTime - RecievedTime > 1000 && led.brightness() > 200) {
        led.setBrightness(100)
    }
    
    basic.pause(100)
})
