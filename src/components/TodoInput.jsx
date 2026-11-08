function TodoInput() {
    
  const handleSubmit = (event) => {
    event.preventDefault();
    // reset the form
    event.target.reset();
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label><br></br>
      <button>
        <span className="visually-hidden">Submit</span>
      </button>
    </form>
  );
}

export default TodoInput;