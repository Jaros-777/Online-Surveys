import "./Footer.scss"

export default function Footer() {


    return (
        <>
            <footer>
                <div id="content">
                    <p>© {new Date().getFullYear()} Online Surveys. All rights reserved.</p>
                    <p>Crafted with ❤️ to help you create, share, and analyze surveys smarter.</p>
                    <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a></p>
                </div>

            </footer>
        </>
    )
}