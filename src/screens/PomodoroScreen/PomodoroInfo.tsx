import React from 'react'
import { View } from 'react-native'
import { TFunction } from 'i18next'

import { TextComponent } from '../../components'
import { Fonts, Sizes } from '../../contants'
import { ThemeColor } from '../../redux/Reducers/ThemeReducer'

const PomodoroInfo = ({ colors, t }: { colors: ThemeColor, t: TFunction<"translation", undefined> }) => {
  return (
    <View style={{ gap: Sizes.padding }}>
      <TextComponent
        text={t("pomodoroTitle")}
        style={Fonts.h2}
        color={colors.text}
      />

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
