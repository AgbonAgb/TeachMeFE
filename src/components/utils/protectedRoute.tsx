import { useAtom } from "jotai"
import { Navigate, Outlet } from "react-router-dom";
import { userAtom } from "../../store/store";

const ProtectedRoute = () => {
    const [user] = useAtom(userAtom);


    if (user?.Token  && user?.UserType?.toLowerCase() === "student") {
        return <Outlet />;
    }

    return <Navigate to="*" replace />


}
 
export default ProtectedRoute;

