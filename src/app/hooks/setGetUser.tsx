import { updateState, reset, UserState } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserQuery } from "@/redux/features/api/authUserSlice";

export const useUserState = (skip: boolean = false) => {
  const userData = useAppSelector(
    (state: { userDataReducer: UserState }) => state.userDataReducer
  );
  const userRequestQuery = useGetUserQuery(
    {
      refetchOnMountOrArgChange: true,
    },
    { skip: skip }
  );

  if (skip) {
    return { userData, userRequestQuery };
  } else {
    return userData;
  }
};
