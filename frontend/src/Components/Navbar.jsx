import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  function handleLogout(){
    localStorage.removeItem("LoggedInUserData");
    localStorage.setItem("isUserLoggedIn", JSON.stringify(false));

    navigate("/");
  }
  

  return (
    <div className='navbar_component'>
      <ul className='list_content'>
        <li>
            <Link to="/dashboard">HOME</Link>
        </li>
        <li>
            <Link to="table">DOWNLOAD - STATEMENT</Link>
        </li>
        <li>
             <Link to="#" className='logout_button' onClick={handleLogout}>LOGOUT</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
