/* eslint-disable react/no-danger */
import React, { Component, useState, useEffect } from "react";
import { Row, Col, Container, Breadcrumb } from "react-bootstrap";
import * as Constant from "../../Constant/GlobalConstant";
import LayoutClient from "../../layouts/LayoutClient";
import Head from "next/head";

const GioiThieu = () => {
  const RenderDataMain = () => {
    const [lstItem, setlstItem] = useState({});
    const [initDataItem, setInitDataItem] = useState(false);
    const InitData = () => {
      if (!initDataItem) {
        fetch(`${Constant.PathServer}/api/TinTuc/GetBaiGioiThieu`)
          .then((response) => response.json())
          .then((json) => {

            console.log(json)
            if (json.Status) {
              setlstItem(json.Data);
            }
          });
        setInitDataItem(true);
      }
    };
    InitData();
    return (
      <>
        <>
          <Head>
            <title>{lstItem.Title}</title>
            <meta name="description" content={lstItem.Description} />
            <meta property="og:title" content={lstItem.Title} />
            <meta property="og:description" content={lstItem.Description} />
            <meta property="og:image:alt" content={lstItem.Title} />
            <meta
              property="og:image"
              content={`${Constant.PathServer}/${lstItem.ImageData}`}
            />
          </Head>
        </>
        <div className="row">
          <div className="col-sm-12">
            <div className="textNoiDungGioiThieuTinBai">
              <div
                dangerouslySetInnerHTML={{
                  __html: lstItem.Content,
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Container>
        <div className="row">
          <div className="col-sm-12">
            <Breadcrumb className="Breadcrumb">
              <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item href="/" className="activeLink">
                {" "}
                Giới thiệu
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <RenderDataMain />
      </Container>
    </>
  );
};
GioiThieu.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default GioiThieu;
