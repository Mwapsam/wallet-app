import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { currentUser } from '../services/auth.service';

const authRoute = () => {
  const { user } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  console.log(user);
  
  return user;
};

export default authRoute;
