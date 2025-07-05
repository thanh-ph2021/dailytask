import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TFunction } from 'i18next'

import { TextComponent } from '../../components'
import { Fonts, Sizes } from '../../constants'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'
import { Icons } from '../../utils'

const PomodoroInfo = ({ colors, t, onClose }: { colors: ThemeColor, t: TFunction<"translation", undefined>, onClose: () => void }) => {
  return (
    <View style={{ gap: Sizes.padding, paddingBottom: Sizes.padding }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TextComponent
          text={t("pomodoroTitle")}
          style={{ ...Fonts.h2, width: "80%" }}
          color={colors.text}
        />
        <TouchableOpacity onPress={onClose}>
          <Icons.close size={30} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <TextComponent
        text={t("pomodoroIntro")}
        style={Fonts.body3}
        color={colors.textSecondary}
        showFullLine
      />

      <TextComponent
        text={t("howItWorks")}
        style={Fonts.h3}
        color={colors.text}
      />
      <TextComponent
        text={t(`howItWorksDetail`)}
        style={Fonts.body4}
        color={colors.textSecondary}
        showFullLine
      />

      <TextComponent
        text={t("benefits")}
        style={Fonts.h3}
        color={colors.text}
      />
      <TextComponent
        text={t("benefitsDetail")}
        style={Fonts.body4}
        color={colors.textSecondary}
        showFullLine
      />

      <TextComponent
        text={t("tips")}
        style={Fonts.h3}
        color={colors.text}
      />
      <TextComponent
        text={t("tipsDetail")}
        style={Fonts.body4}
        color={colors.textSecondary}
        showFullLine
      />
    </View>
  );
};

export default PomodoroInfo;
