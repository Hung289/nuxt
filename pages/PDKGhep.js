import React, { useState, useEffect, useRef } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { NotFoundImage } from "../Common/NotFound";
import {
    RenderDropdownTinh,
    RenderDropdownQuanhuyen,
    RenderDropdownXaphuong,
} from "../Common/LoadDiachi";
import * as dangKyChoGhepTangService from "../Lib/dangKyChoGhepTangService";
import LayoutClient from "../layouts/LayoutClient";
import Head from "next/head";
import * as Constant from "../Constant/GlobalConstant";
import { connect } from "react-redux";

import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "../Components/react-captcha/react-simple-captcha";
import { toast } from "react-toastify";
import * as CommonUtility from "../Common/CommonUtility";
import { RequestAuthClient } from "../Common/UtilRequest";
import {
    removeAscent,
    stringToDMY,
    canhbaoError,
} from "../Common/CommonUtility";
import * as DuLieuDanhMuc from "../Lib/duLieuDanhMucService";

import DsTinMoi from "../Components/HomeComponents/DsTinMoi";
import Link from "next/link";
import ReactLoading from "react-loading";

import {
    Form,
    Input,
    DatePicker,
    Space,
    Radio,
    Select,
    Row,
    Col,
    layout,
    Layout,
    Upload,
    Button,
    Checkbox,
    InputNumber,
} from "antd";
import moment from "moment";
const PDKGhep = (props) => {
    const formRef = useRef();
    const dataGiaDinh = useRef([]);
    const [IsDone, setIsDone] = useState({ state: false, data: {} });
    let FileSelected = useRef();
    let FileSelectedCMNDMT = useRef(null);
    let FileSelectedCMNDMs = useRef(null);
    const [isload, setisload] = useState(false);
    const [NgheNghiep, setNgheNghiep] = useState([]);
    const [NhomMau, setNhomMau] = useState([]);
    const [QHGD, setQHGD] = useState([]);
    const [FileDK, setFileDK] = useState([]);
    const [NhomMauRh, setNhomMauRh] = useState([]);

    const genders = ["Nam", "Nữ"];
    const honNhan = ["Độc thân", "Đã có gia đình"];
    const coKhong = ["Có", "Không"];
    const ctntVaoNgay = ["Chẵn", "Lẻ"];
    const viemGan = ["Viêm gan trước lọc", "Sau lọc máu"];
    const tienCanLaoPhoi = ["Không có tiền căn lao phổi", "Lao phổi"];
    const songCungDiaChi = ["Sống cùng địa chỉ", "Không cúng địa chỉ"];

    const [value1, setValue1] = useState(genders[0]);
    const [value2, setValue2] = useState(honNhan[0]);
    const [singTT, setSinhTT] = useState(coKhong[0]);
    const [tpbm, setTpbm] = useState(coKhong[0]);
    const [vaoNgay, setVaoNgay] = useState(ctntVaoNgay[0]);
    const [truyenMau, setTruyenMau] = useState(coKhong[0]);
    const [viemGanTS, setViemGanTS] = useState(viemGan[0]);
    const [tclp, setTCLP] = useState(tienCanLaoPhoi[0]);
    const [daiThaoDuong, setDaiThaoDuong] = useState(coKhong[0]);
    const [tangHuyetAp, setTangHuyetAp] = useState(coKhong[0]);
    const [phauThuatTienCan, setPhauThuatTienCan] = useState(coKhong[0]);
    const [thoiQuenUongRuou, setThoiQuenUongRuou] = useState(coKhong[0]);
    const [thoiQuenHutThuoc, setThoiQuenHutThuoc] = useState(coKhong[0]);
    const [biBenhThan, setBiBenhThan] = useState(coKhong[0]);
    const [biBenhLao, setBiBenhLao] = useState(coKhong[0]);
    const [biDaiThaoDuong, setBiDaiThaoDuong] = useState(coKhong[0]);
    const [biTangHuyetAp, setBiTangHuyetAp] = useState(coKhong[0]);
    const [biUngthu, setBiUngThu] = useState(coKhong[0]);
    const [scdc, setScdc] = useState(songCungDiaChi[0]);
    const onChange1 = (e) => {
        setValue1(e.target.value);
    };
    const onChange2 = (e) => {
        setValue2(e.target.value);
    };
    const onChangeSinhThietThan = (e) => {
        setSinhTT(e.target.value);
    };
    const onChangeThamPhanBangMay = (e) => {
        setTpbm(e.target.value);
    };
    const onChangeVaoNgay = (e) => {
        setVaoNgay(e.target.value);
    };
    const onChangeTruyenMau = (e) => {
        setTruyenMau(e.target.value);
    };
    const onChangeViemGan = (e) => {
        setViemGanTS(e.target.value);
    };
    const onChangeTCLP = (e) => {
        setTCLP(e.target.value);
    };
    const onChangeDaiThaoDuong = (e) => {
        setDaiThaoDuong(e.target.value);
    };
    const onChangeTangHuyetAp = (e) => {
        setTangHuyetAp(e.target.value);
    };
    const onChangePhauThuatTienCan = (e) => {
        setPhauThuatTienCan(e.target.value);
    };
    const onChangeThoiQuenUongRuou = (e) => {
        setThoiQuenUongRuou(e.target.value);
    };
    const onChangeThoiQuenHutThuoc = (e) => {
        setThoiQuenHutThuoc(e.target.value);
    };
    const onChangeBiBenhThan = (e) => {
        setBiBenhThan(e.target.value);
    };
    const onChangeBiBenhLao = (e) => {
        setBiBenhLao(e.target.value);
    };
    const onChangeBiDaiThaoDuong = (e) => {
        setBiDaiThaoDuong(e.target.value);
    };
    const onChangeBiTangHuyetAp = (e) => {
        setBiTangHuyetAp(e.target.value);
    };
    const onChangeBiUngthu = (e) => {
        setBiUngThu(e.target.value);
    };
    const onChangeSongCungDiaChi = (e) => {
        setScdc(e.target.value);
    };

    const { user } = props;
    useEffect(() => {
        // lay du lieu tu token
        DuLieuDanhMuc.GetDMbyCodeNhom("nghenghiep").then((rs) => {
            if (rs.Status) {
                setNgheNghiep(rs.Data);
            }
        });
        DuLieuDanhMuc.GetDMbyCodeNhom("nhommau").then((rs) => {
            if (rs.Status) {
                setNhomMau(rs.Data);
            }
        });
        DuLieuDanhMuc.GetDMbyCodeNhom("nhommaurh").then((rs) => {
            if (rs.Status) {
                setNhomMauRh(rs.Data);
            }
        });
        DuLieuDanhMuc.GetDMbyCodeNhom("quanhegiadinh").then((rs) => {
            if (rs.Status) {
                setQHGD(rs.Data);
            }
        });
    }, []);
    const LoadFileDangKy = (id) => {
        dangKyChoGhepTangService.LoadFileThanDK(id).then((rs) => {
            if (rs.Status) {
                setFileDK(rs.Data);
            }
        });
    };
    const DropDMNgheNghiep = () => {
        return NgheNghiep.map((item) => {
            return (
                <option value={item.Code} key={item.Code}>
                    {item.Name}
                </option>
            );
        });
    };
    const DropDMNhomMau = () => {
        return NhomMau.map((item) => {
            return (
                <option value={item.Code} key={item.Code}>
                    {item.Name}
                </option>
            );
        });
    };
    const DropDMNhomMauRh = () => {
        return NhomMauRh.map((item) => {
            return (
                <option value={item.Code} key={item.Code}>
                    {item.Name}
                </option>
            );
        });
    };
    const DropDMQHGD = () => {
        return QHGD.map((item) => {
            return (
                <option value={item.Code} key={item.Code}>
                    {item.Name}
                </option>
            );
        });
    };
    async function ChangeFileUpload(event) {
        // eslint-disable-next-line prefer-destructuring
        const Arr = event.target.files;
        const dataOfFile = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (eventda) => {
                resolve(eventda.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            if (Arr[0] !== undefined) {
                reader.readAsDataURL(Arr[0]);
            }
        });
        if (Arr[0] !== undefined) {
            FileSelected = {
                fileName: Arr[0].name,
                size: Arr[0].size,
                type: Arr[0].type,
                data: await dataOfFile.then((rs) => rs),
            };
            const image = document.getElementById("Avatar");
            image.src = URL.createObjectURL(event.target.files[0]);
        } else {
            const image = document.getElementById("Avatar");
            image.src =
                "https://cidrapbusiness.org/wp-content/uploads/2017/10/noimage.gif";
            FileSelected = { current: null };
        }
    }
    async function ChangeFileUploadCMNDMT(event) {
        // eslint-disable-next-line prefer-destructuring
        const Arr = event.target.files;
        const dataOfFile = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (eventda) => {
                resolve(eventda.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            if (Arr[0] !== undefined) {
                reader.readAsDataURL(Arr[0]);
            }
        });
        if (Arr[0] !== undefined) {
            FileSelectedCMNDMT = {
                fileName: Arr[0].name,
                size: Arr[0].size,
                type: Arr[0].type,
                data: await dataOfFile.then((rs) => rs),
            };
            const image = document.getElementById("ImgCMNDBNMatTruoc");
            image.src = URL.createObjectURL(event.target.files[0]);
        } else {
            const image = document.getElementById("ImgCMNDBNMatTruoc");
            image.src = "";
            FileSelectedCMNDMT = { current: null };
        }
    }
    async function ChangeFileUploadCMNDMs(event) {
        // eslint-disable-next-line prefer-destructuring
        const Arr = event.target.files;
        const dataOfFile = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (eventda) => {
                resolve(eventda.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            if (Arr[0] !== undefined) {
                reader.readAsDataURL(Arr[0]);
            }
        });
        if (Arr[0] !== undefined) {
            FileSelectedCMNDMs = {
                fileName: Arr[0].name,
                size: Arr[0].size,
                type: Arr[0].type,
                data: await dataOfFile.then((rs) => rs),
            };
            const image = document.getElementById("ImgCMNDBNMatSau");
            image.src = URL.createObjectURL(event.target.files[0]);
        } else {
            const image = document.getElementById("ImgCMNDBNMatSau");
            image.src = "";
            FileSelectedCMNDMs = { current: null };
        }
    }

    const KhongBiViemGanCheck = () => {
        const isChecked = $("#KhongBiViemGan").prop("checked");
        if (isChecked === true) {
            $("#ViemGanSieuViA").prop("checked", false);
            $("#ViemGanSieuViB").prop("checked", false);
            $("#ViemGanSieuViC").prop("checked", false);
            $("#TruocHoacSauLocMau").prop("checked", null);
        }
    };
    const KhongBiNhiemCheck = () => {
        const isChecked = $("#NhiemCovid").prop("checked");
        if (isChecked === true) {
            $("#BiTruocTiem").prop("checked", false);
            $("#BiSauTiem").prop("checked", false);
            $("#CoTrieuChung").prop("checked", false);
            $("#TrieuChungNhe").prop("checked", null);
            $("#TrieuChungtrungBinh").prop("checked", null);
            $("#NhapVien").prop("checked", null);
            $("#ThoMay").prop("checked", null);
            $("#ThoHFNC").prop("checked", null);
        }
    };

    const RenderQuanHeGiaDinh = () => {
        const [lstAnhChiEm, setLstAnhChiEm] = useState([{}]);
        const handleChange = (event, id) => {
            const { name } = event.target;
            const newItem = [...lstAnhChiEm];
            newItem[id] = { ...newItem[id], [name]: event.target.value };
            setLstAnhChiEm(newItem);
            dataGiaDinh.current = lstAnhChiEm;
        };

        const DeleteItem = (ind) => {
            const newItem = [...lstAnhChiEm];
            newItem.splice(ind, 1);
            setLstAnhChiEm(newItem);
            dataGiaDinh.current = lstAnhChiEm;
            toast.info("Xóa thành công");
        };

        return (
            <div style={{ width: "100%" }}>
                <Row>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            const NewItem = [...lstAnhChiEm, {}];

                            setLstAnhChiEm(NewItem);
                        }}
                    >
                        <i className="fas fa-plus" /> Thêm thông tin quan hệ gia
                        đình
                    </Button>
                </Row>
                {lstAnhChiEm.map((item, key) => {
                    return (
                        <Row key={key}>
                            <Col
                                lg={{ span: 22 }}
                                md={{ span: 24 }}
                                sm={{ span: 24 }}
                                xs={{ span: 24 }}
                            >
                                <Row gutter={[10, 5]} key={key}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Họ và tên"
                                            className="my-label"
                                            name="hoTenNguoiThan"
                                        >
                                            <Input
                                                name="hoTenNguoiThan"
                                                onChange={(event) =>
                                                    handleChange(event, key)
                                                }
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Quan hệ"
                                            name="quanHeNguoiThan"
                                        >
                                            <Select
                                                defaultValue=""
                                                name="quanHeNguoiThan"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {DropDMQHGD()}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}>
                                        <Form.Item
                                            className="my-label"
                                            label="Sinh Năm"
                                            name="namSinhNguoiThan"
                                        >
                                            <InputNumber name="namSinhNguoiThan" min={1970} max={2022}/>
                                        </Form.Item>
                                    </Col>

                                    <Col lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}>
                                        <Form.Item className="my-label"
                                            label="Nhóm máu"
                                            name="namSinhNguoiThan">

                                        </Form.Item>
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        // <div className="row" key={key}>
                        //     <div className="col-md-11 col-sm-11">
                        //         <div className="row" key={key}>
                        //             <div className="form-group col-md-6 col-sm-6">
                        //                 <label htmlFor="hoTenNguoiThan">
                        //                     Họ và tên
                        //                 </label>
                        //                 <Field
                        //                     name="hoTenNguoiThan"
                        //                     key="hoTenNguoiThan"
                        //                     value={item.HoTenNguoiThan}
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 />
                        //             </div>
                        //             <div className="form-group col-md-2 col-sm-2">
                        //                 <label htmlFor="quanHeNguoiThan">
                        //                     Quan hệ
                        //                 </label>
                        //                 <Field
                        //                     as="select"
                        //                     name="quanHeNguoiThan"
                        //                     key="quanHeNguoiThan"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 >
                        //                     <option value="">--Chọn--</option>
                        //                     <DropDMQHGD />
                        //                 </Field>
                        //             </div>
                        //             <div className="form-group col-md-2 col-sm-2">
                        //                 <label htmlFor="namSinhNguoiThan">
                        //                     Sinh năm
                        //                 </label>
                        //                 <Field
                        //                     type="number"
                        //                     name="namSinhNguoiThan"
                        //                     key="namSinhNguoiThan"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 />
                        //             </div>
                        //             <div className="form-group col-md-2 col-sm-2">
                        //                 <label htmlFor="nhomMauNguoiThan">
                        //                     Nhóm máu
                        //                 </label>

                        //                 <Field
                        //                     as="select"
                        //                     name="nhomMauNguoiThan"
                        //                     key="nhomMauNguoiThan"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 >
                        //                     <option>--Chọn--</option>
                        //                     <DropDMNhomMau />
                        //                 </Field>
                        //             </div>
                        //         </div>
                        //         <div className="row" key={key}>
                        //             <div className="form-group col-md-2 col-sm-2">
                        //                 <label htmlFor="trinhDoVHNguoiThan">
                        //                     Trình độ văn hóa
                        //                 </label>

                        //                 <Field
                        //                     name="trinhDoVHNguoiThan"
                        //                     key="trinhDoVHNguoiThan"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 />
                        //             </div>
                        //             <div className="form-group col-md-4 col-sm-4">
                        //                 <label htmlFor="diaChiThuongTruNguoiThan">
                        //                     Địa chỉ thường trú
                        //                 </label>
                        //                 <Field
                        //                     name="diaChiThuongTruNguoiThan"
                        //                     key="diaChiThuongTruNguoiThan"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 />
                        //             </div>
                        //             <div className="form-group col-md-2 col-sm-2">
                        //                 <label htmlFor="dienThoaiNguoiThan">
                        //                     Số điện thoại
                        //                 </label>
                        //                 <Field
                        //                     type="tel"
                        //                     name="dienThoaiNguoiThan"
                        //                     key="dienThoaiNguoiThan"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 />
                        //             </div>
                        //             <div className="form-group col-md-4 col-sm-4">
                        //                 <label htmlFor="LyDoKhongHien">
                        //                     Lý do không hiến được
                        //                 </label>
                        //                 <Field
                        //                     name="LyDoKhongHien"
                        //                     key="LyDoKhongHien"
                        //                     className="form-control "
                        //                     onChange={(event) =>
                        //                         handleChange(event, key)
                        //                     }
                        //                 />
                        //             </div>
                        //         </div>
                        //     </div>
                        //     <div className="col-md-1 col-sm-1">
                        //         <div> </div>
                        //         <div>
                        //             <label htmlFor="a">Xóa</label>
                        //             <div>
                        //                 <Button
                        //                     type="danger"
                        //                     onClick={() => DeleteItem(key)}
                        //                 >
                        //                     <i className="fas fa-times" />
                        //                 </Button>
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
                    );
                })}
            </div>
        );
    };
    function Ketquaghep() {
        return (
            <div style={{ padding: "10px", margin: "0 auto" }}>
                <embed src={FileDK.PathPDF} width="100%" height="500px" />
            </div>
        );
    }
    const RenderKetQuaGhep = () => {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="pdk-hien-tieude">
                        <div className="headerClientPage">
                            {IsDone.data.HoTenBN} GỬI ĐƠN ĐĂNG KÝ CHỜ GHÉP THẬN
                            THÀNH CÔNG
                        </div>
                    </div>
                    <div>
                        <div className="Bold14">
                            Tổ phụ trách: Tiếp nhận chờ ghép thận
                        </div>
                        <div className="paddingleft10">
                            <div>Kính gởi: {IsDone.data.HoTenBN}</div>
                            <div>Chúng tôi xin trân trọng thông tin đến</div>
                            <div>
                                Ông/Bà: {IsDone.data.HoTenBN}. sinh ngày:{" "}
                                {CommonUtility.ShowDateVN(IsDone.data.NgaySinh)}
                            </div>
                            <div>
                                Địa chỉ thường trú:{" "}
                                {IsDone.data.DiaChiThuongChu},{" "}
                                {IsDone.data.TenXa}, {IsDone.data.TenHuyen},{" "}
                                {IsDone.data.TenTinh}
                            </div>
                            <div>
                                Chúng tôi đã nhận được thông tin đăng ký của
                                Ông/Bà vào ngày:{" "}
                                {CommonUtility.ShowDateVN(
                                    IsDone.data.CreatedDate
                                )}
                            </div>
                            <div>
                                Hiện tại chúng tôi đang xử lý sẽ thông báo lại
                                kết quả với Ông/bà trong thời gian sớm nhất
                            </div>
                            <div>Trân trọng./.</div>
                            <div className="alert alert-warning">
                                <div>
                                    Để hoàn tất quy trình đăng ký vui lòng tải
                                    xuống đơn đăng ký sau đó ký xác nhận và gửi
                                    tới địa chỉ như sau:
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                            <b>
                                                ĐƠN VỊ ĐIỀU PHỐI GHÉP CÁC BỘ
                                                PHẬN CƠ THỂ NGƯỜI BỆNH VIỆN CHỢ
                                                RẪY
                                            </b>
                                        </li>
                                        <li>
                                            Địa chỉ: 201B Nguyễn Chí Thanh,
                                            Phường 12, Quận 5, Hồ Chí Minh, Việt
                                            Nam
                                        </li>
                                        <li>
                                            Điện thoại trong giờ hành chính:
                                            (84-028) 38554137 – 1184 hay
                                            (84-028) 39560139 | Fax: (84-028)
                                            39560139
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pdk-hien-tieude">XEM LẠI ĐƠN ĐĂNG KÝ</div>

                    <div className="center">
                        <Ketquaghep />
                        <Button className="mgb15" variant="primary" size="sm">
                            <a
                                className="White"
                                href={`${Constant.PathServer}/${FileDK.PathWord}`}
                                download
                            >
                                <i className="fas fa-download" />
                                Tải xuống đơn đăng ký
                            </a>
                        </Button>{" "}
                        {/* <Button variant="primary" size="sm" onClick={() => {}}>
                            Cập nhật thông tin
                        </Button>{' '} */}
                    </div>
                </div>
            </div>
        );
    };
    const SaveDataNew = (ObjSave) => {
        RequestAuthClient(
            `${Constant.PathServer}/api/DangKyChoGhepThan/Create`,
            "POST",
            ObjSave
        ).then((json) => {
            if (json.Status) {
                toast.success("Đăng ký thành công");
                setIsDone({
                    state: true,
                    data: json.Data,
                });
                LoadFileDangKy(json.Data.Id);
            } else {
                toast.error(json.MessageError);
            }
            setisload(false);
        });
    };
    const RenderFormGhep = () => {
        const [loaddiachi, setloaddiachi] = useState({
            tinh: user.userDto.TINH !== undefined ? user.userDto.TINH : "",
            quanhuyen:
                user.userDto.QUANHUYEN !== undefined
                    ? user.userDto.QUANHUYEN
                    : "",
            tinhtt: "",
            quanhuyentt: "",
        });
        function onchangeloaddiachi(name, value) {
            if (name === "tinh") {
                setloaddiachi({ ...loaddiachi, tinh: value, quanhuyen: "" });
            } else if (name === "quanhuyen") {
                setloaddiachi({ ...loaddiachi, quanhuyen: value });
            } else if (name === "tinhtt") {
                setloaddiachi({
                    ...loaddiachi,
                    tinhtt: value,
                    quanhuyentt: "",
                });
            } else if (name === "quanhuyentt") {
                setloaddiachi({ ...loaddiachi, quanhuyentt: value });
            }
        }
        useEffect(() => {
            loadCaptchaEnginge(6);
            document.getElementById("reload_href").text = "Đổi mã";

            if (user.userDto.TINH !== undefined) {
                if (user.userDto.QUANHUYEN !== undefined) {
                    setloaddiachi({
                        ...loaddiachi,
                        tinh: user.userDto.TINH,
                        quanhuyen: user.userDto.QUANHUYEN,
                    });
                } else {
                    setloaddiachi({ ...loaddiachi, tinh: user.userDto.TINH });
                }
            }
        }, []);
        return (
            <Row justify="space-between" className="fdkhien">
                <Col lg={{ span: 17 }} md={{ span: 17 }} sm={{ span: 24 }}>
                    <div className="pdk-hien-tieude">
                        <div className="headerClientPage">
                            ĐƠN ĐĂNG KÝ CHỜ GHÉP THẬN
                        </div>
                    </div>

                    <Row>
                        <Col span={24}>
                            <Form
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                layout="vertical"
                                initialValues={{
                                    hoTenBN:
                                        user.userDto.HO !== undefined
                                            ? `${user.userDto.HO} ${user.userDto.TEN}`
                                            : "",
                                    tinh:
                                        user.userDto.TINH !== undefined
                                            ? user.userDto.TINH
                                            : "",
                                    xaphuong:
                                        user.userDto.XAPHUONG !== undefined
                                            ? user.userDto.XAPHUONG
                                            : "",
                                    quanhuyen:
                                        user.userDto.QUANHUYEN !== undefined
                                            ? user.userDto.QUANHUYEN
                                            : "",
                                    tinhtt: "",
                                    xaphuongtt: "",
                                    quanhuyentt: "",
                                    gioiTinh:
                                        user.userDto.GIOITINH !== undefined
                                            ? String(user.userDto.GIOITINH)
                                            : String(0),
                                    ngaySinh:
                                        user.userDto.NGAYSINH !== undefined
                                            ? moment(user.userDto.NGAYSINH)
                                            : "",
                                    nhomMau: "",
                                    nhomMau1: "",
                                    baoHiemYTe: "",
                                    CMNDBN: "",
                                    NgayCapCMNDBN: "",
                                    NoiCapCMNDBN: "",
                                    ngheNghiep: "",
                                    ngheNhiepBoSung: "",
                                    trinhDoVanHoa: "",
                                    dienThoai:
                                        user.userDto.DIENTHOAI !== undefined
                                            ? user.userDto.DIENTHOAI
                                            : "",
                                    dienThoai1: "",
                                    diaChiThuongChu:
                                        user.userDto.DIACHI !== undefined
                                            ? user.userDto.DIACHI
                                            : "",
                                    diaChiTamChu: "",
                                    laConThuMay: "",
                                    tinhTrangHonNhan: String(0),
                                    hoTenVoChong: "",
                                    dienThoaiVoChong: "",
                                    coMayCon: "",
                                    soConTrai: "",
                                    soConGai: "",
                                    lonNhatSinhNam: "",
                                    nhoNhatSinhNam: "",
                                    tienCanGiaDinh: "",
                                    tienCanBanThan: "",
                                    nguyenNhanSuyThan: "",
                                    chuanDoanSuyThanGhep: "",
                                    benhSu: "",
                                    thuocTriViemGan: "",
                                    sinhThietThan: String(0),
                                    ketQuaSinhThietThan: "",
                                    ngayPhatHienSuyThan: "",
                                    ngayCTNTHoacKhamThamPhanBenhLy: "",
                                    dieuTriViemGanTu: "",
                                    CTNTVaoNgay: String(0),
                                    soGioTrenLan: "",
                                    soLanCTNTTuan: "",
                                    chuKyThamPhan: "",
                                    chuKyThamPhanTaiBV: "",
                                    thamPhanBangMay: String(0),
                                    thamPhanBangMayTaiBV: "",
                                    truyenMau: String(0),
                                    baoNhieuDonViMau: "",
                                    thang: "",
                                    nam: "",
                                    benhVienTruyenMau: "",
                                    daGhepLan1Ngay: "",
                                    daGhepLan1TaiBV: "",
                                    nguoiChoThan: "",
                                    ngayChayThanTroLai: "",
                                    chayThanTroLaiTaiBV: "",
                                    ctntHoacKhamThamPhan: "",
                                    ctntVaoNgayThuMay: "",
                                    caCTNT: "",
                                    chieuCao: "",
                                    canNang: "",
                                    nuocTieu24h: String(0),
                                    soLuongNuocTieu24h: "",
                                    thuocDangSuDungNgay: "",
                                    thoiGianBiTangHuyetAp: "",
                                    thuocTaoMau: "",
                                    bacSiDieuTri: "",
                                    dienThoaiBacSi: "",
                                    khongBiViemGan: false,
                                    viemGanSieuViA: false,
                                    viemGanSieuViB: false,
                                    viemGanSieuViC: false,
                                    truocHoacSauLocMau: 0,
                                    tangHuyetAp: String(0),
                                    daiThaoDuong: String(0),
                                    thoiGianBiDaiThaoDuong: "",
                                    thuocDieuTriDaiThaoDuong: "",
                                    tinhTrang: "",
                                    laoPhoi: String(0),
                                    hutThuoc: String(0),
                                    dieuTrenNgay: "",
                                    uongRuouBia: String(0),
                                    soLanTuan: "",
                                    soLuongLan: "",
                                    benhKhac: "",
                                    laoCoQuanKhac: "",
                                    thoiGianBiLao: "",
                                    thoiGianDieuTriAndNoiDieuTri: "",
                                    namPhatHien: "",
                                    dieuTriTaiBV: "",
                                    thoiGianDieuTri: "",
                                    thuocDieuTri: "",
                                    daPhauThuat: String(0),
                                    coPhauThuat: "",
                                    tinhTrangHienTai: "",
                                    ngayThangPhauThuat: "",
                                    benhVienPhauThuat: "",
                                    biBenhThan: 0,
                                    biBenhLao: 0,
                                    biDaiThaoDuong: 0,
                                    biTangHuyetAp: 0,
                                    biUngThu: 0,
                                    songCungDiaChi: 0,
                                    biBenhKhac: "",
                                    nguoiThanBiBenh: "",
                                    thuNhapBenhNhan: "",
                                    tinhTrangBenhNguoiThanHienTai: "",
                                    thuNhapVoChongBenhNhan: "",
                                    ngheNghiepVoChong: "",
                                    thuNhapKhac: "",
                                    tienChuanBiChoViecGhepThan: "",
                                    khongCoNguoiNhan: false,
                                    nguoiChoBiBenh: false,
                                    nguoiChoKhongHoaHopMau: false,
                                    lyDoKhac: "",
                                    email: "",
                                    NhiemCovid: false,
                                    BiTruocTiem: false,
                                    BiSauTiem: false,
                                    CoTrieuChung: false,
                                    TrieuChungNhe: false,
                                    TrieuChungtrungBinh: false,
                                    NhapVien: false,
                                    ThoiGianNamVien: 0,
                                    ThoMay: false,
                                    ThoHFNC: false,
                                    TiemVaccine: "",
                                    NgayTiemMui1: "",
                                    NgayTiemMui2: "",
                                    PhanUng: "",
                                    TiemVaccine2: "",
                                    PhanUng2: "",
                                    NgayTiemMui3: "",
                                    TiemVaccine3: "",
                                    PhanUng3: "",
                                }}
                            >
                                <Row>
                                    <div className="solama">I. HÀNH CHÍNH:</div>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Họ và tên"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            name="hoTenBN"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="hoTen" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Giới tính"
                                            name="gioiTinh"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={genders}
                                                onChange={onChange1}
                                                value={value1}
                                                name="gioiTinh"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ảnh thẻ"
                                        >
                                            <Input
                                                type="file"
                                                name="ImageSrc"
                                                key="ImageSrc"
                                                className="form-control img-padding"
                                                onChange={ChangeFileUpload}
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <img id="Avatar" alt="" />
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ngày sinh"
                                            rules={[
                                                {
                                                    type: "object",
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                                () => ({
                                                    validator(_, val) {
                                                        if (
                                                            new Date() <
                                                            new Date(val)
                                                        ) {
                                                            return Promise.reject(
                                                                "Ngày sinh vượt quá ngày hiện tại"
                                                            );
                                                        }

                                                        if (
                                                            new Date(
                                                                "1920-1-1"
                                                            ) > new Date(val)
                                                        ) {
                                                            return Promise.reject(
                                                                "Ngày sinh phải sau ngày 1 tháng 1 năm 1920"
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="ngaySinh"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="ngaySinh"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nhóm máu ABO"
                                            name="nhomMau"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="nhomMau"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {DropDMNhomMau()}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nhóm máu Rh"
                                            name="nhomMau1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="nhomMau1"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {DropDMNhomMauRh()}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Bảo hiểm y tế"
                                            name="baoHiemYTe"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="baoHiemYTe" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="CMND/CCCD/Hộ chiếu"
                                            name="CMNDBN"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="CMNDBN" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ngày cấp"
                                            rules={[
                                                {
                                                    type: "object",
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                                () => ({
                                                    validator(_, val) {
                                                        if (
                                                            new Date() <
                                                            new Date(val)
                                                        ) {
                                                            return Promise.reject(
                                                                "Ngày cấp vượt quá ngày hiện tại"
                                                            );
                                                        }

                                                        if (
                                                            new Date(
                                                                "1920-1-1"
                                                            ) > new Date(val)
                                                        ) {
                                                            return Promise.reject(
                                                                "Ngày cấp phải sau ngày 1 tháng 1 năm 1920"
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="NgayCapCMNDBN"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="NgayCapCMNDBN"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nơi cấp"
                                            name="NoiCapCMNDBN"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="NoiCapCMNDBN" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ảnh CMND/CCCD mặt trước"
                                        >
                                            <Input
                                                type="file"
                                                name="ImgCMNDBNMatTruoc"
                                                key="ImgCMNDBNMatTruoc"
                                                className="form-control img-padding"
                                                onChange={
                                                    ChangeFileUploadCMNDMT
                                                }
                                            ></Input>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ảnh CMND/CCCD mặt sau"
                                        >
                                            <Input
                                                type="file"
                                                name="ImgCMNDBNMatSau"
                                                key="ImgCMNDBNMatSau"
                                                className="form-control img-padding"
                                                onChange={
                                                    ChangeFileUploadCMNDMs
                                                }
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <img
                                            className="imgCMND"
                                            id="ImgCMNDBNMatTruoc"
                                            alt=""
                                        />
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <img
                                            className="imgCMND"
                                            id="ImgCMNDBNMatSau"
                                            alt=""
                                            onError={NotFoundImage}
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nghề nghiệp"
                                            name="ngheNghiep"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="ngheNghiep"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {DropDMNgheNghiep()}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nghề nghiệp bổ xung"
                                            name="ngheNghiepBoSung"
                                        >
                                            <Input name="ngheNghiepBoXung" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Trình độ văn hóa"
                                            name="trinhDoVanHoa"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="trinhDoVanHoa" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Điện thoại"
                                            name="dienThoai"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="dienThoai" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Điện thoại khác"
                                            name="dienThoai1"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="dienThoai1" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="email" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <label className="my-label">
                                    Địa chỉ thường chú:
                                </label>

                                <Row
                                    className="form-diachithuongchu"
                                    gutter={[10, 5]}
                                >
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Tỉnh/Thành Phố"
                                            name="tinh"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="tinh"
                                                onChange={(value) => {
                                                    onchangeloaddiachi(
                                                        "tinh",
                                                        value
                                                    );
                                                }}
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>
                                                {RenderDropdownTinh({
                                                    code: "tinh",
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Quận/Huyện"
                                            name="quanhuyen"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="quanhuyen"
                                                onChange={(value) => {
                                                    onchangeloaddiachi(
                                                        "quanhuyen",
                                                        value
                                                    );
                                                }}
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {RenderDropdownQuanhuyen({
                                                    code: "quanhuyen",
                                                    data: loaddiachi.tinh,
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Xã/Phường"
                                            name="xaphuong"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="xaphuong"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {RenderDropdownXaphuong({
                                                    code: "xaphuong",
                                                    data: loaddiachi.quanhuyen,
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            className="my-label"
                                            label="Số nhà, phố, tổ dân phố /thôn / đội"
                                            name="diaChiThuongChu"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="diaChiThuongChu" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <label className="my-label">
                                    Địa chỉ tạm chú:
                                </label>

                                <Row
                                    className="form-diachithuongchu"
                                    gutter={[10, 5]}
                                >
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Tỉnh/Thành Phố"
                                            name="tinhtt"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="tinhtt"
                                                onChange={(value) => {
                                                    onchangeloaddiachi(
                                                        "tinhtt",
                                                        value
                                                    );
                                                }}
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>
                                                {RenderDropdownTinh({
                                                    code: "tinhtt",
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Quận/Huyện"
                                            name="quanhuyentt"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="quanhuyentt"
                                                onChange={(value) => {
                                                    onchangeloaddiachi(
                                                        "quanhuyentt",
                                                        value
                                                    );
                                                }}
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {RenderDropdownQuanhuyen({
                                                    code: "quanhuyentt",
                                                    data: loaddiachi.tinhtt,
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 8 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Xã/Phường"
                                            name="xaphuongtt"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Select
                                                defaultValue=""
                                                name="xaphuongtt"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {RenderDropdownXaphuong({
                                                    code: "xaphuongtt",
                                                    data: loaddiachi.quanhuyentt,
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            className="my-label"
                                            label="Số nhà, phố, tổ dân phố /thôn / đội"
                                            name="diaChiTamChu"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="diaChiTamChu" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Gia đình: là con thứ mấy?"
                                            name="laConThuMay"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input
                                                name="laConThuMay"
                                                placeholder="VD: là con thứ 1 trong gia đình 2 con viết là 1/2"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tình trạng hôn nhân"
                                            name="tinhTrangHonNhan"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={honNhan}
                                                onChange={onChange2}
                                                value={value2}
                                                name="tinhTrangHonNhan"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Họ tên Vợ/Chồng"
                                            name="hoTenVoChong"
                                        >
                                            <Input name="hoTenVoChong" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Điện thoại"
                                            name="dienThoaiVoChong"
                                        >
                                            <Input name="dienThoaiVoChong" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Có mấy con"
                                            name="coMayCon"
                                        >
                                            <InputNumber
                                                name="coMayCon"
                                                min={1}
                                                max={10}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Trai"
                                            name="soConTrai"
                                        >
                                            <InputNumber
                                                name="soConTrai"
                                                min={1}
                                                max={10}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Gái"
                                            name="soConGai"
                                            style={{ width: "100%" }}
                                        >
                                            <InputNumber
                                                name="soConGai"
                                                min={1}
                                                max={10}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Lớn nhất sinh năm"
                                            name="lonNhatSinhNam"
                                        >
                                            <InputNumber
                                                name="lonNhatSinhNam"
                                                min={1}
                                                max={10}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nhỏ nhất sinh năm"
                                            name="nhoNhatSinhNam"
                                        >
                                            <InputNumber
                                                name="nhoNhatSinhNam"
                                                min={1}
                                                max={10}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <div className="solama">
                                        II. TÌNH TRẠNG BỆNH LÝ:
                                    </div>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="1.Nguyên nhân dẫn đến suy thận mạn giai đoạn cuối"
                                            name="nguyenNhanSuyThan"
                                        >
                                            <Input name="nguyenNhanSuyThan" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="2.Chuẩn đoán về thận học trước đó: có sinh thiết thận"
                                            name="sinhThietThan"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeSinhThietThan}
                                                value={singTT}
                                                name="sinhThietThan"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Kết quả sinh thiết"
                                            name="ketQuaSinhThietThan"
                                        >
                                            <Input name="ketQuaSinhThietThan" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="3.Phát hiện suy thận"
                                            name="ngayPhatHienSuyThan"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="ngayPhatHienSuyThan"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Chạy thận nhân tạo/Thẩm phân phúc mạc từ"
                                            name="ngayCTNTHoacKhamThamPhanBenhLy"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="ngayCTNTHoacKhamThamPhanBenhLy"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Số lần chạy thận một tuần"
                                            name="soLanCTNTTuan"
                                        >
                                            <Input name="soLanCTNTTuan" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Vào ngày"
                                            name="CTNTVaoNgay"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={ctntVaoNgay}
                                                onChange={onChangeVaoNgay}
                                                value={vaoNgay}
                                                name="CTNTVaoNgay"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Số giờ một lần"
                                            name="soGioTrenLan"
                                        >
                                            <Input name="soGioTrenLan" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Chu kỳ thẩm phân phúc mạc(số lần/ngày)"
                                            name="chuKyThamPhan"
                                        >
                                            <InputNumber
                                                name="chuKyThamPhan"
                                                min={1}
                                                max={10}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tại bệnh viện"
                                            name="chuKyThamPhanTaiBV"
                                        >
                                            <Input name="chuKyThamPhanTaiBV" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thẩm phân phúc mạc bằng máy"
                                            name="thamPhanBangMay"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={
                                                    onChangeThamPhanBangMay
                                                }
                                                value={tpbm}
                                                name="thamPhanBangMay"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Bệnh viện theo dõi"
                                            name="thamPhanBangMayTaiBV"
                                        >
                                            <Input name="thamPhanBangMayTaiBV" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Truyền máu"
                                            name="truyenMau"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeTruyenMau}
                                                value={truyenMau}
                                                name="truyenMau"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Bao nhiêu đơn vị máu"
                                            name="baoNhieuDonViMau"
                                        >
                                            <Input name="baoNhieuDonViMau" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Truyền máu lần cuối"
                                            name="thang"
                                        >
                                            <Input
                                                name="thang"
                                                placeholder="vào tháng"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Năm"
                                            name="name"
                                        >
                                            <Input name="nam" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Truyền máu tại bệnh viện"
                                            name="benhVienTruyenMau"
                                        >
                                            <Input name="benhVienTruyenMau" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Đã ghép thận lần 1 vào ngày"
                                            name="daGhepLan1Ngay"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="daGhepLan1Ngay"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tại bệnh viện"
                                            name="daGhepLan1TaiBV"
                                        >
                                            <Input name="daGhepLan1TaiBV" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Người cho thận(Cha/mẹ/anh/chị/em?)"
                                            name="nguoiChoThan"
                                        >
                                            <Input name="nguoiChoThan" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ngày chạy thận nhân tạo trở lại"
                                            name="ngayChayThanTroLai"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="ngayChayThanTroLai"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Chuẩn đoán suy chức năng thận ghép"
                                            name="chuanDoanSuyThanGhep"
                                        >
                                            <Input name="chuanDoanSuyThanGhep" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ngày chạy thận nhân tạo/Thẩm phân phúc mạc"
                                            name="ctntHoacKhamThamPhan"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="ctntHoacKhamThamPhan"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tại bệnh viện"
                                            name="chayThanTroLaiTaiBV"
                                        >
                                            <Input name="chayThanTroLaiTaiBV" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Số lượng nước tiểu/24 giờ"
                                            className="my-label"
                                        ></Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 2 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <label>
                                            <input
                                                type="radio"
                                                checked
                                                name="nuocTieu24h"
                                                value="0"
                                            />
                                            <div>Không</div>
                                        </label>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <label>
                                            <input
                                                type="radio"
                                                name="nuocTieu24h"
                                                value="1"
                                            />
                                            &nbsp; Có(ml/24h)
                                        </label>

                                        <Input
                                            name="soLuongNuocTieu24h"
                                            placeholder="ml/24h"
                                        />
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Chiều cao(cm)"
                                            name="chieuCao"
                                        >
                                            <InputNumber
                                                name="chieuCao"
                                                min={1}
                                                max={300}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Cân nặng(kg)"
                                            name="canNang"
                                        >
                                            <InputNumber
                                                name="canNang"
                                                min={1}
                                                max={300}
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thuốc đang sử dụng/ngày"
                                            name="thuocDangSuDungNgay"
                                        >
                                            <Input.TextArea
                                                showCount
                                                maxLength={200}
                                                name="thuocDangSuDungNgay"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thuốc tạo máu"
                                            name="thuocTaoMau"
                                        >
                                            <Input name="thuocTaoMau" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Bác sĩ điều trị"
                                            name="bacSiDieuTri"
                                        >
                                            <Input name="bacSiDieuTri" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Điện thoại bác sĩ"
                                            name="dienThoaiBacSi"
                                        >
                                            <Input name="dienThoaiBacSi" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    className="my-label"
                                    label="4.Bệnh lý kèm theo"
                                    name="checkbox-group"
                                    style={{ margin: 0, padding: 0 }}
                                >
                                    <Checkbox.Group style={{ width: "100%" }}>
                                        <Row>
                                            <Col lg={{ span: 6 }}>
                                                <Checkbox
                                                    value="khongBiViemGan"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    Không bị viêm gan
                                                </Checkbox>
                                            </Col>
                                            <Col lg={{ span: 6 }}>
                                                <Checkbox
                                                    value="viemGanSieuViA"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    Viêm gan siêu vi A
                                                </Checkbox>
                                            </Col>
                                            <Col lg={{ span: 6 }}>
                                                <Checkbox
                                                    value="viemGanSieuViB"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    Viêm gan siêu vi B
                                                </Checkbox>
                                            </Col>
                                            <Col lg={{ span: 6 }}>
                                                <Checkbox
                                                    value="viemGanSieuViC"
                                                    style={{
                                                        lineHeight: "32px",
                                                    }}
                                                >
                                                    Viêm gan siêu vi C
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>

                                <Form.Item
                                    className="my-label"
                                    name="truocHoacSauLocMau"
                                    valuePropName="checked"
                                >
                                    <Radio.Group
                                        options={viemGan}
                                        onChange={onChangeViemGan}
                                        value={viemGanTS}
                                        name="truocHoacSauLocMau"
                                    />
                                </Form.Item>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Điều trị viêm gan từ lúc nào"
                                            name="dieuTriViemGanTu"
                                        >
                                            <Input name="dieuTriViemGanTu" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 16 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thuốc điều trị viêm gan"
                                            name="thuocTriViemGan"
                                        >
                                            <Input name="thuocTriViemGan" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="laoPhoi"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={tienCanLaoPhoi}
                                                onChange={onChangeTCLP}
                                                value={tclp}
                                                name="laoPhoi"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="laoCoQuanKhac"
                                            label="Lao các cơ quan khác"
                                        >
                                            <Input name="laoCoQuanKhac" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Từ lúc nào"
                                            name="thoiGianBiLao"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="thoiGianBiLao"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 16 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thời gian điều trị/Nơi điều trị"
                                            name="thoiGianDieuTriAndNoiDieuTri"
                                        >
                                            <Input name="thoiGianDieuTriAndNoiDieuTri" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Đái tháo đường"
                                            name="daiThaoDuong"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeDaiThaoDuong}
                                                value={daiThaoDuong}
                                                name="daiThaoDuong"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Từ lúc nào"
                                            name="thoiGianBiDaiThaoDuong"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="thoiGianBiDaiThaoDuong"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thuốc điều trị"
                                            name="thuocDieuTriDaiThaoDuong"
                                        >
                                            <Input name="thuocDieuTriDaiThaoDuong" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tăng huyết áp"
                                            name="daiThaoDuong"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeTangHuyetAp}
                                                value={tangHuyetAp}
                                                name="tangHuyetAp"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Từ lúc nào"
                                            name="thoiGianBiTangHuyetAp"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="thoiGianBiTangHuyetAp"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Thuốc điều trị"
                                            name="thuocDieuTri"
                                        >
                                            <Input name="thuocDieuTri" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Các bệnh khác"
                                            name="benhKhac"
                                        >
                                            <Input name="benhKhac" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tình hình hiện tại"
                                            name="tinhTrang"
                                        >
                                            <Input name="tinhTrang" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <label className="class-b">
                                        5.Tiền căn ngoại khoa
                                    </label>
                                </Row>
                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <label>
                                            Có phẫu thuật gì trước đó không
                                        </label>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="daPhauThuat"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={
                                                    onChangePhauThuatTienCan
                                                }
                                                value={phauThuatTienCan}
                                                name="daPhauThuat"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Ngày tháng năm phẫu thuật"
                                            name="ngayThangPhauThuat"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="ngayThangPhauThuat"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Phẫu thuật tại bệnh viện"
                                            name="benhVienPhauThuat"
                                        >
                                            <Input name="benhVienPhauThuat" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nếu có thì bệnh gì"
                                            name="coPhauThuat"
                                        >
                                            <Input name="coPhauThuat" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tình trạng hiện tại"
                                            name="tinhTrangHienTai"
                                        >
                                            <Input name="tinhTrangHienTai" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="uongRuouBia"
                                            label="6.Thói quen uống rượu"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={
                                                    onChangeThoiQuenUongRuou
                                                }
                                                value={thoiQuenUongRuou}
                                                name="uongRuouBia"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="soLanTuan"
                                            label="Số lần/Tuần"
                                        >
                                            <Input name="soLanTuan" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="soLanTuan"
                                            label="Số lượng trên tuần"
                                        >
                                            <Input
                                                name="soLanTuan"
                                                placeholder="lít/chai/lon/ly"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="hutThuoc"
                                            label="7.Thói quen hút thuốc"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={
                                                    onChangeThoiQuenHutThuoc
                                                }
                                                value={thoiQuenHutThuoc}
                                                name="hutThuoc"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="dieuTrenNgay"
                                            label="Số điếu trên ngày"
                                        >
                                            <InputNumber
                                                name="dieuTrenNgay"
                                                placeholder="Điếu/ngày"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <label
                                        className="class-b"
                                        style={{ marginBottom: "0px" }}
                                    >
                                        8. Tiền căn gia đình
                                    </label>
                                </Row>
                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="biBenhThan"
                                            label="Bệnh thận"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeBiBenhThan}
                                                value={biBenhThan}
                                                name="biBenhThan"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="biBenhLao"
                                            label="Bệnh lao"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeBiBenhLao}
                                                value={biBenhLao}
                                                name="biBenhLao"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="biDaiThaoDuong"
                                            label="Đái tháo đường"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={
                                                    onChangeBiDaiThaoDuong
                                                }
                                                value={biDaiThaoDuong}
                                                name="biDaiThaoDuong"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="biTangHuyetAp"
                                            label="Tăng huyết áp"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeBiTangHuyetAp}
                                                value={biTangHuyetAp}
                                                name="biTangHuyetAp"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 4 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="biUngThu"
                                            label="Ung thư"
                                        >
                                            <Radio.Group
                                                options={coKhong}
                                                onChange={onChangeBiUngthu}
                                                value={biUngthu}
                                                name="biUngThu"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Bênh khác"
                                            name="biBenhKhac"
                                            className="my-label"
                                        >
                                            <Input className="biBenhKhac" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="songCungDiaChi"
                                        >
                                            <Radio.Group
                                                options={songCungDiaChi}
                                                onChange={
                                                    onChangeSongCungDiaChi
                                                }
                                                value={scdc}
                                                name="songCungDiaChi"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Nếu có thì là ai"
                                            name="nguoiThanBiBenh"
                                        >
                                            <Input name="nguoiThanBiBenh" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            label="Tình trạng hiện tại"
                                            name="tinhTrangBenhNguoiThanHienTai"
                                        >
                                            <Input name="tinhTrangBenhNguoiThanHienTai" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <label
                                        className="class-b"
                                        style={{ marginBottom: "0px" }}
                                    >
                                        9. Tiền sử covid
                                    </label>
                                </Row>

                                <Row>
                                    <label
                                        className="class-b"
                                        style={{ marginBottom: "0px" }}
                                    >
                                        10. Tiêm vaccine ngừa covid
                                    </label>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="TiemVaccine"
                                            label="Tiêm vaccine ngừa covid mũi 1"
                                        >
                                            <Input name="TiemVaccine" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="NgayTiemMui1"
                                            label="Ngày tiêm mũi 1"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="NgayTiemMui1"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="PhanUng"
                                            label="Phản ứng sau tiêm lần 1"
                                        >
                                            <Input name="PhanUng" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="TiemVaccine2"
                                            label="Tiêm vaccine ngừa covid mũi 2"
                                        >
                                            <Input name="TiemVaccine2" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="NgayTiemMui2"
                                            label="Ngày tiêm mũi 2"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="NgayTiemMui2"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="PhanUng2"
                                            label="Phản ứng sau tiêm lần 2"
                                        >
                                            <Input name="PhanUng2" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="TiemVaccine3"
                                            label="Tiêm vaccine ngừa covid mũi 3"
                                        >
                                            <Input name="TiemVaccine3" />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="NgayTiemMui3"
                                            label="Ngày tiêm mũi 3"
                                        >
                                            <DatePicker
                                                format={"DD/MM/YYYY"}
                                                name="NgayTiemMui3"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="my-label"
                                            name="PhanUng3"
                                            label="Phản ứng sau tiêm lần 3"
                                        >
                                            <Input name="PhanUng3" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <div className="solama">III. Kinh tế</div>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Thu nhập của bệnh nhân"
                                            className="my-label"
                                            name="thuNhapBenhNhan"
                                        >
                                            <Input
                                                name="thuNhapBenhNhan"
                                                placeholder="vnd/tháng"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Thu nhập của vợ hoặc chồng"
                                            className="my-label"
                                            name="thuNhapVoChongBenhNhan"
                                        >
                                            <Input
                                                name="thuNhapVoChongBenhNhan"
                                                placeholder="vnd/tháng"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Nghề nghiệp"
                                            className="my-label"
                                            name="ngheNghiepVoChong"
                                        >
                                            <Input name="ngheNghiepVoChong" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Thu nhập khác"
                                            className="my-label"
                                            name="thuNhapKhac"
                                        >
                                            <Input
                                                name="thuNhapKhac"
                                                placeholder="vnd/tháng"
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            label="Tiền chuẩn bị cho việc ghép thận(có sẵn)"
                                            className="my-label"
                                            name="tienChuanBiChoViecGhepThan"
                                        >
                                            <Input
                                                name="tienChuanBiChoViecGhepThan"
                                                placeholder="vnd/tháng"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <div className="solama">
                                        IV. Lý do đăng ký chờ ghép thận từ người
                                        hiến chết não
                                    </div>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            name="khongCoNguoiNhan"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            <Checkbox id="khongCoNguoiNhan">
                                                Không có người hiến thận
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            name="nguoiChoBiBenh"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            <Checkbox id="nguoiChoBiBenh">
                                                Người hiến biị bệnh
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>

                                    <Col
                                        lg={{ span: 8 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            name="nguoiChoKhongHoaHopMau"
                                            style={{ marginBottom: "0px" }}
                                        >
                                            <Checkbox id="nguoiChoKhongHoaHopMau">
                                                Người hiến không hòa hợp nhóm
                                                máu
                                            </Checkbox>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            name="lyDoKhac"
                                            label="Lý do khác"
                                            className="my-label"
                                        >
                                            <Input name="lyDoKhac" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="solama">
                                        V. Quan hệ gia đình:
                                    </div>
                                </Row>
                                <Row>{<RenderQuanHeGiaDinh />}</Row>
                                <Row>
                                    <div className="solama">
                                        VI. Cam kết đăng ký chờ ghép thận từ
                                        người hiến chết não hay tim ngừng đập
                                    </div>
                                    <Col
                                        lg={{ span: 24 }}
                                        md={{ span: 24 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        Hiện tôi bị bệnh suy thận mạn giai đoạn
                                        cuối đang phải lọc máu định kỳ, có chỉ
                                        định ghép thận. Tôi đã được các bác sĩ
                                        phụ trách giải thích rõ về các bước thực
                                        hiện đánh giá tình trạng sức khỏe chung,
                                        thực hiện quá trình tuyển chọn, thời
                                        gian chờ đợi, tác dụng phụ của thuốc ức
                                        chế miễn dịch điều trị sau ghép thận,
                                        chi phí ghép thận, chuẩn bị môi trường
                                        và cách sinh hoạt sau khi được ghép
                                        thận….. Tôi xin được đăng ký vào danh
                                        sách chờ ghép thận từ người hiến chết
                                        não hay tim ngừng đập tại Bệnh viện Chợ
                                        Rẫy, tôi cam kết tuân thủ các quy định
                                        trong quá trình điều trị bệnh trước và
                                        sau ghép thận.
                                    </Col>
                                </Row>

                                <Row
                                    className="form-maxacnhan"
                                    gutter={[10, 5]}
                                >
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Nhập xác nhận"
                                            name="NhapMaXacNhan"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                            ]}
                                        >
                                            <Input name="NhapMaXacNhan" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Mã xác nhận"
                                        >
                                            <LoadCanvasTemplate />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item style={{ textAlign: "center" }}>
                                    <Button type="primary" htmlType="submit">
                                        Hoàn Thành
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 24 }}>
                    <div className="boxRightHeader">Tin mới</div>
                    <DsTinMoi />
                </Col>
            </Row>
        );
    };

    const ShowYeuCauDangNhap = () => {
        return (
            <div className="boxRequestLogin">
                <div className="TitleRequestLogin">
                    Để có thể đăng ký hiến, ghép mô tạng vui lòng thực hiện đăng
                    nhập hoặc thực hiện đăng ký tạo tài khoản mới theo liên kết
                    bên dưới.
                </div>
                <div className="center boxBtnLoginRequest">
                    <Link
                        href="/loginUser?backurl=pdkghep"
                        className="btn btn-primary btn-lg"
                    >
                        <a>
                            <i className="fas fa-sign-in-alt" /> Đăng nhập
                        </a>
                    </Link>
                    <Link href="/dangky" className="btn btn-success btn-lg">
                        <a>
                            <i className="fas fa-user-plus" /> Đăng ký
                        </a>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <>
            <>
                <Head>
                    <title>
                        Cổng đăng ký hiến và ghép mô tạng - Bệnh viện Chợ Rẫy
                    </title>
                    <meta
                        name="description"
                        content="Generated by create next app"
                    />
                    <meta
                        name="title"
                        content="Cổng đăng ký hiến và ghép tạng - Bệnh viện Chợ Rẫy"
                    />
                    <meta name="description" content="Hinet JSC" />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        href="/libs/fontawesome/css/all.css"
                        rel="stylesheet"
                    ></link>
                </Head>
            </>
            <div className="my-container">
                {isload ? (
                    <div className="coverLoader">
                        <ReactLoading
                            className="loaderItem"
                            type="bars"
                            color="#2980b9"
                            height="100px"
                            width="100px"
                        />
                    </div>
                ) : null}
                {user && user.Token ? (
                    <>
                        {IsDone.state ? (
                            <RenderKetQuaGhep />
                        ) : (
                            <RenderFormGhep />
                        )}
                    </>
                ) : (
                    <>
                        <ShowYeuCauDangNhap />
                    </>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});
PDKGhep.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default connect(mapStateToProps, null)(PDKGhep);
