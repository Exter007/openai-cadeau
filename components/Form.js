import React, { useState } from "react";
import styles from "../pages/index.module.css";

export default function Form() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState([]);
    const [budgetMin, setBudgetMin] = useState(0);
    const [budgetMax, setBudgetMax] = useState(0);

    const [step, setStep] = useState(0);
    const [stepTitles, setStepTitles] = useState(["Description", "Budget", "Contact"]);

    const disableAndAnimate = (id) => {
        document.getElementById(id).disabled = true;
        document.getElementById(id).classList.add(styles.animate);
    }


    const handleSubmit = async (event) => {
        disableAndAnimate("s");
        const q = "Donne moi 3 idées de cadeau originales et l'estimation de prix, pour la personne que je te décris ici. " + question + " Avec un budget de " + budgetMin.toString() + "€ minimum et " + budgetMax.toString() + "€ maximum.";
        event.preventDefault();
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ q }),
        });
        const { result } = await response.json();
        // Create array of answers
        const answers = result.split(/(\d\. )/);
        setAnswer(answers);
        document.getElementById("s").disabled = false;
    };

    return (
        <div className={styles.div}>
            <h1> Trouvez une idée de cadeau ! </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="prenom">Prénom de la personne</label>
                <input
                    type="text"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                />
                <label htmlFor="budgetMin">Budget minimum</label>
                <input
                    type="number"
                    value={budgetMin}
                    onChange={(event) => setBudgetMin(event.target.value)}
                />
                <label htmlFor="budgetMax">Budget maximum</label>
                <input
                    type="number"
                    value={budgetMax}
                    onChange={(event) => setBudgetMax(event.target.value)}
                />
                <button id="s" disabled={false} type="submit">Envoyer</button>
            </form>
            <div className={styles.result}>
                {
                    answer.map((item, index) => {
                        if (index % 2 != 0) {
                            return (
                                <div key={index} className={styles.rep}>
                                    <span>{item} {answer[index + 1]}</span>
                                </div>
                            );
                        }
                    }
                    )
                }
            </div>
        </div>
    );
}