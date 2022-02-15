import * as Constant from "../Constant/GlobalConstant";

export const GetDMbyCodeNhom = async (CodeNhom) => {
  const data = await fetch(
    `${Constant.PathServer}/api/DMDulieuDanhmuc/GetDuLieuByCodeNhom?CodeNhom=${CodeNhom}`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(CodeNhom)
    }
  )
    .then((response) => response.json())
    .then((json) => {
      // if (json.Status) {
      //     toast.success('Cập nhật dữ liệu thành công');
      // } else {
      //     toast.error(json.MessageError);
      // }
      return json;
    });

  return data;
};
