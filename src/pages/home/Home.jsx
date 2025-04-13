import "./home.css"
import ReportList from "../../components/reports/ReportList"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchReports } from "../../redux/apiCalls/reportApiCall"
import Dashboard from "./Dashboard"
import Portfolio from "../../components/sidebar/Portfolio"

const Home = () => {
  const dispatch = useDispatch()
  const { reports } = useSelector(state => state.report)

  useEffect(() => {
    dispatch(fetchReports(1))
  }, [])

  return (
    <section className='home'>

      <div className="home-hero-header">
        <div className="home-hero-header-layout">
           <h1 className="home-title">
           Welcome to <br /><span>Salllla7 bleediiii</span>
           </h1>
        </div>
      </div>

      <div className="home-latest-report">Latest Issus</div>      
      <div className="home-container">
        <ReportList reports={reports} />
      </div>
      
      <Dashboard />
      <Portfolio />

    
    </section>
  )
}

export default Home