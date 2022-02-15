import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import * as Constant from '../../Constant/GlobalConstant';
import {NotFoundImage} from '../../Common/NotFound';

const ThongTinYKhoa = (props) => {
    const [lstItem, setlstItem] = useState([]);
    const [initDataItem, setinitDataItem] = useState(false);
    const InitData = () => {
        if (initDataItem === false) {
            const amt = 3;
            const code = 'ThongTinYKhoa';
            fetch(
                `${Constant.PathServer}/api/TinTuc/GetPublishOfCategory?cateCode=${code}&amount=${amt}`
            )
                .then((response) => response.json())
                .then((json) => {
                    if (json.Status) {
                        setlstItem(json.Data);
                    }
                });
        }
        setinitDataItem(true);
    };
    useEffect(() => {
        InitData();
    });

    return (
        <Container id="boxTinBai">
            <Row>
                <Col>
                    <h3 className="headerComponent">Thông tin y khoa</h3>
                </Col>
            </Row>
            <Row>
                {lstItem.map((item, key) => {
                    return (
                        <Col sm={4} key={key}>
                            <div className="boxTinBaiItem">
                                <div className="container-image">
                                    <img
                                        src={`${Constant.PathServer}${item.ImageData}`}
                                        onError={NotFoundImage}
                                        alt=""
                                        width="100%"
                                        className="imgTinBai"
                                    />
                                </div>
                                
                                <a href={`/TinTuc/NoiDung?id=${item.Id}`}>
                                    <div className="titleTinBai">
                                        {item.Title}
                                    </div>
                                </a>
                                <div className="desTinBai">
                                    {item.Description}
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default ThongTinYKhoa;
