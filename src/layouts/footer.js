"use client";
import {useState, useEffect} from 'react';
import { Footer } from "flowbite-react";

function FooterBar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
 useEffect(() => {
    // Update the currentYear state when the component mounts
    // This ensures that the year is updated when the component is first rendered
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount



  return (
    <Footer
      container
      className="fixed bottom-0 w-full z-50 rounded-none h-10"
      style={{ backgroundColor: "rgba(1, 9, 34, 0.80)" }}
    >
      <Footer.Copyright href="https://www.ruh.ac.lk" by="University of Ruhuna™" year={currentYear}  className="text-white"/>
      <Footer.LinkGroup>
        <Footer.Link href="#">
          <span className="text-white">About</span>
        </Footer.Link>
        <Footer.Link href="#">
          <span className="text-white">Privacy Policy</span>
        </Footer.Link>
        <Footer.Link href="#"><span className="text-white">Licensing</span></Footer.Link>
        <Footer.Link href="#"><span className="text-white">Contact</span></Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterBar;
