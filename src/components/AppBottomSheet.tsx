import { forwardRef, ReactNode, useImperativeHandle, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetProps, BottomSheetView } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'

interface AppBottomSheetProps extends BottomSheetProps {
    snapPoints?: (`${number}%` | number)[],
    children: ReactNode
}

const AppBottomSheet = forwardRef(({ snapPoints= ['100%'], children, ...restProps }: AppBottomSheetProps, ref) => {

    const portalName = useMemo(() => `bottom-sheet-${Math.random()}`, [])
    const sheetRef = useRef<BottomSheet>(null)
    useImperativeHandle(
        ref,
        () => ({
            ...sheetRef.current,
            snapTo: (value: any, isPosition = false) => {
                if (isPosition) {
                    sheetRef.current?.snapToPosition?.(value)
                } 
                else {
                    if (value >= 0 && value <= snapPoints.length - 1) {
                        sheetRef.current?.snapToIndex?.(value)
                    }
                }
            },
            close: () => sheetRef.current?.close?.()
        }),
        [snapPoints]
    )

    return (
        <Portal name={portalName}>
            <BottomSheet
                {...restProps}
                backdropComponent={props => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                )}
                index={isNaN(restProps.index!) ? -1 : restProps.index}
                snapPoints={snapPoints}
                enablePanDownToClose
                ref={sheetRef}
            >
                <BottomSheetView>
                    {children}
                </BottomSheetView>
            </BottomSheet>
        </Portal>
    )
})

export default AppBottomSheet