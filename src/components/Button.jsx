import React from 'react'

const Button = ({title , id , containerClass , leftIcon , rightIcon}) => {
    return (
        <button className={`group relative z-10 w-fit bg-violet-50 cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`}>
            {leftIcon}
            <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </button>
    )
}
export default Button
