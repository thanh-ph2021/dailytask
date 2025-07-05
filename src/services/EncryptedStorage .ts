import EncryptedStorage from 'react-native-encrypted-storage'

const saveUserData = async (data: string) => {
     await EncryptedStorage.setItem('userData', data)
}

const getUserData = async () => {
    const userData = await EncryptedStorage.getItem('userData')
    if(userData){
        return JSON.parse(userData)
    }
    return userData
}

const removeUserData = async () => {
    await EncryptedStorage.removeItem('userData')
}

export { saveUserData, getUserData, removeUserData }