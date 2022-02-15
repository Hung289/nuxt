import * as Constant from '../Constant/GlobalConstant';

export function RenderDataTinh(dispatch) {
    fetch(`${Constant.PathServer}/api/TinhHuyenXa/GetDataTinh`)
        .then((response) => response.json())
        .then((json) => {
            if (json.Status) {
                dispatch({
                    value: json.Data
                });
            }
        });
}