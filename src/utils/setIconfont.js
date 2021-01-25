// 字体图标 url
const urlArr = ["//at.alicdn.com/t/font_2348547_kgxnxryhup.css"]

// 动态设置字体图标
export function setIconfont() {
    if (urlArr.length <= 0) return false
    urlArr.map(v => {
        let link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = v
        document.getElementsByTagName('head')[0].appendChild(link)
    })
}