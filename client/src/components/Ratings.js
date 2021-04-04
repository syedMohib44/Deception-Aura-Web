import React, { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import UserService from '../services/user.service';
import RatingForm from "./RatingForm";

const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [hover, setHover] = useState(null);
  const [formPage, setFormPage] = useState(false);


  function postRating(ratingValue) {
    console.log(ratingValue);
    setRating(ratingValue);
    setFormPage(true);
  }
  const p = { ...props };

  //useEffect(() => {
  //calculateRatings(p.productObj._id);
  //});

  //const calculateRatings = (id) => {
  useEffect(() => {
    if (p.productObj) {
      console.log(p.productObj._id);
      UserService.getRatingAvg(p.productObj._id).then(
        (response) => {
          console.log(response.data.result);
          if (response.data.result) {
            setRating(response.data.result.totalRatings);
            setFeedbackCount(response.data.result.count)
          }
          //console.log(response.data.result[0].totalRatings);
          //setRating(response.data.result);
        },
        (error) => {
          console.log(error);
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setRating(_content);
        }
      )
    }
  }, [p.productObj]);


  return (
    <div className='ratings'>
      {[...Array(5)].map((start, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            {
              <input
                type='radio'
                name='rating'
                value={ratingValue}
                onClick={() => postRating(ratingValue)}
              />
            }{
              formPage ?
                <RatingForm
                  show={formPage}
                  product={p.productObj._id}
                  productName={p.productObj.name}
                  business={p.businessId}
                  stars={rating}
                  onHide={() => setFormPage(false)}
                />
                : null
            }
            <FaStar
              className='star'
              color={ratingValue <= (hover || rating) ? '#ffc107' : 'e4e5e9'}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <label>({feedbackCount})</label>
      <label className='avgRating'>({rating})</label>
    </div>
  )
}

export default StarRating;
