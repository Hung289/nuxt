import React, { Component, useState, useEffect } from "react";
import { NotFoundImage } from "../../Common/NotFound";
import * as Constant from "../../Constant/GlobalConstant";
import * as CommonUtility from "../../Common/CommonUtility";

const DsTinMoi = () => {
    const [lstItem, setlstItem] = useState([]);
    const [intiDataItem, setIntiDataItem] = useState(false);
    const InitData = () => {
        const amt = 5;
        if (!intiDataItem) {
            fetch(`${Constant.PathServer}/api/TinTuc/GetDsTinMoi?amount=${amt}`)
                .then((response) => response.json())
                .then((json) => {
                    if (json.Status) {
                        setlstItem(json.Data);
                    }
                });
        }
        setIntiDataItem(true);
    };
    useEffect(() => {
        InitData();
    }, []);
    return (
        <div className="BoxTinMoi">
            {lstItem.map((item, key) => {
                return (
                    <div className="boxTinBaiItem" key={key}>
                        <div className="box-img-tin-moi">
                            <img
                                src={`${Constant.PathServer}${item.ImageData}`}
                                onError={NotFoundImage}
                                alt=""
                                width="100%"
                                className="imgTinBai"
                            />
                        </div>

                        <a href={`/TinTuc/NoiDung?id=${item.Id}`}>
                            <div className="titleTinBai">{item.Title}</div>
                        </a>
                        <div className="timePublish">
                            <i className="far fa-clock" />{" "}
                            {CommonUtility.ShowDateVN(item.PublishTime)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DsTinMoi;
