//import Gun from 'gun'
import { useState } from "react";
import AppBar from '../components/appBar';
import { useEffect } from "react";
import Article from '../components/NormalArticle'
import SearchBar from "../components/SearchBar";







//const gun: IGunInstance = Gun('localhost:8765')
//{gun, user, setUser}: IProps
const Index = ({ gun }) => {


  const articles = []
  const [reactArticles, setReactArticles] = useState([]);
  //

  const checkExising = (existingArticles, id) => {

    //debugger
    for (let i = 0; i < existingArticles.length; i++) {
      const article = existingArticles[i];
      if (article === id) {
        return true;
      }
    }
    return false;
  }


  useEffect(() => {
    (async function () {
      const existingArticles = []
      await gun.get('articles').map(article => article !== null ? article : undefined).on((article, id) => {
        const doesExist = checkExising(existingArticles, id);

        if (article !== null && !doesExist) {
          existingArticles.push(id);
          article.id = id;
          articles.push(article);

        }
      });


      console.log(articles.length, 'article state');
      const rArticles = profileInit();
      console.log(rArticles.length, 'rArticles')
      setReactArticles(rArticles);

    })
      ();
    //debugger

  }, [])

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  const profileInit = () => {

    var tempArticles = [];
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      //console.log(article.text)
      tempArticles.push(
        <Article
          author={article.author}
          thumbnail={article.thumbnail}
          date={article.date}
          user={article.user}
          id={_.get(article, "_.#", undefined)}
          text={article.text}
          title={article.title}
          key={i}
        />
      );
    }
    return tempArticles;
  }

  const resetArticles = () => {
    gun.get('articles').map().once((data, id) => {
      gun.get('articles').get(id).put(null);
    });
  }

  return (
    <main>

      <div className="flex flex-col items-center">
        <h1 className='font-bold underline ml-5 '>The News</h1>
        <div className="gap-8 columns-4 mt-20">
          {reactArticles}
        </div>

      </div>

      <div className="flex-none max-w-xs">
        <div className="mt-5 mr-5">
        </div>
      </div>

      <button onClick={resetArticles} className='btn btn-sm'>Reset Articles</button>
    </main>
  );
}

export default Index;

