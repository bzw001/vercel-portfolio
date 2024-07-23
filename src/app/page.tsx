import Image from "next/image";
import './page.css'

export default function Home() {
  return (
    <main>
      <aside className="sidebar" data-sidebar>
        <div className="sidebar-info">
          <figure className="avatar-box">
            <img src="./assets/images/avatar.jpg" alt="BiaoZhi Wang" width="80" className="rounded-[20%]" />
          </figure>
          <div className="info-content">
            <h1 className="name" title="BiaoZhi Wang">BiaoZhi Wang</h1>
            <p className="title text-center">FullStack developer <br/>Freelancer</p>
          </div>

        </div>

        <div className="sidebar-info_more">

          <div className="separator"></div>

          <ul className="contacts-list">

            <li className="contact-item">

              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>

              <div className="contact-info">
                <p className="contact-title">Email</p>

                <a href="mailto:richard@example.com" className="contact-link">wbz768426199@gmail.com</a>
              </div>

            </li>

            <li className="contact-item">

              <div className="icon-box">
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <div className="contact-info">
                <p className="contact-title">Location</p>

                <address>ChangSha, Hunan, China</address>
              </div>

            </li>

          </ul>

          <div className="separator"></div>

          <ul className="social-list">

            {/* <li className="social-item">
              <a href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li className="social-item">
              <a href="#" className="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li className="social-item">
              <a href="#" className="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li> */}

          </ul>

        </div>

      </aside>

      <div className="main-content">

        <nav className="navbar">

          <ul className="navbar-list">

            <li className="navbar-item">
              <button className="navbar-link  active" data-nav-link>About</button>
            </li>


            <li className="navbar-item">
              <a className="navbar-link" href="/blog">Blog</a>
            </li>

          </ul>

        </nav>

        <article className="about  active" data-page="about">

          <header>
            <h2 className="h2 article-title">About me</h2>
          </header>

          <section className="about-text">
            <p>
            8+ years of front-end development experience, including front-end architecture and team management. Have led multiple PC/mobile platform systems, such as AI-based logistics ToB SAAS platform, etc.
            </p>

            <p>
              My job is to build your website so that it is functional and user-friendly but at the same time attractive.
              Moreover, I
              add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring
              across your
              message and identity in the most creative way. I created web products for many famous brand companies.
            </p>
          </section>

          <section className="service">

            <h3 className="h3 service-title">What i&apos;m doing</h3>

            <ul className="service-list">

              <li className="service-item">

                <div className="service-icon-box">
                  <img src="./assets/images/icon-design.svg
                " alt="design icon" width="40" />
                </div>

                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Pixel perfect</h4>

                  <p className="service-item-text">
                  Ensure builds comply with the approved design (pixel perfect), build specifications, and checklist to create functional solutions that work cross-browser and resolution.
                  </p>
                </div>

              </li>

              <li className="service-item">

                <div className="service-icon-box">
                  <img src="./assets/images/icon-dev.svg" alt="Web development icon" width="40" />
                </div>

                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Web development</h4>

                  <p className="service-item-text">
                    High-quality development of sites at the professional level.
                  </p>
                </div>

              </li>

              <li className="service-item">

                <div className="service-icon-box">
                  <img src="./assets/images/icon-app.svg" alt="mobile app icon" width="40" />
                </div>

                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Mobile apps</h4>

                  <p className="service-item-text">
                    Professional development of applications for iOS and Android.
                  </p>
                </div>

              </li>

              <li className="service-item">

                <div className="service-icon-box">
                  <img src="./assets/images/icon-photo.svg" alt="camera icon" width="40" />
                </div>

                <div className="service-content-box">
                  <h4 className="h4 service-item-title">Freelancer</h4>

                  <p className="service-item-text">
                  I can work full-time or part-time
                  </p>
                </div>

              </li>

            </ul>

          </section>
                    {/* React | Redux | Redux-saga | Next.js | Vue | TypeScript | JavaScript | ES6+ | HTML | CSS | Node.js | Jest | Webpack | Qiankun | Tailwind,ElementUI,AntdUI | Git */}

          <section className="testimonials">
            <h3 className="h3 testimonials-title">TechStack</h3>
            <ul className="testimonials-list flex flex-wrap">
              <li className="testimonials-item max-w-[100%]">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/js.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> JavaScript | ES6+ | HTML | CSS | TypeScript</div>
                </div>
              </li>
              <li className="testimonials-item ">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/reactjs.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> React.js | Next.js | Redux | Redux-saga | Valito</div>
                </div>
              </li>
              <li className="testimonials-item ">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/vue.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> Vue2.js | Vue3.js | vuex | pinia</div>
                </div>
              </li>
              <li className="testimonials-item ">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/nodejs.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> Node.js | Koa.js | RESTful API</div>
                </div>
              </li>
              <li className="testimonials-item ">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/webpack.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> Webpack | Babel | NPM</div>
                </div>
              </li>
              <li className="testimonials-item ">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/tailwind.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> Tailwind | Less | Sass</div>
                </div>
              </li>
              <li className="testimonials-item ">
                <div className="content-card  flex items-center" data-testimonials-item>
                    <img src="./assets/images/git.svg" alt="Web development icon" width="40" />
                    <div className="service-item-text"> Git | Jest | CI/CD</div>
                </div>
              </li>
            </ul>
          </section>


          <section className="clients">

            <h3 className="h3 clients-title">Portfolio</h3>

            <ul className="clients-list has-scrollbar">

              <li className="clients-item">
                <a href="https://dashboard-admin-nextjs-eight.vercel.app/" target="_blank">
                  <img src="./assets/images/project-admin.png" alt="project-admin" />
                </a>
              </li>

              <li className="clients-item">
                <a href="https://image-gallery-ride.vercel.app/" target="_blank">
                  <img src="./assets/images/project-imageGallery.png" alt="project-imageGallery" />
                </a>
              </li>

            </ul>

          </section>

        </article>
      </div>
    </main>
  )
}
