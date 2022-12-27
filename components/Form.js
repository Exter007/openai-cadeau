import React, { useState } from "react";
import styles from "../pages/index.module.css";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export default function Form() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState([]);
    const [budgetMin, setBudgetMin] = useState(0);
    const [budgetMax, setBudgetMax] = useState(0);

    const [formData, setFormData] = useState({
        prenom: "",
        age: 0,
        description: "",
        budgetMin: 0,
        budgetMax: 0,
        email: "",
    });

    const [page, setPage] = useState(0);
    const [stepTitles, setStepTitles] = useState(["Description", "Budget", "Contact"]);

    const PageDisplay = () => {
        if (page == 0) {
            return <FirstStep formData={formData} setFormData={setFormData} />;
        }
        if (page == 1) {
            return <SecondStep formData={formData} setFormData={setFormData} />;
        }
        if (page == 2) {
            return <ThirdStep formData={formData} setFormData={setFormData} />;
        }
    }

    const disableAndAnimate = (className) => {
        const elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }


    const handleSubmit = async () => {
        disableAndAnimate("navB");
        const q = "Donne moi 3 idées de cadeau originales et l'estimation de prix, pour la personne que je te décris ici. " + formData.prenom + ", " + formData.age + ", " + formData.description + ", avec un budget entre " + formData.budgetMin.toString() + "euros et " + formData.budgetMax.toString() + "euros.";
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
    };

    return (
        <div className={styles.div}>
            <h1> Trouvez une idée de cadeau ! </h1>
            <h2>{PageDisplay()}</h2>

            <div className={styles.nav}>
                <button className="navB" disabled={page == 0} hidden={page == 0} onClick={() => {
                    setPage(page - 1);
                }
                }>Précédent</button>
                <button className="navB" onClick={() => {
                    if (page == stepTitles.length - 1) {
                        handleSubmit();
                    } else {
                        setPage(page + 1);
                    }
                }
                }>{page === stepTitles.length - 1 ? "Envoyer" : "Suivant"}</button>
            </div>
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
        </div >
    );
}