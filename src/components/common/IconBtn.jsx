export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center hover:scale-105 transition-all duration-200
           ${
          outline ? "border border-white bg-transparent" : "bg-blue-200"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-white"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }