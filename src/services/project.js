import Http from '../libs/ajax.js'


export default {
	getProjectRoleMembers(appId, RoleId) {
		return Http.get('/delivery/projects/' + appId + '/roles/' + RoleId + '/users/?page_size=10000');
	},
    getProjectRoles() {
        return Http.get('/perm/roles/templates/?page_size=10000');
    },
    addProjectRoleMembers(data) {
        return Http.post('/delivery/projects/roles/users/', data);
    },
    removeProjectRoleMember(appId, rid, uid) {
        return Http.delete('delivery/projects/'+ appId +'/roles/' + rid +'/users/'+ uid +'/');
    },
    getReleaseNotes(appId, args) {
        return Http.get('delivery/projects/'+ appId +'/release_notes/', {params: args});
    }
}
