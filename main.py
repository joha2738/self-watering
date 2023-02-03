def Display(talværdi: number):
    OLED.clear()
    OLED.draw_loading(talværdi)
def Servo(talværdi2: number):
    if talværdi2 <= 90:
        pins.servo_write_pin(AnalogPin.P8, talværdi2)
        basic.show_leds("""
            . . # . .
                        . . . # .
                        # # # # #
                        . . . # .
                        . . # . .
        """)
        basic.pause(1000)
    elif talværdi2 > 90:
        pins.servo_write_pin(AnalogPin.P8, talværdi2)
        basic.show_leds("""
            . . # . .
                        . # . . .
                        # # # # #
                        . # . . .
                        . . # . .
        """)
        basic.pause(1000)
    else:
        pass
OLED.init(128, 64)
pins.servo_write_pin(AnalogPin.P8, 89)
fugtmåler = smarthome.read_soil_humidity(AnalogPin.P1)
Display(fugtmåler)
basic.pause(1000)

def on_every_interval():
    Display(fugtmåler)
loops.every_interval(60000, on_every_interval)

def on_forever():
    global fugtmåler
    fugtmåler = smarthome.read_soil_humidity(AnalogPin.P1)
basic.forever(on_forever)
