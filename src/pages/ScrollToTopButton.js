import React, { useEffect, useRef } from 'react';
import { MDBBtn, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

const ScrollToTopButton = () => {
    const threshold = 600;
    const mybutton = useRef(null);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    function handleScroll() {
        if (window.scrollY > threshold) {
            mybutton.current.style.display = "block";
        } else {
            mybutton.current.style.display = "none";
        }
    }

    function backToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <MDBContainer fluid>
            <MDBBtn
                onClick={backToTop}
                id='btn-back-to-top'
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    display: "none",
                }}
                className='btn-floating'
                color='danger'
                size='lg'
                ref={mybutton}
            >
                <MDBIcon fas icon="arrow-up" />
            </MDBBtn>
        </MDBContainer>
    );
}

export default ScrollToTopButton
