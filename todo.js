
class List extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = props.removeItem; // this is a function to remove an item of list
    this.state = {
      items: props.items,
    };
  }

  /*
  getDerivedStateFromProps é invocado imediatamente antes de chamar o método render,
  ambos na montagem inicial e nas atualizações subsequente.
  Devem retornar um objeto para atualizar o state, ou null para não atualizar nada.
  */
  static getDerivedStateFromProps(props, state) {
    if (props.items.length !== state.items.length) {
      return {
        items: props.items,
      };
    }
    return null;
  }

  componentDidMount() {
    this.view = document.getElementById("list");
  }

  componentDidUpdate() {
    this.view.scroll({
      top: this.view.scrollHeight
    })
  }

  render() {
    return (
      <ul className="container_items" id="list">
        {this.state.items.length > 0 ? (
          this.state.items.map((item, index) => (
            <li className="item" key={index}>
              <p>{item.value}</p>
              <button
                className="delete"
                onClick={this.removeItem.bind(this, item.ID)}>D</button> {/*it call function removeItem when clicked*/}
            </li>
          ))
        ) : (
          <p className="nothing">You not have items</p>
        )}
      </ul>
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: [], // list with all items to render
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.input = document.getElementById("input");
  }

  handleInputValue(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addNewItem(id) {
    this.setState((state) => ({
      list: [...state.list, { value: state.inputValue, ID: id }],
    }));
    this.input.value = "";
  }

  removeItem(id) {
    this.setState((state) => ({
      list: state.list.filter((item) => item.ID !== id),
    }));
  }

  handleSubmit(id, e) {
    switch (e.key) {
      case "Enter":
        return this.addNewItem(id);
    }
  }

  render() {
    return (
      <div>
        <List items={this.state.list} removeItem={this.removeItem} />
        <input
          id="input"
          className="input"
          type="text"
          placeholder="Enter your text"
          autoFocus
          onChange={this.handleInputValue}
          onKeyDown={this.handleSubmit.bind(this, String(Math.random()))}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <section className="app">
        <Input />
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
