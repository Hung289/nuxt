import React, { Component, useState, useEffect } from "react";
import { Container, Button, Row, Col, Breadcrumb } from "react-bootstrap";
import * as Constant from "../../Constant/GlobalConstant";
import { NotFoundImage } from "../../Common/NotFound";
import LayoutClient from "../../layouts/LayoutClient";
import * as CommonUtility from "../../Common/CommonUtility";

function DsTinNhom({ type }) {
  const [lstItem, setlstItem] = useState({ page: 1, data: [] });
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [Category, setCategory] = useState({});
  const amt = 10;

  useEffect(() => {
    fetch(
      `${Constant.PathServer}/api/TinTuc/GetDataByCategory?categoryCode=${type}&amount=${amt}&page=1`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.Status) {
          const lstData = [
            ...lstItem.data,
            ...json.Data.PageDataByCategory.ListItem,
          ];
          const NewObj = {
            ...lstItem,
            data: lstData,
          };
          setCategory(json.Data.Category);
          setlstItem(NewObj);
          if (lstItem.page < json.Data.PageDataByCategory.TotalPage) {
            setIsLoadMore(true);
          } else {
            setIsLoadMore(false);
          }
        }
      });
  }, []);

  const loadMore = () => {
    fetch(
      `${Constant.PathServer}/api/TinTuc/GetDataByCategory?categoryCode=${type}&amount=${amt}&page=${
        lstItem.page + 1
      }`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.Status) {
          if (json.Data.PageDataByCategory.ListItem.length > 0) {
            const lstData = [
              ...lstItem.data,
              ...json.Data.PageDataByCategory.ListItem,
            ];
            const NewObj = {
              page: json.Data.PageDataByCategory.CurrentPage,
              data: lstData,
            };

            setlstItem(NewObj);
            if (json.Data.PageDataByCategory.CurrentPage < json.Data.PageDataByCategory.TotalPage) {
              setIsLoadMore(true);
            } else {
              setIsLoadMore(false);
            }
          }
        }
      });
  };
  return (
    <Container>
      <div className="boder-margin">
        <Breadcrumb className="Breadcrumb">
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="/" className="activeLink">
            {" "}
            {Category.Name}
          </Breadcrumb.Item>
          {/* <Breadcrumb.Item active>Thông tin về chúng tôi</Breadcrumb.Item> */}
        </Breadcrumb>

        {lstItem.data.map((item, key) => {
          const pathLink = `/TinTuc/NoiDung?id=${item.Id}`;
          return (
            <div className="class-timtuc" key={key}>
              <Row>
                <Col md={3}>
                  <img
                    src={`${Constant.PathServer}${item.ImageData}`}
                    onError={NotFoundImage}
                    alt=""
                    className="img-tintuc"
                  />
                </Col>
                <Col md={9}>
                  <a href={pathLink}>
                    <div className="class-tieude-tintuc">{item.Title}</div>
                  </a>
                  <p className="text-p-tintuc">{item.Description}</p>
                  <i className="far fa-clock" />
                  &nbsp;
                  <span>{CommonUtility.ShowDateVN(item.PublishTime)}</span>
                </Col>
              </Row>
            </div>
          );
        })}
        <div className="row">
          {isLoadMore && (
            <div className="col-sm-12 center">
              <Button variant="success" onClick={() => loadMore()}>
                Tải thêm
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const arrrCoQuan = [
    { params: { type: "tim" } },
    { params: { type: "phoi" } },
    { params: { type: "bophankhac" } },
    { params: { type: "mat" } },
    { params: { type: "gan" } },
    { params: { type: "than" } },
  ];

  return { paths: arrrCoQuan, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { type: params.type } };
}

DsTinNhom.getLayout = function getLayout(page) {
  return <LayoutClient>{page}</LayoutClient>;
};
export default DsTinNhom;
