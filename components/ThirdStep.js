import React from "react";
import styles from "../pages/index.module.css";

export default function ThirdStep({ formData, setFormData }) {
    return (
        <div className={styles.stepContainer}>
            <h2>Nous vous envoyons un mail contenant la liste d'idées !</h2>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                placeholder="Ex: example@example.com"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
        </div>
    );
}