import "./footer.css";
const LandingPageFooter = () => {
  return (
    <div className=" mt-5 footer">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-5">
          <div className="socail">
            <p>Roomster</p>
            <h6 style={{color:'#ffff'}}>Our mission is to connect people with comfortable,<br/> affordable, and safe living spaces, wherever they may be. </h6>
            <div className="effect aeneas">
              <div className="buttons">
                <a
                  rel="noreferrer"
                  href="https://www.facebook.com/profile.php?id=100019862141727"
                  target="_blank"
                  className="fb"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://twitter.com/"
                  target="_blank"
                  className="tw"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/ahmed__jamal99/"
                  target="_blank"
                  className="insta"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                <a
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/ahmed-jamal-43b76b205/"
                  target="_blank"
                  className="in"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <div className="List">
            <h5>Useful Links</h5>
            <ul>
              <li>About us</li>
              <li>My profile</li>
              <li>Pricing plans</li>
              <li>Contacts</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-5">
          <div className="List">
            <h5>Support</h5>

            <ul>
              <li>Live TV</li>
              <li>Live News</li>
              <li>Live Sports</li>
              <li>Stream Library</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-6 mb-5">
          <div className="List">
            <h5>Latest News</h5>
            <ul>
              <li>TV Shows</li>
              <li>Movies</li>
              <li>Kids</li>
              <li>Collections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;
