import React from 'react';
import './portfolio.css';

const Portfolio = () => {
    return (
        <div>
            <section className="portfolio-vertical">
                <h5 className="vertical"></h5>
            </section>

            <section className="portfolio">
                <a href="https://www.facebook.com/profile.php?id=61557933621584" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-facebook"></i>
                </a>
                <a href="https://github.com/achourimohsen" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-github"></i>
                </a>
            </section>
        </div>
    );
};

export default Portfolio;
