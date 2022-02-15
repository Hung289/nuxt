import React, { useState, useEffect, useRef } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { NotFoundUserImage, NotFoundCMNDImage } from "../Common/NotFoundUser";
import * as Constant from "../Constant/GlobalConstant";
import * as DangKyHienMoTangConstant from "../Constant/DangKyHienMoTangConstant";
import * as DangKyChoGhepConstant from "../Constant/DangKyChoGhepConstant";
import Head from "next/head";
import {
  Modal,
  Button,
  Col,
  Container,
  Row,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Card,
  Tabs,
  Tab,
} from "react-bootstrap";
import Link from "next/link";
import { Formik, useFormik, Form, Field, useFormikContex } from "formik";
import { toast } from "react-toastify";
import * as huyDangKyService from "../Lib/huyDangKyService";
import * as dangKyHienTangService from "../Lib/dangKyHienTangService";
import * as dangKyChoGhepTangService from "../Lib/dangKyChoGhepTangService";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as CommonUtility from "../Common/CommonUtility";
import { removeAscent, canhbaoErrorModal } from "../Common/CommonUtility";
import ReactLoading from "react-loading";
import LayoutClient from "../layouts/LayoutClient";

const CreateHuyDangKy = (blog) => {
  const formCreateEntity = useRef(null);
  const [objDKHien, setobjDKHien] = useState({});
  const [objDKChoGhep, setobjDKChoGhep] = useState({});
  const formRef = useRef();
  const [isload, setisload] = useState(false);
  const [IsDone, setIsDone] = useState({ state: false, data: {} });

  useEffect(() => {
    if (blog.blog.typeData === "DangKyHien") {
      dangKyHienTangService.GetDetailDto(blog.blog.id).then((x) => {
        setobjDKHien(x);
      });
    } else {
      dangKyChoGhepTangService.GetDetailDto(blog.blog.id).then((x) => {
        setobjDKChoGhep(x);
      });
    }

    return () => {};
  }, []);
  const SignupSchema = Yup.object().shape({
    IdDon: Yup.number().required("Vui lòng nhập thông tin này"),
    LyDo: Yup.string().trim().required("Vui lòng nhập thông tin này"),
    TypeDangKy: Yup.string().required("Vui lòng nhập thông tin này"),
  });
  const RenderKetQua = () => {
    return (
      <div className="row">
        <div className="col-sm-12 ">
          <div className="pdk-hien-tieude">
            <div className="headerClientPage">
              GỬI YÊU CẦU HỦY ĐƠN ĐĂNG KÝ THÀNH CÔNG
            </div>
          </div>
          <div>
            <div className="paddingleft10">
              <div>Hệ thống đã ghi nhận thông tin hủy đăng ký của ông/bà</div>
              <div>
                Hiện tại chúng tôi đang xử lý sẽ thông báo lại kết quả với
                Ông/bà trong thời gian sớm nhất
              </div>

              <div>Trân trọng./.</div>
              <div className="alert alert-warning">
                <div>
                  Để hoàn tất quy trình đăng ký vui lòng tải xuống đơn hủy đăng
                  ký sau đó ký xác nhận và gửi tới địa chỉ sau:
                </div>
                <div>
                  <ul>
                    <li>
                      <b>
                        ĐƠN VỊ ĐIỀU PHỐI GHÉP CÁC BỘ PHẬN CƠ THỂ NGƯỜI BỆNH VIỆN
                        CHỢ RẪY
                      </b>
                    </li>
                    <li>
                      Địa chỉ: 201B Nguyễn Chí Thanh, Phường 12, Quận 5, Hồ Chí
                      Minh, Việt Nam
                    </li>
                    <li>
                      Điện thoại trong giờ hành chính: (84-028) 38554137 – 1184
                      hay (84-028) 39560139 | Fax: (84-028) 39560139
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowInfoPhieuDangKy = () => {
    return (
      <div className="alert alert-custom">
        <h4>Thông tin phiếu đăng ký hiến</h4>
        <div>
          <table className="tblInfoData">
            <tr>
              <td rowSpan={5}>
                {objDKHien.Avatar !== "" ? (
                  <img
                    src={`${Constant.PathServer}${objDKHien.Avatar}`}
                    alt=""
                    onError={NotFoundUserImage}
                    className="imgHinhAnhAccountLarge "
                  />
                ) : (
                  <></>
                )}
              </td>
              <td>Họ Tên</td>
              <td>{objDKHien.HoTen}</td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>{objDKHien.GioiTinhTxt}</td>
            </tr>
            <tr>
              <td> Ngày sinh</td>
              <td>{CommonUtility.ShowDateVN(objDKHien.NgaySinh)}</td>
            </tr>
            <tr>
              <td> Trạng thái</td>
              <td>
                <span
                  className={`labelStatus HienTang ${DangKyHienMoTangConstant.GetStyle(
                    objDKHien.Status
                  )}`}
                >
                  {DangKyHienMoTangConstant.GetName(objDKHien.Status)}
                </span>
              </td>
            </tr>
            <tr>
              <td> Ngày đăng ký</td>
              <td>{CommonUtility.ShowDateVN(objDKHien.NgayDK)}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  };

  const ShowInfoChoGhep = () => {
    return (
      <div className="alert alert-custom">
        <h4>Thông tin phiếu đăng ký chờ ghép</h4>
        <div>
          <table className="tblInfoData">
            <tr>
              <td rowSpan={5}>
                {objDKChoGhep.Avatar !== "" ? (
                  <img
                    src={`${Constant.PathServer}${objDKChoGhep.Avatar}`}
                    alt=""
                    onError={NotFoundUserImage}
                    className="imgHinhAnhAccountLarge "
                  />
                ) : (
                  <></>
                )}
              </td>
              <td>Họ Tên</td>
              <td>{objDKChoGhep.HoTenBN}</td>
            </tr>
            <tr>
              <td>Giới tính</td>
              <td>{objDKChoGhep.GioiTinhTxt}</td>
            </tr>
            <tr>
              <td> Ngày sinh</td>
              <td>{CommonUtility.ShowDateVN(objDKChoGhep.NgaySinh)}</td>
            </tr>
            <tr>
              <td> Trạng thái</td>
              <td>
                <span
                  className={`labelStatus HienTang ${DangKyChoGhepConstant.GetStyle(
                    objDKChoGhep.Status
                  )}`}
                >
                  {DangKyChoGhepConstant.GetName(objDKChoGhep.Status)}
                </span>
              </td>
            </tr>
            <tr>
              <td> Ngày đăng ký</td>
              <td>{CommonUtility.ShowDateVN(objDKChoGhep.NgayDKHien)}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  };

  function EditModal() {
    const submitEdit = () => {
      if (formRef.current) {
        formRef.current.handleSubmit();
      }
    };

    return (
      <Row>
        <Col md={12}>
          <div className="">
            <div className="Title-Login-Register center">
              {blog.blog.typeData === "DangKyHien" ? (
                <>Gửi đơn hủy đăng ký hiến mô tạng</>
              ) : (
                <>Gửi đơn hủy đăng ký chờ ghép mô tạng</>
              )}
            </div>
          </div>
          <div>
            {blog.blog.typeData === "DangKyHien" ? (
              <ShowInfoPhieuDangKy />
            ) : (
              <ShowInfoChoGhep />
            )}
          </div>
          <Row>
            <Formik
              innerRef={formRef}
              initialValues={{
                IdDon: blog.blog.id,
                TypeDangKy: blog.blog.typeData,
                Status: "ChoTiepNhan",
                LyDo: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                // same shape as initial values

                setisload(true);
                huyDangKyService.CreateNewEntity(values).then((itemdata) => {
                  if (itemdata.Status === true) {
                    toast.success("Cập nhật đăng ký hiến tạng thành công");
                    setIsDone({ state: true });
                  } else {
                    toast.error(itemdata.MessageError);
                  }
                  setisload(false);
                });
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form ref={formCreateEntity} className="wid100">
                  <Field type="hidden" name="IdDon" key="IdDon" />
                  <Field type="hidden" name="TypeDangKy" key="TypeDangKy" />

                  <div className="row">
                    <div className="form-group wid100">
                      <label className="control-label col-sm-12" htmlFor="LyDo">
                        Lý do hủy đăng ký <span className="red">*</span>
                      </label>

                      <div className="col-sm-12">
                        <Field
                          as="textarea"
                          name="LyDo"
                          key="LyDo"
                          className="form-control "
                        />
                        {errors.LyDo && touched.LyDo ? (
                          <>
                            <div className="invalid-feedback">
                              {errors.LyDo}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Row>
          <div className="center mgb15 mgt15">
            {/* <Button
                            variant="secondary"
                            onClick={() => onCloseEntityEditModal()}
                        >
                            Đóng
                        </Button> */}
            <Button
              className="btn-lg"
              variant="primary"
              onClick={() => {
                submitEdit();
                canhbaoErrorModal(formRef);
              }}
            >
              Hoàn thành
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
  return (
    <>
    <>
      <Head>
        <title>Hủy đăng ký</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="title"
          content="Cổng đăng ký hiến và ghép tạng - Bệnh viện Chợ Rẫy"
        />
        <meta name="description" content="Hinet JSC" />
        <link rel="icon" href="/favicon.ico" />
        <link href="/libs/fontawesome/css/all.css" rel="stylesheet"></link>
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
      <div className="col-sm-12 boxMenuClient">
        {" "}
        <Link href="/HsHienGhep" className="btn btn-link btn-sm">
          <a>
            {" "}
            <i className="fas fa-reply" /> Quản lý hồ sơ
          </a>
        </Link>
      </div>
      {IsDone.state ? <RenderKetQua /> : <EditModal />}
    </Container>
    </>
  );
};
export async function getServerSideProps({ query }) {
  return {
    props: {
      blog: query,
    },
  };
}

CreateHuyDangKy.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default CreateHuyDangKy;
