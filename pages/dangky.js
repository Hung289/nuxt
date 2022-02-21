import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import * as AccountService from "../Lib/AccountServerService";
import { removeAscent } from "../Common/CommonUtility";
import ReactLoading from "react-loading";
import LayoutClient from "../layouts/LayoutClient";
import Head from "next/head";
import Link from "next/link";

import {
    Form,
    Input,
    DatePicker,
    Space,
    Radio,
    Select,
    Button,
    Row,
    Col,
} from "antd";

import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from "../Components/react-captcha/react-simple-captcha";
import {
    RenderDropdownTinh,
    RenderDropdownQuanhuyen,
    RenderDropdownXaphuong,
} from "../Common/LoadDiachi";

const Dangky = () => {
    //   let showHidePassword = useRef(false);
    //   const changeShowHidePassword = (bools) => {
    //     showHidePassword = bools;
    //   };
    const [isload, setisload] = useState(false);
    const [isDoneRegister, setisDoneRegister] = useState(false);
    const formRef = useRef();

    const { Option } = Select;

    const RenderForm = () => {
        const genders = ["Nam", "Nữ"];
        const [value1, setValue1] = useState(genders[0]);
        const onChange1 = (e) => {
            setValue1(e.target.value);
        };
        const [loaddiachi, setloaddiachi] = useState({
            tinh: "",
            quanhuyen: "",
        });
        function onchangeloaddiachi(name, value) {
            if (name === "tinh") {
                setloaddiachi({ ...loaddiachi, tinh: value, quanhuyen: "" });
            } else if (name === "quanhuyen") {
                setloaddiachi({ ...loaddiachi, quanhuyen: value });
            }
        }
        useEffect(() => {
            loadCaptchaEnginge(6);
            document.getElementById("reload_href").text = "Đổi mã";
        }, []);

        const onFinish = (fieldsValue) => {
            let values = {
                ...fieldsValue,
                NGAYSINH: fieldsValue["NGAYSINH"].format("YYYY-MM-DD"),
            };

            console.log(values);
        };

        return (
            <>
                <div className="my-container">
                    <Row className="boxdangky">
                        <Col span={24}>
                            <div>
                                <div className="Title-Login-Register center">
                                    ĐĂNG KÝ TÀI KHOẢN NGƯỜI DÙNG
                                </div>
                                <div
                                    className="font-size15"
                                    style={{
                                        textAlign: "center",
                                        marginTop: "10px",
                                        marginRight: "10px",
                                        color: "red",
                                    }}
                                >
                                    <p>
                                        Email được sử dụng làm tên đăng nhập hệ
                                        thống
                                    </p>
                                </div>
                            </div>
                        </Col>

                        <Col span={24}>
                            <Form
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                layout="vertical"
                                onFinish={onFinish}
                            >
                                <Row
                                    className="form-email-phone"
                                    gutter={[10, 5]}
                                >
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
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
                                            name="EMAIL"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="EMAIL" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
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
                                                () => ({
                                                    validator(_, val) {
                                                        if (
                                                            /^[0-9]*$/.test(val)
                                                        ) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(
                                                            `Số điện thoại chỉ được sử dụng chữ số`
                                                        );
                                                    },
                                                }),
                                            ]}
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                            name="DIENTHOAI"
                                        >
                                            <Input name="DIENTHOAI" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Mật khẩu"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                                {
                                                    min: 6,
                                                    message:
                                                        "Vui lòng nhập ít nhất 6 ký tự",
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(rule, val) {
                                                        let so = false;
                                                        let chu = false;
                                                        if (val !== undefined) {
                                                            for (
                                                                let i = 0;
                                                                i < val.length;
                                                                i += 1
                                                            ) {
                                                                if (
                                                                    /^[a-zA-Z ]*$/.test(
                                                                        val[i]
                                                                    )
                                                                ) {
                                                                    chu = true;
                                                                } else if (
                                                                    /^[0-9]*$/.test(
                                                                        val[i]
                                                                    )
                                                                ) {
                                                                    so = true;
                                                                }
                                                            }
                                                            if (chu && so) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(
                                                                `Mật khẩu phải sử dụng cả chữ cái và số`
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="MATKHAU"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input
                                                name="MATKHAU"
                                                type="password"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Nhập Lại Mật khẩu"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (
                                                            !value ||
                                                            getFieldValue(
                                                                "MATKHAU"
                                                            ) === value
                                                        ) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(
                                                            new Error(
                                                                "Mật khẩu không trùng khớp"
                                                            )
                                                        );
                                                    },
                                                }),
                                            ]}
                                            name="MATKHAU2"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                            dependencies={["MATKHAU"]}
                                        >
                                            <Input
                                                name="MATKHAU2"
                                                type="password"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row className="form-ho-ten" gutter={[10, 5]}>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Họ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                    whitespace: false,
                                                },
                                                {
                                                    min: 2,
                                                    message:
                                                        "Vui lòng nhập ít nhất 2 kí tự",
                                                },
                                                {
                                                    max: 255,
                                                    message:
                                                        "Vui lòng nhập không quá 255 kí tự",
                                                },

                                                () => ({
                                                    validator(_, val) {
                                                        const str =
                                                            removeAscent(val);
                                                        if (
                                                            !/^[a-zA-Z]*$/.test(
                                                                str
                                                            )
                                                        ) {
                                                            return Promise.reject(
                                                                "Vui lòng không sử dụng số và ký tự đặc biệt và không có khoảng trắng"
                                                            );
                                                        }

                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="HO"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="HO" />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Tên"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập thông tin này",
                                                    whitespace: false,
                                                },
                                                {
                                                    min: 2,
                                                    message:
                                                        "Vui lòng nhập ít nhất 2 kí tự",
                                                },
                                                {
                                                    max: 255,
                                                    message:
                                                        "Vui lòng nhập không quá 255 kí tự",
                                                },

                                                () => ({
                                                    validator(_, val) {
                                                        const str =
                                                            removeAscent(val);
                                                        if (
                                                            !/^[a-zA-Z]*$/.test(
                                                                str
                                                            )
                                                        ) {
                                                            return Promise.reject(
                                                                "Vui lòng không sử dụng số và ký tự đặc biệt và không có khoảng trắng"
                                                            );
                                                        }

                                                        return Promise.resolve();
                                                    },
                                                }),
                                            ]}
                                            name="TEN"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <Input name="TEN" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row
                                    className="form-Date-gender"
                                    gutter={[10, 5]}
                                >
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
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
                                            name="NGAYSINH"
                                            validateTrigger={[
                                                "onBlur",
                                                "onChange",
                                            ]}
                                        >
                                            <DatePicker
                                                name="NGAYSINH"
                                                style={{ width: "100%" }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        lg={{ span: 12 }}
                                        md={{ span: 12 }}
                                        sm={{ span: 24 }}
                                    >
                                        <Form.Item
                                            className="chitietdiachi"
                                            label="Giới tính"
                                            name="GIOITINH"
                                            valuePropName="checked"
                                        >
                                            <Radio.Group
                                                options={genders}
                                                onChange={onChange1}
                                                value={value1}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <label className="chitietdiachi">
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
                                            name="TINH"
                                        >
                                            <Select
                                                defaultValue=""
                                                name="TINH"
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
                                            name="QUANHUYEN"
                                        >
                                            <Select
                                                defaultValue=""
                                                name="QUANHUYEN"
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
                                            name="XAPHUONG"
                                        >
                                            <Select
                                                defaultValue=""
                                                name="XAPHUONG"
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
                                            className="chitietdiachi"
                                            label="Số nhà, phố, tổ dân phố /thôn / đội"
                                            name="DIACHI"
                                        >
                                            <Input name="DIACHI" />
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
                </div>
            </>
        );
    };

    const RegisterDoneRender = () => {
        return (
            <div className="RegisterDoneRender">
                <h3 className="center">
                    Chúc mừng bạn đã đăng ký tài khoản thành công
                </h3>
                <h4 className="center">
                    Vui lòng xác nhận tài khoản theo hướng dẫn được gửi đến
                    email đã đăng ký
                </h4>
            </div>
        );
    };

    return (
        <>
            <>
                <Head>
                    <title>Đăng ký tài khoản</title>
                    <meta
                        name="description"
                        content="Đơn vị điều phối ghép các bộ phận cơ thể người"
                    />
                    <meta
                        property="og:title"
                        content="Cổng đăng ký hiến và ghép tạng - Bệnh viện Chợ Rẫy"
                    />
                    <meta
                        property="og:description"
                        content="Đơn vị điều phối ghép các bộ phận cơ thể người"
                    />
                </Head>
            </>

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
            {isDoneRegister ? <RegisterDoneRender /> : <RenderForm />}
        </>
    );
};
Dangky.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default Dangky;
