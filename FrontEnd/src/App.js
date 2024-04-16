import MyNav from './Components/Navbar/MyNav.jsx';
import Home from './Pages/Home/Home.jsx';
import GetAuth from './Pages/AuthPages/GetAuth/GetAuth.jsx';
import PutAuth from './Pages/AuthPages/PutAuth/PutAuth.jsx';
import PostAuth from './Pages/AuthPages/PostAuth/PostAuth.jsx';
import GetBlog from './Pages/BlogPages/GetBlog/GetBlog.jsx';
import PutBlog from './Pages/BlogPages/PutBlog/PutBlog.jsx';
import PostBlog from './Pages/BlogPages/PostBlog/PostBlog.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <MyNav/>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* Authors Routes  */}
        <Route path='/api/authors/GET' element={<GetAuth/>} />
        <Route path='/api/authors/GET/:id' element={<GetAuth/>} />
        <Route path='/api/authors/POST' element={<PostAuth/>} />
        <Route path='/api/authors/PUT' element={<PutAuth/>} />
        <Route path='/api/authors/PUT/:id' element={<PutAuth/>} />
        {/* Blog Routes  */}
        <Route path='/blog/post/GET' element={<GetBlog/>} />
        <Route path='/blog/post/GET/:id' element={<GetBlog/>} />
        <Route path='/blog/post/POST' element={<PostBlog/>} />
        <Route path='/blog/post/PUT' element={<PutBlog/>} />
        <Route path='/blog/post/PUT/:id' element={<PutBlog/>} />
      </Routes>
    </BrowserRouter>
  );
}