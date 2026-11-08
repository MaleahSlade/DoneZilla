function TodoInput({ onAddTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const text = new FormData(form).get('todo');

    if (text && text.trim()) {
      onAddTodo(text.trim());
    }
    form.reset();
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