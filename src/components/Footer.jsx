import React from 'react'
import Applogo from './Applogo'

const Footer = () => {
  return (
    <div className="mainFooter min-w-2xs bottom-0 gap-6 text-glow text-white flex justify-center px-12 py-4 sm:px-8  flex-col bg-gradient-to-r from-black to-black w-full">

              <div className="footer1 flex w-full justify-around gap-y-8  flex-wrap">
             
            <div className="footerSection2  flex flex-col gap-2 justify-center items-center">
             <Applogo/><div className='font-semibold'>&lt; Created By RohanWagh &gt;</div>
            </div>
              </div>
               <div className="line h-[1px] w-full bg-green-950"></div>
              <div className="footer2">
            
                <div className="footer2Section1 list-none flex gap-4 pl-[7%] flex-wrap font-semibold text-white">
                 <li className='hover:cursor-pointer hover:underline text-slate-200'>  Legal</li>
                 <li className='hover:cursor-pointer hover:underline text-slate-200'>Safety & Privacy Center</li>
                  <li className='hover:cursor-pointer hover:underline text-slate-200'>Privacy Policy</li>
                    <li className='hover:cursor-pointer hover:underline text-slate-200'>Cookies</li>
                      <li className='hover:cursor-pointer hover:underline text-slate-200'>About Ads</li>
                        <li className='hover:cursor-pointer hover:underline text-slate-200'>Accessibility</li>
            
            
            
                </div>
                <div className="footer2Section2 text-white font-medium flex justify-end text-glow">© 2025 PassManOP</div>
            
              </div>
            
            </div>
          
  )
}

export default Footer
