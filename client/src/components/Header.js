import { Link } from "react-router-dom"
import "./Header.sass"

function Header({ isLoggedIn, onLogOut }) {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/">Главная</Link>
                <Link to="/info">О нас</Link>
                <Link to="/service">Услуги</Link>
                {isLoggedIn ? (
                    <>
                        <button onClick={onLogOut}>Выйти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Войти</Link>
                        <Link to="/register">Регистрация</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header