
import Config from '../config/config';

let util = {

};

util.setWindowTitle = function(title) {
    title = title ? title + ' | ' + Config.SITE_TITLE : Config.SITE_TITLE;
    window.document.title = title;
};

util.redirectToLogin = function() {
    window.location.href = '/#/login';
}

util.redirectToIndex = function() {
    window.location.href = '/#/';
}

util.hasPerm = function(userInfo, purl) {
    if (!userInfo) {
        return false;
    }

    if (userInfo.is_super) {
        return true;
    }

    if (!userInfo.permissions)
        return false;

    var is_in = false;
    for (var i=0; i < userInfo.permissions.length; ++i) {
        if (userInfo.permissions[i].url == purl) {
            is_in = true;
        }

    }
    return is_in;
}

util.calUserMenus = function(menus, userInfo) {
    var userMenus = [];
    for (var i=0; i<menus.length; ++i) {
        var m = menus[i];
        var hp = m.checkPerm ? util.hasPerm(userInfo, m.purl) : true;
        if (!hp) {
            continue;
        }
        if (m.submenus) {
            var usms = util.calUserMenus(m.submenus, userInfo);
            if (!usms || !usms.length) {
                continue;
            } else {
                m.submenus = usms;
            }
        }
        console.log(m.title);
        userMenus.push(m);
    }
    return userMenus;
}

export default util;

