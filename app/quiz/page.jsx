"use client";

import { useState, useEffect } from "react";

export default function QuizPage() {
  const allQuestions = [
    {
      question: "Who built the Raigad Fort?",
      options: [
        "Shivaji Maharaj",
        "Aurangzeb",
        "Bajirao Peshwa",
        "Chhatrapati Pratap",
      ],
      correct_answer: 0,
    },
    {
      question: "Which fort is known as the 'Capital of Maratha Empire'?",
      options: ["Raigad", "Torna", "Pratapgarh", "Sinhagad"],
      correct_answer: 0,
    },
    {
      question: "Which fort is located on the Sahyadri mountain range?",
      options: ["Rajgad", "Raigad", "Torna", "Lohagad"],
      correct_answer: 2,
    },
    {
      question: "Which fort was the first capital of Shivaji Maharaj?",
      options: ["Rajgad", "Raigad", "Sindhudurg", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort was called 'Gateway of Konkan'?",
      options: ["Vijaydurg", "Sindhudurg", "Janjira", "Ratnagiri"],
      correct_answer: 1,
    },
    {
      question: "Which fort has Killa Ganga river nearby?",
      options: ["Rajgad", "Raigad", "Torna", "Pratapgarh"],
      correct_answer: 3,
    },
    {
      question: "Which fort was known for strategic defense?",
      options: ["Raigad", "Torna", "Rajgad", "All of the above"],
      correct_answer: 3,
    },
    {
      question: "Which fort has a palace built by Shivaji Maharaj?",
      options: ["Raigad", "Torna", "Rajgad", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is the highest in Maharashtra?",
      options: ["Salher", "Torna", "Rajgad", "Raigad"],
      correct_answer: 0,
    },
    {
      question: "Which fort was called 'The Jewel of Sahyadri'?",
      options: ["Raigad", "Rajgad", "Pratapgarh", "Torna"],
      correct_answer: 0,
    },
    {
      question: "Which fort is famous for scenic views?",
      options: ["Raigad", "Torna", "Rajgad", "All of the above"],
      correct_answer: 3,
    },
    {
      question: "Which fort has Bhavani temple?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort was captured by Aurangzeb after Shivaji's death?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is near Raigad district HQ?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has Shivaji Maharaj memorial?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is known for massive walls?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has elephant gate?",
      options: ["Rajgad", "Raigad", "Torna", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort is in Raigad district?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has Rajmachi plateau nearby?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 2,
    },
    {
      question: "Which fort is famous for secret escape routes?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },

    {
      question: "Who built the Raigad Fort?",
      options: [
        "Shivaji Maharaj",
        "Aurangzeb",
        "Bajirao Peshwa",
        "Chhatrapati Pratap",
      ],
      correct_answer: 0,
    },
    {
      question: "Which fort is known as the 'Capital of Maratha Empire'?",
      options: ["Raigad", "Torna", "Pratapgarh", "Sinhagad"],
      correct_answer: 0,
    },
    {
      question: "Which fort is located on the Sahyadri mountain range?",
      options: ["Rajgad", "Raigad", "Torna", "Lohagad"],
      correct_answer: 2,
    },
    {
      question: "Which fort was the first capital of Shivaji Maharaj?",
      options: ["Rajgad", "Raigad", "Sindhudurg", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort was called 'Gateway of Konkan'?",
      options: ["Vijaydurg", "Sindhudurg", "Janjira", "Ratnagiri"],
      correct_answer: 1,
    },
    {
      question: "Which fort has Killa Ganga river nearby?",
      options: ["Rajgad", "Raigad", "Torna", "Pratapgarh"],
      correct_answer: 3,
    },
    {
      question: "Which fort was known for strategic defense?",
      options: ["Raigad", "Torna", "Rajgad", "All of the above"],
      correct_answer: 3,
    },
    {
      question: "Which fort has a palace built by Shivaji Maharaj?",
      options: ["Raigad", "Torna", "Rajgad", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is the highest in Maharashtra?",
      options: ["Salher", "Torna", "Rajgad", "Raigad"],
      correct_answer: 0,
    },
    {
      question: "Which fort was called 'The Jewel of Sahyadri'?",
      options: ["Raigad", "Rajgad", "Pratapgarh", "Torna"],
      correct_answer: 0,
    },
    {
      question: "Which fort is famous for scenic views?",
      options: ["Raigad", "Torna", "Rajgad", "All of the above"],
      correct_answer: 3,
    },
    {
      question: "Which fort has Bhavani temple?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort was captured by Aurangzeb after Shivaji's death?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is near Raigad district HQ?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has Shivaji Maharaj memorial?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is known for massive walls?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has elephant gate?",
      options: ["Rajgad", "Raigad", "Torna", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort is in Raigad district?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has Rajmachi plateau nearby?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 2,
    },
    {
      question: "Which fort is famous for secret escape routes?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort overlooks the Konkan coast?",
      options: ["Sindhudurg", "Raigad", "Rajgad", "Torna"],
      correct_answer: 0,
    },
    {
      question: "Which fort has a famous cannon named 'Kala Buruj'?",
      options: ["Raigad", "Sindhudurg", "Rajgad", "Torna"],
      correct_answer: 1,
    },
    {
      question: "Which fort is famous for its stone carvings?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 2,
    },
    {
      question: "Which fort was used as a treasury?",
      options: ["Raigad", "Sindhudurg", "Rajgad", "Torna"],
      correct_answer: 0,
    },
    {
      question: "Which fort has a water reservoir system?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort is near Mahad?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is associated with Tanaji Malusare?",
      options: ["Torna", "Rajgad", "Sinhagad", "Raigad"],
      correct_answer: 2,
    },
    {
      question: "Which fort has a watchtower named 'Balekilla'?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has royal quarters called 'Maha Mahal'?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is known for cliff-top view?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort has a famous temple of Lord Ganesh?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 2,
    },
    {
      question: "Which fort is famous for its hidden passages?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has a strategic hilltop location?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is located near Alibaug?",
      options: ["Raigad", "Sindhudurg", "Rajgad", "Torna"],
      correct_answer: 0,
    },
    {
      question: "Which fort was used as a military base?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort is famous for its long fortification walls?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has a central palace courtyard?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is known for cannon placements?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort overlooks the Arabian Sea?",
      options: ["Sindhudurg", "Raigad", "Rajgad", "Torna"],
      correct_answer: 0,
    },
    {
      question: "Which fort has massive granaries?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is famous for hidden water channels?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort is known for its scenic trekking paths?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 2,
    },
    {
      question: "Which fort has underground escape tunnels?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is a UNESCO heritage candidate?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort has royal gardens?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort was attacked by the Mughals frequently?",
      options: ["Raigad", "Rajgad", "Torna", "Sindhudurg"],
      correct_answer: 0,
    },
    {
      question: "Which fort has a famous main gate called 'Maha Darwaza'?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is famous for its historical significance?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is in Pune district?",
      options: ["Torna", "Rajgad", "Raigad", "Pratapgarh"],
      correct_answer: 1,
    },
    {
      question: "Which fort has watchtowers on all corners?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort has a royal court hall called 'Darbar Hall'?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is famous for Maratha architecture?",
      options: ["Raigad", "Rajgad", "Torna", "Pratapgarh"],
      correct_answer: 0,
    },
    {
      question: "Which fort is in Raigad district of Maharashtra?",
      options: ["Raigad", "Torna", "Rajgad", "Pratapgarh"],
      correct_answer: 0,
    },
  ];

  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const shuffled = allQuestions
      .map((q) => ({ ...q, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((q) => {
        delete q.sort;
        return q;
      });
    setQuizzes(shuffled.slice(0, 10));
  }, []);

  const submitQuiz = () => {
    let correct = 0;
    quizzes.forEach((q, i) => {
      if (answers[i] === q.correct_answer) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] font-sans px-6 py-10">
      <h1 className="text-4xl md:text-6xl font-bold text-[var(--primary)] mb-10 text-center">
        Heritage Quiz
      </h1>

      {quizzes.map((q, i) => (
        <div
          key={i}
          className="mb-6 p-6 rounded-xl shadow-lg bg-[var(--card)] border border-[var(--border)]"
        >
          <p className="text-xl md:text-2xl font-semibold mb-4 text-[var(--primary)]">
            {i + 1}. {q.question}
          </p>
          <div className="flex flex-col gap-3">
            {q.options.map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 cursor-pointer text-[var(--accent-foreground)] text-lg"
              >
                <input
                  type="radio"
                  name={`q-${i}`}
                  value={idx}
                  onChange={() => setAnswers({ ...answers, [i]: idx })}
                  className="accent-[var(--accent)] w-5 h-5"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mt-8">
        <button
          onClick={submitQuiz}
          className="px-8 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl hover:brightness-90 transition font-semibold text-lg"
        >
          Submit Quiz
        </button>
      </div>

      {score !== null && (
        <p className="mt-8 text-center text-2xl md:text-3xl font-bold text-[var(--primary)]">
          Your Score: {score} / {quizzes.length}
        </p>
      )}
    </div>
  );
}
