import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import OverviewTasks from './Tabs/OverviewTasks'
import OverviewPomodoro from './Tabs/OverviewPomodoro'
import CustomTabSwitcher from './CustomTabSwitcher'
import { Container, Header } from '../../components'

const OverviewScreen = () => {
    const [activeTab, setActiveTab] = useState<'Pomodoro' | 'Tasks'>('Tasks')
    const {t} = useTranslation()

    return (
        <Container>
            <Header
                title={t('overview').toUpperCase()}
                textStyle={{ textAlign: 'center' }}
                // headerRight={
                //     <TouchableOpacity onPress={() => { }}>
                //         <Icons.setting color={colors.text} size={Sizes.xl} />
                //     </TouchableOpacity>
                // }
            />
            <CustomTabSwitcher activeTab={activeTab} onChangeTab={setActiveTab} t={t}/>
            {activeTab === 'Pomodoro' ? <OverviewPomodoro /> : <OverviewTasks />}
        </Container>
    )
}

export default OverviewScreen
