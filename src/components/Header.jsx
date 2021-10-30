import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import logo from '../styles/imgs/netflix.png';

class Header extends Component {
    componentDidMount() {
        window.addEventListener('scroll', () => {
            const elHeader = document.querySelector('.header');
            const elImgLogo = document.querySelector('.img-logo');

            elHeader.classList.toggle('scroll', window.scrollY > 0);
            elImgLogo.classList.toggle('scroll', window.scrollY > 0)

        })
    }

    moveToHomePage = () => {
        const { history } = this.props;
        history.push('/')
    }

    render() {
        return (
            <div className="header flex row center space-between">
                <img onClick={() => { this.moveToHomePage() }} className="img-logo" src={logo} alt="" />
                <img className="img-avatar" src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="" />
            </div>
        )
    }
}

export default withRouter(Header);
