# rpi-gpio-sysfs

Access GPIO pins via [sysfs](https://elinux.org/RPi_GPIO_Code_Samples#sysfs.2C_part_of_the_raspbian_operating_system). This repository is heavily inspired by [rpi-gpio.js](https://github.com/JamesBarwell/rpi-gpio.js).

## Why rpi-gpio-sysfs over rpi-gpio?

* Does not make assumptions about the hardware it runs on¹
* Written in modern ES6
* Less dependencies


¹ `rpi-gpio` transforms pin numbers from WPI to BCM depending on the hardware it runs on. `rpi-gpio-sysfs` does not and will therefore work with newer Raspberry Pi Hardware without any updates.
