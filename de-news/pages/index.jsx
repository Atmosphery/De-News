//import Gun from 'gun'
import 'gun/sea';


import AppBar from '../components/appBar';








//const gun: IGunInstance = Gun('localhost:8765')
//{gun, user, setUser}: IProps
const Index = ({gun, user, loggedIn, setLoggedIn}) => {

  

  return (
    <main>
      <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <div className="flex">

        <h2 className='text-3xl font-bold underline'>Today's News</h2>
      </div>

    </main>
  );
}








export default Index;

