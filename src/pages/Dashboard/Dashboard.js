import React from "react";
import Main from "../../components/common/Main";
import ComingSoon from "../../components/common/ComingSoon";

function Dashboard() {
    return (
        <Main>
            <ComingSoon
                mainText={"Dashboard under development 🚧"}
                text={
                    "This page is currently under development, we are working hard to get it ready for you."
                }
            />
        </Main>
    );
}

export default Dashboard;
