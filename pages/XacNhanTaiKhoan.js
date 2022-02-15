/* eslint-disable react/no-danger */
import React, { Component, useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Container,
  Breadcrumb,
  Tabs,
  Tab,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import * as Constant from "../Constant/GlobalConstant";
import LayoutClient from "../layouts/LayoutClient";
import Head from "next/head";

const XacNhanTaiKhoan = ({ blog, Status, MessageError }) => {
  const RenderDataMain = () => {
    function DetailHoSo() {
      return (
        <>
          <Row className="boxdangky">
            <Col className="" md={12}>
              <div className="">
                <div className="Title-Login-Register center">
                  XÁC NHẬN TÀI KHOẢN
                </div>
              </div>
              {Status ? (
                <>
                  <RegisterDoneRender />
                </>
              ) : (
                <>
                  <div className="ErroMess">{MessageError}</div>
                </>
              )}
            </Col>
          </Row>
        </>
      );
    }
    return (
      <div className="row">
        <div className="col-sm-12">
          <DetailHoSo />
        </div>
      </div>
    );
  };

  const RegisterDoneRender = () => {
    return (
      <div className="RegisterDoneRender">
        <h3 className="center">Chúc mừng bạn đã hoàn tất đăng ký tài khoản</h3>
        <h4 className="center">Xác nhận tài khoản thành công</h4>
      </div>
    );
  };
  return (
    <>
      <>
        <Head>
          <title>Xác nhận tài khoản</title>
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
        <div className="row">
          <div className="col-sm-12">
            <Breadcrumb className="Breadcrumb">
              <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item href="/" className="activeLink">
                {" "}
                Xác nhận tài khoản
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <RenderDataMain />
      </Container>
    </>
  );
};
export async function getServerSideProps({ query }) {
    const res = await fetch(
      `${Constant.PathServer}/api/Auth/XacNhanTaiKhoan?token=${query.token}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.Status) {
          return json;
        }
      });
    return {
      props: {
        blog: res,
        Status: res.Status,
        MessageError: res.MessageError,
      },
    };
  }
XacNhanTaiKhoan.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default XacNhanTaiKhoan;
