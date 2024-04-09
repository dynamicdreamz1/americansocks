import React from 'react'

export default function Shopfilter() {
  return (
<section className="shop_filter">
    <div className="container">
        <div className="shop_wrap_filter">
            <div className="shop_filter_left">
      
                <a href="javascript:void(0)" className="search_btn">
                    Search By
                </a>
        
                <div className="filter_box">
                    <div className="filter_box_wrap">
                        <h3 className="filter_title">FILTROS</h3>
                        <div className="accordion_item">
                            <div className="accrodion_title">
                                <h4>PRECIOS</h4>
                            </div>
                            <div className="accrodion_content">
                                <div className="filter_price">
                                    <input type="range" id="vol" name="vol" min="0" max="100" />
                                </div>
                            </div>
                        </div>

                        <div className="accordion_item">
                            <div className="accrodion_title">
                                <h4>TALLA</h4>
                            </div>
                            <div className="accrodion_content">
                                <ul className="filter_size">
                                    <li>
                                        <label>
                                            <input type="checkbox" className="filter_checkbox"  />
                                                <span>XS</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" className="filter_checkbox"  />
                                                <span>S</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" className="filter_checkbox"  />
                                                <span>M</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" className="filter_checkbox"  />
                                                <span>L</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" className="filter_checkbox"  />
                                                <span>XL</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="accordion_item">
                            <div className="accrodion_title">
                                <h4>color</h4>
                            </div>
                            <div className="accrodion_content">
                                <div className="filter_color">
                                    <span className="color black"></span>
                                    <span className="color yellow"></span>
                                    <span className="color red"></span>
                                    <span className="color purple"></span>
                                    <span className="color darkgreen"></span>
                                    <span className="color blue"></span>
                                    <span className="color green"></span>
                                </div>
                            </div>
                        </div>

                        <div className="accordion_item">
                            <div className="accrodion_title">
                                <h4>COLECCIÓN</h4>
                            </div>
                            <div className="accrodion_content">
                                <div className="filter_collection">
                                    <p>SS24</p>
                                    <p>FW23</p>
                                    <p>SS23</p>
                                    <p>FW22</p>
                                    <p>SS22</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
   
            <div className="sorting">
                <select >
                    <option >Default sorting</option>
                    <option >Date</option>
                    <option >A to Z</option>
                </select>
            </div>
        </div>
    </div>
</section>
  )
}
