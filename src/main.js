import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import Config from './config/config';
import VueLocalStorage from 'vue-localstorage';
import 'iview/dist/styles/iview.css';
import App from './app.vue';
import systermMenus from './views/menus';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueLocalStorage);
Vue.use(iView);

// vuex
console.log('start setup store');
const store = new Vuex.Store({
    state: {
        user: null,
        userMenus: [],
        activeTopMenuName: null,
        activeSideMenu: null,
        appId: null
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        username: (state) => {
            return state.user ? state.user.username : null;    
        },
        uid: (state) => {
            return state.user ? state.user.id : null;
        },
        permissions: (state) => {
            return state.user ? state.user.permissions : null;
        },
        userMenus: (state) => {
            return state.userMenus;
        },
        activeTopMenuName: (state) => {
            return state.activeTopMenuName;
        },
        activeSideMenu: (state) => {
            return state.activeSideMenu;
        },
        appId: (state) => {
            return state.appId;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setUserMenus(state, menus) {
            state.userMenus = menus;
        },
        setActiveTopMenuName(state, name) {
            state.activeTopMenuName = name;
        },
        setActiveSideMenu(state, menuPair) {
            state.activeSideMenu = menuPair;
        },
        setAppId(state, appId) {
            state.appId = appId;
        }
    },
    actions: {

    }
});
console.log('end setup store');

// 加载用户信息
console.log('start load userInfo');
let json = Vue.localStorage.get(Config.LS_KEY_PROFILE);
let userInfo = json ? JSON.parse(json) : null;
if (userInfo) {
    store.commit('setUser', userInfo);
}
console.log('end load userInfo');

// 菜单 TODO 登陆完要重新计算
console.log('start resolve menus');
var userMenus = Util.calUserMenus(systermMenus, userInfo);
console.log(userMenus);
store.commit('setUserMenus', userMenus);
console.log('end resolve menus');
//

// path 和 菜单的映射
function calPathMenuMapping(mapping, menus) {
    for (var i=0; i<menus.length; ++i) {
        var m = menus[i];
        mapping[m.link] = m;
        if (m.submenus) {
            calPathMenuMapping(mapping, m.submenus);
        }
    }
}
const pathMenuMapping = {};
calPathMenuMapping(pathMenuMapping, systermMenus);
console.log(pathMenuMapping);

// 路由配置
console.log('start setup routes');
const RouterConfig = {
    mode: 'hash',
    routes: Routers,
    scrollBehavior: function (to, from, savedPosition) {
        // Note: this feature only works in HTML5 history mode.
        //return { x: 0, y: 0 };
        console.log(savedPosition);
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    console.log('router.beforeEach');
    console.log(from);
    console.log(to);
    console.log(to.path);
    // TODO 权限检查
    // TODO URL重定向 /=》一级（第一个平台）， 一级=>三级
    if (to.path == '/') {
        var r2 = store.getters.userMenus[0].link;
        next(r2);
        return;
    }
    var segs = to.path.split('/');
    console.log(segs);
    if (segs.length == 2) {
        var ums = store.getters.userMenus;
        for (let i=0; i<ums.length; ++i) {
            if (ums[i].link == to.path) {
                let r2 = ums[i].submenus[0].submenus[0].link;
                console.log(r2);
                next(r2);
                return;
            }
        }
    }

    iView.LoadingBar.start();
    Util.setWindowTitle(to.meta.title);
    next();
    // TODO 持久化页面的状态，goback的时候反序列化恢复页面
});

router.afterEach((to, from) => {
    console.log('router.afterEach');
    console.log(from);
    console.log(to);
    iView.LoadingBar.finish();
    // /window.scrollTo(0, 0);

    // 当前路由到的匹配到哪个Top导航菜单
    console.log(to.path);
    var segs = to.path.split('/');
    console.log(segs);
    if (segs.length >= 2) {
        var tp = '/' + segs[1];
        console.log(tp);
        let ums = store.getters.userMenus;
        for (var i=0; i<ums.length; ++i){
            var menu = ums[i];
            if (menu.link == tp) {
                store.commit('setActiveTopMenuName', menu.link);
                break;
            }
        }
        if (i==ums.length) {
            store.commit('setActiveTopMenuName', null);
        }
    }
    if (segs.length >= 4) {
        var p1 = segs.slice(0, 3).join('/');
        console.log(p1);
        var m1 = pathMenuMapping[p1];
        console.log(m1.title);
        var p2 = segs.slice(0, 4).join('/');
        console.log(p2);
        var m2 = pathMenuMapping[p2];
        console.log(m2.title);
        store.commit('setActiveSideMenu', {menu: m1, submenu: m2});
    }

});
console.log('end setup routes');


// 全局的权限检查函数，用mixin的方式注入到component里
Vue.mixin({
    methods: {
        hasPerm: function (purl) {
            let user = store.getters.user;
            return Util.hasPerm(user, purl);
        },
        // 默认应该选中的一级和二级菜单
        // getDefaultActiveMenu: function (menus) {
        //     for (var i = 0; i < menus.length; ++i) {
        //         var menu = menus[i]
        //         //console.log(menu);
        //         for (var j = 0; j < menu.submenus.length; ++j) {
        //             var submenu = menu.submenus[j];
        //             if (!submenu.checkPerm || this.hasPerm(submenu.purl)) {
        //                 return { menu: menu, submenu: submenu };
        //             }
        //         }
        //     }
        //     return null;
        // }
    }
});


export default new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
