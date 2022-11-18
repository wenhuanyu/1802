import {
    createSSRApp
} from 'vue'
import App from './App.vue'
import common from './common/common.js'
import http from './common/http.js'
import upload from './common/upload.js'
import api from './common/api.js'
import share from './common/share.js'

export function createApp() {
    const app = createSSRApp(App)
    app.config.globalProperties.common = common
    app.config.globalProperties.http = http
    app.config.globalProperties.upload = upload
    app.config.globalProperties.api = api
    app.mixin(share)
    return {
        app
    }
}