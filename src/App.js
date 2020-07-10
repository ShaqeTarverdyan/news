import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Articles from './components/Articles';
import Article from './components/Article';
import SearchPage from './components/SearchPage';
import PopUp from './components/PopUp';
import Login from './components/auth/Login';
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
`;


//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const getPositiveHash = (str) => {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash + 2147483647 + 1;
  }


class App extends React.Component {
  state = {
    articles: null,
    isOpen: false
  }

  handleArticlesChange = (articles) => {
    console.log('art', articles)
    const articlesWithId = articles.map(article => ({
      ...article,
      id: getPositiveHash(article.url)
    }))
    this.setState({
      articles: articlesWithId
    })
  }

  hanleTogglePupUp = () => {
      this.setState({
        isOpen: !this.state.isOpen
      })
  }


  render() {
    return (
      <AppContainer isOPenPopup={this.state.isOpen}>
        <Header hanleOpenPupUp={this.hanleTogglePupUp}/>
        <PopUp isOpen={this.state.isOpen} title="LogIn" handleClosePopUp={this.hanleTogglePupUp}>
          <Login/>
        </PopUp>
        <Switch>
          <Route
            path="/Article/:articleId"
            render={({ match }) => {
              const article = this.state.articles.find(item => item.id.toString() === match.params.articleId);
              if(!article) return <Redirect to="/"/>
              const {author, title, publishedAt, content } = article;
              return (
                <Article 
                  {...{author, title, publishedAt, content}}
                />
              )
            }}
          />

          <Route
            exact
            path={["/Source/:result", "/Search/:result", "/"]}
            render={({ match }) => {
              return (
                  <Articles 
                    onArticlesChange={this.handleArticlesChange}
                    articles={this.state.articles}
                    pathName={match.params.result}
                    matchedUrl={match.url}
                  />
              )
            }}
          />
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
