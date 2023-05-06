import { updateState, reset, UserState } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserQuery } from "@/redux/features/api/authUserSlice";

export const useUserState = (skip?: boolean ) => {
  const userData = useAppSelector(
    (state: { userDataReducer: UserState }) => state.userDataReducer
  );
  const userRequestQuery = useGetUserQuery(
    {
      refetchOnMountOrArgChange: true,
    },
    { skip: skip=== false ? false : true }
  );

  const getUserData = () => {
    return userData;
  };
  const setUserDataQuery = () => {
    console.log('here', skip)
    if (skip === false && skip !== undefined){
       
    return userRequestQuery;}
  };

    return { getUserData, setUserDataQuery };
}
