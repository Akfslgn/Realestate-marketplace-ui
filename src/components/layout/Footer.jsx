import { MdCopyright } from "react-icons/md";

function Footer() {
  return (
    <div className="text-center">
      <MdCopyright/> {new Date().getFullYear()} Real Estate Marketplace
    </div>
  )
}

export default Footer