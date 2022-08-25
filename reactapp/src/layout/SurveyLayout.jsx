import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const SurveyLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 220px'
    }}>
        <Sidebar/>
        <Outlet />
    </div>;
};

export default SurveyLayout;
