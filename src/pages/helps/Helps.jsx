import { Link } from 'react-router-dom';
import "./helps.css"
const Helps = () => {
  return (
    <div className="test">
      <nav className='helps'>
      <h3>
        <Link to="/helps/faq" >
          <i className='element'>Faq</i>
        </Link>
        <Link to="/helps/userGuide" >
          <i className='element'>UserGuide </i>
        </Link>
        <Link to='/helps/technicalSupport' >
          <i className='element'>TechnicalSupport</i>
        </Link>
        <Link to='/helps/videoTutorials' >
          <i className='element'>VideoTutorials</i>
        </Link>
        <Link to='/helps/communityForum' >
          <i className='element'>CommunityForum</i>
        </Link>
        </h3>
    </nav>
    </div>
  )
}

export default Helps