import React, {Component, useState, useEffect} from 'react';
import {Carousel} from 'react-bootstrap';
import * as Constant from '../../Constant/GlobalConstant';
import {NotFoundImage} from '../../Common/NotFound';

const BannerTop = (props) => {
    const [lstItem, setlstItem] = useState([]);
    const [initDataItem, setinitDataItem] = useState(false);
    const InitData = () => {
        if (initDataItem === false) {
            fetch(`${Constant.PathServer}/api/BannersHome/GetPublishBanner`)
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
        <>
            <Carousel>
                {lstItem.map((item) => {
                    return (
                        <Carousel.Item key={item.Id}>
                            <img
                                className="d-block w-100 bannertop"
                                src={`${Constant.PathServer}${item.ImageSrc}`}
                                onError={NotFoundImage}
                                alt=""
                            />
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </>
    );
};

export default BannerTop;
