//import Gun from 'gun'
import 'gun/sea';


import AppBar from '../components/appBar';








//const gun: IGunInstance = Gun('localhost:8765')
//{gun, user, setUser}: IProps
const Index = ({gun, user, loggedIn, setLoggedIn}) => {

  const checkLoginHandler = () => {
    gun.get('articles').put(null);
    gun.get('articles').once((data) => {
      console.log(data)
    })
  }


  ////This is where you left off, you were chaniging index to a function and gonna try and call gun through an api
  return (
    <main>
      <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <div className="flex">

        <h2 className='text-3xl font-bold underline'>Today's News</h2>
        <h2 className=''>Journalist of the day</h2>
        <button className='btn' onClick={checkLoginHandler}>Check</button>
      </div>

    </main>
  );
}








export default Index;

