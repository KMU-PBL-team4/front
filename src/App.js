import './App.css';
import MainPage from './pages/mainPage';
import logo from '../src/images/ADs2.png'
import image from "../src/images/mainImg.jpg"


const App = () => {
  return (
    <div className="App">
      <div className='navbar'>
        <div className='main-logo'>
          <a href="/"><img className="logo" src={logo}></img></a>
        </div>
        <div className='navbar-user'>
          <a href='/login'>로그인</a>
          <a href='/join'>회원가입</a>
        </div>
      </div>
      <div className='main-ads'>
        {/* <img src={image}></img> */}
        <span>5400만 + 네이버 유저를 내 사업의 잠재고객으로,</span>
        <h2>네이버 ADs</h2>
      </div>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
