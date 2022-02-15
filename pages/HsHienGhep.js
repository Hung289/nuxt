/* eslint-disable react/no-danger */
import React, { Component, useState, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import {
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  Container,
  Breadcrumb,
} from "react-bootstrap";
import * as Constant from "../Constant/GlobalConstant";
import * as DangKyHienMoTangConstant from "../Constant/DangKyHienMoTangConstant";
import * as DangKyChoGhepConstant from "../Constant/DangKyChoGhepConstant";
import * as HuyDangKyConstant from "../Constant/HuyDangKyConstant";
import LayoutClient from "../layouts/LayoutClient";
import { connect } from "react-redux";
import Head from "next/head";
import { NotFoundUserImage, NotFoundCMNDImage } from "../Common/NotFoundUser";
import * as CommonUtility from "../Common/CommonUtility";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactLoading from "react-loading";

import * as dangKyHienTangService from "../Lib/dangKyHienTangService";
import * as dangKyChoGhepTangService from "../Lib/dangKyChoGhepTangService";

const HsHienGhep = (props) => {
  const history = useRouter();
  const { user } = props;
  const [dataDangKy, setdataDangKy] = useState({});
  const [isload, setisload] = useState(false);

  useEffect(() => {
    if (user && user.Token) {
      fetch(`${Constant.PathServer}/api/HienVaGhep/GetInfoOfUser`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${user.Token}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
        .then((response) => response.json())
        .then((json) => {
          //   if (json.ErrorCode === 401) {
          //     localStorage.removeItem("token");
          //     history.push("/LoginUser");
          //   }
          if (json.Status) {
            setdataDangKy(json.Data);
          }
        });
    } else {
      history.push("/LoginUser");
    }
  }, []);

  const RenderDataMain = () => {
    const downloadFile = (file) => {
      const element = document.createElement("a");
      element.setAttribute("href", file);
      element.setAttribute("download", "");

      element.style.display = "none";

      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    };
    const onInPhieuHuyHien = async (id) => {
      const dataInPhieu = await dangKyHienTangService.InPhieuHuyDK(id);
      if (dataInPhieu.Status) {
        const pathDownload = `${Constant.PathServer}/${dataInPhieu.Data}`;
        downloadFile(pathDownload);
      }
    };
    const onInPhieuHuyGhepThan = async (id) => {
      const dataInPhieu = await dangKyChoGhepTangService.InPhieuHuyDKThan(id);
      if (dataInPhieu.Status) {
        const pathDownload = `${Constant.PathServer}/${dataInPhieu.Data}`;
        downloadFile(pathDownload);
      }
    };
    const onInPhieuHuyGhepKhac = async (id) => {
      const dataInPhieu = await dangKyChoGhepTangService.InPhieuHuyDKTangKhac(
        id
      );
      if (dataInPhieu.Status) {
        const pathDownload = `${Constant.PathServer}/${dataInPhieu.Data}`;
        downloadFile(pathDownload);
      }
    };
    const ShowDangKyHien = () => {
      let dataResult;
      if (dataDangKy != null && dataDangKy.phieuDangKyHienDtos != null) {
        dataResult = dataDangKy.phieuDangKyHienDtos.map((item, index) => {
          return (
            <div className="col-sm-3" key={index}>
              <div className="card cardCustom" key={index}>
                {item.Avatar !== "" ? (
                  <img
                    src={`${Constant.PathServer}${item.Avatar}`}
                    alt=""
                    onError={NotFoundUserImage}
                    className="imgHinhAnhAccountLarge "
                  />
                ) : (
                  <></>
                )}
                <div className="card-body">
                  <div className="Hoten">{item.HoTen}</div>
                  <div>Giới tính: {item.GioiTinhTxt}</div>
                  <div>
                    Ngày sinh: {CommonUtility.ShowDateVN(item.NgaySinh)}
                  </div>
                  <div>
                    Trạng thái:{" "}
                    <span
                      className={`labelStatus HienTang ${DangKyHienMoTangConstant.GetStyle(
                        item.Status
                      )}`}
                    >
                      {DangKyHienMoTangConstant.GetName(item.Status)}
                    </span>
                  </div>
                  <div>
                    Ngày đăng ký: {CommonUtility.ShowDateVN(item.NgayDK)}
                  </div>
                  {item.HuyDangKyInfo ? (
                    <div className="label label-warning red">
                      Hủy đăng ký:{" "}
                      {HuyDangKyConstant.GetName(item.HuyDangKyInfo.Status)}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="row center" style={{ marginTop: "15px" }}>
                    <div style={{ width: "100%" }}>
                      <DropdownButton
                        className="btn btn-block "
                        title=" Thao tác"
                      >
                        {!item.HuyDangKyInfo &&
                          (item.Status ===
                            DangKyHienMoTangConstant.ChoTiepNhan ||
                            item.Status ===
                              DangKyHienMoTangConstant.TuChoi) && (
                            <Dropdown.Item>
                              <span className="boxIcon">
                                <i className="fas fa-edit" />
                              </span>{" "}
                              <Link
                                href={`/EditHienTangHome?id=${item.Id}`}
                                className="dropdown-item"
                              >
                                <a>Cập nhật</a>
                              </Link>
                            </Dropdown.Item>
                          )}
                        {!item.HuyDangKyInfo && (
                          <Dropdown.Item>
                            <span className="boxIcon">
                              <i className="fas fa-times" />
                            </span>{" "}
                            <Link
                              href={`/CreateHuyDangKy?id=${item.Id}&typeData=DangKyHien`}
                              className="dropdown-item"
                            >
                              <a> Hủy đăng ký </a>
                            </Link>
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item
                          onClick={() => onInPhieuHuyHien(item.Id)}
                        >
                          <span className="boxIcon">
                            <i className="fas fa-download" />
                          </span>{" "}
                          <span>In phiếu hủy đăng ký</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <span className="boxIcon">
                            <i className="fas fa-info-circle" />
                          </span>{" "}
                          <Link href={`/ChiTietDKHienTang?id=${item.Id}`}>
                            <a>Xem Chi tiết</a>
                          </Link>
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      } else {
        dataResult = (
          <div className="col-sm-12" key="1">
            <i>Không có dữ liệu</i>
          </div>
        );
      }
      return dataResult;
    };

    const ShowDangKyGhep = () => {
      let dataResult;
      if (dataDangKy != null && dataDangKy.dangKyChoGhepThanDtos != null) {
        dataResult = dataDangKy.dangKyChoGhepThanDtos.map((item, index) => {
          return (
            <div className="col-sm-3" key={index}>
              <div className="card cardCustom" key={index}>
                {item.Avatar !== "" ? (
                  <img
                    src={`${Constant.PathServer}${item.Avatar}`}
                    alt=""
                    onError={NotFoundUserImage}
                    className="imgHinhAnhAccountLarge "
                  />
                ) : (
                  <></>
                )}
                <div className="card-body">
                  <div className="Hoten">{item.HoTenBN}</div>
                  <div>Giới tính: {item.GioiTinhTxt}</div>
                  <div>
                    Ngày sinh: {CommonUtility.ShowDateVN(item.NgaySinh)}
                  </div>
                  <div>
                    Trạng thái:{" "}
                    <span
                      className={`labelStatus HienTang ${DangKyChoGhepConstant.GetStyle(
                        item.Status
                      )}`}
                    >
                      {DangKyChoGhepConstant.GetName(item.Status)}
                    </span>
                  </div>
                  <div>
                    Ngày đăng ký: {CommonUtility.ShowDateVN(item.NgayDKHien)}
                  </div>
                  {item.HuyDangKyInfo ? (
                    <div className="label label-warning red">
                      Hủy đăng ký:{" "}
                      {HuyDangKyConstant.GetName(item.HuyDangKyInfo.Status)}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="row center" style={{ marginTop: "15px" }}>
                    <div className="dropdown" style={{ width: "100%" }}>
                      <DropdownButton
                        className="btn btn-block "
                        title=" Thao tác"
                      >
                        {!item.HuyDangKyInfo &&
                          (item.Status === DangKyChoGhepConstant.ChoTiepNhan ||
                            item.Status === DangKyChoGhepConstant.TuChoi) && (
                            <Dropdown.Item>
                              <span className="boxIcon">
                                <i className="fas fa-edit" />
                              </span>{" "}
                              <Link
                                href={`/EditGhepTangHome?id=${item.Id}`}
                                className="dropdown-item"
                              >
                                <a>Cập nhật</a>
                              </Link>
                            </Dropdown.Item>
                          )}
                        {!item.HuyDangKyInfo && (
                          <Dropdown.Item>
                            <span className="boxIcon">
                              <i className="fas fa-times" />
                            </span>
                            {"  "}
                            <Link
                              href={`/CreateHuyDangKy?id=${item.Id}&typeData=DangKyChoGhep`}
                              className="dropdown-item"
                            >
                              <a> Hủy đăng ký </a>
                            </Link>
                          </Dropdown.Item>
                        )}
                        {item.TypePhieuDKGhepTang === "than" ? (
                          <>
                            <Dropdown.Item
                              onClick={() => onInPhieuHuyGhepThan(item.Id)}
                              className="dropdown-item"
                            >
                              <span className="boxIcon">
                                <i className="fas fa-download" />
                              </span>{" "}
                              <span>In phiếu hủy đăng ký</span>
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item
                              onClick={() => onInPhieuHuyGhepKhac(item.Id)}
                              className="dropdown-item"
                            >
                              <span className="boxIcon">
                                <i className="fas fa-download" />
                              </span>{" "}
                              <span>In phiếu hủy đăng ký</span>
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Item>
                          <span className="boxIcon">
                            <i className="fas fa-info-circle" />
                          </span>{" "}
                          <Link
                            href={`/ChiTietDKChoGhepTang?id=${item.Id}`}
                            className="dropdown-item"
                          >
                            <a> Xem chi tiết</a>
                          </Link>
                        </Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      } else {
        dataResult = (
          <div className="col-sm-12" key="2">
            <i>Không có dữ liệu</i>
          </div>
        );
      }
      return dataResult;
    };

    return (
      <>
        <>
          <Head>
            <title>Cổng đăng ký hiến và ghép mô tạng - Bệnh viện Chợ Rẫy</title>
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
        <div className="row">
          <div className="col-sm-12">
            <div className="BoxShowDangKy">
              <div className="TitleBox">
                <span>Hồ sơ đăng ký hiến mô tạng</span>
              </div>
              <div className="ContentBoxDK">
                <div className="row">
                  <ShowDangKyHien />
                </div>
              </div>
            </div>
            <div className="BoxShowDangKy">
              <div className="TitleBox">
                <span>Hồ sơ đăng ký chờ ghép mô tạng</span>
              </div>
              <div className="ContentBoxDK">
                <div className="row">
                  <ShowDangKyGhep />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
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
      <div className="row">
        <div className="col-sm-12">
          <Breadcrumb className="Breadcrumb">
            <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item href="/" className="activeLink">
              {" "}
              Quản lý đăng ký
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <RenderDataMain />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
HsHienGhep.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default connect(mapStateToProps, null)(HsHienGhep);
