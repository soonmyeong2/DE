import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import { updateUserInfo } from "../modules/info";
export default function SearchContainer() {
  const { userInfo } = useSelector((state) => ({
    userInfo: state.info.userInfo,
  }));
  const dispatch = useDispatch();
  const onUpdateUserInfo = (userInfo) => dispatch(updateUserInfo(userInfo));

  return (
    <>
      <Search onUpdateUserInfo={onUpdateUserInfo} userInfo={userInfo} />
    </>
  );
}
