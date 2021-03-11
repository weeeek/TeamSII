// 消息队列请求
import axios from 'axios'

const apiBaseUrl = "http://47.97.248.244/WebProxy/api/MSMQ/"

export const MQSend = (type, msg) => {
    return axios.post(apiBaseUrl + 'Send', {
        msg: `${type}|${msg}`
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export const getMqData = () => {
    return axios.get(`${server}msmqData.json?r=${Math.random() * 10000000000000000}`).then((res) => {
        return Promise.resolve(res.data)
    })
}