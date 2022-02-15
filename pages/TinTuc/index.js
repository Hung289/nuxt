import React, { useEffect, useRef, Component, useState, useMemo } from "react";
import LayoutClient from "../../layouts/LayoutClient";
import { NotFoundImage } from "../../Common/NotFound";
import Head from "next/head";
import * as CommonUtility from "../../Common/CommonUtility";
import { Container, Button, Row, Col, Breadcrumb } from "react-bootstrap";
import * as Constant from "../../Constant/GlobalConstant";
import { CanBoQuanLy } from "../../Constant/TypeUserConstant";
import InfiniteScroll from "react-infinite-scroll-component";
const TinTuc = () => {
    const [lstItem, setlstItem] = useState({ page: 1, data: [] });
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);

    const amt = 10;

    useEffect(() => {
        fetch(
            `${Constant.PathServer}/api/TinTuc/GetPublish?amount=${amt}&page=${lstItem.page}`
        )
            .then((response) => response.json())
            .then((json) => {
                if (json.Status) {
                    const lstData = [...lstItem.data, ...json.Data.ListItem];
                    const NewObj = {
                        ...lstItem,
                        data: lstData,
                    };
                    console.log(NewObj);
                    if (lstItem.page < json.Data.TotalPage) {
                        setIsLoadMore(true);
                    } else {
                        setIsLoadMore(false);
                    }
                    setlstItem(NewObj);
                }
            });
    }, []);

    const loadMore = () => {
        setIsSpinner(true);
        fetch(
            `${Constant.PathServer}/api/TinTuc/GetPublish?amount=${amt}&page=${
                lstItem.page + 1
            }`
        )
            .then((response) => response.json())
            .then((json) => {
                if (json.Status) {
                    if (json.Data.ListItem.length > 0) {
                        const lstData = [
                            ...lstItem.data,
                            ...json.Data.ListItem,
                        ];

                        const NewObj = {
                            page: json.Data.CurrentPage,
                            data: lstData,
                        };

                        setlstItem(NewObj);
                        setIsSpinner(false);
                        if (json.Data.CurrentPage < json.Data.TotalPage) {
                            setIsLoadMore(true);
                        } else {
                            setIsLoadMore(false);
                        }
                    }
                }
            });
    };
    // function myFunc(e) {
    //     console.log(e.target.documentElement.scrollTop);
    //     console.log(window.innerHeight);
    //     console.log(e.target.documentElement.scrollHeight);
    //     console.log("-----------------------------------");
    //     if (
    //         Math.ceil(e.target.documentElement.scrollTop) +
    //             window.innerHeight ===
    //         e.target.documentElement.scrollHeight
    //     ) {
    //         console.log("dsdsd");
    //         console.log(lstItem.page);
    //         console.log(lstItem.data);

    //         fetch(
    //             `${
    //                 Constant.PathServer
    //             }/api/TinTuc/GetPublish?amount=${amt}&page=${lstItem.page + 1}`
    //         )
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 console.log(json);
    //                 if (json.Status) {
    //                     if (json.Data.ListItem.length > 0) {
    //                         const lstData = [
    //                             ...lstItem.data,
    //                             ...json.Data.ListItem,
    //                         ];
    //                         console.log(lstData);
    //                         const NewObj = {
    //                             page: json.Data.CurrentPage,
    //                             data: lstData,
    //                         };
    //                         console.log(NewObj);
    //                         setIsLoadMore(true);
    //                         if (lstItem.page <= json.Data.TotalPage) {
    //                             console.log("aaaaaa");
    //                             setlstItem(NewObj);
    //                         }
    //                     }
    //                 }
    //             });
    //     }
    // }
    // useEffect(() => {
    //     const watchScroll = async () => {
    //         window.addEventListener("scroll", (e) => myFunc(e));
    //     };
    //     watchScroll();
    //     return () => {
    //         window.removeEventListener("scroll",(e) => myFunc(e));
    //     };
    // }, [lstItem]);

    return (
        <>
            <>
                <Head>
                    <title>Tin Tức</title>
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
            <Container className="lisst">
                <div className="row">
                    <div className="col-sm-12">
                        <Breadcrumb className="Breadcrumb">
                            <Breadcrumb.Item href="/">
                                Trang chủ
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="/" className="activeLink">
                                {" "}
                                Tin tức
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={lstItem.data.length}
                    next={loadMore}
                    hasMore={true}
                    
                    refreshFunction={loadMore}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>
                            &#8595; Pull down to refresh
                        </h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>
                            &#8593; Release to refresh
                        </h3>
                    }
                >
                    {lstItem.data.map((item, key) => {
                        const pathLink = `/TinTuc/NoiDung?id=${item.Id}`;
                        return (
                            <Row className="class-timtuc" key={key}>
                                <Col md={3} sm={4}>
                                    <div className="box-img-tintuc">
                                        <img
                                            src={`${Constant.PathServer}${item.ImageData}`}
                                            onError={NotFoundImage}
                                            alt=""
                                            className="img-tintuc"
                                        />
                                    </div>
                                </Col>
                                <Col md={9} sm={8}>
                                    <a href={pathLink}>
                                        <div className="class-tieude-tintuc">
                                            {item.Title}
                                        </div>
                                    </a>
                                    <p className="text-p-tintuc">
                                        {item.Description}
                                    </p>
                                    <i className="far fa-clock" />
                                    &nbsp;
                                    <span>
                                        {CommonUtility.ShowDateVN(
                                            item.PublishTime
                                        )}
                                    </span>
                                </Col>
                            </Row>
                        );
                    })}
                </InfiniteScroll>
                <div className="row">
                    {isLoadMore && (
                        <div className="col-sm-12 center loadMore">
                            <Button
                                variant="primary"
                                onClick={() => loadMore()}
                            >
                                {isSpinner ? (
                                    <i className="fas fa-spinner loadmore-spinner" />
                                ) : (
                                    "Tải thêm"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

TinTuc.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default TinTuc;
