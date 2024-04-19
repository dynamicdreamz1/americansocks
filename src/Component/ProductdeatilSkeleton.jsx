import React from 'react'

export default function ProductdeatilSkeleton() {
  return (
    <div className="container">
        <div className='prouctdetail_skeleton_wrap'>
            <div className="prouctdetail_skeleton_item_left">
                <div className="movie--isloading">
                    <div className="loading-image"></div>
                </div>

                <div className="slider_skeleton">
                    <div className="slider_skeleton_item">
                        <div className="movie--isloading">
                            <div className="loading-image"></div>
                        </div>
                    </div>

                    <div className="slider_skeleton_item">
                        <div className="movie--isloading">
                            <div className="loading-image"></div>
                        </div>
                    </div>

                    <div className="slider_skeleton_item">
                        <div className="movie--isloading">
                            <div className="loading-image"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="prouctdetail_skeleton_item_right">
                <div className="movie--isloading">
                    <div className="loading-content">
                        <div className="loading-text-container">
                            <div className="loading-main-text"></div>
                            <div className="loading-sub-text"></div>
                        </div>
                        <div className="loading-text-container">
                            <div className="loading-main-text"></div>
                            <div className="loading-sub-text"></div>
                        </div>

                        <div className="loading-text-container">
                            <div className="loading-main-text"></div>
                            <div className="loading-sub-text"></div>
                        </div>
                        <div className="loading-text-container">
                            <div className="loading-main-text"></div>
                            <div className="loading-sub-text"></div>
                        </div>

                        <div className="loading-text-container">
                            <div className="loading-main-text"></div>
                            <div className="loading-sub-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="related_slider_skeleton">
                <div className="slider_skeleton_item">
                    <div className="movie--isloading">
                        <div className="loading-image"></div>
                    </div>
                </div>

                <div className="slider_skeleton_item">
                    <div className="movie--isloading">
                        <div className="loading-image"></div>
                    </div>
                </div>

                <div className="slider_skeleton_item">
                    <div className="movie--isloading">
                        <div className="loading-image"></div>
                    </div>
                </div>
            </div>
    </div>
  )
}
