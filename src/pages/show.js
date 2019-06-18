import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('post').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          post: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("Nenhum post encontrado!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('post').doc(id).delete().then(() => {
      console.log("Post deletado!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removendo o post: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/" class="btn btn-primary">Voltar para lista de posts</Link></h4>
            <h3 class="panel-title">
              {this.state.post.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Descrição:</dt>
              <dd>{this.state.post.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.post.author}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Deletar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
    