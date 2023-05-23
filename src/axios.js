import axios from 'axios'
import { SetupCache } from 'axios-extensions'

window.axios = axios
const cache = SetupCache({
    maxAge: 15 * 60 * 1000
})

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    adapter: cache.adapter
})