import React, { useState, useEffect, useRef } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { NotFoundImage } from "../Common/NotFound";
import DsTinMoi from "../Components/HomeComponents/DsTinMoi";
import * as Constant from "../Constant/GlobalConstant";
import * as dangKyHienTangService from "../Lib/dangKyHienTangService";
import LayoutClient from "../layouts/LayoutClient";

import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "../Components/react-captcha/react-simple-captcha";
import { connect } from "react-redux";
import * as DiachiService from "../Lib/DiachiService";

import * as CommonUtility from "../Common/CommonUtility";

import { toast } from "react-toastify";
import * as Yup from "yup";
import * as DuLieuDanhMuc from "../Lib/duLieuDanhMucService";
import { RequestAuthClient } from "../Common/UtilRequest";
import Head from "next/head";
import {
    removeAscent,
    stringToDMY,
    canhbaoError,
} from "../Common/CommonUtility";
import {
    RenderDropdownTinh,
    RenderDropdownQuanhuyen,
    RenderDropdownXaphuong,
} from "../Common/LoadDiachi";
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
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";

const PDKHien = (props) => {
    console.log(props);
    const formRef = useRef();
    const [IsDone, setIsDone] = useState({ state: false, data: {} });
    let FileSelected = useRef();
    let FileSelectedCMNDMT = useRef(null);
    let FileSelectedCMNDMs = useRef(null);
    const { user } = props;
    const [isload, setisload] = useState(false);
    const [NgheNghiep, setNgheNghiep] = useState([]);
    const [DiNguyen, setDiNguyen] = useState([]);
    const [FileDK, setFileDK] = useState([]);

    const genders = ["Nam", "Nữ"];
    const [value1, setValue1] = useState(genders[0]);
    const onChange1 = (e) => {
        setValue1(e.target.value);
    };

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    useEffect(() => {
        DuLieuDanhMuc.GetDMbyCodeNhom("nghenghiep").then((rs) => {
            if (rs.Status) {
                setNgheNghiep(rs.Data);
            }
        });
        DuLieuDanhMuc.GetDMbyCodeNhom("dinguyen").then((rs) => {
            if (rs.Status) {
                setDiNguyen(rs.Data);
            }
        });
    }, []);

    const DropDMNgheNghiep = () => {
        return NgheNghiep.map((item) => {
            return (
                <Select.Option value={item.Code} key={item.Code}>
                    {item.Name}
                </Select.Option>
            );
        });
    };

    const DropDMDiNguyen = () => {
        return DiNguyen.map((item) => {
            return (
                <option value={item.Code} key={item.Code}>
                    {item.Name}
                </option>
            );
        });
    };

    const upload1 = {
        async onChange(info) {
            console.log(info);
            const Arr = info.fileList;
            console.log(Arr);
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
                image.src = URL.createObjectURL(info.fileList[0]);
            } else {
                const image = document.getElementById("Avatar");
                image.src =
                    "https://cidrapbusiness.org/wp-content/uploads/2017/10/noimage.gif";
                FileSelected = { current: null };
            }
        },
    };

    async function ChangeFileUpload(event) {
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

    const LoadFileDangKy = (id) => {
        dangKyHienTangService.LoadFileDK(id).then((rs) => {
            if (rs.Status) {
                setFileDK(rs.Data);
            }
        });
    };
    function Ketquaghep() {
        return (
            <div style={{ padding: "10px", margin: "0 auto" }}>
                <embed src={FileDK.PathPDF} width="100%" height="500px" />
            </div>
        );
    }

    const RenderKetQua = () => {
        return (
            <Row className="fdkhien">
                <Col span={24}>
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="pdk-hien-tieude">
                                <div className="headerClientPage">
                                    {IsDone.data.HoTen} GỬI ĐƠN TỰ NGUYỆN HIẾN
                                    MÔ, BỘ PHẬN CƠ THỂ Ở NGƯỜI SAU KHI CHẾT
                                    THÀNH CÔNG
                                </div>
                            </div>
                            <div>
                                <div className="Bold14">
                                    Tổ phụ trách: Tiếp nhận đăng ký hiến tạng
                                </div>
                                <div className="paddingleft10">
                                    <div>Kính gởi: {IsDone.data.HoTen}</div>
                                    <div>
                                        Chúng tôi xin trân trọng thông tin đến
                                    </div>
                                    <div>
                                        Ông/Bà: {IsDone.data.HoTen}. sinh ngày:{" "}
                                        {CommonUtility.ShowDateVN(
                                            IsDone.data.NgaySinh
                                        )}
                                    </div>
                                    <div>
                                        Địa chỉ thường trú: {IsDone.data.DiaChi}
                                        ,{IsDone.data.TenXa},
                                        {IsDone.data.TenHuyen},
                                        {IsDone.data.TenTinh}
                                    </div>
                                    <div>
                                        Chúng tôi đã nhận được thông tin đăng ký
                                        của Ông/Bà vào ngày:{" "}
                                        {CommonUtility.ShowDateVN(
                                            IsDone.data.CreatedDate
                                        )}
                                    </div>
                                    <div>
                                        Hiện tại chúng tôi đang xử lý sẽ thông
                                        báo lại kết quả với Ông/bà trong thời
                                        gian sớm nhất
                                    </div>

                                    <div>Trân trọng./.</div>
                                    <div className="alert alert-warning">
                                        <div>
                                            Để hoàn tất quy trình đăng ký vui
                                            lòng tải xuống đơn đăng ký sau đó ký
                                            xác nhận và gửi tới địa chỉ như sau:
                                        </div>
                                        <div>
                                            <ul>
                                                <li>
                                                    <b>
                                                        ĐƠN VỊ ĐIỀU PHỐI GHÉP
                                                        CÁC BỘ PHẬN CƠ THỂ NGƯỜI
                                                        BỆNH VIỆN CHỢ RẪY
                                                    </b>
                                                </li>
                                                <li>
                                                    Địa chỉ: 201B Nguyễn Chí
                                                    Thanh, Phường 12, Quận 5, Hồ
                                                    Chí Minh, Việt Nam
                                                </li>
                                                <li>
                                                    Điện thoại trong giờ hành
                                                    chính: (84-028) 38554137 –
                                                    1184 hay (84-028) 39560139 |
                                                    Fax: (84-028) 39560139
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pdk-hien-tieude">
                                XEM LẠI ĐƠN ĐĂNG KÝ
                            </div>

                            <div className="center">
                                <div>
                                    <Ketquaghep />
                                </div>
                                <Button
                                    className="mgb15"
                                    variant="primary"
                                    size="sm"
                                >
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
                </Col>
            </Row>
        );
    };

    const SaveDataNew = (ObjSave) => {
        RequestAuthClient(
            `${Constant.PathServer}/api/DangKyHien/Create`,
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
    const RenderForm = () => {
        const [loaddiachi, setloaddiachi] = useState({
            tinh: user.userDto.TINH !== undefined ? user.userDto.TINH : "",
            quanhuyen:
                user.userDto.QUANHUYEN !== undefined
                    ? user.userDto.QUANHUYEN
                    : "",
            xaphuong:
                user.userDto.XAPHUONG !== undefined
                    ? user.userDto.XAPHUONG
                    : "",
            tinhnhanthe: "",
            quanhuyennhanthe: "",
        });

        function onchangeloaddiachi(name, value) {
            if (name === "tinh") {
                setloaddiachi({ ...loaddiachi, tinh: value, quanhuyen: "" });
            } else if (name === "quanhuyen") {
                setloaddiachi({
                    ...loaddiachi,
                    quanhuyen: value,
                    xaphuong: "",
                });
            } else if (name === "xaphuong") {
                setloaddiachi({ ...loaddiachi, xaphuong: value });
            } else if (name === "tinhnhanthe") {
                setloaddiachi({
                    ...loaddiachi,
                    tinhnhanthe: value,
                    quanhuyennhanthe: "",
                });
            } else if (name === "quanhuyennhanthe") {
                setloaddiachi({ ...loaddiachi, quanhuyennhanthe: value });
            }
        }
        useEffect(() => {
            loadCaptchaEnginge(6);
            document.getElementById("reload_href").text = "Đổi mã";
        }, []);
        return (
            <Row justify="space-between" className="fdkhien">
                <Col lg={{ span: 17 }} md={{ span: 17 }} sm={{ span: 24 }}>
                    <div className="form-row boxNoteHeader">
                        <div className="border-camket">
                            <div className="tag-text">
                                Vì sự phát triển nền y học nước nhà, nhằm giup
                                đỡ những người không may mắc các bệnh hiểm nghèo
                                và với tinh thần nhân đạo chữa bệnh cứu người.
                                Sau khi được cán bộ y tế tư vấn, tôi xin tự
                                nguyện hiến mô, bộ phận cơ thể của mình sau khi
                                tôi qua đời mà mà không yêu cầu kèm theo bất cứ
                                một điều kiện nào.
                            </div>
                            <div className="tag-text">
                                Tôi đề nghị giữ (hoặc không giữ) bí mật danh
                                tính của tôi đối với người nhận.
                            </div>
                            <div className="tag-text">
                                Tôi viết đơn này trong trạng thái hoàn toàn minh
                                mẫn, tỉnh táo và xin chịu trách nhiệm trước pháp
                                luật về cam kết của mình.
                            </div>
                            <div className="tag-text">
                                Tôi xin chân thành cảm ơn.
                            </div>
                        </div>
                    </div>
                    <div className="pdk-hien-tieude">
                        <div className="headerClientPage">
                            ĐƠN TỰ NGUYỆN HIẾN MÔ, BỘ PHẬN CƠ THỂ Ở NGƯỜI SAU
                            KHI CHẾT
                        </div>
                    </div>

                    <Row>
                        <Col span={24}>
                            <Form
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                layout="vertical"
                                initialValues={{
                                    hoTen:
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
                                    gioiTinh:
                                        user.userDto.GIOITINH !== undefined
                                            ? String(user.userDto.GIOITINH)
                                            : String(0),
                                    ngaySinh:
                                        user.userDto.NGAYSINH !== undefined
                                            ? moment(user.userDto.NGAYSINH)
                                            : "",
                                    tinhnhanthe: "",
                                    xaphuongnhanthe: "",
                                    quanhuyennhanthe: "",
                                    soDienThoai:
                                        user.userDto.DIENTHOAI !== undefined
                                            ? user.userDto.DIENTHOAI
                                            : "",
                                    soDienThoai1: "",
                                    diaChi:
                                        user.userDto.DIACHI !== undefined
                                            ? user.userDto.DIACHI
                                            : "",
                                    diaChiNhanTheDangKy: "",
                                    ngheNghiep: "",
                                    ngheNhiepBoSung: "",
                                    noiCongTac: "",
                                    soCMND: "",
                                    ngayCap: "",
                                    noiCap: "",
                                    diNguyen: "",
                                    than: false,
                                    gan: false,
                                    tuyTang: false,
                                    tim: false,
                                    phoi: false,
                                    ruot: false,
                                    diNguyenKhac: "",
                                    da: false,
                                    giacMac: false,
                                    xuong: false,
                                    machMau: false,
                                    vanTim: false,
                                    chiThe: false,
                                    email: "",
                                    maso: null,
                                }}
                            >
                                <Row
                                    className="row-name-birthday-image"
                                    gutter={[10, 5]}
                                >
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
                                            name="hoTen"
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
                                        lg={{ span: 6 }}
                                        md={{ span: 16 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        {/* <Upload {...upload1}>
                                                <Button
                                                    icon={<UploadOutlined />}
                                                >
                                                    Click to Upload
                                                </Button>
                                            </Upload> */}

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
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
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
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Điện Thoại"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                                {
                                                    min: 2,
                                                    message:
                                                        "Vui lòng nhập ít nhất 10 kí tự",
                                                },
                                                {
                                                    max: 12,
                                                    message:
                                                        "Vui lòng nhập không quá 12 ký tự",
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, val) {
                                                        if (
                                                            /^[0-9]*$/.test(val)
                                                        ) {
                                                            return Promise.resolve();
                                                        }

                                                        if (val === undefined) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error(
                                                                `Số điện thoại chỉ được sử dụng chữ số`
                                                            )
                                                        );
                                                    },
                                                }),
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                            name="soDienThoai"
                                        >
                                            <Input name="soDienThoai" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Điện thoại khác"
                                            rules={[
                                                {
                                                    min: 2,
                                                    message:
                                                        "Vui lòng nhập ít nhất 10 kí tự",
                                                },
                                                {
                                                    max: 12,
                                                    message:
                                                        "Vui lòng nhập không quá 12 ký tự",
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, val) {
                                                        if (
                                                            /^[0-9]*$/.test(val)
                                                        ) {
                                                            return Promise.resolve();
                                                        }

                                                        if (val === undefined) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            new Error(
                                                                `Số điện thoại chỉ được sử dụng chữ số`
                                                            )
                                                        );
                                                    },
                                                }),
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                            name="soDienThoai1"
                                        >
                                            <Input name="soDienThoai1" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                                {
                                                    type: "email",
                                                    message:
                                                        "Vui lòng nhập đúng định dạng email",
                                                },
                                            ]}
                                            name="email"
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
                                    Địa chỉ thường chú
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
                                            name="diaChi"
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
                                            <Input name="diaChi" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <label className="my-label">
                                    Yêu cầu gửi thẻ đăng kí hiến tạng về địa chỉ
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
                                            className="my-label"
                                            label="Tỉnh/Thành Phố"
                                            name="tinhnhanthe"
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
                                                name="tinhnhanthe"
                                                onChange={(value) => {
                                                    onchangeloaddiachi(
                                                        "tinhnhanthe",
                                                        value
                                                    );
                                                }}
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>
                                                {RenderDropdownTinh({
                                                    code: "tinhnhanthe",
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
                                            className="my-label"
                                            label="Quận/Huyện"
                                            name="quanhuyennhanthe"
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
                                                name="quanhuyennhanthe"
                                                onChange={(value) => {
                                                    onchangeloaddiachi(
                                                        "quanhuyennhanthe",
                                                        value
                                                    );
                                                }}
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {RenderDropdownQuanhuyen({
                                                    code: "quanhuyennhanthe",
                                                    data: loaddiachi.tinhnhanthe,
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
                                            className="my-label"
                                            label="Xã/Phường"
                                            name="xaphuongnhanthe"
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
                                                name="xaphuongnhanthe"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {RenderDropdownXaphuong({
                                                    code: "xaphuongnhanthe",
                                                    data: loaddiachi.quanhuyennhanthe,
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
                                            name="diaChiNhanTheDangKy"
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
                                            <Input name="diaChiNhanTheDangKy" />
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
                                            name="ngheNhiep"
                                        >
                                            <Input name="ngheNghiepBoXung" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            className="my-label"
                                            label="Nơi Công tác(nếu có)"
                                            name="noiCongTac"
                                        >
                                            <Input name="noiCongTac" />
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
                                            label="CMND/CCCD/Hộ chiếu"
                                            name="soCMND"
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
                                            <Input name="soCMND" />
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
                                            name="ngayCap"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <DatePicker
                                                name="ngayCap"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            className="my-label"
                                            label="Nơi cấp"
                                            name="noiCap"
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
                                            <Input name="noiCap" />
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
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <img
                                            className="imgCMND"
                                            id="ImgCMNDBNMatTruoc"
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
                                    <Col
                                        lg={{ span: 6 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                        xs={{ span: 24 }}
                                    >
                                        <img
                                            className="imgCMND"
                                            id="ImgCMNDBNMatSau"
                                        />
                                    </Col>
                                </Row>

                                <Row gutter={[10, 5]}>
                                    <div className="class-b">
                                        * Xin vui lòng đánh dấu chọn các mô, bộ
                                        phận cơ thể tình nguyện sẽ hiến sau khi
                                        chết:
                                    </div>
                                    <Col span={24}>
                                        <Form.Item name="checkbox-group">
                                            <Checkbox.Group style={{ width: '100%' }}>
                                                <Row>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="than"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Thận
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="gan"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Gan
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="tuyTang"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Tụy Tạng
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="tim"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Tim
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="phoi"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Phổi
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="ruot"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Ruột
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="da"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Da
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="giacMac"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Giác mạc
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="xuong"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Xương
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="machMau"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Mạch máu
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="vanTim"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Van tim
                                                        </Checkbox>
                                                    </Col>
                                                    <Col
                                                        lg={{ span: 6 }}
                                                        md={{ span: 6 }}
                                                        sm={{ span: 12 }}
                                                        xs={{ span: 24 }}
                                                    >
                                                        <Checkbox
                                                            value="chiThe"
                                                            style={{
                                                                lineHeight:
                                                                    "32px",
                                                            }}
                                                        >
                                                            Chi Thể
                                                        </Checkbox>
                                                    </Col>
                                                </Row>
                                            </Checkbox.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24}>
                                        <label htmlFor="diNguyen">
                                            * Di nguyện về việc xử lý cơ thể sau
                                            khi hiến tặng mô tạng:
                                            <span className="red">*</span>
                                        </label>
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
                                            label="Chọn di nguyện"
                                            name="diNguyen"
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
                                                name="diNguyen"
                                            >
                                                <Option value="">
                                                    --Chọn--
                                                </Option>

                                                {DropDMDiNguyen()}
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
                                            label="Mô tả di nguyện"
                                            name="diNguyenKhac"
                                        >
                                            <Input namr="diNguyenKhac" />
                                        </Form.Item>
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
            <Row className="fdkhien">
                <Col span={24}>
                    <div className="boxRequestLogin">
                        <div className="TitleRequestLogin">
                            Để có thể đăng ký hiến, ghép mô tạng vui lòng thực
                            hiện đăng nhập hoặc thực hiện đăng ký tạo tài khoản
                            mới theo liên kết bên dưới.
                        </div>
                        <div className="center boxBtnLoginRequest">
                            <Link
                                href="/LoginUser?backurl=PDKHien"
                                className="btn btn-primary btn-lg"
                            >
                                <a>
                                    <i className="fas fa-sign-in-alt" /> Đăng
                                    nhập
                                </a>
                            </Link>
                            <Link
                                href="/dangky"
                                className="btn btn-success btn-lg"
                            >
                                <a>
                                    {" "}
                                    <i className="fas fa-user-plus" /> Đăng ký{" "}
                                </a>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
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
                    <>{IsDone.state ? <RenderKetQua /> : <RenderForm />}</>
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
PDKHien.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default connect(mapStateToProps, null)(PDKHien);
