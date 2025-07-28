//import React from "react";
import styles from "./PriceingPage.module.css";
import Nav from "../components/Nav";

function Product() {
  return (
    <div>
      <main className={styles.product}>
        <Nav />

        <section>
          <img
            src="img-1.jpg"
            alt="overview of a large city with skyscrapers"
          />
          <div>
            <h2>About WorldWide.</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
              dicta illum vero culpa cum quaerat architecto sapiente eius non
              soluta, molestiae nihil laborum, placeat debitis, laboriosam at
              fuga perspiciatis?
            </p>
            <br />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
              doloribus libero sunt expedita ratione iusto, magni, id sapiente
              sequi officiis et.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Product;
