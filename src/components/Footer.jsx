import React from 'react';
// Import your uploaded logos
import LinkedinLogo from "../images/Linkedin.png";
import GithubLogo from "../images/Github.png";
import LeetcodeLogo from "../images/Leetcode.png";
import InstagramLogo from "../images/Instagram.jpg";

const Footer = () => {
  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      {/* Main Glass Container */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-primary/30">
        
        {/* Branding Section */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tighter">
              PLAYGROUND
            </span>
            <span className="animate-bounce">⛹️</span>
          </div>
       
        </div>

        {/* Vertical Divider (Hidden on mobile) */}
        <div className="hidden md:block h-10 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

        {/* Professional Links */}
        <div className="flex items-center gap-8">
          {[
            { img: LinkedinLogo, url: "https://www.linkedin.com/in/abhishektripathi-stayqrious/" },
            { img: GithubLogo, url: "https://github.com/Stay-Qrious" },
            { img: LeetcodeLogo, url: "https://leetcode.com/u/abhi_tripathi/" },
            { img: InstagramLogo, url: "https://www.instagram.com/abhi_tripathi085/"}
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col items-center gap-2"
            >
              {/* Glowing effect on hover */}
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <img 
                src={social.img} 
                alt={social.label} 
                className="w-7 h-7 object-contain relative z-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:brightness-125" 
              />
              
              <span className="text-[9px] font-bold text-white/30 group-hover:text-primary uppercase tracking-widest transition-colors duration-300">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;