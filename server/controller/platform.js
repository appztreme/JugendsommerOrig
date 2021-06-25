

exports.getPlatform = function(host) {
    var isKiso = host.indexOf('kiso') !== -1 || host.indexOf('projects-jd.bz') !== - 1;
    var isJugendsommer = host.indexOf('jugendsommer') !== -1;
    var isJDBL = host.indexOf('jd-bozenland') !== -1;
    var isJDUL = host.indexOf('jdsummer') !== -1;
    var isTest = host.indexOf('localhost') !== -1;
    var isJSGries = host.indexOf('jungschargries') !== -1;
    return {
        host: host,
        isKiso: isKiso,
        isJugendsommer: isJugendsommer,
        isJDBL: isJDBL,
        isJDUL: isJDUL,
        isBL: isJugendsommer || isJDBL,
        isTest: isTest,
        isJSGries: isJSGries
    }
}