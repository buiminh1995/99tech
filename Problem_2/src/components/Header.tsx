import logo from "../assets/logo.svg";


function Header() {
    return (
    <header className="mb-16">
        <img className="company-logo" src={logo} alt="Logo" />
    </header>
    )

}

export default Header;