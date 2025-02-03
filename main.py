def on_data_received():
    global readVal, RecievedTime
    readVal = serial.read_string()
    led.stop_animation()
    basic.clear_screen()
    led.set_brightness(222)
    RecievedTime = input.running_time()
serial.on_data_received("\n", on_data_received)

ElapsedTime = 0
RecievedTime = 0
readVal = ""
serial.set_baud_rate(BaudRate.BAUD_RATE115200)
readVal = "INIT"
JPchar = images.create_image("""
    # # # # #
    . . . . #
    . # . # .
    . # . . .
    # . . . .
    """)

def on_forever():
    global readVal, ElapsedTime
    if readVal.includes("EN"):
        basic.show_string("A")
    elif readVal.includes("JA"):
        JPchar.show_image(0)
    elif readVal == "INIT":
        basic.show_string("Activating")
        basic.clear_screen()
    else:
        basic.show_string(readVal)
    if input.logo_is_pressed() or readVal.includes("SL"):
        basic.show_string("Sleeping")
        basic.clear_screen()
        power.low_power_request()
        power.full_power_on(FullPowerSource.A)
        readVal = "INIT"
    ElapsedTime = input.running_time()
    if ElapsedTime - RecievedTime > 1000 and led.brightness() > 200:
        led.set_brightness(100)
    basic.pause(100)
basic.forever(on_forever)
