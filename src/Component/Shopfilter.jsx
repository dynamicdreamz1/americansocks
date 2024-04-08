import React from 'react'

export default function Shopfilter() {
  return (
<section class="shop_filter">
    <div class="container">
        <div class="shop_wrap_filter">
            <div class="shop_filter_left">
      
                <a href="javascript:void(0)" class="search_btn">
                    Search By
                </a>
        
                <div class="filter_box">
                    <div class="filter_box_wrap">
                        <h3 class="filter_title">FILTROS</h3>
                        <div class="accordion_item">
                            <div class="accrodion_title">
                                <h4>PRECIOS</h4>
                            </div>
                            <div class="accrodion_content">
                                <div class="filter_price">
                                    <input type="range" id="vol" name="vol" min="0" max="100" />
                                </div>
                            </div>
                        </div>

                        <div class="accordion_item">
                            <div class="accrodion_title">
                                <h4>TALLA</h4>
                            </div>
                            <div class="accrodion_content">
                                <ul class="filter_size">
                                    <li>
                                        <label>
                                            <input type="checkbox" class="filter_checkbox"  />
                                                <span>XS</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" class="filter_checkbox"  />
                                                <span>S</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" class="filter_checkbox"  />
                                                <span>M</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" class="filter_checkbox"  />
                                                <span>L</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="checkbox" class="filter_checkbox"  />
                                                <span>XL</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="accordion_item">
                            <div class="accrodion_title">
                                <h4>color</h4>
                            </div>
                            <div class="accrodion_content">
                                <div class="filter_color">
                                    <span class="color black"></span>
                                    <span class="color yellow"></span>
                                    <span class="color red"></span>
                                    <span class="color purple"></span>
                                    <span class="color darkgreen"></span>
                                    <span class="color blue"></span>
                                    <span class="color green"></span>
                                </div>
                            </div>
                        </div>

                        <div class="accordion_item">
                            <div class="accrodion_title">
                                <h4>COLECCIÓN</h4>
                            </div>
                            <div class="accrodion_content">
                                <div class="filter_collection">
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
   
            <div class="sorting">
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
