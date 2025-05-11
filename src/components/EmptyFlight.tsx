import {Flight} from '@mui/icons-material'
import { useTheme } from '../context/ThemeContext'

export default function EmptyFlight() {
    const theme = useTheme()
    const isDark = theme.theme === 'dark'
  return (
    <div className="w-full h-full  flex flex-col pb-32 mt-10 items-center justify-center">
      <Flight className={`${isDark ? 'text-gray-400' : 'text-[#333]'} w-full h-full`} sx={{fontSize: '10rem'}} />
        <div className={`${isDark ? 'text-gray-400' : 'text-[#333]'}  text-2xl font-bold`}>No Flights Found</div>
    </div>
  )
}
