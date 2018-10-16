<template>
    <div>
        <span id="weatherInfo">{{info.name}} <img id="weatherIcon" :src="weatherIcon" alt="weather_icon"> {{info.weather[0].main}} {{info.main.temp_min}} - {{info.main.temp_max}} &#8451;</span>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            info : null,
            apisKeys: 'bf530975764d848d34f31dfef65b6de7',
            apiLink: 'http://api.openweathermap.org/data/2.5/weather?lat=',
            hasError: false,
            weatherIcon: ''
        }
    },
    methods: {
        async getWeatherInfo(lat, lng) {
            let link = this.apiLink + lat+ '&lon='+ lng + '&units=metric&APPID=' + this.apisKeys
            axios.get(link).then(response => {
                this.info = response.data
                this.weatherIcon = 'http://openweathermap.org/img/w/'+ this.info.weather[0].icon+'.png'
            })
        }
    },
    async mounted() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                this.getWeatherInfo(pos.coords.latitude, pos.coords.longitude)
            })
        } else {
            this.hasError = true;
        }
       
    },
}
</script>

<style>
#weatherIcon {
    height: 2em;
}

#weatherInfo {
    color: white
}
</style>
