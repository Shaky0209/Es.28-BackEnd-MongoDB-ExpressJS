import MyNav from './Components/Navbar/MyNav.jsx';
import Home from './Pages/Home/Home.jsx';
import GetAuth from './Pages/AuthPages/GetAuth/GetAuth.jsx';
import PutAuth from './Pages/AuthPages/PutAuth/PutAuth.jsx';
import PostAuth from './Pages/AuthPages/PostAuth/PostAuth.jsx';
import GetBlog from './Pages/BlogPages/GetBlog/GetBlog.jsx';
import PutBlog from './Pages/BlogPages/PutBlog/PutBlog.jsx';
import PostBlog from './Pages/BlogPages/PostBlog/PostBlog.jsx';
import AuthorsPatchPage from './Pages/PatchPage/AuthorsPatchPage.jsx';
import PostsPatchPage from './Pages/PatchPage/PostsPatchPage.jsx';
import PostDetails from '../src/Pages/BlogPages/PostDetails/PostDetails.jsx';
import AuthorDetails from './Pages/AuthPages/AuthorDetails/AuthorDetails.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage/RegisterPage.jsx';
import MyFooter from './Components/MyFooter/MyFooter.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import StorageContextProvider from './Context/StorageContextProvider.jsx';
import UserContextProvider from './Context/UserContextProvider.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
      <StorageContextProvider>
        <MyNav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          {/* Authors Routes  */}
          <Route path='/api/authors/GET' element={<GetAuth/>} />
          <Route path='/api/authors/GET/:id' element={<GetAuth/>} />
          <Route path='/api/authors/POST' element={<PostAuth/>} />
          <Route path='/api/authors/PUT' element={<PutAuth/>} />
          <Route path='/api/authors/PUT/:id' element={<PutAuth/>} />
          <Route path='/api/authors/:id/avatar' element={<AuthorsPatchPage />} />
          <Route path='/api/authors/details/:id' element={<AuthorDetails />} />
          {/* Blog Routes  */}
          <Route path='/blog/post/GET' element={<GetBlog/>} />
          <Route path='/blog/post/GET/:id' element={<GetBlog/>} />
          <Route path='/blog/post/POST' element={<PostBlog/>} />
          <Route path='/blog/post/PUT' element={<PutBlog/>} />
          <Route path='/blog/post/PUT/:id' element={<PutBlog/>} />
          <Route path='/blog/post/:id/cover' element={<PostsPatchPage />} />
          <Route path='/blog/post/details/:id' element={<PostDetails />} />
          {/* User Login - Register*/}
          <Route path='/user/login/' element={<LoginPage />} />
          <Route path='/user/register/' element={<RegisterPage/>} />
        </Routes>
        <MyFooter/>
      </StorageContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}