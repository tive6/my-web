import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Mocard from './modules/mocard'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        User,
        Mocard,
    }
})
