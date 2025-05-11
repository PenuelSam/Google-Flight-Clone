import Banner from "../components/Banner";

import SearchForm from "../components/SearchForm";
import Section2 from "../components/Section2";




export default function Home() {

  return (
    <div className="relative">
      <div className="relative">
      <Banner />
      <SearchForm variant="default"/>
      </div>       
        <Section2 />
    </div>
  )
}
