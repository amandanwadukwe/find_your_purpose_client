import Menu from "../resources/menu.svg";
import Logo from "../resources/lyc-logo-nobackground.png"

export default function Header(props){
    return <header>
        <div className="to-left">
            {/* <h1 className="primary-logo">Find your purpose</h1>
            <h1 className="secondary-logo">realise your ambition</h1> */}
            <img className="logo animate-on-hover-icon" src={Logo} alt="LYC logo"/>
            <h1>Lancashire Youth Challenge</h1>
        </div>
        <div className="to-right">
            <img className={props.menuStatus ? "menu animate-on-hover-icon": "hide"} onClick={props.handleMenuClick} src={Menu} alt="menu"/>
        </div>
    </header>
}