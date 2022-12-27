import React from "react";
import styles from "../pages/index.module.css";

export default function SecondStep({ formData, setFormData }) {
    return (
        <div className={styles.stepContainer}>
            <h2>Comment décririez-vous cette personne ?</h2>
            <label htmlFor="description">Description</label>
            <textarea
                type="text"
                placeholder="Ex: Il/elle aime les jeux vidéos, la cuisine, les films d'action et les séries de science-fiction."
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />
            <label htmlFor="budgetMin">Budget minimum</label>
            <input
                type="number"
                value={formData.budgetMin}
                onChange={(event) => setFormData({ ...formData, budgetMin: event.target.value })}
            />
            <label htmlFor="budgetMax">Budget maximum</label>
            <input
                type="number"
                value={formData.budgetMax}
                onChange={(event) => setFormData({ ...formData, budgetMax: event.target.value })}
            />
        </div>
    );
}