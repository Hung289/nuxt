import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import React, { useEffect, useRef, Component, useState, useMemo } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import * as AuthService from "../../Lib/AuthService";
// import {Link, useHistory, NavLink} from 'react-router-dom';
// import * as AuthenServerService from '@app/services/AuthenServerService';
import * as TypeUserConstant from "../../Constant/TypeUserConstant";
import { confirmAlert } from "react-confirm-alert"; // Import
import { connect } from "react-redux";

import * as AuthAction from "../../redux/actions/AuthAction";

const menuTop = [
  {
    name: "Trang chủ",
    to: "/",
    exact: "true",
    eventKey: "1",
  },
  {
    name: "Giới thiệu",
    to: "/GioiThieu",
    exact: "true",
    eventKey: "2",
  },
  {
    name: "Tin tức",
    to: "/TinTuc",
    exact: "true",
    eventKey: "3",
  },
  {
    name: "Số liệu thống kê",
    to: "/SoLieuThongKe",
    exact: "true",
    eventKey: "4",
  },
  {
    name: "Hỏi đáp",
    to: "/HoiDap",
    exact: "true",
    eventKey: "5",
  },
  {
    name: "Liên hệ",
    to: "/LienHe",
    exact: "true",
    eventKey: "6",
  }
];

const Header = (props) => {
  const history = useRouter();
  const [user, setUser] = useState({});
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const { onLogOut, CurrentUserInfo } = props;
  //Contructor
  useEffect(() => {
    // const dataUser = AuthService.getCurrentUser();
    // setUser(dataUser);
    // if (dataUser && dataUser.userDto) {
    //     setisLoggedIn(true);
    // }
    if (CurrentUserInfo && CurrentUserInfo.userDto) {
      setisLoggedIn(true);
    }
  }, [CurrentUserInfo]);
  // useEffect(() => {
  //     AuthenServerService.GetProfile().then((response) => {
  //         if (response.Status) onUserLoad({...response});
  //     });

  //     // return () => {
  //     //     cleanup
  //     // }
  // }, []);

  const LogOutAction = (id) => {
    confirmAlert({
      title: "Đăng xuất khỏi hệ thống?",
      message: "Bạn chắc chắn muốn đăng xuất khỏi tài khoản này.",
      buttons: [
        {
          label: "Xác nhận",
          onClick: () => {
            AuthService.LogOut();
            location.href = "/";
            onLogOut();
            // history.push("/");
          },
        },
        {
          label: "Đóng",
          onClick: () => {},
        },
      ],
    });
  };
  const ShowBtnLogin = () => {
    return (
      <>
        <Nav.Item key={8}>
          <Link href="/LoginUser">
            <a className="menuItem nav-link">Đăng nhập</a>
          </Link>
        </Nav.Item>
        <Nav.Item key={9}>
          <Link href="/dangky">
            <a className="menuItem nav-link">Đăng ký</a>
          </Link>
        </Nav.Item>
      </>
    );
  };

  const ShowLogedAdmin = () => {
    return (
      <>
        <Nav.Item key={10}>
          <Link href="http://dkgt.hihihaha.biz/admin">
            <a className="menuItem nav-link">Trang quản lý</a>
          </Link>
        </Nav.Item>
        <Nav.Item key={11}>
          <div
            type="button"
            className="menuItem nav-link "
            onClick={LogOutAction}
          >
            Đăng xuất
          </div>
        </Nav.Item>
      </>
    );
  };

  const ShowLogedClient = () => {
    return (
      <>
        <Nav.Item key={12}>
          <Link href="/HsHienGhep">
            <a className="menuItem nav-link">Trang quản lý</a>
          </Link>
        </Nav.Item>
        <Nav.Item key={11}>
          <div
            type="button"
            className="menuItem nav-link "
            onClick={LogOutAction}
          >
            Đăng xuất
          </div>
        </Nav.Item>
      </>
    );
  };
  const showMenu = (menus) => {
    let reslt = null;
    if (menus.length > 0) {
      reslt = menus.map((item, key) => {
        return (
          <Nav.Item key={key}>
            <Link href={item.to}>
              <a className="menuItem nav-link">{item.name}</a>
            </Link>
          </Nav.Item>
        );
      });
    }
    return reslt;
  };
  const LogInLogOut = () => {
    if (isLoggedIn) {
      if (
        CurrentUserInfo !== null &&
        CurrentUserInfo.TypeUser === TypeUserConstant.NguoiDangKy
      ) {
        return <ShowLogedClient />;
        // eslint-disable-next-line no-else-return
      } else if (
        CurrentUserInfo !== null &&
        CurrentUserInfo.TypeUser === TypeUserConstant.CanBoQuanLy
      ) {
        return <ShowLogedAdmin />;
      }
    }
    return <ShowBtnLogin />;
  };

  return (
    <div className="border-bt-header">
      <Container>
        <Navbar bg="light" expand="md" collapseOnSelect>
          <Link href="/">
            <a id="header-navbar">
              <Navbar.Brand>
                <div className="LogoBox">
                  <div className="LogoBoxItem">
                    <img src="/img/logo2.png" className="logoHome" alt="logo" />
                  </div>
                  <div className="LogoBoxItem logobox2">
                    <img
                      src="/img/LGTN2.png"
                      className="logoHome"
                      alt="logo2"
                    />
                  </div>
                  <div className="LogoBoxItem">
                    <img src="/img/LGTN.png" className="logoHome" alt="logo3" />
                  </div>
                  <div className="NameBoxItem">
                    <h2>Cổng đăng ký</h2>
                    <h1>Hiến và ghép mô tạng</h1>
                  </div>
                  <div className="menu-bar-top menu-mobie">
                    <Navbar.Toggle aria-controls="basic-navbar-nav-top" />
                  </div>
                </div>
              </Navbar.Brand>
            </a>
          </Link>
          <div className="menu-bar-top menu-desktop">
            <Navbar.Toggle aria-controls="basic-navbar-nav-top" />
          </div>
          <Navbar.Collapse
            id="basic-navbar-nav-top"
            className="hidden-sm hidden-md hidden-lg"
          >
            <Nav>
              {showMenu(menuTop)}
              <LogInLogOut />
            </Nav>
          </Navbar.Collapse>
          <div className="boxTopRight">
            <fieldset>
              <legend>Dành cho:</legend>
              <ul className="boxtop-ul">
                <li className="boxtop-li">
                  <Link href="/PDKHien">
                    <a>Người đăng ký hiến mô tạng</a>
                  </Link>
                </li>
                <li className="boxtop-li">
                  <Link href="/PDKGhep">
                    <a>Người bệnh chờ ghép thận</a>
                  </Link>
                </li>
                <li className="boxtop-li">
                  <Link href="/PDKGhepCoQuanKhac">
                    <a>Người bệnh chờ ghép các cơ quan khác</a>
                  </Link>
                </li>
              </ul>
            </fieldset>
          </div>
        </Navbar>
      </Container>
      <div className="menu-bar-bottom">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="container">
          <Nav className="">
            {showMenu(menuTop)}
            <LogInLogOut />
          </Nav>
        </div>
      </Navbar.Collapse>
    </div>
  );
};

const mapStateToProps = (state) => ({
  CurrentUserInfo: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () =>
    dispatch({
      type: AuthAction.AUTH_LOGOUT,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
