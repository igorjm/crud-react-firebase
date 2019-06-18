import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('post').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const post = doc.data();
        this.setState({
          key: doc.id,
          title: post.title,
          description: post.description,
          author: post.author
        });
      } else {
        console.log("Post não encontrado!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({post:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    const updateRef = firebase.firestore().collection('post').doc(this.state.key);
    updateRef.set({
        title,
        description,
        author
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        author: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adicionando post: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Painel de Edição
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Voltar para lista de posts</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Título:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Título" />
              </div>
              <div class="form-group">
                <label for="description">Descrição:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Descrição" />
              </div>
              <div class="form-group">
                <label for="author">Autor:</label>
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Autor" />
              </div>
              <button type="submit" class="btn btn-success">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;