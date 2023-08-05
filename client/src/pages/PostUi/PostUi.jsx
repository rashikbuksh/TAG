import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
	FaClock,
	FaHeart,
	FaMapMarkerAlt,
	FaRegComment,
	FaShare,
	FaShoppingCart,
	FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./postui.css";
const PostUi = ({ single, wishlistItem }) => {

    return (
        <div className='grid-product space-mb--20'>
            <Card className=''>
                <Card.Header>
                    <div className=' d-flex align-items-center justify-content-between'>
                        <div className='d-flex gap-3 align-items-center'>
                            <img className=' sellerProfile rounded-circle sellerProfile' src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1684680589~exp=1684681189~hmac=cafa5607e920ec2467a85bab709d5276befd391f36b7a89409199f11f28d0bde" alt="" />
                            <div>
                                <Link
                                    to={
                                        import.meta.env
                                            .VITE_API_PUBLIC_URL +
                                        `/product/${single.id}`
                                    }
                                > <div className='d-flex '>
                                        <h4>Rafi Store</h4><p>@rafiStore23</p>
                                    </div> </Link>
                                <p>10:04 pm <span>5/3/2023</span></p>
                            </div>
                            
                        </div>
                        <div>
                            {/* <h6 className='text-center'>Rating</h6> */}
                            <FaStar className='text-warning fs-4 me-1'></FaStar>
                            <FaStar className='text-warning fs-4 me-1'></FaStar>
                            <FaStar className='text-warning fs-4 me-1'></FaStar>
                            <FaStar className='text-warning fs-4 me-1'></FaStar>
                            <FaStar className='text-warning fs-4 '></FaStar>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <div className=''>
                            <p className='fs-6'> <span><FaShoppingCart></FaShoppingCart></span> Discount Offer: 29% off on all purchases</p>
                            <p className='mt-3'> <span><FaClock></FaClock></span> Duration: This offer is valid from [start date] to [end date].</p>
                            <p className='fs-6'> <span><FaMapMarkerAlt></FaMapMarkerAlt></span>   Location: Groceress Shop outlets nationwide</p>
                        </div>
                    </Card.Text>

					<hr />
					<div className="d-flex justify-content-between">
						<div className="d-flex flex-column align-items-center justify-content-center">
							<div className="ms-1">
								<p>200 Likes</p>
							</div>
							<FaHeart className="fs-4 text-danger text-center "></FaHeart>
						</div>
						<div className="d-flex flex-column align-items-center justify-content-center">
							<div>
								<p>30 comments</p>
							</div>
							<FaRegComment className="fs-4"> </FaRegComment>
						</div>

						<div className="d-flex flex-column align-items-center justify-content-center">
							<div>
								<p>12 share</p>
							</div>
							<FaShare className="fs-4"></FaShare>
						</div>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default PostUi;
