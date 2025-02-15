import React from "react";
import ContactUsForm from "./ContactUsForm";
import HighlightText from "../core/HomePage/HighlightText";


const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-800 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-600">
        <HighlightText text={"Got a Idea?"} ></HighlightText> We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;