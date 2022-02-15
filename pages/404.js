import LayoutClient from "../layouts/LayoutClient";

function Custom404() {
    return (
        <div className="container h500" >
            <h1 className="center">404 - Page Not Found</h1>
        </div>
    );
}
Custom404.getLayout = function getLayout(page) {
    return <LayoutClient>{page}</LayoutClient>;
};
export default Custom404;
