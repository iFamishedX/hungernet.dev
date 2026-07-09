import { Routes, Route, Navigate } from "react-router-dom"
import { Navbar, Footer, ScrollToTop } from "ifamished-ui"

import Home from "./pages/Home"
import Email from "./pages/tools/Email"
import SRVGenerator from "./pages/tools/SRVGenerator"

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/tools/email", label: "Email Guide" },
  { to: "/tools/srv-generator", label: "SRV Generator" },
]

const socials = [
  { label: "Discord", href: "https://discord.com/users/iFamished" },
]

export default function App() {
  return (
    <>
      <Navbar
        brand="HungerNet"
        brandDotColor="#38f8cf"
        navItems={navItems}
      />

      {/* Scroll reset on route change */}
      <ScrollToTop />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/email" element={<Email />} />
          <Route path="/tools/srv-generator" element={<SRVGenerator />} />
        </Routes>
      </div>

      <Footer
        brand="HungerNet"
        socials={socials}
        footerNote={`© ${new Date().getFullYear()} HungerNet. All rights reserved.`}
      />
    </>
  )
}
