import * as Constant from '../Constant/GlobalConstant';
import * as UtilRequest from '../Common/UtilRequest';

// eslint-disable-next-line import/prefer-default-export
export const CreateNewEntity = async (obj) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/Create`,
        'POST',
        obj
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const OpenEditModalSV = async (id) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/GetDtoById?id=${id}`,
        'GET',
        null
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const EditNewEntity = async (obj) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/Edit`,
        'POST',
        obj
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const LoadEntity = async (objSearch) => {
    const searchModel = {
        ...objSearch
    };
    if (objSearch == null || objSearch.PageIndex == null) {
        searchModel.PageIndex = 1;
    }
    if (objSearch == null || objSearch.PageSize == null) {
        searchModel.PageSize = 20;
    }
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/GetDanhSach`,
        'POST',
        searchModel
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const GetDetailById = async (id) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/GetDtoById?id=${id}`,
        'GET'
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const DeleteEntity = async (id) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/Delete?id=${id}`,
        'POST',
        null
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const DeleteMultiEntity = async (id) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/DeleteMulti?id=${id}`,
        'POST',
        null
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const ChangeStatusNewEntity = async (obj) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/ChangeStatus`,
        'POST',
        obj
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};

export const SaveHSBanCung = async (obj) => {
    const dataRequst = await UtilRequest.RequestAuthClient(
        `${Constant.PathServer}/api/HuyDangKy/HSBanCungUpdate`,
        'POST',
        obj
    ).then((rs) => {
        return rs;
    });
    return dataRequst;
};
