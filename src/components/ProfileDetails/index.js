import React, { Component } from 'react';

class ProfileDetails extends Component {
    render() {
        return (
            <div className="main-profile">
                <h5 className="header1a">About me</h5>
                <div class="box space-y-20 about-box">
                <p>
                    I make art with the simple goal of giving you
                    something
                    pleasing to look at for a few seconds.
                </p>
                <div class="row about-row">
                    <div class="col-6">
                        <span className="txt_sm color_text" style={{ fontSize: '14px' }}>Collections</span>
                        <h4 style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>105</h4>
                    </div>
                    <div class="col-6">
                        <span className="txt_sm color_text" style={{ fontSize: '14px' }}>Creations</span>
                        <h4 style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>406</h4>
                    </div>
                </div>
            </div>
            <div class="space-y-10">
									<h5 className="header1a">Follow me</h5>
									<div class="about-box">
										<ul class="social_profile space-y-10 overflow-hidden">
											<li>
												<a href="#" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>
													<i class="ri-facebook-line"></i>
													<span class="color_text" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>facebook/</span>
													@creabik
												</a>
											</li>
											<li>
												<a href="#" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>
													<i class="ri-messenger-line"></i>
													<span class="color_text" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}> messenger/</span>
													@creabik
												</a>
											</li>
											<li>
												<a href="#" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>
													<i class="ri-whatsapp-line"></i>
													<span class="color_text" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}> whatsapp/</span>
													@creabik
												</a>
											</li>
											<li>
												<a href="#" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>
													<i class="ri-youtube-line"></i>
													<span class="color_text" style={{ fontSize: '13px', color: '#183b56', marginTop: '0px' }}>youtube/</span>
													@creabik
												</a>
											</li>
										</ul>
									</div>
								</div>
            </div>
        );
    }
}

export default ProfileDetails;