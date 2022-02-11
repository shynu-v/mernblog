import { Link, useNavigate } from 'react-router-dom';

import './topbar.css'



const Topbar = ({username, admin}) => {

	const navigate = useNavigate();
	const log = async () => {
		localStorage.removeItem("token");
		await navigate("/login");
		window.location.reload(false);
	};

	


    return (
			<div className='top'>
				<div className='topLeft'>
					<i className='topIcon fab fa-blogger-b'></i>
					<h3>Tech Blog</h3>
				</div>
				<div className='topCenter'>
					<ul className='topList'>
						<li className='topListItem'>
							<Link className='link' to='/'>
								Home
							</Link>
						</li>
						<li className='topListItem'>
							<Link className='link' to='/article'>
								Articles
							</Link>
						</li>
						<li className='topListItem'>
							<Link className='link' to='/about'>
								About
							</Link>
						</li>
						{admin ? (
							<li className='topListItem'>
								<Link className='link' to='/create'>
									Add Articles
								</Link>
							</li>
						) : null}
					</ul>
				</div>
				{username ? (
					<div className='topRight'>
						<ul className='topList'>
							<li className='topListItem'>
								<Link className='link' to='/login'>
									Hi {username}
								</Link>
							</li>
							<li className='topListItem'>
								<button className='btn' onClick={log}>
									Logout
								</button>
							</li>
						</ul>
					</div>
				) : (
					<div className='topRight'>
						<ul className='topList'>
							<li className='topListItem'>
								<Link className='link' to='/login'>
									LOGIN
								</Link>
							</li>
							<li className='topListItem'>
								<Link className='link' to='/register'>
									REGISTER
								</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		);
};

export default Topbar;