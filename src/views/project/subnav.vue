<style scoped>
    
</style>
<template>
    <Menu mode="horizontal" active-name="1">
            <div class="layout-assistant">
                <Select v-model="appId" style="width:200px" filterable>
                    <Option-group :label="business" v-for="(apps, business, index) in appOptions" :key="business">
                        <Option v-for="item in apps" :value="item.value" :key="item">{{ item.label }}</Option>
                    </Option-group>
                </Select>
                <Button type="ghost" icon="plus">新建项目</Button>

            </div>
        </Menu>
</template>
<script>
    import CMDBService from '../../services/cmdb';
    import Util from '../../libs/util';
    import Config from '../../config/config';

    export default {
        data () {
            return {
                appOptions: {}
            }
        },
        computed: {
            appId: {
                get: function() {
                    let storeId = this.$store.getters.appId;
                    console.log(storeId);
                    if (storeId) {
                        return storeId;
                    } else {
                        let json = this.$localStorage.get(Config.LS_KEY_APPID);
                        let id = JSON.parse(json);
                        this.$store.commit('setAppId', id);
                        return id;
                    }
                },
                set: function(newVal) {
                    let json = JSON.stringify(newVal);
                    this.$localStorage.set(Config.LS_KEY_APPID, json);
                    this.$store.commit('setAppId', newVal);
                }
            }
        },
        created() {
            console.log('project/subnav.vue created');
            this.getApps();
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
                        if (!t[app.business]) {
                            t[app.business] = [];
                        }
                        t[app.business].push({label: app.cluster_name, value: app.id});
                    }
                    this.appOptions = t;
                });
            },
            nav(dest) {
                this.$router.push(dest);
            }
        }
    }
</script>
