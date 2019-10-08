import React from "react";
import "./footer.scss";
import Logo from "../../images/Tourism_Linkages_Network_Logo.gif";
import Menu from "../../images/icon/menu.svg";
import Close from "../../images/icon/cross.svg";
import footer1 from "../../images/footer1.png";
import footer2 from "../../images/footer2.png";
import footer3 from "../../images/footer3.png";
import footer4 from "../../images/footer4.png";
import footer5 from "../../images/footer5.png";
import f11 from "../../images/f11.png";
import f12 from "../../images/f12.jpg";
import f13 from "../../images/f66.png";
import f14 from "../../images/f99.jpg";
import fb from "../../images/icon/fb.svg";
import twitter from "../../images/twitter/blue_b.svg";
import insta from "../../images/icon/insta.svg";
import { Link } from "react-router-dom";
import mapMain from "../../images/twitter/map-main-color.svg";
import phone from "../../images/twitter/mobile.svg";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const oThis = this;
    let d = new Date();
    let currentYear = d.getFullYear();
    return (
  
      <footer className="container-fluid">
        <div className="detail-footer row">
           <div className="col-md-8 offset-md-2 col-10 offset-1 footer-col">
            <div className="row">
              <div className="col-md-4 col-12  contact-section">
                <div className="content">
                  <div className="top-img">
                    <img src={mapMain} />
                  </div>
                  <span className="top">
                  Tourism Enhancement Fund 
                  <br/>
                  60  Knutford Boulevard 
                  <br/>
                  Kingston 5
                  <br/>
                  Jamaica, West Indies
                  </span>
                </div>
                <div className="content contact">
                  <img src={phone} />
                  <div className="numbers">
                    <a href="tel:(876) 920-4926-30" className="phone">(876) 920-4926-30</a>
                    <a href="tel:(876) 920-4944" className="phone"> (876) 920-4944</a> 
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-12 ">
                <div className="row">
                  <div className="col-md-3 col-6">
                    <div className="">
                      <div className="category-section">
                        <Link to="/food">Food</Link>
                        <Link to="/SPA">SPA</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="">
                      <div className="category-section">
                        <Link to="/fitness">Fitness</Link>
                        <Link to="/shopping">Shopping</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 col-6 footer-links">
                    <div className="row">
                      <div className="social-icons  col-md-12 col-xs-6">
                        <a
                          href="https://www.facebook.com/tefjamaica/"
                          target="_BLANK"
                        >
                          <img src={fb} />
                        </a>
                        <a
                          href="https://www.instagram.com/tefjamaica/"
                          target="_BLANK"
                        >
                          <img src={insta} />
                        </a>
                        <a href="https://twitter.com/TEFJamaica?s=17" target="_BLANK">
                          <img src={twitter} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
            <div className="row footerLogos">
            <div className="footerlinks">
                <div className = "row1">
                    <a href="https://www.visitjamaica.com" target="_BLANK">
                        <img src={footer1} />
                    </a>
                    <a
                          href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                          target="_BLANK"
                    >
                        <img src={footer4} />
                    </a>
                    <a href="https://www.tpdco.org/" target="_BLANKddd"target="_BLANK">
                          <img src={f13} />
                    </a>
                    <a href="http://www.jtbonline.org/" target="_BLANK">
                          <img src={f11} />
                        </a>
                      
                        </div>

                        <div className="row2">
                        <a
                          href="http://www.jamaicatradeandinvest.org"
                          target="_BLANK"
                        >
                          <img
                            className="f9image"
                            src={f14}
                            // style={{ filter: "saturate(8) " }}
                          />
                        </a>
                        <a
                          href="https://www.jmea.org/"
                          target="_BLANK"
                        >
                          <img src={footer2} />
                        </a>
                        <a href="https://www.jbdc.net/" target="_BLANK">
                          <img src={footer3} />
                        </a>
                        <a href="http://www.jhta.org/" target="_BLANK">
                          <img src={footer5} />
                        </a>
                        <a href="https://rada.gov.jm/" target="_BLANK">
                          <img src={f12}/>
                        </a> 

                            
                        </div>                                            
                      </div>

                  <div className="mobile-copyright col-md-12 col-12">                                                          
                    <div className="copyright-text text-center">
                      Copyright © {currentYear}. Developed by the Tourism Linkages Network, 
                      a division of the Tourism Enhancement Fund
                    </div>
                  </div>
                </div>
          </div>
        </div>

        <div className=" row" id ="mobile-footer">
          <div className="col-12 footer-col">
            <div className="row">
              <div className="col-9 m-auto contact-section">
                <div className="content">
                  <div className="top-img">
                    <img src={mapMain} />
                  </div>
                  <span className="top">
                  Tourism Enhancement Fund 
                  <br/>
                  60  Knutford Boulevard 
                  <br/>
                  Kingston 5
                  <br/>
                  Jamaica, West Indies
                  </span>
                </div>
                <div className="content contact">
                  <img src={phone} />
                  <div className="numbers">
                    <a href="tel:(876) 920-4926-30" className="phone">(876) 920-4926-30</a>
                    <a href="tel:(876) 920-4944" className="phone"> (876) 920-4944</a> 
                  </div>
                </div>
              </div>
            </div>
            <div className="row"> 
                <div className="col-9 m-auto ">
                    <div className="row">
                      <div className="col-md-3 col-6">
                        <div className="">
                          <div className="category-section">
                            <Link to="/duty_free">Duty Free</Link>
                            <Link to="/artisan">Artisan</Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 col-6">
                        <div className="">
                          <div className="category-section">
                            <Link to="/crafts">Crafts</Link>
                            <Link to="/retails">Retails</Link>
                          </div>
                        </div>
                      </div>                 
                </div>
            </div>
            </div>

          <div className="mob-footerlinks">
                <div className = "row1">
                    <a href="https://www.visitjamaica.com" target="_BLANK">
                        <img src={footer1} />
                    </a>
                    <a
                          href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                          target="_BLANK"
                    >
                        <img src={footer4} />
                    </a>
                    <a href="https://www.tpdco.org/" target="_BLANKrrr"target="_BLANK">
                          <img src={f13} />
                    </a>
                    <a href="http://www.jtbonline.org/" target="_BLANK">
                          <img src={f11} />
                        </a>
                    <a href="https://rada.gov.jm/" target="_BLANK">
                      <img src={f12}/>
                    </a> 
                </div>

                <div className="row2">
                        <a
                          href="http://www.jamaicatradeandinvest.org"
                          target="_BLANKrrr"
                        >
                          <img
                            className="f9image"
                            src={f14}
                            // style={{ filter: "saturate(8) " }}
                          />
                        </a>
                        <a
                          href="https://www.jmea.org/"
                          target="_BLANK"
                        >
                          <img src={footer2} />
                        </a>
                        <a href="https://www.jbdc.net/" target="_BLANK">
                          <img src={footer3} />
                        </a>
                        <a href="http://www.jhta.org/" target="_BLANK">
                          <img src={footer5} />
                        </a>                                                    
                </div> 
                <div className="row3">
                        <a href="https://www.facebook.com/tefjamaica/"
                         target="_BLANK"
                        >
                            <img src={fb} />
                        </a>
                        <a href="https://www.instagram.com/tefjamaica/"
                           target="_BLANK"
                        >
                            <img src={insta} />
                        </a>
                        <a href="https://twitter.com/TEFJamaica?s=17" target="_BLANK">
                            <img src={twitter} />
                        </a>
                </div>                                           
            </div>

               
            <div className="row">
              <div className="row-2 col-12">
                        </div>
                        <div className="mobile-copyright col-12">                    
                            Copyright © {currentYear}. Developed by the Tourism Linkages Network, 
                            a division of the Tourism Enhancement Fund                                                                   
                        </div>                        
            </div> 
          </div>
        </div>
      </footer>
    );
  }
}
