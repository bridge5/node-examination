module.exports = async (ctx, next) => {
    let url = ctx.url;
    let params = ctx.params;
    let admin_token = ctx.session.admin_token || '';
    for (let p in params) {
        let str = '/' + params[p];
        url = url.replace(str, '');
    }
    const noAuth = ['/login', '/logout', '/', '/player'];
    if (noAuth.includes(url)) {
        return await next();
    }

    //未登录
    if (!admin_token) {
        ctx.$json(ctx, 'noLogin')
        return false;
    }


    await next();
}
