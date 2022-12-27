import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Form from "../components/Form";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Idée Cadeaux - Trouver un cadeau</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Form />
      </main>
    </div >
  );
}
