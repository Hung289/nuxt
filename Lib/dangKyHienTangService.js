import * as Constant from "../Constant/GlobalConstant";
import { toast } from "react-toastify";

export const LoadFileDK = async (Id) => {
  const data = await fetch(
    `${Constant.PathServer}/api/DangKyHien/GetFileDangKyPDF?Id=${Id}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.Status) {
        return json;
      } else {
        toast.error(json.MessageError);
      }
      return json;
    });
  return data;
};

export const InPhieuHuyDK = async (id) => {
    const dt = await fetch(
        `${Constant.PathServer}/api/DangKyHien/GetFileHuyDangKy?id=${id}`,
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }
    )
        .then((response) => response.json())
        .then((json) => {
            if (json.Status) {
                toast.success('Tạo file thành công');
            } else {
                toast.error(json.MessageError);
                return null;
            }
            return json;
        });
    return dt;
};

export const GetDetailDto = async (id) => {
  const data = await fetch(
      `${Constant.PathServer}/api/DangKyHien/GetById?id=${id}`,
      {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer'
      }
  )
      .then((response) => response.json())
      .then((json) => {
          if (json.Status) {
              return json.Data;
          }
          return null;
      });
  return data;
};

export const InPhieuDK = async (id) => {
  const dt = await fetch(
      `${Constant.PathServer}/api/DangKyHien/GetFileDangKy?id=${id}`,
      {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }
  )
      .then((response) => response.json())
      .then((json) => {
          if (json.Status) {
              toast.success('Tạo file thành công');
          } else {
              toast.error(json.MessageError);
              return null;
          }
          return json;
      });
  return dt;
};

export const EditNewEntityUser = async (obj) => {
    const data = await fetch(
        `${Constant.PathServer}/api/HienVaGhep/EditHienTang`,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(obj)
        }
    )
        .then((response) => response.json())
        .then((json) => {
            return json;
        });
    return data;
};