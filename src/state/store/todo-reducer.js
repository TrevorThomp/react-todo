const initialState = {
  todoList: [
    {
      _id: 1,
      difficulty: 4,
      complete: false,
      text: "Mow Lawn",
      assignee: "Trevor",
      due: "2020-08-20"
    }
  ],
  showDetails: null,
  details: {}
};

export default (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case "DETAILS":
      let item = state.todoList.filter(item => item._id === payload)[0] || {};
      return { ...state, showDetails: !state.showDetails, details: item };

    case "GET":
      return { ...state, todoList: payload };

    case "POST":
      return { ...state, todoList: [...state.todoList, payload] };

    case "TOGGLE":
      return {
        ...state,
        todoList: state.todoList.map(item =>
          item._id === payload ? { ...item, complete: !item.complete } : item
        )
      };

    case "DELETE":
      return {
        ...state,
        todoList: state.todoList.filter(item => item._id !== payload)
      };

    default:
      return state;
  }
};
