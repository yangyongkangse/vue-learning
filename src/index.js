import axios from "axios";
import Setting from "@/setting";
import {Message} from 'element-ui';

let Axios = axios.create({
    baseURL: Setting.apiBaseURL,
    timeout: 5000,
    withCredentials: true
});

//Axios request 拦截器
Axios.interceptors.request.use(
    config => {
        config.headers["Content-Type"] = "application/json;charset=utf-8";
        //获取本地存储的token
        const token = localStorage.getItem("token");
        config.headers.Authorization = "Bearer " + token; //携带权限参数
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//Axios response 拦截器
Axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        Message.error({
            message: '服务器异常!',
            duration: 3000
        })
        return Promise.reject(error);
    }
);

export default {
    get: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            Axios.get(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err)
            })
        });
    },
    post: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            Axios.post(url, JSON.stringify(params))
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err)
                })
        });
    },
    put: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            Axios.put(url, params)
                .then(response => {
                    if (response) {
                        resolve(response.data);
                    } else {
                        reject("error");
                    }
                })
        });
    },
    patch: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            Axios.patch(url, params)
                .then(response => {
                    if (response) {
                        resolve(response.data);
                    } else {
                        reject("error");
                    }
                })
        })
    },
}
