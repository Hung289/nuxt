import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
// import { Formik, useFormik, Form, Field, useFormikContex } from "formik";
import * as Yup from "yup";
import * as AccountService from "../Lib/AccountServerService";
import { Container, Row, Col } from "react-bootstrap";
import { removeAscent } from "../Common/CommonUtility";
import ReactLoading from "react-loading";
import LayoutClient from "../layouts/LayoutClient";
import Head from "next/head";
import Link from "next/link";

import { Form, Input, DatePicker, Space, Radio, Select, Button } from "antd";

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

    const genders = ["Nam", "Nữ"];
    const [value1, setValue1] = useState(genders[0]);
    const onChange1 = (e) => {
        setValue1(e.target.value);
    };
    const { Option } = Select;

    const SignupSchema = Yup.object().shape({
        MATKHAU: Yup.string()
            .trim()
            .min(6, "Vui lòng nhập ít nhất 6 ký tự")
            .required("Vui lòng nhập thông tin này")
            .test("xxx", "Mật khẩu phải sử dụng cả chữ cái và số", (val) => {
                let so = false;
                let chu = false;
                if (val !== undefined) {
                    for (let i = 0; i < val.length; i += 1) {
                        if (/^[a-zA-Z ]*$/.test(val[i])) {
                            chu = true;
                        } else if (/^[0-9]*$/.test(val[i])) {
                            so = true;
                        }
                    }
                    if (chu && so) {
                        return true;
                    }
                    return false;
                }
                return true;
            }),
        MATKHAU2: Yup.string()
            .trim()
            .min(6, "Vui lòng nhập ít nhất 6 ký tự")
            .required("Vui lòng nhập thông tin này")
            .test("xxx", "Mật khẩu phải sử dụng cả chữ cái và số", (val) => {
                let so = false;
                let chu = false;
                if (val !== undefined) {
                    for (let i = 0; i < val.length; i += 1) {
                        if (/^[a-zA-Z ]*$/.test(val[i])) {
                            chu = true;
                        } else if (/^[0-9]*$/.test(val[i])) {
                            so = true;
                        }
                    }
                    if (chu && so) {
                        return true;
                    }
                    return false;
                }
                return true;
            })
            .test(
                "xxx",
                "Mật khẩu không trùng khớp",
                (val, test) => val === test.parent.MATKHAU
            ),
        NGAYSINH: Yup.string()
            .required("Vui lòng nhập thông tin này")
            .test(
                "len",
                "Ngày sinh vượt quá ngày hiện tại",
                (val) => new Date() > new Date(val)
            )
            .test(
                "len",
                "Ngày sinh phải sau ngày 1 tháng 1 năm 1920",
                (val) => new Date("1920-1-1") < new Date(val)
            ),
        DIENTHOAI: Yup.string()
            .trim()
            .min(10, "Vui lòng nhập ít nhất 10 ký tự")
            .max(12, "Vui lòng nhập không quá 12 ký tự")
            .required("Vui lòng nhập thông tin này")
            .test("xxx", "Số điện thoại chỉ được sử dụng chữ số", (val) =>
                /^[0-9]*$/.test(val)
            ),
        EMAIL: Yup.string()
            .email("Vui lòng nhập đúng định dạng email")
            .required("Vui lòng nhập thông tin này"),
        HO: Yup.string()
            .trim()
            .test(
                "lxxen",
                "Vui lòng không sử dụng số và ký tự đặc biệt",
                (val) => {
                    const str = removeAscent(val);
                    return /^[a-zA-Z ]*$/.test(str);
                }
            )
            .min(2, "Vui lòng nhập ít nhất 2 ký tự không phải khoảng trắng")
            .max(255, "Vui lòng nhập không quá 255 ký tự")
            .required("Vui lòng nhập thông tin này"),
        TEN: Yup.string()
            .trim()
            .test(
                "lxxen",
                "Vui lòng không sử dụng số và ký tự đặc biệt",
                (val) => {
                    const str = removeAscent(val);
                    return /^[a-zA-Z ]*$/.test(str);
                }
            )
            .min(2, "Vui lòng nhập ít nhất 2 ký tự không phải khoảng trắng")
            .max(255, "Vui lòng nhập không quá 255 ký tự")
            .required("Vui lòng nhập thông tin này"),
    });

    const RenderForm = () => {
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

        const onFinish = (values) => {
            console.log(values);
        };
        return (
            <>
                <div className="boxdangky">
                    <Row>
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
                    </Row>

                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item
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
                                    validateTrigger={["onBlur", "onChange"]}
                                >
                                    <Input name="EMAIL" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
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
                                                if (/^[0-9]*$/.test(val)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    `Số điện thoại chỉ được sử dụng chữ số`
                                                );
                                            },
                                        }),
                                    ]}
                                    validateTrigger={["onBlur", "onChange"]}
                                    name="DIENTHOAI"
                                >
                                    <Input name="DIENTHOAI" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
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
                                    validateTrigger={["onBlur", "onChange"]}
                                >
                                    <Input name="MATKHAU" type="password" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
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
                                                    getFieldValue("MATKHAU") ===
                                                        value
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
                                    validateTrigger={["onBlur", "onChange"]}
                                    dependencies={["MATKHAU"]}
                                >
                                    <Input name="MATKHAU2" type="password" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
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
                                                const str = removeAscent(val);
                                                if (!/^[a-zA-Z]*$/.test(str)) {
                                                    return Promise.reject(
                                                        "Vui lòng không sử dụng số và ký tự đặc biệt và không có khoảng trắng"
                                                    );
                                                }

                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    name="HO"
                                    validateTrigger={["onBlur", "onChange"]}
                                >
                                    <Input name="HO" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
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
                                                const str = removeAscent(val);
                                                if (!/^[a-zA-Z]*$/.test(str)) {
                                                    return Promise.reject(
                                                        "Vui lòng không sử dụng số và ký tự đặc biệt và không có khoảng trắng"
                                                    );
                                                }

                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    name="TEN"
                                    validateTrigger={["onBlur", "onChange"]}
                                >
                                    <Input name="TEN" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label="Ngày sinh">
                                    <Space direction="vertical">
                                        <DatePicker name="NGAYSINH" />
                                    </Space>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Giới tính" name="GIOITINH">
                                    <Radio.Group
                                        options={genders}
                                        onChange={onChange1}
                                        value={value1}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Địa chỉ thường chú">
                                    <Row>
                                        <Col span={6}>
                                            <Form.Item label="Tỉnh/Thành Phố">
                                                <Select
                                                    defaultValue=""
                                                    name="TINH"
                                                    onChange={(value) => {
                                                        console.log(value);
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
                                        <Col span={6}>
                                            <Form.Item label="Quận/Huyện">
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
                                        <Col span={6}>
                                            <Form.Item label="Xã/Phường">
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
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Form.Item label="Số nhà, phố, tổ dân phố /thôn / đội">
                                    <Input name="DIACHI" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <Form.Item
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
                            <Col span={12}>
                                <Form.Item label="Mã xác nhận">
                                    <LoadCanvasTemplate />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item wrapperCol={{ offset: 11, span: 2 }}>
                            <Button type="primary" htmlType="submit">
                                Hoàn Thành
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </>

            // <Row className="boxdangky">
            //   <Col className="" md={13}>
            //     <div className="">
            //       <div className="Title-Login-Register center">
            //         ĐĂNG KÝ TÀI KHOẢN NGƯỜI DÙNG
            //       </div>
            //       <div
            //         className="font-size15"
            //         style={{
            //           textAlign: "center",
            //           marginTop: "10px",
            //           marginRight: "10px",
            //           color: "red",
            //         }}
            //       >
            //         <p>Email được sử dụng làm tên đăng nhập hệ thống</p>
            //       </div>
            //     </div>

            //     <Row>
            //       <Formik
            //         innerRef={formRef}
            //         initialValues={{
            //           MATKHAU: "",
            //           MATKHAU2: "",
            //           TRANGTHAI: String(1),
            //           DIENTHOAI: "",
            //           NGUOISUA: "",
            //           HO: "",
            //           TEN: "",
            //           EMAIL: "",
            //           DIACHI: "",
            //           NGAYSINH: "",
            //           GIOITINH: "1",
            //           TINH: "",
            //           XAPHUONG: "",
            //           QUANHUYEN: "",
            //         }}
            //         validationSchema={SignupSchema}
            //         onSubmit={(values) => {
            //           const ObjSave = {
            //             ...values,
            //           };
            //           const usercaptcha =
            //             document.getElementById("NhapMaXacNhan").value;

            //           if (validateCaptcha(usercaptcha) === true) {
            //             loadCaptchaEnginge(6);
            //             document.getElementById("NhapMaXacNhan").value = "";

            //             if (values.MATKHAU === values.MATKHAU2) {
            //               setisload(true);
            //               AccountService.DangKyTaiKhoan(ObjSave).then((data) => {
            //                 setisload(false);
            //                 if (data.Status) {
            //                   toast.success("Đăng ký tài khoản thành công");
            //                   setisDoneRegister(true);
            //                 } else {
            //                   toast.error(data.MessageError);
            //                 }
            //               });
            //             } else {
            //               toast.error("Vui lòng kiểm tra lại mật khẩu");
            //             }
            //           } else {
            //             toast.error("Bạn đã nhập sai mã xác nhận");
            //             document.getElementById("NhapMaXacNhan").value = "";
            //           }
            //         }}
            //       >
            //         {({ errors, touched, setFieldValue }) => (
            //           <Form className="col-md-12">
            //             <div className="form-row">
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="EMAIL">
            //                   Email
            //                   <span className="red">*</span>
            //                 </label>
            //                 <Field
            //                   name="EMAIL"
            //                   key="EMAIL"
            //                   className="form-control "
            //                 />
            //                 {errors.EMAIL && touched.EMAIL ? (
            //                   <>
            //                     <div className="invalid-feedback">{errors.EMAIL}</div>
            //                   </>
            //                 ) : null}
            //               </div>
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="DIENTHOAI">
            //                   Điện thoại
            //                   <span className="red">*</span>
            //                 </label>
            //                 <Field
            //                   name="DIENTHOAI"
            //                   key="DIENTHOAI"
            //                   className="form-control "
            //                 />
            //                 {errors.DIENTHOAI && touched.DIENTHOAI ? (
            //                   <>
            //                     <div className="invalid-feedback">
            //                       {errors.DIENTHOAI}
            //                     </div>
            //                   </>
            //                 ) : null}
            //               </div>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-sm-12">
            //                 <label htmlFor="MATKHAU">
            //                   Mật khẩu
            //                   <span className="red">*</span>
            //                 </label>
            //                 <Field
            //                   type="password"
            //                   name="MATKHAU"
            //                   key="MATKHAU"
            //                   className="form-control"
            //                 />
            //                 {errors.MATKHAU && touched.MATKHAU ? (
            //                   <div className="invalid-feedback">{errors.MATKHAU}</div>
            //                 ) : null}
            //               </div>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-sm-12">
            //                 <label htmlFor="MATKHAU2">
            //                   Nhập lại mật khẩu
            //                   <span className="red">*</span>
            //                 </label>
            //                 <Field
            //                   type="password"
            //                   name="MATKHAU2"
            //                   key="MATKHAU2"
            //                   className="form-control"
            //                 />
            //                 {errors.MATKHAU2 && touched.MATKHAU2 ? (
            //                   <div className="invalid-feedback">
            //                     {errors.MATKHAU2}
            //                   </div>
            //                 ) : null}
            //               </div>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="HO">
            //                   Họ <span className="red">*</span>
            //                 </label>
            //                 <Field name="HO" key="HO" className="form-control " />
            //                 {errors.HO && touched.HO ? (
            //                   <>
            //                     <div className="invalid-feedback">{errors.HO}</div>
            //                   </>
            //                 ) : null}
            //               </div>
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="TEN">
            //                   Tên <span className="red">*</span>
            //                 </label>
            //                 <Field name="TEN" key="TEN" className="form-control " />
            //                 {errors.TEN && touched.TEN ? (
            //                   <>
            //                     <div className="invalid-feedback">{errors.TEN}</div>
            //                   </>
            //                 ) : null}
            //               </div>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="NGAYSINH">
            //                   Ngày sinh
            //                   <span className="red">*</span>
            //                 </label>
            //                 <Field
            //                   type="date"
            //                   name="NGAYSINH"
            //                   key="NGAYSINH"
            //                   className="form-control "
            //                 />
            //                 {errors.NGAYSINH && touched.NGAYSINH ? (
            //                   <>
            //                     <div className="invalid-feedback">
            //                       {errors.NGAYSINH}
            //                     </div>
            //                   </>
            //                 ) : null}
            //               </div>
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="GIOITINH">Giới tính</label>
            //                 <div role="group" aria-labelledby="my-radio-group">
            //                   <label htmlFor="GIOITINH" className="mgr15">
            //                     <Field type="radio" name="GIOITINH" value="1" /> Nam
            //                   </label>
            //                   <label htmlFor="GIOITINH">
            //                     <Field type="radio" name="GIOITINH" value="0" /> Nữ
            //                   </label>
            //                 </div>
            //               </div>
            //             </div>

            //             <div className="form-row">
            //               <label htmlFor="diaChi">Địa Chỉ Thường Trú :</label>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-md-4">
            //                 <label htmlFor="TINH" className="chitietdiachi">
            //                   Tỉnh/Thành Phố
            //                 </label>
            //                 <Field
            //                   as="select"
            //                   name="TINH"
            //                   key="TINH"
            //                   className="form-control "
            //                   onChange={(e) => {
            //                     const { value } = e.target;
            //                     onchangeloaddiachi("tinh", value);
            //                     setFieldValue("TINH", value);
            //                   }}
            //                 >
            //                   <option value="">--Chọn--</option>
            //                   {RenderDropdownTinh({
            //                     code: "tinh",
            //                   })}
            //                 </Field>
            //                 {errors.TINH && touched.TINH ? (
            //                   <>
            //                     <div className="invalid-feedback">{errors.TINH}</div>
            //                   </>
            //                 ) : null}
            //               </div>
            //               <div className="form-group col-md-4">
            //                 <label htmlFor="QUANHUYEN" className="chitietdiachi">
            //                   Quận/Huyện
            //                 </label>
            //                 <Field
            //                   as="select"
            //                   name="QUANHUYEN"
            //                   key="QUANHUYEN"
            //                   className="form-control "
            //                   onChange={(e) => {
            //                     const { value } = e.target;
            //                     onchangeloaddiachi("quanhuyen", value);
            //                     setFieldValue("QUANHUYEN", value);
            //                   }}
            //                 >
            //                   <option value="">--Chọn--</option>
            //                   {loaddiachi.tinh !== "" ? (
            //                     <RenderDropdownQuanhuyen
            //                       code="quanhuyen"
            //                       data={loaddiachi.tinh}
            //                     />
            //                   ) : (
            //                     ""
            //                   )}
            //                 </Field>
            //                 {errors.QUANHUYEN && touched.QUANHUYEN ? (
            //                   <>
            //                     <div className="invalid-feedback">
            //                       {errors.QUANHUYEN}
            //                     </div>
            //                   </>
            //                 ) : null}
            //               </div>
            //               <div className="form-group col-md-4">
            //                 <label htmlFor="XAPHUONG" className="chitietdiachi">
            //                   Xã/Phường
            //                 </label>
            //                 <Field
            //                   as="select"
            //                   name="XAPHUONG"
            //                   key="XAPHUONG"
            //                   className="form-control "
            //                 >
            //                   <option value="">--Chọn--</option>
            //                   {loaddiachi.quanhuyen !== "" ? (
            //                     <RenderDropdownXaphuong
            //                       code="xaphuong"
            //                       data={loaddiachi.quanhuyen}
            //                     />
            //                   ) : (
            //                     ""
            //                   )}
            //                 </Field>
            //                 {errors.XAPHUONG && touched.XAPHUONG ? (
            //                   <>
            //                     <div className="invalid-feedback">
            //                       {errors.XAPHUONG}
            //                     </div>
            //                   </>
            //                 ) : null}
            //               </div>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-md-12">
            //                 <label htmlFor="DIACHI" className="chitietdiachi">
            //                   Số nhà, phố, tổ dân phố / thôn / đội
            //                 </label>
            //                 <Field
            //                   name="DIACHI"
            //                   key="DIACHI"
            //                   className="form-control "
            //                 />
            //                 {errors.DIACHI && touched.DIACHI ? (
            //                   <>
            //                     <div className="invalid-feedback">
            //                       {errors.DIACHI}
            //                     </div>
            //                   </>
            //                 ) : null}
            //               </div>
            //             </div>
            //             <div className="form-row">
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="noiCap">
            //                   Nhập xác nhận
            //                   <span className="red">*</span>
            //                 </label>
            //                 <Field
            //                   id="NhapMaXacNhan"
            //                   name="NhapMaXacNhan"
            //                   key="NhapMaXacNhan"
            //                   className="form-control "
            //                 />
            //                 {errors.NhapMaXacNhan && touched.NhapMaXacNhan ? (
            //                   <>
            //                     <div className="invalid-feedback">
            //                       {errors.NhapMaXacNhan}
            //                     </div>
            //                   </>
            //                 ) : null}
            //               </div>
            //               <div className="form-group col-md-6">
            //                 <label htmlFor="noiCap">Mã xác nhận</label>

            //                 <LoadCanvasTemplate />
            //               </div>
            //             </div>
            //             <div className="form-row center mgt15">
            //               <div className="col-sm-12">
            //                 <Button
            //                   className="btn-lg"
            //                   variant="primary"
            //                   type="submit"
            //                 >
            //                   Hoàn thành
            //                 </Button>
            //               </div>
            //             </div>
            //           </Form>
            //         )}
            //       </Formik>
            //     </Row>
            //   </Col>
            // </Row>
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
            <Container>
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
            </Container>
        </>
    );
};
Dangky.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default Dangky;
