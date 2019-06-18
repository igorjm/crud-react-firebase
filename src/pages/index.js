  import React, { Component } from 'react';
  import { Link } from 'react-router-dom';
  import firebase from '../config/firebase';

  class App extends Component {
    constructor(props) {
      super(props);
      this.ref = firebase.firestore().collection('post');
      this.unsubscribe = null;
      this.state = {
        post: []
      };
    }

    onCollectionUpdate = (querySnapshot) => {
      const post = [];
      querySnapshot.forEach((doc) => {
        const { title, description, author, like } = doc.data();
        post.push({
          key: doc.id,
          doc,
          title,
          description,
          author,
          like,
        });
      });
      this.setState({
        post
    });
    }

    componentDidMount() {
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
      return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Lista de Posts
              </h3>
            </div>
            <div>
              <h4><Link to="/create">Adicionar Post</Link></h4>
            </div>
            <div class="panel-body">
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descrição</th>
                    <th>Autor</th>
                    <th>Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.post.map(post =>
                    <tr>
                      <td><Link to={`/show/${post.key}`}>{post.title}</Link></td>
                      <td>{post.description}</td>
                      <td>{post.author}</td>
                      <td>{post.like}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
          </div>
        </div>
      );
    }
  }

  export default App;