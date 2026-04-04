import alarmIcon from "../assets/alarm.png";

function Header() {
    return (
        <header className="header">
            <div className="header-logo">LOGO</div>

            <div className="header-right">
                <img src={alarmIcon} alt="알람" className="alarm-icon" />
                <span className="header-store">박수빈</span>
                <span className="header-logout">로그아웃</span>
            </div>
        </header>
    );
}

export default Header;