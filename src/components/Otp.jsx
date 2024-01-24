import React, { useState, useRef } from 'react';
const Otp = ({lobby,otpChange,setOtpChange}) => {
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];


    const handleChange = (index, value) => {
        // Sadece sayıları kontrol et
        const digit = /^\d*$/.test(value) ? value : '';
        const newDigits = [...digits];
        newDigits[index] = digit;
        setDigits(newDigits);
    
        if (digit.length === 0 && index > 0) {
          inputRefs[index - 1].current.focus();
        } else if (digit.length === 1 && index < 5) {
          inputRefs[index + 1].current.focus();
        }
    
        const intdigits=newDigits.join("");
        setOtpChange(intdigits);

      };

      const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');
        const pastedDigits = pastedData.split('').slice(0, 6);
    
        const newDigits = [...digits];
        pastedDigits.forEach((digit, index) => {
          const validDigit = /^\d*$/.test(digit) ? digit : '';
          newDigits[index] = validDigit;
        });
    
        setDigits(newDigits);
        const intdigits=newDigits.join("");
        setOtpChange(intdigits);
       
      };
      
  return (
    <div className='flex items-center justify-center min-[450px]:gap-3 gap-[6px] mb-4'>

      {digits.map((digit, index) => (
        <input
        key={index}
          type="text" // type="number" yerine type="text" kullan
          maxLength={1}
          value={digit}
          ref={inputRefs[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={handlePaste}
          className='mb-4 outline-none bg-app-purple font-semibold rounded-md min-[450px]:w-[50px] min-[450px]:h-[60px] w-[40px] h-[50px] block p-2  text-center min-[450px]:text-4xl text-2xl text-app-white '
          placeholder='0'
        />
      ))}
   </div>
  )
}

export default Otp