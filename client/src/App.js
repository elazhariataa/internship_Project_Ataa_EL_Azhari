import './App.css';
import { useLocation } from 'react-router-dom';
import ProtectedAdminRoutes from './components/protectedRoutes/protectedAdminRoutes';
import ProtectedTraineeRoutes from './components/protectedRoutes/protectedTraineeRoutes';
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer'
import Login from './components/auth/login';
import Register from './components/auth/register'
import Membership_plans from './components/membership_plan/membership_plan'
import TraineesList from './components/adminSpace/traineesList/traineesList';
import CoachesList from './components/adminSpace/coachesList/coachesList';
import MembershipList from './components/adminSpace/membershipList/membershipList';
import AddCoash from './components/adminSpace/addCoach/addCoash';
import AddMembership from './components/adminSpace/addMembership/addMembership';
import { BrowserRouter, Route, Routes,} from 'react-router-dom';
import AdminProfile from './components/adminSpace/adminProfile/adminProfile';
import Page401 from './components/ErrorPages/401Page';
import Page403 from './components/ErrorPages/403Page';
import TraineeProfile from './components/traineeSpace/traineeProfile/traineeProfile'
import TraineePayments from './components/traineeSpace/traineePayments/traineePayments'
import TraineeMembership from './components/traineeSpace/traineeMembership/traineeMembership'
import UpdateMembership from './components/adminSpace/updateMembership/updateMembership';
import AddTestimolial from './components/traineeSpace/traineeTestimolial/addTestimolial'
import TestimonialList from './components/traineeSpace/traineeTestimolial/testominialList';
import UpdateTestimonial from './components/traineeSpace/traineeTestimolial/updateTestimonial'



function App() {
  const location = useLocation();

  // Array of routes where header will be rendered
  const headerRoutes = ['/', '/register','/login','/membership_plans'];

  // Checking if the current location is one of the header routes
  const shouldRenderHeader = headerRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldRenderHeader && <Header />}
      <main>
        <Routes>
        {/* --------------- guest space --------------------- */}
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/membership_plans' element={<Membership_plans/>}/>
          <Route path='/page401' element={<Page401/>}/>
          <Route path='/page403' element={<Page403/>}/>

        {/* --------------------- admin space ------------------------ */}
          <Route path='/traineesList' element={<ProtectedAdminRoutes><TraineesList/></ProtectedAdminRoutes>}/>
          <Route path='/coachesList' element={<ProtectedAdminRoutes><CoachesList/></ProtectedAdminRoutes>}/>
          <Route path='/addCoash' element={<ProtectedAdminRoutes><AddCoash/></ProtectedAdminRoutes>}/>
          <Route path='/membershipList' element={<ProtectedAdminRoutes><MembershipList/></ProtectedAdminRoutes>}/>
          <Route path='/addMembership' element={<ProtectedAdminRoutes><AddMembership/></ProtectedAdminRoutes>}/>
          <Route path='/adminProfile' element={<ProtectedAdminRoutes><AdminProfile/></ProtectedAdminRoutes>}/>
          <Route path='/updateMembership/:id' element={<ProtectedAdminRoutes><UpdateMembership/></ProtectedAdminRoutes>}/>

        {/* ------------------------- Trainee space --------------------- */}
          <Route path='/traineeProfile' element={<ProtectedTraineeRoutes><TraineeProfile/></ProtectedTraineeRoutes>}/>
          <Route path='/traineePayments' element={<ProtectedTraineeRoutes><TraineePayments/></ProtectedTraineeRoutes>}/>
          <Route path='/traineeMembership' element={<ProtectedTraineeRoutes><TraineeMembership/></ProtectedTraineeRoutes>}/>
          <Route path='/addTestimolial' element={<ProtectedTraineeRoutes><AddTestimolial/></ProtectedTraineeRoutes>}/>
          <Route path='/testimonialList' element={<ProtectedTraineeRoutes><TestimonialList/></ProtectedTraineeRoutes>}/>
          <Route path='/updateTestimonial/:id' element={<ProtectedTraineeRoutes><UpdateTestimonial/></ProtectedTraineeRoutes>}/>
          
          
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
