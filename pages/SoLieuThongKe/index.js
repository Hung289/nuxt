import React, { Component } from "react";
import { Row, Col, Container, Breadcrumb } from "react-bootstrap";
import LayoutClient from "../../layouts/LayoutClient";
import Head from "next/head";
const SoLieuThongKe = () => {
  const RenderData = () => {
    return <div> </div>;
  };

  return (
    <>
      <>
        <Head>
          <title>Số liệu thống kê</title>
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
                Số liệu thống kê
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <img width="100%" alt="Đang cập nhật" src="/img/management.png" />
          </div>
        </div>
        <RenderData />
      </Container>
    </>
  );
};
SoLieuThongKe.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default SoLieuThongKe;
