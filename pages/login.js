import React from 'react';
import LayoutClient from '../layouts/LayoutClient';

const login = () => {
    return (
        <div>
            Đăng nhập hệ thống
        </div>
    );
};
login.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default login;