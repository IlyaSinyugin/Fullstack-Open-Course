import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      {console.log(votes)}
      {console.log(Math.max(...votes))}

      <h1>Anecdote of the day</h1>
      <p> {anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVotes} text="vote" />
      <Button handleClick={handleSelected} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p> {anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
    </div>
  );
};

export default App;
