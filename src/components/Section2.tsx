import Map from '../assets/map.jpg'
import img1 from '../assets/imgI.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'

const travels = [
    {
        name: 'Los Angeles',
        date: 'May 31 — Jun 9',
        stops: '2 stops23 hr',
        price: '$1,371',
        image: img1
    },
    {
        name: 'Lisbon',
        date: 'May 19 — May 25',
        stops: '1 stop10 hr 35 min',
        price: '$874',
        image: img2
    },
    {
        name: 'London',
        date: 'Oct 5 — Oct 14',
        stops: '1 stop9 hr 20 min',
        price: '$689',
        image: img3
    },
    {
        name: 'Cape Town',
        date: 'Aug 22 — Aug 28',
        stops: '2 stops23 hr',
        price: '$1,371',
        image: img4
    },
]

function Section2() {
  return (
    <div className="max-w-[990px] mx-auto md:w-full w-[95%]  h-full  flex flex-col md:gap-7 gap-5 mb-10 md:mt-[14rem] mt-[4rem]">
      <h1 className="md:text-[1.3rem] text-[1rem] dark:text-white text-[#333] font-bold md:tracking-[0.02em] pl-2">Find cheap flights from Lagos to anywhere</h1>
      <div className="w-full h-[400px]   ">
        <img src={Map} alt='' className='w-full h-full object-cover rounded-[1.5rem]'/>
      </div>
      <div className="w-full flex md:flex-row flex-col md:items-center justify-between">
      {travels.map((travel, index) => (
        <div key={index} className='mt-5 flex  md:flex-col'>
        
           <div className="md:w-[230px] w-[220px] h-[120px]  "><img src={travel.image} alt="" className='w-full h-full object-cover rounded-[1.5rem]'/></div>
            <div className="pl-2 flex w-full justify-between">
                <div>
                <h1 className="text-[1rem] dark:text-white text-[#333] font-bold tracking-[0.02em] pt-2">{travel.name}</h1>
                <p className="text-[#333] dark:text-[#f3f3f3] text-[0.9rem]">{travel.date}</p>
                <p className="text-[#333] dark:text-[#f3f3f3] text-[0.9rem]">{travel.stops}</p>
                </div>

                <div>
           <p className="text-[#333] pt-2 dark:text-[#f3f3f3] text-[0.9rem]">{travel.price}</p>
           </div>
            </div>
           

           
        </div>
      ))}
      </div>
      
    </div>
  )
}

export default Section2
