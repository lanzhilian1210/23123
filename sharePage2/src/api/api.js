import axios from 'axios';
// let base ='';
export let base = 'http://web.test.artreedu.com';
// let base = 'http://web.artree.net.cn';
// let base = process.env.API_ROOT;
// let base = 'http://panda.dfth.com';
//学员中心后台-短信管理-短信失败列表
export const smsFail = (token, params) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.get(`${base}/api/v1/wxmanage/smsFail`, { params: params }).then(res => res.data);
};
//学员中心后台 短信管理-失败重发
export const  smsResend = (params, token) => {
    axios.defaults.headers.common['Authorization'] = token.Authorization;
    return axios.post(`${base}/api/v1/wxmanage/smsResend`, params).then(res => res.data);
};
//文章分享接口
export const getArticle = (id) => {
    return axios.get(`${base}/api/v1/share/articles/${id}`).then(res => res.data);
};
//票务分享接口
export const getTicket = (id) => {
    return axios.get(`${base}/api/v1/share/tickets/${id}`).then(res => res.data);
};
//商品分享接口
export const getProduct = (id) => {
    return axios.get(`${base}/api/v1/share/goods/${id}`).then(res => res.data);
};
//个人主页分享接口
export const getUers = (id) => {
    return axios.get(`${base}/api/v1/share/users/${id}`).then(res => res.data);
};
// 社区板块分享
export const getCommunity = (id,authorId) => {
    return axios.get(`${base}/api/v1/share/plates/${id}?authorId=${authorId}`).then(res => res.data);
};
//展评分享接口
export const getEvaluations = (id) => {
    return axios.get(`${base}/api/v1/share/evaluations/${id}`).then(res => res.data);
};
//微信获取接口
export const getWx = (params) => {
    return axios.get(`${base}/api/v1/share/js_signature`, { params: params }).then(res => res.data);
};

