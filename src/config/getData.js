import feach from './feach'

export const insertOrUpdateApmtMstr = data => feach('apmtMstrJson/insertApmtMstr.json',data,'POST','baseUrl') //新增预约单
export const pageApmtStore = data =>feach('apmtMstrJson/pageApmtStore.json',data,'post','baseUrl') //获取店铺列表
export const getApmtMstrInfo = data => feach('apmtMstrJson/getApmtMstrInfo.json',data,'post','baseUrl') //获取初始预约纪录
export const listApmtMstr = data => feach('apmtMstrJson/listApmtMstr.json',data,'post','baseUrl') //获取预约纪录
export const getApmtMstrDetail = data => feach('apmtMstrJson/getApmtMstrDetail.json',data,'get','baseUrl')//获取预约详情
export const updateApmtMstrByCancel  = data=>feach('apmtMstrJson/updateApmtMstrByCancel.json',data,'post','baseUrl')// 取消订单
export const listApmtPrebook = data=>feach('apmtMstrJson/listApmtPrebook.json',data,'get','baseUrl') //获取预约项目