import Svg, { Circle, Defs, G, Image, Path, Pattern, Rect, Use } from "react-native-svg"

import Icon, { TypeIcons } from "../components/Icon"
import { Colors, Sizes } from "../constants"

type Props = {
    color?: string,
    size?: number,
}

const Icons = {
    success: () => <Icon color={Colors.green} type={TypeIcons.AntDesign} name='checkcircle' size={Sizes.xl} />,


    svgWarning: () => <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <Rect width="50" height="50" fill="url(#pattern0)" />
        <Defs>
            <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <Use xlinkHref="#image0_26_6" transform="scale(0.01)" />
            </Pattern>
            <Image id="image0_26_6" width="100" height="100" xlinkHref="data:image/png;base64,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" />
        </Defs>
    </Svg>,

    svgInfo: () => <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <Rect width="50" height="50" fill="url(#pattern0)" />
        <Defs>
            <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <Use xlinkHref="#image0_26_12" transform="scale(0.01)" />
            </Pattern>
            <Image id="image0_26_12" width="100" height="100" xlinkHref="data:image/png;base64,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" />
        </Defs>
    </Svg>,

    svgError: () => <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <Rect width="50" height="50" fill="url(#pattern0)" />
        <Defs>
            <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <Use xlinkHref="#image0_26_9" transform="scale(0.01)" />
            </Pattern>
            <Image id="image0_26_9" width="100" height="100" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADaElEQVR4nO3dz2oUMQAG8PEogiC0iFUKJv1zENvNjKhH8WZ9IB/EB6iPUfwHXmqFXgWdo9C6ZBLwDUZSGr3ozuxsJ/km+T4I7CFkp/Mjk8mmkykKhmEYhskwTSme61K8bpQ4cuXicyWfxT6u7HJW7axpJd82pWz/WZQ4cnViH2cWmT+5f1uX4ut/Mf6W743a3Yh9vEln3h+DKIAYLXsKHkZLFDyMlih4GC1R8DBaogyMrjbvaCW/9T3JuhTHrvSu79rmLfE4PUOX4tg83rr5c2/vRlOKT+wpABjFZYagmP3tu1f5NySTVTFWQKmJMhKGD1GAMHyIAoThQxQgDB+iAGH4EAUIw4coQBg+RAHC8CEKEIZP1ihoGFmjoGJkiYKOkRXKkPWMZTDmj7ZFU8rTRcXV6due++5k11NC9Ay7Lx90tevqFLn3lFCXKTsCSHIoIccMOxJIMiihB3A7IsjkUWLcTdmRQSaLEuvW1gYAmRxKzHmGDQQyGZTYkz4bEAQeJTZGDBBYFASMWCBwKCgYMUFgUJAwYoNER0HDQACJhoKIgQISHAUVAwkkGMrlc+CjrWekBDJkPcX91/35bGu96But5AdUDESQYYtc4mNbFNc6G9Yz8QIZAxVkEEolXnY2qpV8g4yBDLIsijvXnQ1qJb8gY6CDLDPQu3Pd2ZhW4qSH7umvh5u3ikix4CAXvUSJzz3GkZPOxholD3nJCjSOKHnY2SAH9aCD+kGvhnUp3yHfaVnAS9bSGKV8n8zE8MfTe9ebUlaLiquTzMRw4NYWUQd69AE8yu9ZuaGYkBg+RAHC8CEKEIYPUYAwfHJHMUgYuaMYRAwf97BKzHnKWbWz1ijxalG5yo2Uh8wzgj/QE7On2IAzdeiegYJiA4FMCiMmig0AMkmMWCh2ZJBJY8RAsSOCJIERGsWOBJIURkgUOwJIkhih5inzyBsHTPLdJFOZ0ZuUe8bUUExOGOgoJkcMVBSTMwYaiiEGDoohBg6KIQYOiiEGDoohBg6KIQYOiiEGDoohBg6KIQYOiiEGDoohxnhp1O7GxZrDSC+WnOR6RsKvXq2T+6Fwwig1MXBQamLgoNTEwEGpiYGDUhMDB6UmRqCcz7bWF+3p5TY+WPo5cGb16EocuC2O/kwMlTx0W4Pw3DIMwzBFhvkNWD7OQZ3s4zkAAAAASUVORK5CYII=" />
        </Defs>
    </Svg>,

    svgDroplets: () => <Svg width="15" height="100" viewBox="0 0 60 100" fill="none">
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M27.9083 61.0465C28.7624 62.1313 30.3342 62.3184 31.419 61.4643C32.5039 60.6102 32.6909 59.0384 31.8368 57.9535C23.6168 47.5128 22.1397 34.0054 22.8493 22.7979C23.2018 17.2316 24.088 12.3329 24.8869 8.82658C25.0814 7.9729 25.2704 7.20319 25.4447 6.52805C28.1836 2.4329 30 0 30 0C30 0 73.0964 57.7241 55.9819 84.1066C42.2351 105.298 17.7649 105.298 4.01809 84.1066C-6.99997 67.122 6.93688 37.1476 18.264 17.948C18.0976 19.3987 17.9585 20.9147 17.8593 22.4819C17.1173 34.201 18.5764 49.1936 27.9083 61.0465Z" fill="white" />
    </Svg>,

    svgFlower: () => <Svg width="45" height="45" viewBox="0 0 30 30" fill="none">
        <Rect width="30" height="30" fill="url(#pattern0)" />
        <Defs>
            <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <Use xlinkHref="#image0_33_4" transform="scale(0.01)" />
            </Pattern>
            <Image id="image0_33_4" width="100" height="100" xlinkHref="data:image/png;base64,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" />
        </Defs>
    </Svg>,

    svgSearchPrimary: () => <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <Rect width="30" height="30" fill="url(#pattern0)" />
        <Defs>
            <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <Use xlinkHref="#image0_37_25" transform="scale(0.01)" />
            </Pattern>
            <Image id="image0_37_25" width="100" height="100" xlinkHref="data:image/png;base64,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" />
        </Defs>
    </Svg>,

    svgSearchWhite: () => <Svg width="25" height="25" viewBox="0 0 50 50" fill="none">
        <Rect width="50" height="50" fill="url(#pattern0)" />
        <Defs>
            <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <Use xlinkHref="#image0_37_32" transform="scale(0.01)" />
            </Pattern>
            <Image id="image0_37_32" width="100" height="100" xlinkHref="data:image/png;base64,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" />
        </Defs>
    </Svg>,
    svgArrowRight: ({ size, color }: Props) => <Svg width={size ? size * 513 / 479 : 513} height={size ? size * 479 / 513 : 479} viewBox="0 0 513 479" fill="none">
        <Path d="M505.635 223.416L289.07 6.85153C283.102 1.0487 274.491 -1.12911 266.481 1.13846C258.471 3.40602 252.28 9.77447 250.239 17.8449C248.197 25.9153 250.617 34.4615 256.586 40.2643L433.24 216.61H23.9333C11.1185 216.61 0.72998 226.998 0.72998 239.813C0.72998 252.628 11.1185 263.016 23.9333 263.016H432.931L256.586 439.362C252.163 443.671 249.669 449.584 249.669 455.759C249.669 461.934 252.163 467.847 256.586 472.156C260.85 476.631 266.803 479.102 272.983 478.962C279.141 478.991 285.052 476.538 289.38 472.156L505.944 255.591C514.992 246.532 514.992 231.856 505.944 222.797L505.635 223.416Z" fill={color ? color : 'black'} />
    </Svg>,
    pomodoro: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12.0001 4.6499C7.22008 4.6499 3.33008 8.5399 3.33008 13.3199C3.33008 18.0999 7.22008 21.9999 12.0001 21.9999C16.7801 21.9999 20.6701 18.1099 20.6701 13.3299C20.6701 8.5499 16.7801 4.6499 12.0001 4.6499ZM12.7501 12.9999C12.7501 13.4099 12.4101 13.7499 12.0001 13.7499C11.5901 13.7499 11.2501 13.4099 11.2501 12.9999V7.9999C11.2501 7.5899 11.5901 7.2499 12.0001 7.2499C12.4101 7.2499 12.7501 7.5899 12.7501 7.9999V12.9999Z" fill={color} />
        <Path d="M14.8901 3.45H9.11014C8.71014 3.45 8.39014 3.13 8.39014 2.73C8.39014 2.33 8.71014 2 9.11014 2H14.8901C15.2901 2 15.6101 2.32 15.6101 2.72C15.6101 3.12 15.2901 3.45 14.8901 3.45Z" fill={color} />
    </Svg>,
    info: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M10.75 2.45001C11.45 1.86001 12.58 1.86001 13.26 2.45001L14.84 3.80001C15.14 4.05001 15.71 4.26001 16.11 4.26001H17.81C18.87 4.26001 19.74 5.13001 19.74 6.19001V7.89001C19.74 8.29001 19.95 8.85001 20.2 9.15001L21.55 10.73C22.14 11.43 22.14 12.56 21.55 13.24L20.2 14.82C19.95 15.12 19.74 15.68 19.74 16.08V17.78C19.74 18.84 18.87 19.71 17.81 19.71H16.11C15.71 19.71 15.15 19.92 14.85 20.17L13.27 21.52C12.57 22.11 11.44 22.11 10.76 21.52L9.18001 20.17C8.88001 19.92 8.31 19.71 7.92 19.71H6.17C5.11 19.71 4.24 18.84 4.24 17.78V16.07C4.24 15.68 4.04 15.11 3.79 14.82L2.44 13.23C1.86 12.54 1.86 11.42 2.44 10.73L3.79 9.14001C4.04 8.84001 4.24 8.28001 4.24 7.89001V6.20001C4.24 5.14001 5.11 4.27001 6.17 4.27001H7.9C8.3 4.27001 8.86 4.06001 9.16 3.81001L10.75 2.45001Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 8.13V12.96" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M11.9945 16H12.0035" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    arrowDown: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    play: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M17.49 9.60001L5.6 16.77C4.9 17.19 4 16.69 4 15.87V7.87001C4 4.38001 7.77 2.20001 10.8 3.94001L15.39 6.58001L17.48 7.78001C18.17 8.19001 18.18 9.19001 17.49 9.60001Z" fill={color} />
        <Path d="M18.0898 15.46L14.0398 17.8L9.99981 20.13C8.54981 20.96 6.90981 20.79 5.71981 19.95C5.13981 19.55 5.20981 18.66 5.81981 18.3L18.5298 10.68C19.1298 10.32 19.9198 10.66 20.0298 11.35C20.2798 12.9 19.6398 14.57 18.0898 15.46Z" fill={color} />
    </Svg>,
    close: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M9.17004 14.83L14.83 9.17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M14.83 14.83L9.17004 9.17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    unlimited: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M10.18 9.32019C9.35999 8.19019 8.05001 7.4502 6.54001 7.4502C4.03001 7.4502 1.98999 9.49018 1.98999 12.0002C1.98999 14.5102 4.03001 16.5502 6.54001 16.5502C8.23001 16.5502 9.80001 15.6602 10.67 14.2102L12 12.0002L13.32 9.79016C14.19 8.34016 15.76 7.4502 17.45 7.4502C19.96 7.4502 22 9.49018 22 12.0002C22 14.5102 19.96 16.5502 17.45 16.5502C15.95 16.5502 14.64 15.8102 13.81 14.6802" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    arrowRight: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M14.4302 5.93005L20.5002 12.0001L14.4302 18.0701" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3.5 12H20.33" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    tickCircle: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill={color} />
    </Svg>,
    home: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M9.02 2.83999L3.63 7.03999C2.73 7.73999 2 9.22999 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28999 21.19 7.73999 20.2 7.04999L14.02 2.71999C12.62 1.73999 10.37 1.78999 9.02 2.83999Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 17.99V14.99" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    homeFill: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M20.04 6.82L14.28 2.79C12.71 1.69 10.3 1.75 8.78999 2.92L3.77999 6.83C2.77999 7.61 1.98999 9.21 1.98999 10.47V17.37C1.98999 19.92 4.05999 22 6.60999 22H17.39C19.94 22 22.01 19.93 22.01 17.38V10.6C22.01 9.25 21.14 7.59 20.04 6.82ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z" fill={color} />
    </Svg>,
    menu: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3 7H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M3 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M3 17H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>,
    timer: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M15.7099 15.18L12.6099 13.33C12.0699 13.01 11.6299 12.24 11.6299 11.61V7.51001" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    timerFill: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.35 15.57C16.21 15.81 15.96 15.94 15.7 15.94C15.57 15.94 15.44 15.91 15.32 15.83L12.22 13.98C11.45 13.52 10.88 12.51 10.88 11.62V7.52C10.88 7.11 11.22 6.77 11.63 6.77C12.04 6.77 12.38 7.11 12.38 7.52V11.62C12.38 11.98 12.68 12.51 12.99 12.69L16.09 14.54C16.45 14.75 16.57 15.21 16.35 15.57Z" fill={color} />
    </Svg>,
    chart: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3 22H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12.8002 5.18994H11.2002C10.6502 5.18994 10.2002 5.63994 10.2002 6.18994V17.9999C10.2002 18.5499 10.6502 18.9999 11.2002 18.9999H12.8002C13.3502 18.9999 13.8002 18.5499 13.8002 17.9999V6.18994C13.8002 5.63994 13.3502 5.18994 12.8002 5.18994Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M19.9999 2H18.3999C17.8499 2 17.3999 2.45 17.3999 3V18C17.3999 18.55 17.8499 19 18.3999 19H19.9999C20.5499 19 20.9999 18.55 20.9999 18V3C20.9999 2.45 20.5499 2 19.9999 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    chartFill: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z" fill={color} />
        <Path d="M5.6 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.6C6.15 18.9999 6.6 18.5499 6.6 17.9999V9.37988C6.6 8.81988 6.15 8.37988 5.6 8.37988Z" fill={color} />
        <Path d="M12.8002 5.18994H11.2002C10.6502 5.18994 10.2002 5.63994 10.2002 6.18994V17.9999C10.2002 18.5499 10.6502 18.9999 11.2002 18.9999H12.8002C13.3502 18.9999 13.8002 18.5499 13.8002 17.9999V6.18994C13.8002 5.63994 13.3502 5.18994 12.8002 5.18994Z" fill={color} />
        <Path d="M19.9999 2H18.3999C17.8499 2 17.3999 2.45 17.3999 3V18C17.3999 18.55 17.8499 19 18.3999 19H19.9999C20.5499 19 20.9999 18.55 20.9999 18V3C20.9999 2.45 20.5499 2 19.9999 2Z" fill={color} />
    </Svg>,
    star: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M13.73 3.51014L15.49 7.03014C15.73 7.52014 16.37 7.99014 16.91 8.08014L20.1 8.61014C22.14 8.95014 22.62 10.4301 21.15 11.8901L18.67 14.3701C18.25 14.7901 18.02 15.6001 18.15 16.1801L18.86 19.2501C19.42 21.6801 18.13 22.6201 15.98 21.3501L12.99 19.5801C12.45 19.2601 11.56 19.2601 11.01 19.5801L8.02 21.3501C5.88 22.6201 4.58 21.6701 5.14 19.2501L5.85 16.1801C5.98 15.6001 5.75 14.7901 5.33 14.3701L2.85 11.8901C1.39 10.4301 1.86 8.95014 3.9 8.61014L7.09 8.08014C7.62 7.99014 8.26 7.52014 8.5 7.03014L10.26 3.51014C11.22 1.60014 12.78 1.60014 13.73 3.51014Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    infoCircle: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 8V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M11.9945 16H12.0035" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    categories: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    setting: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    repeat: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M3.58008 5.15991H17.4201C19.0801 5.15991 20.4201 6.49991 20.4201 8.15991V11.4799" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M6.74008 2L3.58008 5.15997L6.74008 8.32001" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M20.4201 18.84H6.58008C4.92008 18.84 3.58008 17.5 3.58008 15.84V12.52" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M17.2598 21.9999L20.4198 18.84L17.2598 15.6799" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    calendar: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M8 2V5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16 2V5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3.5 9.09009H20.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M15.6947 13.7H15.7037" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M15.6947 16.7H15.7037" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M11.9955 13.7H12.0045" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M11.9955 16.7H12.0045" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.29431 13.7H8.30329" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.29431 16.7H8.30329" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    notification: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12.0196 2.91016C8.7096 2.91016 6.0196 5.60016 6.0196 8.91016V11.8002C6.0196 12.4102 5.7596 13.3402 5.4496 13.8602L4.2996 15.7702C3.5896 16.9502 4.0796 18.2602 5.3796 18.7002C9.6896 20.1402 14.3396 20.1402 18.6496 18.7002C19.8596 18.3002 20.3896 16.8702 19.7296 15.7702L18.5796 13.8602C18.2796 13.3402 18.0196 12.4102 18.0196 11.8002V8.91016C18.0196 5.61016 15.3196 2.91016 12.0196 2.91016Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
        <Path d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M15.0195 19.0601C15.0195 20.7101 13.6695 22.0601 12.0195 22.0601C11.1995 22.0601 10.4395 21.7201 9.89953 21.1801C9.35953 20.6401 9.01953 19.8801 9.01953 19.0601" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" />
    </Svg>,
    arrowRight2: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.07996" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    share: ({ size, color }: Props) => <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M7.39993 6.32L15.8899 3.49C19.6999 2.22 21.7699 4.3 20.5099 8.11L17.6799 16.6C15.7799 22.31 12.6599 22.31 10.7599 16.6L9.91993 14.08L7.39993 13.24C1.68993 11.34 1.68993 8.23 7.39993 6.32Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M10.1101 13.65L13.6901 10.06" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>,
    Momo: ({ color = "#000", size = 24 }: Props) => (
        <Svg
            viewBox="0 0 200 200"
            width={size}
            height={size}
        >
            <G>
                <Path
                    d="M156.8,91c23.5,0,42.5-19,42.5-42.5c0-23.5-19-42.5-42.5-42.5c-23.5,0-42.5,19-42.5,42.5 C114.3,72,133.3,91,156.8,91z M156.8,30.4c10,0,18.1,8.1,18.1,18.1c0,10-8.1,18.1-18.1,18.1c-10,0-18.1-8.1-18.1-18.1 C138.7,38.5,146.8,30.4,156.8,30.4z"
                    fill="#A50064"
                />
                <Path
                    d="M70.2,109.4c-7.2,0-13.8,2.4-19.1,6.4c-5.3-4-12-6.4-19.1-6.4C14.3,109.4,0,123.7,0,141.3v53.2h24.4V141 c0-4,3.2-7.2,7.2-7.2c4,0,7.2,3.2,7.2,7.2v53.4h24.4V141c0-4,3.2-7.2,7.2-7.2c4,0,7.2,3.2,7.2,7.2v53.4H102v-53.2 C102,123.7,87.8,109.4,70.2,109.4z"
                    fill="#A50064"
                />
                <Path
                    d="M156.8,109.4c-23.5,0-42.5,19-42.5,42.5c0,23.5,19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5 C199.3,128.4,180.3,109.4,156.8,109.4z M156.8,170c-10,0-18.1-8.1-18.1-18.1c0-10,8.1-18.1,18.1-18.1c10,0,18.1,8.1,18.1,18.1 C174.9,161.9,166.8,170,156.8,170z"
                    fill="#A50064"
                />
                <Path
                    d="M70.2,6C63,6,56.4,8.4,51,12.4c-5.3-4-12-6.4-19.1-6.4C14.3,6,0,20.3,0,37.9V91h24.4V37.6c0-4,3.2-7.2,7.2-7.2 c4,0,7.2,3.2,7.2,7.2V91h24.4V37.6c0-4,3.2-7.2,7.2-7.2c4,0,7.2,3.2,7.2,7.2V91H102V37.9C102,20.3,87.8,6,70.2,6z"
                    fill="#A50064"
                />
            </G>
        </Svg>
    ),
    AdMob: ({ color = "#000", size = 24 }: Props) => (
        <Svg viewBox="0 0 48 48" width={size} height={size}>
            <Path fill="none" d="M6,2h37v37H6V2z" />
            <Path fill="#fbc02d" d="M23.069,4.107c0.568-0.052,1.137-0.072,1.707-0.062c10.41,0.383,18.77,8.721,19.18,19.131V38.88 c-0.02,2.839-2.331,5.127-5.17,5.12c-2.583-0.403-4.566-2.505-4.819-5.107V23.188c-0.428-5.486-5.222-9.587-10.708-9.159 c-0.063,0.005-0.127,0.01-0.19,0.017" />
            <Path fill="#448aff" d="M43.956,39.005c0,2.752-2.231,4.982-4.982,4.982c-2.752,0-4.982-2.231-4.982-4.982 c0-2.752,2.231-4.982,4.982-4.982C41.725,34.022,43.956,36.253,43.956,39.005z" />
            <Path fill="#e53935" d="M23.355,43.826c2.827,0.035,5.147-2.229,5.181-5.056c0-0.009,0-0.018,0-0.026 c-0.079-2.751-2.374-4.916-5.124-4.836c-0.04,0.001-0.079,0.003-0.119,0.005c-5.454-0.417-9.552-5.154-9.18-10.612v-0.087 c0.403-4.916,4.322-8.809,9.241-9.179c2.749,0.111,5.068-2.028,5.179-4.778c0.001-0.027,0.002-0.053,0.003-0.08 c-0.027-2.834-2.346-5.109-5.18-5.081c-0.001,0-0.001,0-0.002,0h-0.349C12.415,4.585,4.061,13.282,4,23.885v0.074 c0,12.455,10.924,19.866,19.057,19.866H23.355z" />
        </Svg>
    ),
    Donate: ({ color = "#000", size = 24 }: Props) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M5.5 9.5V14.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M18.5 9.5V14.5" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    ),
    Empty: ({ color = "#000", size = 24 }: Props) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M21.67 14.3L21.27 19.3C21.12 20.83 21 22 18.29 22H5.71001C3.00001 22 2.88001 20.83 2.73001 19.3L2.33001 14.3C2.25001 13.47 2.51001 12.7 2.98001 12.11C2.99001 12.1 2.99001 12.1 3.00001 12.09C3.55001 11.42 4.38001 11 5.31001 11H18.69C19.62 11 20.44 11.42 20.98 12.07C20.99 12.08 21 12.09 21 12.1C21.49 12.69 21.76 13.46 21.67 14.3Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" />
            <Path d="M3.5 11.43V6.28003C3.5 2.88003 4.35 2.03003 7.75 2.03003H9.02C10.29 2.03003 10.58 2.41003 11.06 3.05003L12.33 4.75003C12.65 5.17003 12.84 5.43003 13.69 5.43003H16.24C19.64 5.43003 20.49 6.28003 20.49 9.68003V11.47" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M9.42999 17H14.57" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    ),
    Trash: ({ color = "#000", size = 24 }: Props) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M10.33 16.5H13.66" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M9.5 12.5H14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    ),
    Edit: ({ color = "#000", size = 24 }: Props) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z" stroke={color} strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M14.9102 4.15002C15.5802 6.54002 17.4502 8.41002 19.8502 9.09002" stroke={color} strokeWidth="1.5" stroke-miterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    ),
    Circle: ({ color = "#000", size = 24 }: Props) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="3"
                fill="none"
            />
        </Svg>
    ),
    CheckCircle: ({ color = "#000", size = 24 }: Props) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="12"
                r="10"
                fill={color}
            />

            <Path
                d="M8.5 12.5L11 15L15.5 9.5"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    ),
}

export default Icons