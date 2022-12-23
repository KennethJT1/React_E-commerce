import {useAuth} from '../../context/auth';
import Jumbotron from '../../components/cards/Jumbotron';

export default function Dasboard() {
    //context 
    const [auth, setAuth] = useAuth();

  return (
    <>
    <Jumbotron title={` Hello  ${auth?.user?.name}`} subtitle="User Dashboard" />
    </>
  )
}
