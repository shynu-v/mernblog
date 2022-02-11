import React from 'react';
import Articlesing from '../../components/articledet/Articlesing';

const ArticleDet = ({ userid, user, admin }) => {
	return <Articlesing userid={userid} user={user} admin={admin}/>;
};

export default ArticleDet;