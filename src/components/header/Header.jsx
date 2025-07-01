import { Container } from "react-bootstrap";
import SvgLogo from "../svgs/SvgLogo";
import { useEffect, useState } from "react";

function Header() {
    const [test, setTest] = useState(0);

    console.log(test);

    useEffect(() => {
        setTest(test + 1);
    }, [])

    return (
        <header className="p-3 bg-dark text-white">
            <Container fluid>
                <div className="d-flex align-items-center justify-content-between">
                    <SvgLogo width={33} height={33} />
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form>
                    <div className="text-end">
                        <button type="button" className="btn btn-outline-light me-2">Logout</button>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header;