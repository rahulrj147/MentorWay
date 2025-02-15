import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className=" ">
          <div className="rounded-lg ">
          <img
  src={course?.thumbnail}
  alt="course thumbnail"
  className={`w-full ${Height} sm:h-28 md:h-48 lg:h-56 xl:h-64 2xl:h-72 rounded-xl object-cover`}
/>
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl capitalize text-richblack-600">{course?.courseName}</p>
            <p className="text-xl text-richblack-600">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 bold ">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-800">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-600 font-bold">Rs.{course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card
