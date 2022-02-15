import { toast } from "react-toastify";
import * as Constant from "../Constant/GlobalConstant";

export const LoadFileThanDK = async (Id) => {
  const data = await fetch(
    `${Constant.PathServer}/api/DangKyChoGhepThan/GetFileDangKyPDF?Id=${Id}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.Status) {
      } else {
        toast.error(json.MessageError);
      }
      return json;
    });
  return data;
};

export const LoadFileKhacDK = async (Id) => {
  const data = await fetch(
    `${Constant.PathServer}/api/DangKyChoGhepThan/GetDangKyGTangKhacPDF?Id=${Id}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.Status) {
      } else {
        toast.error(json.MessageError);
      }
      return json;
    });
  return data;
};

export const InPhieuHuyDKThan = async (id) => {
    const dt = await fetch(
        `${Constant.PathServer}/api/DangKyChoGhepThan/GetFileHuyDangKyThan?id=${id}`,
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
            }
            return json;
        });
    return dt;
};

export const InPhieuHuyDKTangKhac = async (id) => {
    const dt = await fetch(
        `${Constant.PathServer}/api/DangKyChoGhepThan/GetFileHuyDangKyKhac?id=${id}`,
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
            }
            return json;
        });
    return dt;
};

export const GetDetailDto = async (id) => {
  const data = await fetch(
      `${Constant.PathServer}/api/DangKyChoGhepThan/GetDtoById?id=${id}`
  )
      .then((response) => response.json())
      .then((json) => {
          if (json.Status) {
              return json.Data;
          }
          return json;
      });
  return data;
};
export const InPhieuDKThan = async (id) => {
  const dt = await fetch(
      `${Constant.PathServer}/api/DangKyChoGhepThan/GetFileDangKyGThan?id=${id}`,
      {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json'
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
          }
          return json;
      });
  return dt;
};
export const InPhieuDKTangKhac = async (id) => {
  const dt = await fetch(
      `${Constant.PathServer}/api/DangKyChoGhepThan/GetFileDangKyGTangKhac?id=${id}`,
      {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json'
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
          }
          return json;
      });
  return dt;
};
export const EditNewEntityUser = async (obj) => {
    const data = await fetch(
        `${Constant.PathServer}/api/HienVaGhep/EditChoGhep`,
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