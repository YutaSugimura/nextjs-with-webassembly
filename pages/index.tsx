import type { NextPage } from "next";
import Head from "next/head";
import { BitAllExplorationComponent } from "../src/components/bitAllExploration";
import { MultipleEnumerationComponent } from "../src/components/multipleEnumeration";
import { PrimeNumberComponent } from "../src/components/primeNumber";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PrimeNumberComponent />
        <MultipleEnumerationComponent />
        <BitAllExplorationComponent />
      </main>
    </div>
  );
};

export default Home;
