import axios from "axios"

const get = async (lat: number, lon: number) => {
    const appid = ''
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`)

        return response.data.weather
        
    } catch (error) {
        console.log("🚀 ~ get ~ error:", error)
    }
}

export const Weather = {
    get
}