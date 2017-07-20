<style scoped>
    
</style>
<template>
    <Row>
        <i-col span="3">
            <Menu width="auto" :open-names="[activeMenu.menu.title]" :active-name="activeMenu.submenu.link" @on-select="nav">
                <Submenu v-for="menu in menus" :name="menu.title" :key="menu.title">
                    <template slot="title">
                        <Icon :type="menu.icon" size=14></Icon>
                        {{menu.title}}
                    </template>
                    <Menu-item :name="submenu.link" v-for="submenu in menu.submenus" :key="submenu.link">
                        <!--<Icon :type="submenu.icon" size="14"></Icon>-->
                        {{submenu.title}}
                    </Menu-item>
                </Submenu>
            </Menu>
        </i-col>
        <i-col span="21">
            <div class="layout-content-main">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </i-col>
    </Row>
</template>
<script>
    import CMDBService from '../../services/cmdb';
    import Util from '../../libs/util';

    export default {
        data () {
            return {
                appOptions: {}
            }
        },
        computed: {
            menus: function() {
                return this.$store.getters.userMenus.filter(x=>{return x.purl=='/project';})[0].submenus;
            },
            activeMenu: function() {
                var am = this.$store.getters.activeSideMenu;
                return am;
            }
        },
        created() {
            console.log('project/index.vue created');
            console.log(this.$store.getters.appId);
        },
        methods: {
            getApps() {
                var args = {
                    page: 1,
                    page_size: 10000,
                    type: 'app'
                };
                CMDBService.getAppBriefInfos(args).then((res)=>{
                    var t = {};
                    for (var i=0; i<res.data.results.length; ++i) {
                        let app = res.data.results[i];
                        console.log(app.business);
                        if (!t[app.business]) {
                            t[app.business] = [];
                        }
                        t[app.business].push({label: app.cluster_name, value: app.id});
                    }
                    this.appOptions = t;
                    console.log(t);
                });
            },
            nav(dest) {
                this.$router.push(dest);
            }
        }
    }
</script>
