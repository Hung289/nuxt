export const getCurrentUser = () => {
    let us = {};
    try {
        us = JSON.parse(localStorage.getItem("userInfo"));
    } catch (e) {
        return null;
    }
    return us;
};
export const LogOut=() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
}

export const getToken = () => {
    try {
        const data = localStorage.getItem("token");
        return data;
    } catch (e) {
        return "";
    }
};

export const LoginUser = (userModel) => {
    localStorage.setItem("token", userModel.Token);
    const strPar = JSON.stringify({
        ...userModel,
        userName: userModel.LoginName,
        picture: userModel.Avatar,
        isAdmin: userModel.IsAdmin,
        typeUser: userModel.TypeUser,
    });
    localStorage.setItem("userInfo", strPar);
};
