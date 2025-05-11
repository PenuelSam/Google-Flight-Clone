import BGLight from  "../assets/BGLight.png"
import BGLightMid from  "../assets/BGLightMid.png"
import BGDark from  "../assets/BGDark.png"
import BGDarkMid from  "../assets/BGDarkMid.png"
import { useTheme } from "../context/ThemeContext"



function Banner() {
  const theme = useTheme();
  const isDark = theme.theme === 'dark';
  return (
    <div className=" w-full  h-full md:mt-[4rem] mt-20 ">
       {isDark ? <img src={BGDark} alt=""  className="w-full h-[70%] md:block hidden object-cover"/> : <img src={BGLight} alt=""  className="w-full h-[70%] md:block hidden object-cover"/> }
       {isDark ? <img src={BGDarkMid} alt=""  className="w-full h-full md:hidden block object-cover"/> : <img src={BGLightMid} alt=""  className="w-full h-full md:hidden block object-cover"/> }
    </div>
  )
}

export default Banner
