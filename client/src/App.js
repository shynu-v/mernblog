import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Deleteart from './components/deleteart/Deleteart';
import Editarticle from './components/editarticle/Editarticle';
import Topbar from './components/topbar/Topbar';
import About from './pages/about/About';
import Article from './pages/article/Article';
import ArticleDet from './pages/articledet/ArticleDet';
import Create from './pages/create/Create';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
	

	const [username, setname] = useState(null);
	const [admin, setadmin] = useState(false);
	const [id, setid]= useState(null);
	
	useEffect(() => {
		
			
					axios
						.get("/user/getname", {
							headers: {
								"x-access-token": localStorage.getItem("token"),
							},
						})
						.then((res) => {
							setadmin(res.data.isAdmin);
							setid(res.data.id)
							return res.data.loggedin ? setname(res.data.username) : null;
						});
	}, []);


  return (
		<>
			<BrowserRouter>
				<Topbar username={username} admin={admin} />
				<Routes>
					<Route exact path='/' element={<Home />}></Route>
					<Route path='/article' element={<Article />}></Route>
					<Route path='/about' element={<About />}></Route>
					<Route path='/create' element={username?<Create user={username}/>:<Login/>}></Route>
					<Route path='/article/:id' element={username?<ArticleDet userid={id} user={username} admin={admin}/>:<Login/>}></Route>
					<Route path='/register' element={<Register />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/article/:id/edit' element={admin ? <Editarticle user={username} admin={admin}/>:<Login/>}></Route>
					<Route path='/article/:id/delete' element={admin? <Deleteart/>:<Login/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
