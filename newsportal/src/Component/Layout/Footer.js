export default function Footer() {
    return (
        <>
            <footer>
                {/* Footer Start*/}
                <div className="footer-area footer-padding fix">
                    <div className="container">
                        <div className="row d-flex justify-content-between">
                            <div className="col-xl-5 col-lg-5 col-md-7 col-sm-12">
                                <div className="single-footer-caption">
                                    <div className="single-footer-caption">
                                        {/* logo */}
                                        <div className="footer-logo">
                                            <a href="index.html">
                                                <img
                                                    src="/assets/img/hero/newslogo.png"
                                                    alt="Satyavani Logo"
                                                    style={{
                                                        height: "150px",
                                                        width: "150px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        border: "2px solid #ffffff",
                                                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
                                                    }}
                                                />
                                            </a>
                                        </div>
                                        <div className="footer-tittle">
                                            <div className="footer-pera">
                                                <p>
                                                    Suscipit mauris pede for con sectetuer sodales adipisci for
                                                    cursus fames lectus tempor da blandit gravida sodales
                                                    Suscipit mauris pede for con sectetuer sodales adipisci for
                                                    cursus fames lectus tempor da blandit gravida sodales
                                                    Suscipit mauris pede for sectetuer.
                                                </p>
                                            </div>
                                        </div>
                                        {/* social */}
                                        <div className="footer-social">
                                            <a href="#">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-instagram" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-facebook" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4  col-sm-6">
                                <div className="single-footer-caption mt-60">
                                    <div className="footer-tittle">
                                        <h4>Newsletter</h4>
                                        <p>Heaven fruitful doesn't over les idays appear creeping</p>
                                        {/* Form */}
                                        <div className="footer-form">
                                            <div id="mc_embed_signup">
                                                <form
                                                    target="_blank"
                                                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                                                    method="get"
                                                    className="subscribe_form relative mail_part"
                                                >
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="newsletter-form-email"
                                                        placeholder="Email Address"
                                                        className="placeholder hide-on-focus"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = ' Email Address '"
                                                    />
                                                    <div className="form-icon">
                                                        <button
                                                            type="submit"
                                                            name="submit"
                                                            id="newsletter-submit"
                                                            className="email_icon newsletter-submit button-contactForm"
                                                        >
                                                            <img src="assets/img/logo/form-iocn.png" alt="" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-10 info" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                                <div className="single-footer-caption mb-50 mt-60">
                                    <div className="footer-tittle">
                                        <h4>Instagram Feed</h4>
                                    </div>
                                    <div className="instagram-gellay">
                                        <ul className="insta-feed">
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/post/instra1.jpg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/post/instra2.jpg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/post/instra3.jpg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/post/instra4.jpg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/post/instra5.jpg" alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="assets/img/post/instra6.jpg" alt="" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* footer-bottom aera */}
                <div className="footer-bottom-area">
                    <div className="container">
                        <div className="footer-border">
                            <div className="row d-flex align-items-center justify-content-between">
                                <div className="col-lg-6">
                                    <div className="footer-copy-right">
                                        <p>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                            Copyright © All rights reserved | This template is made with{" "}
                                            <i className="ti-heart" aria-hidden="true" /> by{" "}
                                            <a href="https://colorlib.com" target="_blank">
                                                Colorlib
                                            </a>
                                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="footer-menu f-right">
                                        <ul>
                                            <li>
                                                <a href="#">Terms of use</a>
                                            </li>
                                            <li>
                                                <a href="#">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="#">Contact</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer End*/}
            </footer>

        </>
    )
}