import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container">
                    <Link to={`/`} class="navbar-brand">Student Management System</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                        <Link class="nav-link" aria-current="page" to={`/`}>Students</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" to={`/classes`} >Classes</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link" to={`/school`}>School</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Header