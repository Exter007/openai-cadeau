import React from "react";
import styles from "../pages/index.module.css";

export default function FirstStep({ formData, setFormData }) {
    return (
        <div className={styles.stepContainer}>
            <h2>Donnez-nous quelques informations !</h2>
            <label htmlFor="prenom">Prénom</label>
            <input
                type="text"
                placeholder="Ex: Jean"
                value={formData.prenom}
                onChange={(event) => setFormData({ ...formData, prenom: event.target.value })}
            />
            <label htmlFor="age">Age</label>
            <input
                type="number"
                value={formData.age}
                onChange={(event) => setFormData({ ...formData, age: event.target.value })}
            />
        </div>
    );
}