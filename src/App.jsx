import { Routes, Route, Navigate } from "react-router-dom"
import { Navbar, Footer, ScrollToTop } from "ifamished-ui"

import Home from "./pages/Home"
import Email from "./pages/guides/Email"

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/guides", label: "Guides" },
  { to: "/guides/email", label: "Email Guide" },
]

const socials = [
  { label: "Discord", href: "https://discord.com/users/iFamished" },
]

export default function App() {
  return (
    <>
      <Navbar
        brand="HungerNet"
        brandDotColor="#38bdf8"
        navItems={navItems}
      />

      {/* Scroll reset on route change */}
      <ScrollToTop />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guides/:email" element={<Email />} />
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
