import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";

class DangKyHienTang extends Component {
    render() {
        return (
            <>
                <Container id="boxDangKyBanner">
                    <Row>
                        <Col sm={4}>
                            <Link href="/PDKHien">
                                <a>
                                    <div className="box-img-hien-tang">
                                        <img
                                            className="imgItem"
                                            src="/images/anh1.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                            </Link>
                        </Col>
                        <Col sm={4}>
                            <Link href="/PDKGhepCoQuanKhac">
                                <a>
                                    <div className="box-img-hien-tang">
                                        <img
                                            className="imgItem"
                                            src="/images/anh2.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                            </Link>
                        </Col>
                        <Col sm={4}>
                            <Link href="/nhomtin/huongdandangky">
                                <a>
                                    <div className="box-img-hien-tang">
                                        <img
                                            className="imgItem"
                                            src="/images/anh3.jpg"
                                            alt=""
                                        />
                                    </div>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default DangKyHienTang;
