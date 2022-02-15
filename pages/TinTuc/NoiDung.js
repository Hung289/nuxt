import React, { Component, useState, useEffect } from "react";
import LayoutClient from "../../layouts/LayoutClient";
import Head from "next/head";
import { Container, Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import * as Constant from "../../Constant/GlobalConstant";
import * as CommonUtility from "../../Common/CommonUtility";
import DsTinMoi from '../../Components/HomeComponents/DsTinMoi';


function NoiDung({ blog }) {
  console.log(blog)
  return (
    <div>
      <Head>
          <title>{blog.Title}</title>
          <meta name="description" content={blog.Description} />
          <meta property="og:title" content={blog.Title} />
          <meta property="og:description" content={blog.Description} />
          <meta property="og:image:alt" content={blog.Title} />
          <meta property="og:image" content={`${Constant.PathServer}/${blog.ImageData}`} />
      </Head>
      <Container>
        <div className="row">
          <div className="col-sm-12">
            <Breadcrumb className="Breadcrumb">
              <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
              <Breadcrumb.Item href="#" className="activeLink">
                {" "}
                Tin tức
              </Breadcrumb.Item>
              {/* <Breadcrumb.Item active>Thông tin về chúng tôi</Breadcrumb.Item> */}
            </Breadcrumb>
          </div>
          <div className=" col-sm-8">
            <div className="text-noidung">
              <div className="class-tieude-tintuc">{blog.Title}</div>
              <p className="ngay-chitiet">
                <i className="far fa-clock" />{" "}
                {CommonUtility.ShowDateVN(blog.PublishTime)}
              </p>
              <p className="text-p-tintuc">{blog.Description}</p>
            </div>
            <div className="textNoiDungTinBai">
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.Content,
                }}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="boxRightHeader">Tin mới</div>
             <DsTinMoi /> 
          </div>
        </div>
      </Container>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `${Constant.PathServer}/api/TinTuc/GetDtoById?id=${query.id}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.Status) {
        return json.Data;
      }
    });
  return {
    props: {
      blog: res,
    },
  };
}

NoiDung.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default NoiDung;
